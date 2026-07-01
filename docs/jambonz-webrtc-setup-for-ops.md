# Jambonz WebRTC setup — for whoever runs the Jambonz server

**Goal:** let a browser (the uponai.com "Talk to Grace" demo) place a SIP call into
Jambonz, like a softphone. When it lands as a normal call, Grace's transfer + the
Extension Directory work — same as calling the DID.

Browsers can only do SIP over a **secure WebSocket (WSS)**. So Jambonz needs a
**public WSS SIP listener**. Right now it doesn't have one — that's the blocker.

---

## What we already found (2026-07-01)

Server: `ip-172-31-28-19`, public IP `18.224.99.87` (AWS EC2). SIP realm
`uponai.jambonz.upon-ai.com`, SIP domain `sip.jambonz.upon-ai.com`.

```
$ curl -v https://sip.jambonz.upon-ai.com:8443
... connect to 18.224.99.87 port 8443 ... Connection refused

$ sudo ss -tlnp | grep -E ':8443|:4443|:443'
LISTEN 0 4096 0.0.0.0:443  ... users:(("docker-proxy",pid=4516))
LISTEN 0 4096   [::]:443   ... users:(("docker-proxy",pid=4522))
```

**Reading:** only **443** is listening (the Jambonz portal, via docker). Port
**8443** — jambonz's default WebRTC WSS port — has **nothing on it** (connection
refused even from the box itself). So there is **no browser-facing WSS SIP endpoint**.
It needs to be enabled and exposed.

A browser test against `wss://sip.jambonz.upon-ai.com` on 443/8443/4443 confirms:
443 answers TLS but rejects the SIP WebSocket upgrade (it's the portal); 8443 times
out. No usable endpoint exists yet.

---

## First: identify the container layout

Run on the server and send the output back:

```
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}'
```

Look for the **SBC / drachtio** container(s) (images like `drachtio/drachtio-server`,
`jambonz/sbc-inbound`, `jambonz/sbc-sip-sidecar`) and whatever publishes **443**.
That tells us whether the SBC already has a WSS transport we just need to expose, or
whether it must be enabled.

---

## Option A — expose the SBC WSS on 8443 (jambonz standard, recommended)

1. **Enable a SIP `wss` transport on the SBC (drachtio)** using a TLS certificate
   valid for `sip.jambonz.upon-ai.com` (Let's Encrypt is fine). In a standard jambonz
   deploy the drachtio SBC can serve SIP over `udp/tcp/tls/wss`; the WSS listener is
   normally port **8443**.
2. **Publish port 8443** from the SBC container to the host.
3. **Open inbound TCP 8443** in the **AWS security group** for `18.224.99.87`.
   Easy to miss — the container can listen but AWS still blocks the internet. Without
   this the browser gets exactly the "connection refused / timeout" we saw.

Verify from an outside machine (not the server):
```
curl -v https://sip.jambonz.upon-ai.com:8443     # expect a TLS handshake, not "refused"
```

Reference: https://blog.jambonz.org/supporting-webrtc-clients-with-jambonz

## Option B — proxy WSS through the existing 443

Since 443 is already public via a reverse proxy, add a WebSocket route there: for
host `sip.jambonz.upon-ai.com`, upgrade the connection and forward to the SBC's
internal WS/WSS port. Keeps one public port, but is more reverse-proxy config and
easier to get subtly wrong. Only do this if adding 8443 to the security group isn't
an option.

---

## Don't forget media (RTP) — the "connected but silent" trap

Signaling (WSS) is only half. Browser audio flows as **RTP through `rtpengine`**.
Its **media UDP port range** must also be **open to the public in the AWS security
group** (and mapped out of the container). If WSS works but there's no audio, this is
why. Open it at the same time as 8443.

TURN may also be needed for browsers behind restrictive NAT; we can add TURN creds on
the app side once signaling + media are reachable.

---

## What to send back

1. The exact **`wss://host:port`** browsers should use (e.g. `wss://sip.jambonz.upon-ai.com:8443`).
2. Confirmation that port is **open to the public** with a **valid TLS cert** for that host.
3. Confirmation the **rtpengine media UDP range is open** to the public.

With #1 we set `JAMBONZ_WS_SERVER` and test the call immediately. The rest of the
pieces are already in place on the Jambonz side:

- SIP client `webdemo-grace` (account UponAI) — the browser registers as this.
- Account "Application for SIP device calls" = **UponAI Workspace – Native Transfer
  Default**, so a registered client that dials **905** reaches Grace **with transfer**.
- DID fallback if `905` doesn't route from a device call: `+12012280914`.

The website code is done and waiting on this — it's purely a Jambonz server
enablement task (SBC WSS listener + firewall + cert + RTP), not application code.

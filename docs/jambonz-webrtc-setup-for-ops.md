# Letting the website call into Jambonz — plain-English setup guide

## The short version

We want the "Talk to Grace" button on the website to place a real phone call into
your Jambonz server — the same as if someone dialed the number. When it goes in that
way, Grace can transfer people to a human, just like she does on the real phone line.

Think of the Jambonz server as a building with several doors:

- The **front door** (for the admin website) is open — that's why you can log in.
- The **phone door for web browsers** is what the website needs. **It's not built /
  not open yet.** So when the website "knocks," nobody answers, and the call just
  spins forever.

Your job: **open (or build) that phone door, and make sure the internet can reach it.**
Nothing here is website code — it's all on the Jambonz server. Once the door's open
and you tell us its address, we flip one setting and it works.

The technical name for this door is a "secure WebSocket for SIP" (WSS). You don't need
to know what that means — just that it's a door on a specific port number that has to
be open to the public.

---

## What we already checked (so you don't repeat it)

Your server is the AWS box at public address `18.224.99.87`. We tested it two ways:

**1. Tried knocking on the usual phone-door port (8443):**
```
curl -v https://sip.jambonz.upon-ai.com:8443
→ Connection refused
```
"Connection refused" = **there is no door there at all.** Not locked — not built.

**2. Listed which doors are actually open on the server:**
```
sudo ss -tlnp | grep -E ':8443|:4443|:443'
→ only :443 is open (that's the admin website)
```
Only the front door (443, the admin portal) is open. The phone door is missing.

So the task is: **stand up the phone door and open it to the internet.**

---

## Step 1 — tell us what's running (one command)

Run this on the server and paste the result back to us:

```
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}'
```

This lists the "programs" (containers) running and which doors each one uses. We're
looking for the piece that handles phone traffic — its name usually contains
**`sbc`** or **`drachtio`**. From that we can tell you exactly what to switch on.
Paste us the whole output.

---

## Step 2 — open the phone door (the recommended way)

There are two ways. **Do the first one unless it's not possible.**

**Way A — open door number 8443 (standard, simplest):**

1. **Turn on the browser-phone door in Jambonz.** The phone-handling program needs
   its "web browser" setting enabled, using a security certificate for the name
   `sip.jambonz.upon-ai.com` (the free Let's Encrypt kind is fine). On a normal
   Jambonz install this door is port **8443**.
2. **Open port 8443 on the AWS firewall** for this server (in AWS this is the
   "security group," inbound rule, TCP 8443, from anywhere). **This step is the one
   people forget** — the door can be built inside the server but AWS still blocks the
   street outside it. That's exactly the "connection refused" we saw.

**Check it worked** — from any laptop (not the server):
```
curl -v https://sip.jambonz.upon-ai.com:8443
```
- Good = it talks about a "certificate / TLS handshake" (the door answered).
- Bad = "connection refused" or it hangs (door still closed).

Jambonz's own how-to, if useful:
https://blog.jambonz.org/supporting-webrtc-clients-with-jambonz

**Way B — reuse the front door (443):**
Only if you can't open 8443. The thing already answering on 443 can be told to also
forward browser-phone traffic to the phone program. It keeps everything on one door
but is fiddlier to set up correctly. Prefer Way A.

---

## Step 3 — don't forget the sound

Opening the phone door lets the call **connect**, but the actual **audio** travels a
different way (a range of "sound doors," technical name: RTP/media ports, handled by a
program called `rtpengine`). Those also need to be **open on the AWS firewall**, or
you'll get a call that connects but has **no sound**. Open them at the same time so you
only touch the firewall once. If you're unsure of the range, we'll confirm it from the
`docker ps` output in Step 1.

---

## What to send back to us

1. The **address of the phone door** — e.g. `sip.jambonz.upon-ai.com` on port `8443`.
2. That it's **open to the internet** and has a valid certificate for that name.
3. That the **sound ports are open** too.

That's everything. With #1 we change one line on the website and test the call the
same day.

---

## For reference — the website side is already done

You don't need to touch any of this; it's here so you know it's waiting on you, not
the other way around:

- A phone login for the browser already exists in Jambonz (`webdemo-grace`).
- Jambonz is already set so that a browser dialing **905** reaches Grace **with
  transfer working**. (Backup number if needed: `+1 201-228-0914`.)
- The website already knows how to use all of this — it just needs the phone door's
  address, which only exists once you open it.

# Jambonz web call (transfer-capable web demo)

## Why

UponAI/Retell **web calls cannot transfer** — it's a platform limit, not a config
bug. The website "Talk to Grace" demo currently uses `create-web-call`, so the
agent's `transfer_call` + Extension Directory never fire, even though they work
when you call the DID.

To make web callers transferable, the call must enter UponAI as a **phone call**.
We do that by sending browser audio through **Jambonz** (UponAI's own SIP layer),
into the same application the DID already uses. The call then behaves exactly like
a DID call — transfer and the Extension Directory work.

```
Talk to Grace button
   → browser WebRTC (jsSIP over WSS)
   → Jambonz (jambonz.upon-ai.com)
   → same app/route the DID uses
   → Grace (905) as an INBOUND PHONE call
   → transfer_call + Extension Directory work
```

## How it's wired

- Transport abstraction: [`src/lib/voice/transport.ts`](../src/lib/voice/transport.ts)
  - `retell` (default) — current browser web call. No transfer.
  - `jambonz` — jsSIP into Jambonz. Transfer works.
- Retell impl: [`src/lib/voice/retell-transport.ts`](../src/lib/voice/retell-transport.ts)
- Jambonz impl: [`src/lib/voice/jambonz-transport.ts`](../src/lib/voice/jambonz-transport.ts)
- Session endpoint (captures lead + returns SIP config): [`src/app/api/voice/jambonz-session/route.ts`](../src/app/api/voice/jambonz-session/route.ts)
- The modal picks the transport from `NEXT_PUBLIC_VOICE_TRANSPORT`.

Nothing about the Retell path changed — it stays the default until you flip the flag.

## Turning it on (once you have Jambonz creds)

1. In Jambonz, create a **restricted WebRTC client** (SIP user + password) that can
   only reach the demo app/target, and point it at the **same application the DID
   uses** (so it inherits transfer + the Extension Directory). Do **not** use the
   "Dial to SIP URI" custom-telephony method — that disables built-in transfer.

2. Set env vars (Vercel + `.env.local`):

   ```
   NEXT_PUBLIC_VOICE_TRANSPORT=jambonz
   JAMBONZ_WS_SERVER=wss://<sip-realm>:8443
   JAMBONZ_SIP_URI=sip:<client-username>@<sip-realm>
   JAMBONZ_SIP_PASSWORD=<client-password>
   JAMBONZ_DIAL_TARGET=<app/DID/extension the web client dials>
   # optional TURN for browser media traversal
   JAMBONZ_TURN_URL=turn:<host>:3478
   JAMBONZ_TURN_USERNAME=<user>
   JAMBONZ_TURN_CREDENTIAL=<secret>
   ```

3. Deploy. The form still captures the lead (same branded email); on connect the
   modal closes and the call continues on the page, transfer included.

## Security (do before production)

The SIP password is handed to the browser, so anyone can extract it. Mitigations,
in order of strength:

- **Minimum:** the env client must be a **restricted** Jambonz user — only able to
  dial the demo target, rate-limited. Blast radius if leaked = calling the demo agent.
- **Better:** mint a **short-lived per-session** SIP credential via the Jambonz
  provisioning API inside `jambonz-session/route.ts` (see `TODO(jambonz-creds)`),
  instead of returning a static one.

## Verifying transfer

Once live: start a web call, ask Grace for a person by name. It should route the
same way the DID does. If it doesn't, the web client is not landing in the same
Jambonz application as the DID — check the app/route, not the agent config.

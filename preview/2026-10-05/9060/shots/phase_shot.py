#!/usr/bin/env python3
"""Capture when the piece reaches a target phase.
Usage: phase_shot.py <port> <file-url-or-path> <out.png> <w> <h> <phase> [max_wait_s] [seed]
Navigates fresh, polls window.__probe.phase, screenshots on match."""
import json, sys, time, base64, urllib.request
import websocket

port = int(sys.argv[1]); path = sys.argv[2]; out = sys.argv[3]
w, h = int(sys.argv[4]), int(sys.argv[5])
target = sys.argv[6]  # "PHASE" or "PHASE,smin" e.g. "EXTRUDE,0.5"
max_wait = float(sys.argv[7]) if len(sys.argv) > 7 else 60
seed = sys.argv[8] if len(sys.argv) > 8 else None

url = path if path.startswith(("http", "file")) else "file://" + path
if seed and "?" not in url:
    url += "?seed=" + seed

targets = json.load(urllib.request.urlopen(f"http://localhost:{port}/json/list", timeout=5))
pages = [t for t in targets if t.get("type") == "page"]
ws = websocket.create_connection(pages[0]["webSocketDebuggerUrl"], timeout=120)
mid = [0]
def send(method, params=None):
    mid[0] += 1
    ws.send(json.dumps({"id": mid[0], "method": method, "params": params or {}}))
    while True:
        msg = json.loads(ws.recv())
        if msg.get("id") == mid[0]:
            return msg.get("result", {})

send("Page.enable"); send("Runtime.enable"); send("Log.enable")
send("Emulation.setDeviceMetricsOverride",
     {"width": w, "height": h, "deviceScaleFactor": 1, "mobile": False})
send("Page.navigate", {"url": url})

logs = []
t0 = time.time(); hit = False; last_phase = "?"
while time.time() - t0 < max_wait:
    ws.settimeout(0.5)
    try:
        msg = json.loads(ws.recv())
        m = msg.get("method")
        if m == "Runtime.exceptionThrown":
            logs.append("EXC: " + json.dumps(msg["params"].get("exceptionDetails", {}))[:300])
        elif m == "Runtime.consoleAPICalled" and msg["params"].get("type") == "error":
            logs.append("CERR: " + json.dumps(msg["params"].get("args", []))[:300])
    except Exception:
        pass
    ws.settimeout(30)
    r = send("Runtime.evaluate", {"expression": "window.__probe ? (window.__probe.phase + ',' + window.__probe.s.toFixed(3)) : 'n/a'"})
    ph = r.get("result", {}).get("value", "?")
    if ph != last_phase:
        print("phase:", ph, "t=%.1fs" % (time.time() - t0), flush=True)
        last_phase = ph
    parts = target.split(",")
    ok = ph.split(",")[0] == parts[0]
    if ok and len(parts) > 1:
        ok = float(ph.split(",")[1]) >= float(parts[1])
    if ok:
        hit = True
        break
if not hit:
    print("TIMEOUT waiting for phase", target)
res = send("Page.captureScreenshot", {"format": "png"})
open(out, "wb").write(base64.b64decode(res["data"]))
print("saved", out, "hit=" , hit)
for l in logs[:10]:
    print("LOG:", l)
ws.close()

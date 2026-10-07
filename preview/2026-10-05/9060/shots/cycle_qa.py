#!/usr/bin/env python3
"""Full-cycle + click-reseed QA for 9060.
Navigates, samples __probe every 0.5s for ~62s (two full cycles), fires a
synthetic pointerdown mid-run to test reseed, reports phase transitions and
any console/page errors. Exit 0 = clean."""
import json, sys, time, urllib.request
import websocket

port = int(sys.argv[1])
url = "file:///home/hatch/workspace/generative-doodles/9060/index.html?seed=906007"

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
     {"width": 1280, "height": 800, "deviceScaleFactor": 1, "mobile": False})
send("Page.navigate", {"url": url})
time.sleep(1.5)

problems = []
transitions = []
last_phase = None
clicked = False
s_before_click = None
t0 = time.time()
ws.settimeout(0.4)
while time.time() - t0 < 62:
    try:
        msg = json.loads(ws.recv())
        m = msg.get("method")
        if m == "Runtime.exceptionThrown":
            problems.append("EXC: " + json.dumps(msg["params"].get("exceptionDetails", {}))[:200])
        elif m == "Runtime.consoleAPICalled" and msg["params"].get("type") == "error":
            problems.append("CERR: " + json.dumps(msg["params"].get("args", []))[:200])
    except Exception:
        pass
    ws.settimeout(30)
    r = send("Runtime.evaluate",
             {"expression": "window.__probe ? window.__probe.phase + ',' + window.__probe.s.toFixed(3) : 'n/a'"})
    ws.settimeout(0.4)
    val = r.get("result", {}).get("value", "?")
    ph = val.split(",")[0]
    if ph != last_phase:
        transitions.append((round(time.time() - t0, 1), val))
        last_phase = ph
    el = time.time() - t0
    if not clicked and el > 20:
        s_before_click = val
        send("Runtime.evaluate", {"expression":
            "document.getElementById('stage').dispatchEvent(new PointerEvent('pointerdown'))"})
        clicked = True
        print("CLICKED at s =", s_before_click, flush=True)
    time.sleep(0.45)

print("transitions:")
for t, v in transitions:
    print("  t=%ss %s" % (t, v))
print("problems:", problems if problems else "none")
ws.close()
sys.exit(1 if problems else 0)

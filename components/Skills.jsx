import React, { useEffect, useRef, useState } from 'react';

// Icons (Font Awesome 6)
const TECHS = [
  { key: 'react', name: 'React', icon: 'fab fa-react' },
  { key: 'node', name: 'Node.js', icon: 'fab fa-node-js' },
  { key: 'python', name: 'Python', icon: 'fab fa-python' },
  { key: 'docker', name: 'Docker', icon: 'fab fa-docker' },
  { key: 'postgres', name: 'PostgreSQL', icon: 'fas fa-database' },
  { key: 'git', name: 'Git', icon: 'fab fa-git-alt' },
  { key: 'aws', name: 'AWS', icon: 'fab fa-aws' },
  { key: 'linux', name: 'Linux', icon: 'fab fa-linux' },
  { key: 'js', name: 'JavaScript', icon: 'fab fa-js' },
  { key: 'html', name: 'HTML5', icon: 'fab fa-html5' },
  { key: 'css', name: 'CSS3', icon: 'fab fa-css3' },
];

const rand = (min, max) => Math.random() * (max - min) + min;

const Skills = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const targetsLayerRef = useRef(null);
  const rafRef = useRef(0);

  // Game state
  const [isRunning, setIsRunning] = useState(false);
  const runningRef = useRef(false);

  const [startAtMs, setStartAtMs] = useState(0);
  const [hudSeconds, setHudSeconds] = useState(0); // active time only
  const [elapsedFinal, setElapsedFinal] = useState(0);
  const [bestTime, setBestTime] = useState(null);
  const [hits, setHits] = useState({});

  // runtime objects (no state)
  const targetsRef = useRef([]); // {el,x,y,r, vx,vy, tech, hit}
  const effectsRef = useRef([]); // {x,y,t}

  // Active-time tracking (exclude idle)
  const lastTsRef = useRef(0);
  const activeMsRef = useRef(0);
  const userActiveRef = useRef(false);
  const idleTimerRef = useRef(null);

  const markActivity = () => {
    userActiveRef.current = true;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => { userActiveRef.current = false; }, 1500);
  };

  useEffect(() => { runningRef.current = isRunning; }, [isRunning]);

  const clearTargets = () => {
    targetsRef.current.forEach(t => t.el.remove());
    targetsRef.current = [];
    effectsRef.current = [];
    setHits({});
  };

  const resetArena = () => {
    clearTargets();

    const container = containerRef.current;
    const layer = targetsLayerRef.current;
    if (!container || !layer) return;
    const rect = container.getBoundingClientRect();
    const width = rect.width; const height = Math.max(520, rect.height);

    const placed = [];
    const minMargin = 12;
    const tryPlace = (r) => {
      for (let tries = 0; tries < 250; tries++) {
        const x = rand(r + minMargin, width - r - minMargin);
        const y = rand(r + minMargin, height - r - minMargin);
        let ok = true;
        for (const p of placed) {
          const dx = x - p.x; const dy = y - p.y;
          if (dx * dx + dy * dy < (r + p.r + minMargin) * (r + p.r + minMargin)) { ok = false; break; }
        }
        if (ok) return { x, y };
      }
      return null;
    };

    TECHS.forEach((tech) => {
      const r = rand(28, 40);
      const pos = tryPlace(r) || { x: rand(r + minMargin, width - r - minMargin), y: rand(r + minMargin, height - r - minMargin) };
      placed.push({ ...pos, r });

      const el = document.createElement('div');
      el.className = 'absolute rounded-full border text-[#93c5fd] border-[#93c5fd] bg-black/40 flex items-center justify-center shadow-[0_0_30px_rgba(147,197,253,0.15)] transition-transform hover:scale-105';
      el.style.width = `${r * 2}px`; el.style.height = `${r * 2}px`;
      el.style.transform = `translate(${pos.x - r}px, ${pos.y - r}px)`;
      el.innerHTML = `<i class="${tech.icon} text-xl"></i>`;
      layer.appendChild(el);

      const speed = rand(0.12, 0.28);
      const angle = rand(0, Math.PI * 2);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      const obj = { el, x: pos.x, y: pos.y, r, vx, vy, tech, hit: false };
      targetsRef.current.push(obj);

      el.addEventListener('click', (e) => {
        if (!runningRef.current || obj.hit) return;
        e.stopPropagation();
        markActivity();
        obj.hit = true;
        el.classList.add('bg-[#93c5fd]/10', 'saturate-0', 'opacity-80');
        effectsRef.current.push({ x: obj.x, y: obj.y, t: 0 });
        setHits((m) => ({ ...m, [tech.key]: (m[tech.key] || 0) + 1 }));
        const allHit = targetsRef.current.every(t => t.hit);
        if (allHit) {
          const final = activeMsRef.current / 1000;
          setIsRunning(false); runningRef.current = false;
          setElapsedFinal(final);
          setHudSeconds(final);
          setBestTime((prev) => (prev == null || final < prev ? final : prev));
        }
      });
    });
  };

  // Animation/HUD loop (drift + effects + timer)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext('2d');

    let width = 0, height = 0;
    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width; height = Math.max(520, rect.height);
      canvas.width = Math.floor(width * window.devicePixelRatio);
      canvas.height = Math.floor(height * window.devicePixelRatio);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const step = () => {
      rafRef.current = requestAnimationFrame(step);
      ctx.clearRect(0, 0, width, height);

      // Drift
      if (runningRef.current) {
        const nowTs = performance.now();
        let dt = nowTs - lastTsRef.current;
        if (dt < 0 || dt > 1000) dt = 0; // clamp big gaps from tab sleep
        lastTsRef.current = nowTs;

        for (const t of targetsRef.current) {
          if (t.hit) {
            // Keep hit targets in their final position
            t.el.style.transform = `translate(${t.x - t.r}px, ${t.y - t.r}px)`;
            continue;
          }
          t.x += t.vx; t.y += t.vy;
          if (t.x < t.r || t.x > width - t.r) t.vx *= -1;
          if (t.y < t.r || t.y > height - t.r) t.vy *= -1;
          t.el.style.transform = `translate(${t.x - t.r}px, ${t.y - t.r}px)`;
        }
        // Count only active interaction time
        if (userActiveRef.current) {
          activeMsRef.current += dt;
        }
        setHudSeconds(activeMsRef.current / 1000);
      }

      // Effects
      effectsRef.current = effectsRef.current.filter((e) => {
        const radius = e.t * 40 + 10;
        ctx.strokeStyle = `rgba(147,197,253,${1 - e.t})`;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(e.x, e.y, radius, 0, Math.PI * 2); ctx.stroke();
        e.t += 0.04; return e.t < 1;
      });

      // HUD
      ctx.fillStyle = 'rgba(10,15,28,0.55)';
      ctx.fillRect(12, 12, 260, 110);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.strokeRect(12, 12, 260, 110);
      ctx.fillStyle = '#93c5fd'; ctx.font = '700 16px Inter, sans-serif'; ctx.fillText('Tech Stack Range', 20, 34);
      ctx.fillStyle = '#e5e7eb'; ctx.font = '600 14px Inter, sans-serif';
      const display = runningRef.current ? hudSeconds : elapsedFinal;
      ctx.fillText(`Time: ${display ? display.toFixed(2) : '0.00'}s`, 20, 56);
      const hitCount = Object.values(hits).reduce((a, b) => a + b, 0);
      ctx.fillText(`Hit: ${hitCount}/${TECHS.length}`, 20, 78);
      if (bestTime != null) { ctx.fillStyle = '#a5b4fc'; ctx.fillText(`Best: ${bestTime.toFixed(2)}s`, 20, 100); }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); };
  }, [startAtMs, hudSeconds, elapsedFinal, hits, bestTime]);

  const handleStart = () => {
    resetArena();
    const now = performance.now();
    setStartAtMs(now);
    setElapsedFinal(0);
    setHudSeconds(0);
    activeMsRef.current = 0;
    lastTsRef.current = performance.now();
    userActiveRef.current = false;
    setIsRunning(true); runningRef.current = true;
  };

  const handleStop = () => {
    setIsRunning(false); runningRef.current = false;
    setElapsedFinal(0);
    setHudSeconds(0);
    activeMsRef.current = 0;
    userActiveRef.current = false;
    if (idleTimerRef.current) { clearTimeout(idleTimerRef.current); idleTimerRef.current = null; }
    clearTargets();
  };

  const onArenaClick = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    if (!runningRef.current) {
      // click-to-start
      handleStart();
      return;
    }
    markActivity();
    effectsRef.current.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, t: 0 });
  };

  const handleMouseMove = () => { if (runningRef.current) markActivity(); };
  const handleMouseDown = () => { if (runningRef.current) markActivity(); };

  // Pause activity when tab not visible
  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState !== 'visible') {
        userActiveRef.current = false;
      }
      lastTsRef.current = performance.now();
    };
    if (typeof window !== 'undefined') {
      document.addEventListener('visibilitychange', onVis);
    }
    return () => { document.removeEventListener('visibilitychange', onVis); };
  }, []);

  return (
    <section id="skills" className="py-20 bg-[#0b1220]">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
          <div>
            <h2 className="text-5xl font-bold mb-2 gradient-text">Tech Stack Range</h2>
            <p className="text-gray-300">Click the icons as fast as you can. Click in the range to start. Mouse only.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleStart} className="px-4 py-2 rounded-md bg-[#0ea5e9] text-white font-semibold hover:bg-[#0284c7]">{isRunning ? 'Restart' : 'Start / Restart'}</button>
            <button onClick={handleStop} className="px-4 py-2 rounded-md bg-white/10 text-white font-semibold hover:bg-white/20">Stop</button>
          </div>
        </div>
        <div ref={containerRef} className="relative rounded-2xl overflow-hidden glass cursor-crosshair" style={{ minHeight: '70vh' }} onClick={onArenaClick} onMouseMove={handleMouseMove} onMouseDown={handleMouseDown}>
          {/* Canvas HUD & effects */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
          {/* Targets layer */}
          <div ref={targetsLayerRef} className="absolute inset-0" />
          {!isRunning && (
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="bg-black/40 border border-white/10 rounded-xl px-6 py-4">
                <div className="text-lg text-white/80 mb-2">Click anywhere to start the range</div>
                {bestTime != null && <div className="text-white/60">Best time: {bestTime.toFixed(2)}s</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Skills; 
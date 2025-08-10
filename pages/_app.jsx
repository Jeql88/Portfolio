import '../styles/globals.css';
import { useEffect } from 'react';

function PixelTrail() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let width = 0, height = 0, particles = [];
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = Math.floor(width * window.devicePixelRatio);
      canvas.height = Math.floor(height * window.devicePixelRatio);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let lastPos = { x: width * 0.5, y: height * 0.5 };

    const spawn = (x, y, boost = false) => {
      const count = boost ? 10 : 4; // bigger trail
      for (let i = 0; i < count; i++) {
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * (boost ? 4 : 2),
          vy: (Math.random() - 0.5) * (boost ? 4 : 2),
          life: 1,
          size: (boost ? 12 : 8) + Math.floor(Math.random() * 6),
          color: `hsla(${200 + Math.random() * 40}, 90%, ${boost ? 65 : 75}%, 1)`,
        });
      }
      if (particles.length > 360) particles.splice(0, particles.length - 360);
    };

    let last = 0;
    let idleT = 0;
    const loop = (t) => {
      requestAnimationFrame(loop);
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      ctx.clearRect(0, 0, width, height);

      // idle emission at last mouse position
      idleT += dt;
      if (idleT > 0.08) {
        idleT = 0;
        spawn(lastPos.x + (Math.random() - 0.5) * 6, lastPos.y + (Math.random() - 0.5) * 6, false);
      }

      for (let p of particles) {
        p.x += p.vx * (60 * dt);
        p.y += p.vy * (60 * dt);
        p.life -= 0.055 * (60 * dt); // faster fade than before
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      }
      particles = particles.filter(p => p.life > 0);
    };

    const getPos = (e) => {
      if ('touches' in e && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      return { x: e.clientX, y: e.clientY };
    };

    const onMove = (e) => {
      const { x, y } = getPos(e);
      lastPos = { x, y };
      const target = e.target;
      const boost = target && (target.closest('a, button, [role="button"], .card-hover'));
      spawn(x, y, Boolean(boost));
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      canvas.remove();
    };
  }, []);
  return null;
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PixelTrail />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
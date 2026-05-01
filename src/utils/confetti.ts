// Lightweight, zero-dependency confetti burst
export function fireConfetti(originX: number, originY: number) {
  const colors = [
    "hsl(14, 100%, 55%)",
    "hsl(14, 100%, 75%)",
    "hsl(0, 0%, 98%)",
    "hsl(45, 100%, 65%)",
    "hsl(14, 100%, 40%)",
  ];

  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed; inset: 0; pointer-events: none; z-index: 99999; overflow: hidden;
  `;
  document.body.appendChild(container);

  const count = 52;
  const particles: HTMLDivElement[] = [];

  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const isRect = Math.random() > 0.5;
    const size = 4 + Math.random() * 8;
    el.style.cssText = `
      position: absolute;
      left: ${originX}px;
      top: ${originY}px;
      width: ${size}px;
      height: ${isRect ? size * 0.4 : size}px;
      background: ${color};
      border-radius: ${isRect ? "1px" : "50%"};
      pointer-events: none;
      will-change: transform, opacity;
    `;
    container.appendChild(el);
    particles.push(el);
  }

  const start = performance.now();
  const duration = 1100;

  const vels = particles.map(() => {
    const angle = (Math.random() * Math.PI * 2);
    const speed = 6 + Math.random() * 12;
    return {
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (8 + Math.random() * 8),
      rot: (Math.random() - 0.5) * 720,
      gravity: 0.3 + Math.random() * 0.3,
    };
  });

  let curVy = vels.map((v) => v.vy);

  const tick = (now: number) => {
    const elapsed = now - start;
    const t = elapsed / duration;
    if (t >= 1) {
      container.remove();
      return;
    }

    particles.forEach((el, i) => {
      curVy[i] += vels[i].gravity;
      vels[i].vx *= 0.985;
      const x = vels[i].vx * elapsed * 0.05;
      const y = curVy[i] * elapsed * 0.035;
      const rot = vels[i].rot * t;
      const alpha = t < 0.7 ? 1 : 1 - (t - 0.7) / 0.3;
      el.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
      el.style.opacity = String(alpha);
    });

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

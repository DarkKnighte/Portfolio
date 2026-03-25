import { useEffect, useRef } from 'react';
import './Banner.scss';

const Banner = ({
  title = 'DarkKnighte',
  subtitle = 'Développeur web',
  tags = 'React · TypeScript · Node.js',
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animFrame;
    let frame = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const infinityPoint = (t, tilt) => {
      const scaleX = Math.min(W(), H()) * 1; // ← largeur du symbole
      const scaleY = Math.min(W(), H()) * 0.80; // ← hauteur du symbole
      const denom = 1 + Math.sin(t) * Math.sin(t);
      const x = (scaleX * Math.cos(t)) / denom;
      const y = (scaleY * Math.sin(t) * Math.cos(t)) / denom;
      return { x, y: y * Math.cos(tilt), z: y * Math.sin(tilt) };
    };

    const draw = () => {
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      const tilt = frame * 0.018; // ← vitesse de rotation (plus grand = plus rapide)
      const N = 28;               // ← nombre de points
      const cx = w / 2, cy = h / 2;
      const range = Math.min(W(), H()) * 0.28;

      const pts = [];
      for (let i = 0; i < N; i++) {
        const t = (i / N) * Math.PI * 2;
        pts.push(infinityPoint(t, tilt));
      }

      pts.sort((a, b) => a.z - b.z);

      for (const p of pts) {
        const depth = (p.z + range) / (range * 2);
        const r = 4 + depth * 7; // ← taille min (4) et max (4+7=11) des points
        const alpha = 0.18 + depth * 0.82; // ← opacité min et max

        ctx.beginPath();
        ctx.arc(cx + p.x, cy + p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120, 55, 200, ${alpha})`; // ← couleur des points
        ctx.fill();
      }

      frame++;
      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="banner">
      <canvas ref={canvasRef} className="banner__canvas" />
      <div className="banner__content">
        <p className="banner__subtitle">{subtitle}</p>
        <h1 className="banner__title">{title}</h1>
        <p className="banner__tags">{tags}</p>
      </div>
    </div>
  );
};

export default Banner;

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export function NotFound() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 50;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvasRef.current!.width;
        this.y = Math.random() * canvasRef.current!.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvasRef.current!.width) this.x = 0;
        if (this.x < 0) this.x = canvasRef.current!.width;
        if (this.y > canvasRef.current!.height) this.y = 0;
        if (this.y < 0) this.y = canvasRef.current!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(88, 166, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let frame = 0;
    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      frame++;
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Add glitch effect every 100 frames
      if (frame % 100 === 0) {
        ctx.fillStyle = `rgba(255, 81, 73, 0.1)`;
        ctx.fillRect(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 100,
          5
        );
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#c9d1d9] relative overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10 h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-lg mx-auto">
          <div className="flex items-center justify-center space-x-4 text-[#f85149] mb-8">
            <AlertTriangle className="h-12 w-12 animate-pulse" />
            <h1 className="text-8xl font-bold glitch-text">404</h1>
          </div>
          
          <h2 className="text-2xl font-bold mb-4 animate-fade-in">
            Lost in the Void
          </h2>
          
          <p className="text-[#8b949e] mb-8 animate-fade-in delay-200">
            The page you're looking for has been encrypted, deleted, or never existed in the first place.
          </p>

          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-[#238636] text-white px-6 py-3 rounded-lg hover:bg-[#2ea043] transition-all hover:scale-105 animate-fade-in delay-400"
          >
            <Home className="h-5 w-5" />
            <span>Return to Safety</span>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes glitch {
          0% {
            transform: translate(0);
            text-shadow: -2px 2px #58a6ff;
          }
          25% {
            transform: translate(-2px, 2px);
            text-shadow: 2px -2px #f85149;
          }
          50% {
            transform: translate(2px, -2px);
            text-shadow: -2px -2px #58a6ff;
          }
          75% {
            transform: translate(-2px, 2px);
            text-shadow: 2px 2px #f85149;
          }
          100% {
            transform: translate(0);
            text-shadow: -2px 2px #58a6ff;
          }
        }

        .glitch-text {
          animation: glitch 1s infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
}
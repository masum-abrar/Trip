'use client';
import { useEffect, useRef } from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram ,FaYoutube } from "react-icons/fa";

function Footer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];
    const colors = ["#ffffff", "#bbbbbb", "#999999"];
    const numParticles = 85;
    const maxRadius = 3;

    // Resize canvas to fit the footer
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Handle window resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle class
    class Particle {
      constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      const radius = Math.random() * maxRadius;
      const x = Math.random() * (canvas.width - radius * 2) + radius;
      const y = Math.random() * (canvas.height - radius * 2) + radius;
      const dx = (Math.random() - 0.5) * 2;
      const dy = (Math.random() - 0.5) * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, dx, dy, radius, color));
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => particle.update());
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <footer className="relative bg-slate-950 text-white">
    {/* Particle Canvas */}
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0" />

    {/* Main Footer Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left: Parjatak Description */}
      <div className="text-left">
        <h2 className="text-3xl font-bold  mb-4">Parjatak</h2>
        <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
        Bangladesh’s First Social Network for Travel Enthusiasts - Empowering Local Tourism Across  the Country.
        </p>
      </div>

      {/* Center: Social Media Icons */}
      <div className="flex flex-col  justify-center space-y-6">
        <h4 className="text-lg font-semibold">Follow Us</h4>
        <div className="flex space-x-5 text-2xl">
          <a href="https://facebook.com/officialPARJATAK" target="_blank" className="hover:text-[#1877F2] transition"><FaFacebook /></a>
          <a href="#" className="hover:text-[#1DA1F2] transition"><FaTwitter /></a>
          <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
          <a href="#" className="hover:text-[#0A66C2] transition"><FaLinkedin /></a>
          <a href="#" className="hover:text-[#FF0000] transition"><FaYoutube /></a>
        </div>
      </div>

      {/* Right: Support Links */}
      {/* <div className="text-right">
        <h4 className="text-lg font-semibold mb-4">Support</h4>
        <ul className="space-y-3 text-sm text-gray-400">
          <li><a href="#" className="hover:text-teal-400 transition">Contact Us</a></li>
          <li><a href="#" className="hover:text-teal-400 transition">FAQs</a></li>
          <li><a href="#" className="hover:text-teal-400 transition">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-teal-400 transition">Terms & Conditions</a></li>
        </ul>
      </div> */}
    </div>

    {/* Footer Bottom */}
    <div className="relative z-10 border-t border-gray-800 py-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Parjatak. Promote your local tourism".
    </div>
  </footer>
  );
}

export default Footer;

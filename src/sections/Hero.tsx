import { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { SiGithub, SiLeetcode } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { FiArrowRight } from 'react-icons/fi';
import AstronautScene from '../components/AstronautScene';
import { MagneticButton } from '../components/MagneticButton/MagneticButton';
import './Hero.css';

const phrases = ['Frontend Developer', 'UI Engineer', 'DSA Enthusiast', 'IoT Builder', 'Full Stack Developer'];

function useTyping(phrases: string[]) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (text.length < phrase.length) {
        timeout = setTimeout(() => setText(phrase.slice(0, text.length + 1)), 65);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2000);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(phrase.slice(0, text.length - 1)), 35);
      } else {
        setDeleting(false);
        setPhraseIdx((i) => (i + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, phraseIdx, phrases]);

  return text;
}

export default function Hero() {
  const typed = useTyping(phrases);

  return (
    <section className="hero" id="hero">
      <div className="hero-corner-deco top-left" />
      <div className="hero-corner-deco top-right" />
      <div className="hero-corner-deco bottom-right" />
      <div className="hero-grid" />
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
      <div className="hero-orb orb-3" />
      <div className="hero-scanline" />

      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-badge fade-up" style={{ '--d': '0ms' } as React.CSSProperties}>
            <span className="badge-dot" />
            <span>Open for opportunities</span>
          </div>

          <h1 className="hero-heading fade-up" style={{ '--d': '120ms' } as React.CSSProperties}>
            <span className="line-one">// hello, world</span>
            <span className="line-two">
              Raj <em>Bhokare</em>
            </span>
          </h1>

          <div className="hero-role fade-up" style={{ '--d': '260ms' } as React.CSSProperties}>
            <span className="role-prefix">~$</span>
            <span className="role-typed">{typed}</span>
            <span className="role-cursor" aria-hidden="true" />
          </div>

          <p className="hero-bio fade-up" style={{ '--d': '380ms' } as React.CSSProperties}>
            Third-year IT student at Dr. D. Y. Patil Institute of Technology, Pune. Crafting pixel-perfect,
            cinematic web interfaces, solving algorithmic challenges, and building hardware & software tools.
          </p>

          <div className="hero-actions fade-up" style={{ '--d': '500ms' } as React.CSSProperties}>
            <MagneticButton>
              <a href="#projects" className="btn-primary">
                View Projects <FiArrowRight style={{ marginLeft: 6, display: 'inline' }} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#contact" className="btn-secondary">
                Get in Touch
              </a>
            </MagneticButton>
          </div>

          <div className="hero-socials fade-up" style={{ '--d': '620ms' } as React.CSSProperties}>
            <MagneticButton>
              <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="icon-link">
                <SiGithub size={18} />
                GitHub
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://linkedin.com/in/rajbhokare1"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
              >
                <FaLinkedin size={18} />
                LinkedIn
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://leetcode.com/u/RajBhokare/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
              >
                <SiLeetcode size={18} />
                LeetCode
              </a>
            </MagneticButton>
          </div>

          <div className="hero-stats fade-up" style={{ '--d': '740ms' } as React.CSSProperties}>
            <div className="hero-stat">
              <span className="stat-num">4+</span>
              <span className="stat-label">Showcase Projects</span>
            </div>
            <div className="hero-stat">
              <span className="stat-num">3rd</span>
              <span className="stat-label">Year B.Tech IT</span>
            </div>
            <div className="hero-stat">
              <span className="stat-num">Full</span>
              <span className="stat-label">Stack & IoT</span>
            </div>
          </div>
        </div>

        <div className="hero-right fade-up" style={{ '--d': '300ms' } as React.CSSProperties}>
          <div className="canvas-wrapper">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
              <Suspense fallback={null}>
                <AstronautScene />
              </Suspense>
            </Canvas>
            <div className="canvas-glow" />
          </div>
          <div className="hero-caption">
            <span className="caption-dot" />
            <span>Interactive 3D · Tilt with Cursor</span>
          </div>
        </div>
      </div>

      <div
        className="hero-scroll-indicator fade-up"
        style={{ '--d': '900ms' } as React.CSSProperties}
        aria-hidden="true"
      >
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}

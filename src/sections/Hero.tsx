import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { FaLinkedin, FaGithub } from 'react-icons/fa6';
import { FiArrowRight, FiFileText } from 'react-icons/fi';
import AstronautScene from '../components/AstronautScene';
import { MagneticButton } from '../components/MagneticButton/MagneticButton';
import './Hero.css';

class CanvasErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.warn('3D Canvas failed to load or WebGL is disabled:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-3)', fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>
          <span>[ 3D View Unavailable ]</span>
        </div>
      );
    }
    return this.props.children;
  }
}

const roles = ['Full-Stack Developer', 'Software Engineer', 'React & Node.js Developer', 'IoT Systems Builder'];

function useTyping(phrases: string[]) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (text.length < phrase.length) {
        timeout = setTimeout(() => setText(phrase.slice(0, text.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(phrase.slice(0, text.length - 1)), 30);
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
  const typed = useTyping(roles);

  return (
    <section className="hero" id="hero">
      <div className="hero-grid" />
      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />

      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-badge fade-up" style={{ '--d': '0ms' } as React.CSSProperties}>
            <span className="badge-dot" />
            <span>Available for Full-Stack & Engineering Roles</span>
          </div>

          <h1 className="hero-name fade-up" style={{ '--d': '100ms' } as React.CSSProperties}>
            Raj Bhokare
          </h1>

          <div className="hero-role-title fade-up" style={{ '--d': '200ms' } as React.CSSProperties}>
            <span className="role-typed">{typed}</span>
            <span className="role-cursor" aria-hidden="true" />
          </div>

          <p className="hero-bio fade-up" style={{ '--d': '300ms' } as React.CSSProperties}>
            IT Engineering student at Dr. D. Y. Patil Institute of Technology, Pune. Specializing in responsive React UIs, Node.js & Express REST APIs, cloud workflows (AWS / GCP), and real-time IoT hardware telemetry.
          </p>

          <div className="hero-actions fade-up" style={{ '--d': '400ms' } as React.CSSProperties}>
            <MagneticButton>
              <a href="#projects" className="btn-primary">
                View Featured Projects <FiArrowRight style={{ marginLeft: 4 }} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="#contact" className="btn-secondary">
                Get in Touch
              </a>
            </MagneticButton>
          </div>

          <div className="hero-socials fade-up" style={{ '--d': '500ms' } as React.CSSProperties}>
            <MagneticButton>
              <a
                href="https://github.com/RajBhokare"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
              >
                <FaGithub size={15} />
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
                <FaLinkedin size={15} />
                LinkedIn
              </a>
            </MagneticButton>
          </div>

          <div className="hero-stats fade-up" style={{ '--d': '600ms' } as React.CSSProperties}>
            <div className="hero-stat">
              <span className="stat-num">4</span>
              <span className="stat-label">Production Projects</span>
            </div>
            <div className="hero-stat">
              <span className="stat-num">2026</span>
              <span className="stat-label">B.Tech Candidate</span>
            </div>
            <div className="hero-stat">
              <span className="stat-num">React & Node</span>
              <span className="stat-label">Core Stack</span>
            </div>
          </div>
        </div>

        <div className="hero-right fade-up" style={{ '--d': '250ms' } as React.CSSProperties}>
          <div className="canvas-card">
            <div className="canvas-card-header">
              <span className="canvas-dot green" />
              <span className="canvas-dot yellow" />
              <span className="canvas-dot red" />
              <span className="canvas-title">Interactive 3D Viewport</span>
            </div>
            <div className="canvas-wrapper">
              <CanvasErrorBoundary>
                <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                  <Suspense fallback={null}>
                    <AstronautScene />
                  </Suspense>
                </Canvas>
              </CanvasErrorBoundary>
            </div>
            <div className="canvas-footer">
              <span className="caption-dot" />
              <span>Three.js / React Three Fiber Renderer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

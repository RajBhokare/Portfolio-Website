import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { FaLinkedin, FaGithub } from 'react-icons/fa6';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
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

export default function Hero() {
  const technologies = ['React', 'JavaScript', 'Node.js', 'Express', 'MongoDB'];

  return (
    <section className="hero" id="hero">
      <div className="hero-grid" />

      <div className="hero-inner">
        <div className="hero-left">
          {/* 1. Eyebrow */}
          <div className="hero-eyebrow-tag fade-up" style={{ '--d': '0ms' } as React.CSSProperties}>
            <span className="badge-dot" />
            <span>MERN STACK DEVELOPER</span>
          </div>

          {/* 2. Main Heading */}
          <h1 className="hero-name fade-up" style={{ '--d': '80ms' } as React.CSSProperties}>
            Raj Bhokare
          </h1>

          {/* 3. Value Proposition */}
          <h2 className="hero-value-prop fade-up" style={{ '--d': '160ms' } as React.CSSProperties}>
            Building modern, responsive web applications with React, Node.js, Express and MongoDB.
          </h2>

          {/* 4. Supporting Paragraph */}
          <p className="hero-bio fade-up" style={{ '--d': '240ms' } as React.CSSProperties}>
            Passionate about developing practical, high-performance web solutions with intuitive user experiences, clean architecture, and reliable APIs.
          </p>

          {/* 5 & 6. Primary and Secondary CTAs */}
          <div className="hero-actions fade-up" style={{ '--d': '320ms' } as React.CSSProperties}>
            <MagneticButton>
              <a href="#projects" className="btn-primary">
                View My Projects <FiArrowRight style={{ marginLeft: 6 }} />
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#contact"
                className="btn-secondary"
              >
                <FiDownload style={{ marginRight: 6 }} /> Download Resume
              </a>
            </MagneticButton>
          </div>

          {/* 7. Subtle GitHub and LinkedIn links/icons */}
          <div className="hero-socials fade-up" style={{ '--d': '400ms' } as React.CSSProperties}>
            <MagneticButton>
              <a
                href="https://github.com/RajBhokare"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
                aria-label="GitHub Profile"
              >
                <FaGithub size={16} />
                <span>GitHub</span>
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://linkedin.com/in/rajbhokare1"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin size={16} />
                <span>LinkedIn</span>
              </a>
            </MagneticButton>
          </div>

          {/* 8. Small technology row below the hero */}
          <div className="hero-tech-row fade-up" style={{ '--d': '480ms' } as React.CSSProperties}>
            <div className="tech-row-items">
              {technologies.map((tech, i) => (
                <React.Fragment key={tech}>
                  <span className="tech-pill">{tech}</span>
                  {i < technologies.length - 1 && <span className="tech-dot">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-right fade-up" style={{ '--d': '200ms' } as React.CSSProperties}>
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

import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa6';
import { FiArrowRight, FiDownload, FiMapPin, FiZap, FiCode } from 'react-icons/fi';
import { MagneticButton } from '../components/MagneticButton/MagneticButton';
import './Hero.css';

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
                href="#resume-cta"
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
          <div className="hero-profile-wrapper">
            <div className="profile-ambient-glow" />
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-card-dots">
                  <span className="profile-dot red" />
                  <span className="profile-dot yellow" />
                  <span className="profile-dot green" />
                </div>
                <span className="profile-card-title">raj_bhokare.dev</span>
                <div className="profile-status-pill">
                  <span className="status-live-dot" />
                  <span>Available</span>
                </div>
              </div>

              <div className="profile-img-frame">
                <img
                  src="/raj.png"
                  alt="Raj Bhokare - MERN Stack Developer"
                  className="profile-photo"
                  loading="eager"
                />
                <div className="profile-img-overlay" />

                {/* Floating modern glass badges */}
                <div className="floating-badge badge-top-right">
                  <div className="badge-icon-wrap">
                    <FiZap className="badge-icon" />
                  </div>
                  <div className="badge-text-group">
                    <span className="badge-title">Full-Stack</span>
                    <span className="badge-sub">MERN Specialist</span>
                  </div>
                </div>

                <div className="floating-badge badge-bottom-left">
                  <div className="badge-icon-wrap code-wrap">
                    <FiCode className="badge-icon" />
                  </div>
                  <div className="badge-text-group">
                    <span className="badge-title">Clean Code</span>
                    <span className="badge-sub">High Performance</span>
                  </div>
                </div>
              </div>

              <div className="profile-card-footer">
                <div className="footer-status">
                  <span className="caption-dot" />
                  <span>Solapur / Pune, India</span>
                </div>
                <div className="footer-location">
                  <FiMapPin size={12} style={{ marginRight: 4, color: 'var(--cyan)' }} />
                  <span>Open to Relocate / Remote</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

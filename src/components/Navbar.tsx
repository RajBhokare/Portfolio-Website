import { useEffect, useRef, useState } from 'react';
import { FiSun, FiMoon, FiMenu, FiX, FiCode, FiDownload } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { MagneticButton } from './MagneticButton/MagneticButton';

interface NavItem {
  href: string;
  label: string;
}

const navLinks: NavItem[] = [
  { href: '#hero',       label: 'Home' },
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#projects',   label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#about',      label: 'Education' },
  { href: '#contact',    label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('hero');
  const [open, setOpen]         = useState(false);
  const [theme, setTheme]       = useState('dark');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll('section[id], footer[id]');
      const offset   = (navRef.current?.offsetHeight ?? 64) + 60;
      let current    = 'hero';
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - offset) {
          current = s.id;
        }
      });
      setActive(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (!el) return;
    const off = (navRef.current?.offsetHeight ?? 64) + 12;
    window.scrollTo({ top: (el as HTMLElement).offsetTop - off, behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      aria-label="Main Navigation"
      style={{
        position: 'fixed',
        inset: '0 0 auto',
        zIndex: 100,
        background: scrolled
          ? theme === 'dark'
            ? 'rgba(9, 13, 22, 0.88)'
            : 'rgba(248, 250, 252, 0.9)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background .25s ease, border-color .25s ease, backdrop-filter .25s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          maxWidth: 1180,
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            go('#hero');
          }}
          aria-label="Raj Bhokare Developer Portfolio Home"
          style={{
            fontFamily: 'var(--display)',
            fontSize: '1rem',
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: '-.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '.45rem',
            textDecoration: 'none',
          }}
        >
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: '6px',
            background: 'var(--cyan-dim)',
            color: 'var(--cyan)',
            border: '1px solid var(--border-h)',
          }}>
            <FiCode size={14} />
          </span>
          <span>Raj Bhokare</span>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '.62rem',
            color: 'var(--cyan)',
            background: 'var(--cyan-dim)',
            padding: '2px 6px',
            borderRadius: '4px',
            fontWeight: 600,
          }}>dev</span>
        </a>

        {/* Center Desktop Links */}
        <ul
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '.25rem',
            margin: 0,
            padding: 0,
            listStyle: 'none',
          }}
        >
          {navLinks.map((l) => {
            const sectionId = l.href.replace('#', '');
            const isActive = active === sectionId;

            return (
              <li key={l.label}>
                <MagneticButton>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.href);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      fontFamily: 'var(--display)',
                      fontSize: '.82rem',
                      fontWeight: 600,
                      padding: '.4rem .75rem',
                      borderRadius: 'var(--r-sm)',
                      color: isActive ? 'var(--cyan)' : 'var(--text-2)',
                      background: isActive ? 'var(--cyan-dim)' : 'transparent',
                      border: isActive ? '1px solid var(--border-h)' : '1px solid transparent',
                      transition: 'all .2s ease',
                      display: 'block',
                      textDecoration: 'none',
                    }}
                  >
                    {l.label}
                  </a>
                </MagneticButton>
              </li>
            );
          })}
        </ul>

        {/* Right Side Social & CTAs */}
        <div
          className="right-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '.5rem',
          }}
        >
          {/* GitHub Icon Link */}
          <MagneticButton>
            <a
              href="https://github.com/RajBhokare"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              title="GitHub Profile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 34,
                height: 34,
                borderRadius: 'var(--r-sm)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-2)',
                transition: 'all .2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-h)';
                e.currentTarget.style.color = 'var(--cyan)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-2)';
              }}
            >
              <FaGithub size={15} />
            </a>
          </MagneticButton>

          {/* LinkedIn Icon Link */}
          <MagneticButton>
            <a
              href="https://linkedin.com/in/rajbhokare1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 34,
                height: 34,
                borderRadius: 'var(--r-sm)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-2)',
                transition: 'all .2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-h)';
                e.currentTarget.style.color = 'var(--cyan)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-2)';
              }}
            >
              <FaLinkedin size={15} />
            </a>
          </MagneticButton>

          {/* Download Resume Button */}
          <MagneticButton>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go('#contact');
              }}
              className="btn-resume"
              style={{
                fontFamily: 'var(--display)',
                fontSize: '.78rem',
                fontWeight: 700,
                color: 'var(--cyan)',
                border: '1px solid var(--border-h)',
                padding: '.4rem .85rem',
                borderRadius: 'var(--r-sm)',
                background: 'var(--cyan-dim)',
                transition: 'all .2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.35rem',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <FiDownload size={13} />
              <span>Resume</span>
            </a>
          </MagneticButton>

          {/* Theme Toggle */}
          <MagneticButton>
            <button
              onClick={toggleTheme}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-sm)',
                width: 34,
                height: 34,
                cursor: 'pointer',
                color: 'var(--text)',
                transition: 'all .2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <FiSun size={15} color="var(--gold)" /> : <FiMoon size={15} color="var(--cyan)" />}
            </button>
          </MagneticButton>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="mobile-toggle"
            aria-label={open ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-sm)',
              width: 34,
              height: 34,
              cursor: 'pointer',
              color: 'var(--text)',
            }}
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {open && (
        <div
          id="mobile-navigation"
          style={{
            position: 'fixed',
            inset: '64px 0 0',
            background: theme === 'dark' ? 'rgba(9, 13, 22, 0.98)' : 'rgba(248, 250, 252, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem',
            gap: '.5rem',
            zIndex: 99,
            overflowY: 'auto',
            borderTop: '1px solid var(--border)',
          }}
        >
          {navLinks.map((l) => {
            const sectionId = l.href.replace('#', '');
            const isActive = active === sectionId;
            return (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.href);
                }}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: isActive ? 'var(--cyan)' : 'var(--text)',
                  padding: '.75rem 0',
                  borderBottom: '1px solid var(--border)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{l.label}</span>
                {isActive && (
                  <span style={{ fontSize: '.7rem', fontFamily: 'var(--mono)', color: 'var(--cyan)' }}>● Active</span>
                )}
              </a>
            );
          })}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <a
              href="https://github.com/RajBhokare"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '.5rem',
                padding: '.75rem',
                borderRadius: 'var(--r-sm)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontFamily: 'var(--display)',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <FaGithub size={16} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/rajbhokare1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '.5rem',
                padding: '.75rem',
                borderRadius: 'var(--r-sm)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                fontFamily: 'var(--display)',
                fontSize: '.9rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <FaLinkedin size={16} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

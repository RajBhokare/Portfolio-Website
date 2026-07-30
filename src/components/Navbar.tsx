import { useEffect, useRef, useState } from 'react';
import { MagneticButton } from './MagneticButton/MagneticButton';

const links = [
  { href: '#about',      label: 'About',      num: '01' },
  { href: '#skills',     label: 'Skills',     num: '02' },
  { href: '#experience', label: 'Experience', num: '03' },
  { href: '#projects',   label: 'Projects',   num: '04' },
  { href: '#activity',   label: 'Activity',   num: '05' },
  { href: '#philosophy', label: 'Philosophy', num: '06' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('');
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
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll('section[id], footer[id]');
      const offset   = (navRef.current?.offsetHeight ?? 68) + 80;
      let current    = '';
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - offset) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const off = (navRef.current?.offsetHeight ?? 68) + 20;
    window.scrollTo({ top: (el as HTMLElement).offsetTop - off, behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        inset: '0 0 auto',
        zIndex: 100,
        background: scrolled
          ? theme === 'dark'
            ? 'rgba(5, 5, 13, 0.82)'
            : 'rgba(244, 245, 248, 0.82)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background .3s, border-color .3s, backdrop-filter .3s',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 2rem',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
        }}
      >
        <MagneticButton>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              go('#hero');
            }}
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '.95rem',
              fontWeight: 600,
              letterSpacing: '.02em',
              cursor: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <span style={{ color: 'var(--cyan)', opacity: 0.85 }}>&lt;</span>
            <span style={{ color: 'var(--text)', fontWeight: 800 }}>RB</span>
            <span style={{ color: 'var(--cyan)', opacity: 0.85 }}>/&gt;</span>
          </a>
        </MagneticButton>

        <ul style={{ display: 'flex', gap: '.2rem', alignItems: 'center', listStyle: 'none' }} className="dnav">
          {links.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '.75rem',
                    cursor: 'none',
                    padding: '.42rem .9rem',
                    borderRadius: 'var(--r-sm)',
                    transition: 'all .25s var(--spring)',
                    position: 'relative',
                    display: 'inline-block',
                    color: isActive ? 'var(--cyan)' : 'var(--text-2)',
                    background: isActive ? 'var(--cyan-dim)' : 'transparent',
                    border: isActive ? '1px solid rgba(0, 229, 255, 0.2)' : '1px solid transparent',
                  }}
                >
                  <span style={{ color: 'var(--text-3)', fontSize: '.62rem' }}>{l.num}. </span>
                  {l.label}
                </a>
              </li>
            );
          })}

          <li style={{ marginLeft: '.5rem' }}>
            <MagneticButton>
              <button
                onClick={toggleTheme}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-sm)',
                  padding: '.42rem .65rem',
                  cursor: 'none',
                  color: 'var(--text)',
                  fontSize: '.85rem',
                  transition: 'all .25s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </MagneticButton>
          </li>

          <li style={{ marginLeft: '.25rem' }}>
            <MagneticButton>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go('#contact');
                }}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '.75rem',
                  cursor: 'none',
                  color: 'var(--cyan)',
                  border: '1px solid rgba(0,229,255,.3)',
                  padding: '.42rem 1.2rem',
                  borderRadius: 'var(--r-sm)',
                  background: 'var(--cyan-dim)',
                  fontWeight: 600,
                  transition: 'all .25s',
                  boxShadow: '0 0 15px rgba(0,229,255,.15)',
                }}
              >
                Contact
              </a>
            </MagneticButton>
          </li>
        </ul>

        <button
          onClick={() => setOpen((o) => !o)}
          className="ham"
          aria-label="menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 6,
            background: 'none',
            border: 'none',
            cursor: 'none',
            padding: 6,
          }}
        >
          <span
            style={{
              display: 'block',
              width: 22,
              height: 1.5,
              background: 'var(--text)',
              borderRadius: 2,
              transition: 'all .25s',
              transform: open ? 'translateY(7.5px) rotate(45deg)' : '',
            }}
          />
          <span
            style={{
              display: 'block',
              width: 22,
              height: 1.5,
              background: 'var(--text)',
              borderRadius: 2,
              transition: 'all .25s',
              transform: open ? 'translateY(-7.5px) rotate(-45deg)' : '',
            }}
          />
        </button>
      </div>

      {open && (
        <div
          style={{
            position: 'fixed',
            inset: '72px 0 0',
            background: theme === 'dark' ? 'rgba(5,5,13,.97)' : 'rgba(244,245,248,.97)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            gap: '.2rem',
            zIndex: 99,
            overflowY: 'auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-sm)',
                padding: '.5rem 1rem',
                cursor: 'none',
                color: 'var(--text)',
                fontSize: '1rem',
                transition: 'all .25s',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
          {[...links, { href: '#contact', label: 'Contact', num: '' }].map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                go(l.href);
              }}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '1.1rem',
                color: 'var(--text)',
                padding: '.8rem 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
      <style>{`@media(max-width:768px){.dnav{display:none!important}.ham{display:flex!important}}`}</style>
    </nav>
  );
}

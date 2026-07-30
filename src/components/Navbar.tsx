import { useEffect, useRef, useState } from 'react';

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
      sections.forEach(s => {
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

  const lS: React.CSSProperties = {
    fontFamily:'var(--mono)',fontSize:'.75rem',cursor:'none',
    padding:'.38rem .85rem',borderRadius:'var(--r-sm)',
    transition:'color .25s',position:'relative',display:'inline-block',
  };

  return (
    <nav ref={navRef} style={{
      position:'fixed',inset:'0 0 auto',zIndex:100,
      background: scrolled ? (theme === 'dark' ? 'rgba(7,7,16,.92)' : 'rgba(248,249,250,.92)') : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition:'background .25s,border-color .25s',
    }}>
      <div style={{maxWidth:1160,margin:'0 auto',padding:'0 2rem',height:68,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="#hero" onClick={e=>{e.preventDefault();go('#hero');}} style={{fontFamily:'var(--mono)',fontSize:'.95rem',fontWeight:500,letterSpacing:'.02em',cursor:'none'}}>
          <span style={{color:'var(--cyan)',opacity:.7}}>&lt;</span>
          <span style={{color:'var(--text)',fontWeight:700}}>RB</span>
          <span style={{color:'var(--cyan)',opacity:.7}}>/&gt;</span>
        </a>
        <ul style={{display:'flex',gap:'.15rem',alignItems:'center',listStyle:'none'}} className="dnav">
          {links.map(l=>(
            <li key={l.href}>
              <a href={l.href} onClick={e=>{e.preventDefault();go(l.href);}}
                style={{...lS,color:active===l.href.slice(1)?'var(--text)':'var(--text-2)'}}>
                <span style={{color:'var(--text-3)',fontSize:'.62rem'}}>{l.num}. </span>{l.label}
              </a>
            </li>
          ))}
          <li>
            <button onClick={toggleTheme} style={{
              background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)',
              padding: '.38rem', cursor: 'none', color: 'var(--text)', fontSize: '.75rem',
              transition: 'all .25s', marginRight: '.5rem'
            }} aria-label="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </li>
          <li>
            <a href="#contact" onClick={e=>{e.preventDefault();go('#contact');}}
              style={{fontFamily:'var(--mono)',fontSize:'.75rem',cursor:'none',color:'var(--cyan)',
                border:'1px solid rgba(0,229,255,.28)',padding:'.38rem 1.1rem',borderRadius:'var(--r-sm)',
                background:'rgba(0,229,255,.04)',transition:'all .25s'}}>Contact</a>
          </li>
        </ul>
        <button onClick={()=>setOpen(o=>!o)} className="ham" aria-label="menu"
          style={{display:'none',flexDirection:'column',gap:6,background:'none',border:'none',cursor:'none',padding:6}}>
          <span style={{display:'block',width:22,height:1.5,background:'var(--text)',borderRadius:2,transition:'all .25s',
            transform:open?'translateY(7.5px) rotate(45deg)':''}}/>
          <span style={{display:'block',width:22,height:1.5,background:'var(--text)',borderRadius:2,transition:'all .25s',
            transform:open?'translateY(-7.5px) rotate(-45deg)':''}}/>
        </button>
      </div>
      {open&&(
        <div style={{position:'fixed',inset:'68px 0 0',background: theme === 'dark' ? 'rgba(7,7,16,.97)' : 'rgba(248,249,250,.97)',backdropFilter:'blur(24px)',
          display:'flex',flexDirection:'column',padding:'2rem',gap:'.2rem',zIndex:99,overflowY:'auto'}}>
          <div style={{display:'flex',justifyContent:'center',marginBottom:'1rem'}}>
            <button onClick={toggleTheme} style={{
              background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)',
              padding: '.5rem', cursor: 'none', color: 'var(--text)', fontSize: '1rem',
              transition: 'all .25s'
            }} aria-label="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
          {[...links,{href:'#contact',label:'Contact',num:''}].map(l=>(
            <a key={l.href} href={l.href} onClick={e=>{e.preventDefault();go(l.href);}}
              style={{fontFamily:'var(--mono)',fontSize:'1.1rem',color:'var(--text)',padding:'.8rem 0',borderBottom:'1px solid var(--border)'}}>
              {l.label}
            </a>
          ))}
        </div>
      )}
      <style>{`@media(max-width:640px){.dnav{display:none!important}.ham{display:flex!important}}`}</style>
    </nav>
  );
}

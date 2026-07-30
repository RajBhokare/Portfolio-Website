import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollPct(Math.min(100, Math.max(0, current)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${scrollPct}%`,
        height: '3px',
        background: 'linear-gradient(90deg, var(--cyan), var(--violet), var(--coral))',
        zIndex: 10000,
        boxShadow: '0 0 10px var(--cyan)',
        transition: 'width 0.1s ease-out',
      }}
      aria-hidden="true"
    />
  );
}

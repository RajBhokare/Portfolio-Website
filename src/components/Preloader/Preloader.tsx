import { useEffect, useState } from 'react';
import './Preloader.css';

interface Props {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: Props) {
  const [hidden, setHidden] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
      if (onComplete) onComplete();
      setTimeout(() => setUnmounted(true), 400);
    }, 500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (unmounted) return null;

  return (
    <div className={`preloader ${hidden ? 'preloader-hidden' : ''}`} aria-hidden={hidden}>
      <div className="preloader-content">
        <div className="preloader-logo">
          <span className="cyan">&lt;</span>
          <span>RB</span>
          <span className="cyan">/&gt;</span>
        </div>

        <div className="preloader-bar-wrap">
          <div className="preloader-bar-fill" />
        </div>

        <div className="preloader-sub">Loading Experience</div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import './Preloader.css';

interface Props {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const duration = 1200; // 1.2 seconds total animation
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(100, Math.round((currentStep / steps) * 100));
      setProgress(nextProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setHidden(true);
          if (onComplete) onComplete();
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`preloader ${hidden ? 'preloader-hidden' : ''}`} aria-hidden={hidden}>
      <div className="preloader-content">
        <div className="preloader-logo">
          <span className="cyan">&lt;</span>
          <span>RB</span>
          <span className="cyan">/&gt;</span>
        </div>

        <div className="preloader-counter">{progress}%</div>

        <div className="preloader-bar-wrap">
          <div className="preloader-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="preloader-sub">Loading Experience</div>
      </div>
    </div>
  );
}

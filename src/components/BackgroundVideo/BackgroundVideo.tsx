import React, { useEffect, useRef } from 'react';
import './BackgroundVideo.css';

export const BackgroundVideo = React.memo(function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly enforce muted DOM properties for cross-browser autoplay compliance
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log('Autoplay deferred until user interaction:', err);
        });
      }
    };

    playVideo();

    // Fallback: trigger playback on first user gesture if browser blocked unprompted autoplay
    const handleGesture = () => {
      playVideo();
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };

    window.addEventListener('click', handleGesture);
    window.addEventListener('touchstart', handleGesture);
    window.addEventListener('keydown', handleGesture);

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, []);

  return (
    <>
      <div className="bg-video-container" aria-hidden="true">
        <video
          ref={videoRef}
          className="bg-video-element"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/background-video.mp4" type="video/mp4" />
          <source src="/THIS IS 4K MARVEL (Spider-Man) - Senpai (1080p).mp4" type="video/mp4" />
        </video>
      </div>
      <div className="bg-video-overlay" aria-hidden="true" />
    </>
  );
});

import { useEffect, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import { About, Skills, Experience, Projects, Philosophy, Contact } from './sections/Sections';
import { Preloader } from './components/Preloader/Preloader';
import { ScrollProgress } from './components/ScrollProgress/ScrollProgress';
import { BackgroundVideo } from './components/BackgroundVideo/BackgroundVideo';

const CodingActivitySection = lazy(() => import('./components/CodingActivity/CodingActivitySection'));

function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let fx = 0, fy = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = x + 'px';
        cursorRef.current.style.top = y + 'px';
      }
    };

    const loop = () => {
      if (cursorRef.current && followerRef.current) {
        const cx = parseFloat(cursorRef.current.style.left || '0');
        const cy = parseFloat(cursorRef.current.style.top || '0');
        fx += (cx - fx) * 0.14;
        fy += (cy - fy) * 0.14;
        followerRef.current.style.left = fx + 'px';
        followerRef.current.style.top = fy + 'px';
      }
      rafId = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element;
      const interactive = t.closest(
        'a, button, [role="button"], .pill, .info-card, .project-showcase, .skill-group, .exp-item, .footer-social-link'
      );
      cursorRef.current?.classList.toggle('hovered', !!interactive);
      followerRef.current?.classList.toggle('hovered', !!interactive);
    };

    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      if (followerRef.current) followerRef.current.style.opacity = '0';
    };
    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
      if (followerRef.current) followerRef.current.style.opacity = '1';
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const observe = () => {
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    };

    observe();
    setTimeout(observe, 500);

    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useScrollReveal();

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <BackgroundVideo />
      <Preloader />
      <ScrollProgress />
      <div className="noise" aria-hidden="true" />
      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <div className="section-sep" aria-hidden="true" />
        <About />
        <div className="section-sep" aria-hidden="true" />
        <Skills />
        <div className="section-sep" aria-hidden="true" />
        <Experience />
        <div className="section-sep" aria-hidden="true" />
        <Projects />
        <div className="section-sep" aria-hidden="true" />
        <Suspense
          fallback={
            <div className="section section-dark">
              <div className="container">
                <div className="skeleton-pulse" style={{ height: 400, borderRadius: 24 }} />
              </div>
            </div>
          }
        >
          <CodingActivitySection />
        </Suspense>
        <div className="section-sep" aria-hidden="true" />
        <Philosophy />
      </main>

      <div className="section-sep" aria-hidden="true" />
      <Contact />
    </>
  );
}

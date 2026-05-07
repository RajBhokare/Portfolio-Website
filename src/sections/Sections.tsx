import './Sections.css'

/* ── ABOUT ── */
export function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">get to know me</span>
          <h2 className="section-title">About Me</h2>
        </div>
        <div className="about-layout">
          <div className="about-text reveal">
            <p className="about-lead">
              I'm a <mark>Frontend Developer</mark> who loves turning ideas into polished
              digital experiences — from pixel-perfect UIs to hardware-integrated tools.
            </p>
            <p>
              Currently in my second year at <strong>Dr. D. Y. Patil Institute of Technology, Pune</strong>,
              I specialise in building clean, responsive web interfaces while also exploring IoT and
              embedded systems. I believe great engineering starts with curiosity, discipline, and a
              deep love for the craft.
            </p>
            <p>
              When I'm not coding, I'm probably debugging something I didn't need to build —
              but learned a ton from anyway.
            </p>
          </div>
          <div className="about-cards reveal">
            {[
              { icon: '🎓', label: 'Education',  value: '2nd Year, IT Engineering' },
              { icon: '📍', label: 'Location',   value: 'Pune, India' },
              { icon: '💡', label: 'Focus',      value: 'Frontend Dev, DSA & IoT' },
            ].map(c => (
              <div className="info-card" key={c.label}>
                <div className="info-card-icon">{c.icon}</div>
                <div>
                  <div className="info-card-label">{c.label}</div>
                  <div className="info-card-value">{c.value}</div>
                </div>
              </div>
            ))}
            <div className="info-card info-card-highlight">
              <div className="info-card-icon">🚀</div>
              <div>
                <div className="info-card-label">Status</div>
                <div className="info-card-value">
                  <span className="status-dot" />Open to opportunities
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── SKILLS ── */
const skillGroups = [
  {
    icon: <svg viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 8l3 3-3 3M11 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    title: 'Frontend',
    pills: ['HTML5','CSS3','JavaScript ES6+','Flexbox & Grid','Bootstrap','Tailwind CSS'],
    span: false, iot: false,
  },
  {
    icon: <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    title: 'Programming',
    pills: ['Java','Python','C','C++'],
    span: false, iot: false,
  },
  {
    icon: <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    title: 'Tools & Platforms',
    pills: ['Git & GitHub','Linux','VS Code','Figma'],
    span: false, iot: false,
  },
  {
    icon: <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 5.5a6.5 6.5 0 0 0 0 9M14.5 5.5a6.5 6.5 0 0 1 0 9M3 3a9.9 9.9 0 0 0 0 14M17 3a9.9 9.9 0 0 1 0 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    title: 'Hardware & IoT',
    pills: ['Arduino','ESP8266/32','Sensors','Embedded C'],
    span: false, iot: true,
  },
  {
    icon: <svg viewBox="0 0 20 20" fill="none"><path d="M10 2l2.4 5 5.6.7-4 3.9.9 5.4L10 14.5l-4.9 2.5.9-5.4-4-3.9 5.6-.7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    title: 'Creative & Design',
    pills: ['Photoshop','Graphic Editing','UI Design'],
    span: true, iot: false,
  },
]

export function Skills() {
  return (
    <section className="section section-dark" id="skills">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">what I work with</span>
          <h2 className="section-title">Skills & Tools</h2>
        </div>
        <div className="skills-layout">
          {skillGroups.map((g, i) => (
            <div
              key={g.title}
              className={`skill-group reveal${g.iot ? ' skill-group-iot' : ''}${g.span ? ' skill-group-span' : ''}`}
              style={{ '--d': `${i * 100}ms` } as React.CSSProperties}
            >
              <div className="skill-group-header">
                <span className={`skill-icon-wrap${g.iot ? ' skill-icon-iot' : ''}`}>{g.icon}</span>
                <h3 className="skill-group-title">{g.title}</h3>
              </div>
              <div className="skill-pills">
                {g.pills.map(p => <span key={p} className={`pill${g.iot ? ' pill-iot' : ''}`}>{p}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── EXPERIENCE ── */
const experiences = [
  {
    period: '2024 — Present', badge: 'Current', active: true,
    role: 'Frontend Developer', org: 'Self-Initiated Projects & Open Source',
    desc: 'Building production-ready frontend interfaces and contributing to open-source projects. Focused on React, vanilla JS, and responsive design principles while integrating IoT dashboards with live data streams.',
    stack: ['HTML/CSS','JavaScript','React','Tailwind','Git'],
  },
  {
    period: '2023 — 2024', badge: 'Academic', active: false,
    role: 'IoT & Hardware Developer', org: 'Dr. D. Y. Patil Institute of Technology, Pune',
    desc: 'Designed and built IoT systems using ESP8266 & Arduino — including DustSense, a real-time PM2.5 air quality monitor transmitting data over MQTT. Implemented live dashboards to visualise sensor readings.',
    stack: ['Arduino/C','ESP8266','MQTT','Sensors','Dashboard'],
  },
  {
    period: '2023', badge: 'EdTech', active: false,
    role: 'AI/ML Web App Developer', org: 'Academic Project — Quizzer & AssignAI',
    desc: 'Built AI-powered educational platforms — Quizzer converts video lectures to MCQ quizzes via NLP, and AssignAI enables automated code grading for educators with role-based dashboards and real-time feedback.',
    stack: ['Python','Flask','NLP','AI/LLM','Full Stack'],
  },
]

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">my journey</span>
          <h2 className="section-title exp-title">Experience</h2>
        </div>
        <div className="experience-layout">
          {experiences.map((e, i) => (
            <div className="exp-item reveal" key={i}>
              <div className="exp-left">
                <div className="exp-dot" />
                {i < experiences.length - 1 && <div className="exp-line" />}
              </div>
              <div className="exp-content">
                <div className="exp-meta">
                  <span className="exp-period">{e.period}</span>
                  <span className={`exp-badge${e.active ? ' exp-badge-active' : ''}`}>{e.badge}</span>
                </div>
                <h3 className="exp-role">{e.role}</h3>
                <p className="exp-org">{e.org}</p>
                <p className="exp-desc">{e.desc}</p>
                <div className="exp-stack">
                  {e.stack.map(s => <span key={s}>{s}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── PROJECTS ── */
export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">things I've built</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Project 1 */}
        <div className="project-showcase reveal" data-accent="violet">
          <div className="ps-visual">
            <div className="ps-mockup ps-mockup-iot">
              <div className="iot-dashboard">
                <div className="iot-header"><span className="iot-status-dot"/><span>DustSense · LIVE</span></div>
                <div className="iot-reading">
                  <div className="iot-metric"><span className="iot-val">247</span><span className="iot-unit">µg/m³</span></div>
                  <div className="iot-bar-label">Air Quality Index</div>
                  <div className="iot-bar-track">
                    <div className="iot-bar-fill" style={{width:'62%'}}/>
                  </div>
                  <div className="iot-bar-labels"><span>Good</span><span>Moderate</span><span>Poor</span><span>Bad</span></div>
                </div>
                <div className="iot-sparkline">
                  <svg viewBox="0 0 200 50" preserveAspectRatio="none">
                    <polyline points="0,40 25,35 50,38 75,20 100,28 125,15 150,22 175,10 200,18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="0,40 25,35 50,38 75,20 100,28 125,15 150,22 175,10 200,18 200,50 0,50" fill="currentColor" opacity="0.08"/>
                  </svg>
                </div>
                <div className="iot-chips">
                  <span className="iot-chip"><span>●</span> GP2Y1010AU0F</span>
                  <span className="iot-chip"><span>●</span> ESP8266</span>
                  <span className="iot-chip"><span>●</span> MQTT</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-content">
            <div className="ps-meta">
              <span className="ps-num">01</span>
              <span className="ps-badge ps-badge-iot">Hardware · IoT</span>
              <span className="ps-badge ps-badge-new">Featured</span>
            </div>
            <h3 className="ps-title">DustSense</h3>
            <p className="ps-tagline">Real-Time Air Quality Monitoring System</p>
            <p className="ps-desc">An IoT-integrated hardware system using a Sharp GP2Y1010AU0F optical dust sensor to measure PM2.5 particulate density in real time. Data is processed on an ESP8266 microcontroller, transmitted over Wi-Fi via MQTT protocol, and visualized on a live dashboard.</p>
            <ul className="ps-highlights">
              <li><span className="ps-hi-dot"/>Real-time PM2.5 density readings with analog signal processing</li>
              <li><span className="ps-hi-dot"/>ESP8266 Wi-Fi module for wireless data transmission</li>
              <li><span className="ps-hi-dot"/>MQTT protocol for lightweight IoT messaging</li>
              <li><span className="ps-hi-dot"/>Live web dashboard with historical trend charts</li>
            </ul>
            <div className="ps-stack">
              <span>Arduino/C</span><span>ESP8266</span><span>MQTT</span><span>IoT</span><span>Sensors</span>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="project-showcase project-showcase-flip reveal" data-accent="cyan">
          <div className="ps-visual">
            <div className="ps-mockup ps-mockup-app">
              <div className="app-chrome">
                <div className="app-chrome-bar">
                  <div className="app-dots"><span/><span/><span/></div>
                  <div className="app-url">quizzer.app/generate</div>
                </div>
                <div className="app-body">
                  <div className="app-card"><div className="app-card-icon">🎬</div><div><div className="app-card-label">Video Processed</div><div className="app-card-val">Lecture_03_ML.mp4</div></div></div>
                  <div className="app-progress-row"><span className="app-prog-label">Generating Quiz…</span><span className="app-prog-pct">87%</span></div>
                  <div className="app-prog-bar"><div className="app-prog-fill" style={{width:'87%'}}/></div>
                  <div className="app-quiz-preview">
                    <div className="app-q">Q1. What is gradient descent?</div>
                    <div className="app-opts">
                      <span className="app-opt app-opt-correct">◉ An optimization algorithm</span>
                      <span className="app-opt">○ A data structure</span>
                      <span className="app-opt">○ A sorting method</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-content">
            <div className="ps-meta"><span className="ps-num">02</span><span className="ps-badge ps-badge-ai">EdTech · AI</span></div>
            <h3 className="ps-title">Quizzer</h3>
            <p className="ps-tagline">Video Summarizer & Auto Quiz Generator</p>
            <p className="ps-desc">Converts educational video lectures into concise text summaries and automatically generates multiple-choice quizzes using NLP techniques. Students upload a video, get a digest, and test their comprehension — all in one workflow.</p>
            <ul className="ps-highlights">
              <li><span className="ps-hi-dot"/>Automatic transcript extraction from video files</li>
              <li><span className="ps-hi-dot"/>NLP-powered summarization pipeline</li>
              <li><span className="ps-hi-dot"/>AI-generated MCQ quiz from summary context</li>
              <li><span className="ps-hi-dot"/>Score tracking and comprehension feedback</li>
            </ul>
            <div className="ps-stack"><span>Python</span><span>NLP</span><span>Flask</span><span>SpeechRecognition</span></div>
          </div>
        </div>

        {/* Project 3 */}
        <div className="project-showcase reveal" data-accent="coral">
          <div className="ps-visual">
            <div className="ps-mockup ps-mockup-edu">
              <div className="edu-ui">
                <div className="edu-nav">EduQuest <span>🌐 Rural Access</span></div>
                <div className="edu-hero-text">Learn. Grow. Succeed.</div>
                <div className="edu-cards">
                  <div className="edu-card"><span>📹</span><span>Video Lessons</span></div>
                  <div className="edu-card edu-card-active"><span>📝</span><span>Quizzes</span></div>
                  <div className="edu-card"><span>📊</span><span>Progress</span></div>
                </div>
                <div className="edu-stat-row">
                  <div className="edu-stat"><span className="edu-stat-n">1.2k</span><span className="edu-stat-l">Students</span></div>
                  <div className="edu-stat"><span className="edu-stat-n">48</span><span className="edu-stat-l">Lessons</span></div>
                  <div className="edu-stat"><span className="edu-stat-n">Low</span><span className="edu-stat-l">Bandwidth</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-content">
            <div className="ps-meta"><span className="ps-num">03</span><span className="ps-badge ps-badge-web">Education · Web</span></div>
            <h3 className="ps-title">EduQuest</h3>
            <p className="ps-tagline">Digital Learning for Rural Students</p>
            <p className="ps-desc">A lightweight, bandwidth-optimized web platform designed for rural students with limited internet access. Features offline-first content delivery, interactive quizzes, and progress tracking.</p>
            <ul className="ps-highlights">
              <li><span className="ps-hi-dot"/>Offline-first design for low-connectivity regions</li>
              <li><span className="ps-hi-dot"/>Lightweight video lesson summaries</li>
              <li><span className="ps-hi-dot"/>Interactive quiz module with score analytics</li>
              <li><span className="ps-hi-dot"/>Accessible UI for diverse literacy levels</li>
            </ul>
            <div className="ps-stack"><span>HTML/CSS</span><span>JavaScript</span><span>PWA</span><span>LocalStorage</span></div>
          </div>
        </div>

        {/* Project 4 */}
        <div className="project-showcase project-showcase-flip reveal" data-accent="gold">
          <div className="ps-visual">
            <div className="ps-mockup ps-mockup-ai">
              <div className="ai-ui">
                <div className="ai-header"><span className="ai-logo">AssignAI</span><span className="ai-role">Educator View</span></div>
                <div className="ai-assignment"><div className="ai-assign-title">Assignment: Dijkstra's Algorithm</div><div className="ai-assign-sub">Submitted by: student_42</div></div>
                <div className="ai-feedback">
                  <div className="ai-feedback-label">AI Feedback</div>
                  <div className="ai-feedback-item good">✓ Correct time complexity analysis</div>
                  <div className="ai-feedback-item good">✓ Proper edge case handling</div>
                  <div className="ai-feedback-item warn">⚠ Optimize priority queue usage</div>
                  <div className="ai-feedback-item bad">✗ Missing base case for disconnected graph</div>
                </div>
                <div className="ai-score-row"><span className="ai-score-label">Auto Grade</span><span className="ai-score-val">78 / 100</span></div>
              </div>
            </div>
          </div>
          <div className="ps-content">
            <div className="ps-meta"><span className="ps-num">04</span><span className="ps-badge ps-badge-ai">AI · Full Stack</span></div>
            <h3 className="ps-title">AssignAI</h3>
            <p className="ps-tagline">Smarter Assignment Management Platform</p>
            <p className="ps-desc">An AI-powered full-stack platform where educators create and distribute programming assignments, while students receive instant, structured feedback generated by AI. Replaces slow manual grading with intelligent auto-evaluation.</p>
            <ul className="ps-highlights">
              <li><span className="ps-hi-dot"/>AI-driven code feedback and auto-grading engine</li>
              <li><span className="ps-hi-dot"/>Role-based dashboards for educators and students</li>
              <li><span className="ps-hi-dot"/>Real-time submission and feedback loop</li>
              <li><span className="ps-hi-dot"/>Analytics dashboard for class-wide performance</li>
            </ul>
            <div className="ps-stack"><span>AI/LLM</span><span>Full Stack</span><span>REST API</span><span>EdTech</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── PHILOSOPHY ── */
const principles = [
  { num: '01', title: 'Make it work, then make it right', body: "Start simple. Don't over-engineer before you understand the problem. Ship, then refine." },
  { num: '02', title: 'Write code for humans', body: 'Readability beats cleverness. Your future self — and teammates — will thank you.' },
  { num: '03', title: 'Small steps, big results', body: 'Consistent 1% improvements compound into mastery. Progress over perfection, always.' },
  { num: '04', title: 'Debug to understand, not just to fix', body: 'The best learning happens in the trenches. Every bug is a lesson waiting to be claimed.' },
]

export function Philosophy() {
  return (
    <section className="section section-dark" id="philosophy">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">my mindset</span>
          <h2 className="section-title">How I Think</h2>
        </div>
        <div className="philosophy-layout">
          <div className="principles reveal">
            {principles.map(p => (
              <div className="principle" key={p.num}>
                <span className="principle-num">{p.num}</span>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="quote-block reveal">
            <svg className="quote-svg" viewBox="0 0 40 30" fill="none" aria-hidden="true">
              <path d="M0 30V18C0 7.6 6.667 1.267 20 0v6C14 6.667 11 9.667 10 15h10v15H0zM22 30V18C22 7.6 28.667 1.267 42 0v6C36 6.667 33 9.667 32 15h10v15H22z" fill="currentColor" opacity="0.2"/>
            </svg>
            <blockquote>I value consistency<br/>over intensity.</blockquote>
            <cite>— Raj Bhokare</cite>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CONTACT / FOOTER ── */
export function Contact() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-main reveal">
          <div className="footer-cta">
            <p className="footer-eyebrow">Let's connect</p>
            <h2 className="footer-heading">Got an idea?<br/><em>Let's build it.</em></h2>
            <p className="footer-sub">Open to internships, collaborations, and interesting projects.</p>
          </div>
          <div className="footer-links">
            {[
              { href: 'https://github.com/RajBhokare', label: 'GitHub', path: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z' },
              { href: 'https://linkedin.com/in/rajbhokare1', label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              { href: 'https://leetcode.com/u/RajBhokare/', label: 'LeetCode', path: 'M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener" className="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d={s.path}/></svg>
                <span>{s.label}</span><span className="link-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Raj Bhokare</p>
          <p className="footer-built">Frontend Developer · Built with React, Vite & Three.js</p>
        </div>
      </div>
    </footer>
  )
}

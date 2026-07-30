import { MagneticButton } from '../components/MagneticButton/MagneticButton'
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
              I'm a <mark>Frontend & Full Stack Developer</mark> who loves turning ideas into polished
              digital experiences — from pixel-perfect UIs to hardware-integrated systems.
            </p>
            <p>
              Currently in my second year at <strong>Dr. D. Y. Patil Institute of Technology, Pune</strong>,
              I specialise in building clean, responsive web interfaces while also exploring AI integration,
              Data Structures & Algorithms, and IoT embedded systems. I believe great engineering starts with curiosity, discipline, and a
              deep love for the craft.
            </p>
            <p>
              When I'm not coding, I'm probably debugging hardware sensor modules or exploring new web technologies.
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
const marqueeSkillsRow1 = [
  { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
]

const marqueeSkillsRow2 = [
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Arduino', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg' },
]

const skillGroups = [
  {
    icon: <svg viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 8l3 3-3 3M11 14h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    title: 'Frontend Development',
    pills: [
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    ],
    span: false, iot: false,
  },
  {
    icon: <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    title: 'Programming & Backend',
    pills: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    ],
    span: false, iot: false,
  },
  {
    icon: <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    title: 'Tools & Platforms',
    pills: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
    ],
    span: false, iot: false,
  },
  {
    icon: <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M5.5 5.5a6.5 6.5 0 0 0 0 9M14.5 5.5a6.5 6.5 0 0 1 0 9M3 3a9.9 9.9 0 0 0 0 14M17 3a9.9 9.9 0 0 0 0 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    title: 'Hardware & IoT',
    pills: [
      { name: 'Arduino', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg' },
      { name: 'ESP8266/32', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
      { name: 'MQTT', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    ],
    span: false, iot: true,
  },
  {
    icon: <svg viewBox="0 0 20 20" fill="none"><path d="M10 2l2.4 5 5.6.7-4 3.9.9 5.4L10 14.5l-4.9 2.5.9-5.4-4-3.9 5.6-.7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
    title: 'Creative & UI Design',
    pills: [
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg' },
    ],
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

        {/* Infinite Continuous Marquee Carousel */}
        <div className="skills-marquee-container reveal">
          <div className="skills-marquee-track">
            {[...marqueeSkillsRow1, ...marqueeSkillsRow1, ...marqueeSkillsRow1].map((item, idx) => (
              <div className="skill-logo-card" key={`r1-${idx}`}>
                <img src={item.icon} alt={item.name} className="skill-logo-icon" />
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          <div className="skills-marquee-track-reverse">
            {[...marqueeSkillsRow2, ...marqueeSkillsRow2, ...marqueeSkillsRow2].map((item, idx) => (
              <div className="skill-logo-card" key={`r2-${idx}`}>
                <img src={item.icon} alt={item.name} className="skill-logo-icon" />
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categorized Skill Groups with Icons */}
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
                {g.pills.map((p) => (
                  <span key={p.name} className={`pill pill-with-icon${g.iot ? ' pill-iot' : ''}`}>
                    <img src={p.icon} alt={p.name} className="pill-icon" />
                    <span>{p.name}</span>
                  </span>
                ))}
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
    role: 'Frontend & Full Stack Developer', org: 'Self-Initiated Projects & Open Source',
    desc: 'Building production-ready frontend and full-stack interfaces. Focused on React, Node.js, Express, and AI APIs while integrating hardware dashboards with live telemetry streams.',
    stack: ['HTML/CSS','JavaScript','React','Node.js','Express','Git'],
  },
  {
    period: '2023 — 2024', badge: 'Academic', active: false,
    role: 'IoT & Hardware Developer', org: 'Dr. D. Y. Patil Institute of Technology, Pune',
    desc: 'Designed and built IoT systems using ESP8266 & Arduino — including DustSense, a real-time PM2.5 air quality monitor transmitting data over MQTT. Implemented live web dashboards to visualize sensor metrics.',
    stack: ['Embedded C','ESP8266','MQTT','Sensors','Dashboard'],
  },
  {
    period: '2023', badge: 'EdTech', active: false,
    role: 'AI/ML Web App Developer', org: 'Academic & AI Projects — Quizzer & Briefly',
    desc: 'Built AI-powered application platforms — Quizzer converts educational videos to MCQ quizzes via AssemblyAI, and Briefly automates meeting transcription and summary extraction using OpenAI Whisper API.',
    stack: ['Node.js','Express','Whisper API','AssemblyAI','Bootstrap'],
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

        {/* Project 1: Briefly */}
        <div className="project-showcase reveal" data-accent="violet">
          <div className="ps-visual">
            <div className="ps-mockup ps-mockup-briefly">
              <div className="briefly-ui">
                <div className="briefly-header">
                  <span className="briefly-logo">Briefly AI</span>
                  <span className="briefly-status">● Live Assistant</span>
                </div>
                <div className="briefly-audio">
                  <div className="briefly-title">🎙️ Meeting_Recording.mp3</div>
                  <div className="briefly-wave">
                    <div className="briefly-bar" style={{ height: '40%' }} />
                    <div className="briefly-bar" style={{ height: '85%' }} />
                    <div className="briefly-bar" style={{ height: '60%' }} />
                    <div className="briefly-bar" style={{ height: '100%' }} />
                    <div className="briefly-bar" style={{ height: '45%' }} />
                    <div className="briefly-bar" style={{ height: '75%' }} />
                    <div className="briefly-bar" style={{ height: '30%' }} />
                  </div>
                </div>
                <div className="briefly-summary">
                  <div className="briefly-label">AI Key Insights</div>
                  <div className="briefly-item"><span>✓</span> Whisper speech-to-text transcribed</div>
                  <div className="briefly-item"><span>✓</span> 4 action items extracted</div>
                  <div className="briefly-item"><span>✓</span> Executive summary ready</div>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-content">
            <div className="ps-meta">
              <span className="ps-num">01</span>
              <span className="ps-badge ps-badge-iot" style={{ background: 'var(--violet-dim)', color: 'var(--violet)', borderColor: 'rgba(176,105,255,.2)' }}>AI · Full Stack</span>
              <span className="ps-badge ps-badge-new">Featured</span>
            </div>
            <h3 className="ps-title">Briefly</h3>
            <p className="ps-tagline">AI Powered Meeting Assistant</p>
            <p className="ps-desc">Built an AI-powered meeting assistant that converts meeting recordings into structured summaries and actionable tasks. The application automates speech transcription and summarization using OpenAI Whisper, enabling users to quickly review important discussion points.</p>
            <ul className="ps-highlights">
              <li><span className="ps-hi-dot"/>Upload audio recordings for instant processing</li>
              <li><span className="ps-hi-dot"/>Automatic speech-to-text transcription via Whisper API</li>
              <li><span className="ps-hi-dot"/>AI-generated meeting summaries & executive digests</li>
              <li><span className="ps-hi-dot"/>Action item extraction with task assignment</li>
              <li><span className="ps-hi-dot"/>Fast and responsive user interface</li>
            </ul>
            <div className="ps-stack">
              <span>HTML</span><span>CSS</span><span>Bootstrap</span><span>JavaScript</span><span>EJS</span><span>Node.js</span><span>Express.js</span><span>Whisper API</span>
            </div>
            <div className="ps-actions">
              <MagneticButton>
                <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="ps-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </MagneticButton>
              <span className="ps-btn ps-btn-disabled" title="Live Demo Coming Soon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
                Live Demo
              </span>
            </div>
          </div>
        </div>

        {/* Project 2: Quizzer */}
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
            <div className="ps-meta"><span className="ps-num">02</span><span className="ps-badge ps-badge-ai">AI · EdTech</span></div>
            <h3 className="ps-title">Quizzer</h3>
            <p className="ps-tagline">Video Summarizer & Quiz Generator</p>
            <p className="ps-desc">Developed a web application that extracts transcripts from uploaded videos, generates concise summaries, and creates quizzes automatically using AI-powered speech recognition and content analysis.</p>
            <ul className="ps-highlights">
              <li><span className="ps-hi-dot"/>Upload educational videos seamlessly</li>
              <li><span className="ps-hi-dot"/>Automatic transcript generation via AssemblyAI API</li>
              <li><span className="ps-hi-dot"/>AI-generated summaries & key concept digests</li>
              <li><span className="ps-hi-dot"/>Interactive quiz generation for self-assessment</li>
              <li><span className="ps-hi-dot"/>Responsive user interface</li>
            </ul>
            <div className="ps-stack">
              <span>HTML</span><span>CSS</span><span>JavaScript</span><span>Bootstrap</span><span>EJS</span><span>Node.js</span><span>Express.js</span><span>AssemblyAI API</span>
            </div>
            <div className="ps-actions">
              <MagneticButton>
                <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="ps-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </MagneticButton>
              <span className="ps-btn ps-btn-disabled" title="Live Demo Coming Soon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
                Live Demo
              </span>
            </div>
          </div>
        </div>

        {/* Project 3: EduQuest */}
        <div className="project-showcase reveal" data-accent="coral">
          <div className="ps-visual">
            <div className="ps-mockup ps-mockup-edu">
              <div className="edu-ui">
                <div className="edu-nav">EduQuest <span>🎓 LMS Platform</span></div>
                <div className="edu-hero-text">Learn. Grow. Succeed.</div>
                <div className="edu-cards">
                  <div className="edu-card"><span>📚</span><span>Courses</span></div>
                  <div className="edu-card edu-card-active"><span>📝</span><span>Quizzes</span></div>
                  <div className="edu-card"><span>📊</span><span>Analytics</span></div>
                </div>
                <div className="edu-stat-row">
                  <div className="edu-stat"><span className="edu-stat-n">MySQL</span><span className="edu-stat-l">Database</span></div>
                  <div className="edu-stat"><span className="edu-stat-n">REST</span><span className="edu-stat-l">APIs</span></div>
                  <div className="edu-stat"><span className="edu-stat-n">Auth</span><span className="edu-stat-l">Role-based</span></div>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-content">
            <div className="ps-meta"><span className="ps-num">03</span><span className="ps-badge ps-badge-web">Full Stack · Education</span></div>
            <h3 className="ps-title">EduQuest</h3>
            <p className="ps-tagline">Digital Learning Platform</p>
            <p className="ps-desc">Built a full-stack Learning Management System supporting students and educators. Designed relational database schemas, developed RESTful APIs, and implemented quiz management and progress tracking.</p>
            <ul className="ps-highlights">
              <li><span className="ps-hi-dot"/>Student & educator authentication system</li>
              <li><span className="ps-hi-dot"/>Comprehensive course & curriculum management</li>
              <li><span className="ps-hi-dot"/>Interactive quiz management module</li>
              <li><span className="ps-hi-dot"/>Student progress tracking & performance analytics</li>
              <li><span className="ps-hi-dot"/>RESTful CRUD API architecture</li>
            </ul>
            <div className="ps-stack">
              <span>Node.js</span><span>Express.js</span><span>MySQL</span><span>EJS</span><span>HTML</span><span>CSS</span><span>Bootstrap</span>
            </div>
            <div className="ps-actions">
              <MagneticButton>
                <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="ps-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </MagneticButton>
              <span className="ps-btn ps-btn-disabled" title="Live Demo Coming Soon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
                Live Demo
              </span>
            </div>
          </div>
        </div>

        {/* Project 4: DustSense */}
        <div className="project-showcase project-showcase-flip reveal" data-accent="gold">
          <div className="ps-visual">
            <div className="ps-mockup ps-mockup-iot">
              <div className="iot-dashboard">
                <div className="iot-header"><span className="iot-status-dot"/><span>DustSense · LIVE</span></div>
                <div className="iot-reading">
                  <div className="iot-metric"><span className="iot-val">247</span><span className="iot-unit">µg/m³</span></div>
                  <div className="iot-bar-label">Air Quality Index (PM2.5)</div>
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
              <span className="ps-num">04</span>
              <span className="ps-badge ps-badge-iot">Hardware · IoT</span>
              <span className="ps-badge ps-badge-new">Featured</span>
            </div>
            <h3 className="ps-title">DustSense</h3>
            <p className="ps-tagline">Real-Time Air Quality Monitoring System</p>
            <p className="ps-desc">Designed an IoT-based air quality monitoring system using a Sharp GP2Y1010AU0F optical dust sensor and ESP8266 microcontroller. The system measures PM2.5 concentration in real time, transmits data over MQTT, and displays live analytics through a web dashboard.</p>
            <ul className="ps-highlights">
              <li><span className="ps-hi-dot"/>Real-time PM2.5 particulate monitoring</li>
              <li><span className="ps-hi-dot"/>Optical dust sensing with signal processing</li>
              <li><span className="ps-hi-dot"/>MQTT messaging for lightweight IoT telemetry</li>
              <li><span className="ps-hi-dot"/>Wi-Fi enabled ESP8266 microcontroller integration</li>
              <li><span className="ps-hi-dot"/>Live web dashboard & historical trend visualization</li>
            </ul>
            <div className="ps-stack">
              <span>ESP8266</span><span>MQTT</span><span>Embedded C</span><span>Arduino IDE</span><span>HTML</span><span>JavaScript</span><span>Dashboard</span>
            </div>
            <div className="ps-actions">
              <MagneticButton>
                <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="ps-btn">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </MagneticButton>
              <span className="ps-btn ps-btn-disabled" title="Live Demo Coming Soon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
                Live Demo
              </span>
            </div>
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
              { href: 'https://linkedin.com/in/rajbhokare1', label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
              { href: 'https://leetcode.com/u/RajBhokare/', label: 'LeetCode', path: 'M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z' },
            ].map(s => (
              <MagneticButton key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d={s.path}/></svg>
                  <span>{s.label}</span><span className="link-arrow">↗</span>
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Raj Bhokare</p>
          <p className="footer-built">Frontend & Full Stack Developer · Built with React, Vite, Three.js & Lenis</p>
        </div>
      </div>
    </footer>
  )
}

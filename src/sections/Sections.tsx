import React, { useState } from 'react'
import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiMysql,
  SiPython,
  SiCplusplus,
  SiGit,
  SiGooglecloud,
  SiJupyter,
} from 'react-icons/si'
import { FaJava, FaAws, FaLinkedin, FaGithub, FaQuoteLeft } from 'react-icons/fa6'
import {
  FiCode,
  FiServer,
  FiTool,
  FiCloud,
  FiDatabase,
  FiArrowUpRight,
  FiExternalLink,
  FiBookOpen,
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiCheck,
  FiMic,
  FiVideo,
  FiFileText,
  FiHeart,
  FiZap,
  FiMail,
  FiCopy,
  FiGlobe,
  FiLock,
  FiGrid,
} from 'react-icons/fi'
import { MagneticButton } from '../components/MagneticButton/MagneticButton'
import './Sections.css'

/* ── ABOUT ── */
export function About() {
  const coreStrengths = [
    { name: 'Frontend Development', desc: 'Building responsive, accessible interfaces with React & CSS.' },
    { name: 'Full-Stack Development', desc: 'Connecting dynamic frontend apps with server-side logic.' },
    { name: 'REST API Development', desc: 'Creating structured, reliable API endpoints with Express & Node.' },
    { name: 'Responsive UI', desc: 'Ensuring seamless experiences across mobile, tablet, and desktop.' },
    { name: 'Database Integration', desc: 'Managing application data with MongoDB and relational databases.' },
  ]

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">Developer Introduction</span>
          <h2 className="section-title">About Me</h2>
        </div>
        <div className="about-layout">
          <div className="about-text reveal">
            <p className="about-lead">
              Hi, I’m <strong>Raj Bhokare</strong> — a dedicated <strong>MERN Stack Developer</strong> focused on building clean, practical, and responsive web applications.
            </p>
            <p>
              My primary core stack includes <strong>React, JavaScript, Node.js, Express, and MongoDB</strong>. I enjoy crafting software that solves real-world problems through clean code structure, intuitive interfaces, and reliable API architecture.
            </p>
            <p>
              I am passionate about real-world software engineering and continuous technical learning. Currently, I am actively seeking <strong>internship and junior developer opportunities</strong> where I can contribute to engineering teams and build high-quality web applications.
            </p>
          </div>
          <div className="about-focus-card reveal">
            <h3 className="about-focus-title">Core Strengths & Focus</h3>
            <ul className="about-focus-list">
              {coreStrengths.map((item) => (
                <li key={item.name}>
                  <span className="focus-check"><FiCheck size={14} color="var(--cyan)" /></span>
                  <div>
                    <strong className="focus-name">{item.name}</strong>
                    <p className="focus-sub">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="about-status-banner">
              <span className="status-dot" />
              <span>Seeking Internship & Junior Developer Opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── SKILLS ── */
const SKILL_ICONS: Record<string, { icon: React.ReactElement; color: string }> = {
  'HTML5': { icon: <SiHtml5 />, color: '#E34F26' },
  'CSS3': { icon: <SiCss />, color: '#1572B6' },
  'JavaScript': { icon: <SiJavascript />, color: '#F7DF1E' },
  'Node.js': { icon: <SiNodedotjs />, color: '#5FA04E' },
  'Express.js': { icon: <SiExpress />, color: '#E1E1E1' },
  'React': { icon: <SiReact />, color: '#61DAFB' },
  'Bootstrap': { icon: <SiBootstrap />, color: '#7952B3' },
  'C++': { icon: <SiCplusplus />, color: '#00599C' },
  'Java': { icon: <FaJava />, color: '#ED8B00' },
  'Python': { icon: <SiPython />, color: '#3776AB' },
  'MySQL': { icon: <SiMysql />, color: '#4479A1' },
  'AWS': { icon: <FaAws />, color: '#FF9900' },
  'Google Cloud': { icon: <SiGooglecloud />, color: '#4285F4' },
  'Git': { icon: <SiGit />, color: '#F05032' },
  'Jupyter Notebook': { icon: <SiJupyter />, color: '#F37626' },
}

const skillGroups = [
  {
    icon: <FiCode size={18} />,
    title: 'Frontend Development',
    pills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    span: false,
    accent: 'cyan',
  },
  {
    icon: <FiServer size={18} />,
    title: 'Backend & Database Engineering',
    pills: ['Node.js', 'Express.js', 'MySQL', 'REST APIs'],
    span: false,
    accent: 'violet',
  },
  {
    icon: <FiTool size={18} />,
    title: 'Programming Languages & DSA',
    pills: ['C++', 'Java', 'Python', 'JavaScript'],
    span: false,
    accent: 'green',
  },
  {
    icon: <FiCloud size={18} />,
    title: 'Cloud & Developer Tools',
    pills: ['AWS', 'Google Cloud', 'Git', 'Jupyter Notebook'],
    span: false,
    accent: 'gold',
  },
]

export function Skills() {
  return (
    <section className="section section-dark" id="skills">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">Technical Capability</span>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        {/* Categorized Professional Skill Grids */}
        <div className="skills-layout">
          {skillGroups.map((g, i) => (
            <div
              key={g.title}
              className={`skill-group reveal${g.span ? ' skill-group-span' : ''}`}
              data-accent={g.accent}
              style={{ '--d': `${i * 80}ms` } as React.CSSProperties}
            >
              <div className="skill-group-header">
                <span className="skill-icon-wrap">{g.icon}</span>
                <h3 className="skill-group-title">{g.title}</h3>
              </div>
              <div className="skill-pills">
                {g.pills.map((name) => {
                  const item = SKILL_ICONS[name] || { icon: <FiCode />, color: 'var(--cyan)' }
                  return (
                    <span key={name} className="pill pill-with-icon">
                      <span className="pill-icon" style={{ color: item.color }}>
                        {item.icon}
                      </span>
                      <span>{name}</span>
                    </span>
                  )
                })}
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
    period: '2025 — Present', badge: 'Club Role', active: true,
    role: 'Web Developer', org: 'Binary Brains Club, Dr. D. Y. Patil Institute of Technology',
    bullets: [
      'Engineered responsive full-stack web modules using HTML, CSS, JavaScript, and Node.js.',
      'Collaborated within an Agile engineering team on feature rollouts, API integration, and peer code reviews.',
      'Optimized UI layouts for cross-browser accessibility and mobile responsiveness.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'Git'],
  },
  {
    period: '2025 — Present', badge: 'Open Source', active: true,
    role: 'Full-Stack Software Developer', org: 'Self-Initiated & Open Source Projects',
    bullets: [
      'Architected production-ready frontend applications using React and Node.js RESTful APIs.',
      'Designed relational MySQL database schemas and securely implemented session authentication workflows.',
      'Integrated third-party AI REST APIs (OpenAI Whisper, AssemblyAI) for high-throughput media transcription.',
    ],
    stack: ['React', 'JavaScript', 'Node.js', 'Express.js', 'MySQL', 'REST APIs'],
  },
  {
    period: '2025', badge: 'AI Systems', active: false,
    role: 'AI Application Developer', org: 'Academic & Project Engineering',
    bullets: [
      'Developed Briefly, an automated meeting recording summarizer using OpenAI Whisper API.',
      'Created Quizzer, an EdTech video analysis tool that extracts transcripts via AssemblyAI to auto-generate quizzes.',
      'Built clean server-side rendered interfaces in EJS with Node.js backend controllers.',
    ],
    stack: ['OpenAI Whisper', 'AssemblyAI', 'Node.js', 'Express.js', 'EJS', 'REST APIs'],
  },
  {
    period: '2024 — 2025', badge: 'Hardware / IoT', active: false,
    role: 'IoT & Telemetry Developer', org: 'Embedded Hardware Projects',
    bullets: [
      'Designed DustSense, a real-time PM2.5 air quality telemetry device using ESP8266 & Sharp optical sensors.',
      'Implemented lightweight MQTT messaging protocol for continuous telemetry payload transmission.',
      'Constructed a live web analytical dashboard for real-time sensor metrics visualization.',
    ],
    stack: ['ESP8266', 'Arduino C++', 'Embedded Systems', 'MQTT', 'Web Dashboards'],
  },
]

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">Engineering History</span>
          <h2 className="section-title exp-title">Experience & Leadership</h2>
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
                  <span className="exp-period">
                    <FiCalendar size={13} style={{ marginRight: 4, display: 'inline' }} /> {e.period}
                  </span>
                  <span className={`exp-badge${e.active ? ' exp-badge-active' : ''}`}>{e.badge}</span>
                </div>
                <h3 className="exp-role">{e.role}</h3>
                <p className="exp-org">{e.org}</p>
                <ul className="exp-bullet-list">
                  {e.bullets.map((b, idx) => (
                    <li key={idx}><span className="bullet-dash">•</span> {b}</li>
                  ))}
                </ul>
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
          <span className="section-eyebrow">Case Studies</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Project 1: Briefly */}
        <div className="project-showcase reveal" data-accent="violet">
          <div className="ps-visual">
            <div className="ps-mockup ps-mockup-briefly">
              <div className="briefly-ui">
                <div className="briefly-header">
                  <span className="briefly-logo">Briefly AI</span>
                  <span className="briefly-status">● Live Engine</span>
                </div>
                <div className="briefly-audio">
                  <div className="briefly-title">
                    <FiMic color="var(--violet)" /> Executive_Sync_2026.mp3
                  </div>
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
                  <div className="briefly-label">AI Extraction Summary</div>
                  <div className="briefly-item"><span><FiCheck size={12} /></span> Whisper Speech-to-Text transcribed</div>
                  <div className="briefly-item"><span><FiCheck size={12} /></span> Key decision points & action items ready</div>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-content">
            <div className="ps-meta">
              <span className="ps-num">01</span>
              <span className="ps-badge ps-badge-ai">AI · Full-Stack</span>
            </div>
            <h3 className="ps-title">Briefly</h3>
            <p className="ps-tagline">AI Powered Meeting Assistant & Speech Transcriber</p>
            <p className="ps-desc">An intelligent web application that processes audio recordings into structured executive summaries and action items. Automates transcription using OpenAI Whisper API to streamline team workflows.</p>
            <ul className="ps-highlights">
              <li><span className="ps-hi-dot"/>Audio payload upload and asynchronous processing pipeline</li>
              <li><span className="ps-hi-dot"/>High-accuracy speech transcription via OpenAI Whisper API</li>
              <li><span className="ps-hi-dot"/>Automated action item extraction & key takeaways generation</li>
              <li><span className="ps-hi-dot"/>Fast, responsive user dashboard built with Node.js and Express</li>
            </ul>
            <div className="ps-stack">
              <span>Node.js</span><span>Express.js</span><span>OpenAI Whisper API</span><span>JavaScript</span><span>EJS</span><span>CSS3</span>
            </div>
            <div className="ps-actions">
              <MagneticButton>
                <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="ps-btn">
                  <FaGithub size={15} />
                  Source Code
                </a>
              </MagneticButton>
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
                  <div className="app-card">
                    <div className="app-card-icon"><FiVideo color="var(--cyan)" size={18} /></div>
                    <div><div className="app-card-label">Media Ingested</div><div className="app-card-val">Lecture_03_ML.mp4</div></div>
                  </div>
                  <div className="app-progress-row"><span className="app-prog-label">Generating Assessment…</span><span className="app-prog-pct">100%</span></div>
                  <div className="app-prog-bar"><div className="app-prog-fill" style={{width:'100%'}}/></div>
                  <div className="app-quiz-preview">
                    <div className="app-q">Q1. What is gradient descent?</div>
                    <div className="app-opts">
                      <span className="app-opt app-opt-correct">◉ An optimization algorithm</span>
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
            <p className="ps-tagline">Video Summarizer & Interactive Assessment Generator</p>
            <p className="ps-desc">An educational web platform that converts video content into readable transcript summaries and automated interactive quizzes using AI speech analysis.</p>
            <ul className="ps-highlights">
              <li><span className="ps-hi-dot"/>Seamless media upload and automated transcript extraction</li>
              <li><span className="ps-hi-dot"/>Speech-to-text integration utilizing AssemblyAI REST API</li>
              <li><span className="ps-hi-dot"/>AI-generated topic digests and multiple-choice self-assessments</li>
              <li><span className="ps-hi-dot"/>Clean, accessible UI built for student and educator usability</li>
            </ul>
            <div className="ps-stack">
              <span>Node.js</span><span>Express.js</span><span>AssemblyAI API</span><span>JavaScript</span><span>Bootstrap</span><span>CSS3</span>
            </div>
            <div className="ps-actions">
              <MagneticButton>
                <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="ps-btn">
                  <FaGithub size={15} />
                  Source Code
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Project 3: EduQuest */}
        <div className="project-showcase reveal" data-accent="coral">
          <div className="ps-visual">
            <div className="ps-mockup ps-mockup-edu">
              <div className="edu-ui">
                <div className="edu-nav">EduQuest <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FiBookOpen size={12} /> LMS Platform</span></div>
                <div className="edu-hero-text">Digital Learning Engine</div>
                <div className="edu-cards">
                  <div className="edu-card"><FiBookOpen size={14} /><span>Courses</span></div>
                  <div className="edu-card edu-card-active"><FiFileText size={14} /><span>Quizzes</span></div>
                  <div className="edu-card"><FiCheckCircle size={14} /><span>Analytics</span></div>
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
            <div className="ps-meta"><span className="ps-num">03</span><span className="ps-badge ps-badge-web">Full-Stack · Education</span></div>
            <h3 className="ps-title">EduQuest</h3>
            <p className="ps-tagline">Learning Management System & Student Portal</p>
            <p className="ps-desc">A full-stack Learning Management System supporting student course participation, educator content management, and performance tracking backed by relational databases.</p>
            <ul className="ps-highlights">
              <li><span className="ps-hi-dot"/>Role-based authentication system for students and instructors</li>
              <li><span className="ps-hi-dot"/>Relational database schema design in MySQL for course data integrity</li>
              <li><span className="ps-hi-dot"/>RESTful API controllers for CRUD operations on quizzes and courses</li>
              <li><span className="ps-hi-dot"/>Progress analytics & interactive score tracking dashboards</li>
            </ul>
            <div className="ps-stack">
              <span>Node.js</span><span>Express.js</span><span>MySQL</span><span>REST APIs</span><span>EJS</span><span>Bootstrap</span>
            </div>
            <div className="ps-actions">
              <MagneticButton>
                <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="ps-btn">
                  <FaGithub size={15} />
                  Source Code
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Project 4: DustSense */}
        <div className="project-showcase project-showcase-flip reveal" data-accent="gold">
          <div className="ps-visual">
            <div className="ps-mockup ps-mockup-iot">
              <div className="iot-dashboard">
                <div className="iot-header"><span className="iot-status-dot"/><span>DustSense · TELEMETRY ONLINE</span></div>
                <div className="iot-reading">
                  <div className="iot-metric"><span className="iot-val">247</span><span className="iot-unit">µg/m³ PM2.5</span></div>
                  <div className="iot-bar-label">Air Quality Level</div>
                  <div className="iot-bar-track">
                    <div className="iot-bar-fill" style={{width:'62%'}}/>
                  </div>
                </div>
                <div className="iot-chips">
                  <span className="iot-chip"><span>●</span> ESP8266 Wi-Fi</span>
                  <span className="iot-chip"><span>●</span> Sharp Dust Sensor</span>
                  <span className="iot-chip"><span>●</span> MQTT Protocol</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-content">
            <div className="ps-meta">
              <span className="ps-num">04</span>
              <span className="ps-badge ps-badge-iot">Hardware · Systems</span>
            </div>
            <h3 className="ps-title">DustSense</h3>
            <p className="ps-tagline">Real-Time IoT Air Quality Telemetry System</p>
            <p className="ps-desc">An end-to-end IoT monitoring solution leveraging a Sharp optical dust sensor and ESP8266 microcontroller to sample particulate matter (PM2.5) and stream live metrics via MQTT to a web dashboard.</p>
            <ul className="ps-highlights">
              <li><span className="ps-hi-dot"/>Real-time optical PM2.5 particulate concentration sensing</li>
              <li><span className="ps-hi-dot"/>Lightweight MQTT publish-subscribe messaging architecture</li>
              <li><span className="ps-hi-dot"/>Wi-Fi micro-controller firmware written in C++ (Arduino IDE)</li>
              <li><span className="ps-hi-dot"/>Live web metrics visualization dashboard for historical analytics</li>
            </ul>
            <div className="ps-stack">
              <span>ESP8266</span><span>Arduino C++</span><span>MQTT</span><span>Sensors</span><span>JavaScript</span><span>HTML/CSS</span>
            </div>
            <div className="ps-actions">
              <MagneticButton>
                <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="ps-btn">
                  <FaGithub size={15} />
                  Source Code
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── WHAT I BUILD ── */
const buildCapabilities = [
  {
    icon: <FiGlobe size={20} color="var(--cyan)" />,
    title: 'Responsive Web Applications',
    desc: 'Developing mobile-friendly, accessible, and performant web interfaces using React, HTML5, and modern CSS.',
  },
  {
    icon: <FiServer size={20} color="var(--violet)" />,
    title: 'REST APIs',
    desc: 'Designing and building structured, scalable backend RESTful API endpoints using Node.js and Express.js.',
  },
  {
    icon: <FiLock size={20} color="var(--green)" />,
    title: 'Authentication & Authorization',
    desc: 'Implementing secure user login flows, JWT token management, password hashing, and role-based access controls.',
  },
  {
    icon: <FiDatabase size={20} color="var(--gold)" />,
    title: 'Database-Driven Applications',
    desc: 'Architecting relational MySQL schemas and MongoDB document models for reliable storage and efficient queries.',
  },
  {
    icon: <FiGrid size={20} color="var(--coral)" />,
    title: 'Admin Dashboards',
    desc: 'Building operational dashboards with metrics tracking, status indicators, and clean administrative user interfaces.',
  },
  {
    icon: <FiZap size={20} color="var(--cyan)" />,
    title: 'API Integrations',
    desc: 'Connecting third-party REST services, AI speech APIs, webhooks, and cloud endpoints into existing web stacks.',
  },
]

export function WhatIBuild() {
  return (
    <section className="section section-dark" id="capabilities">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">Practical Capabilities</span>
          <h2 className="section-title">What I Build</h2>
        </div>
        <div className="build-grid">
          {buildCapabilities.map((item, i) => (
            <div
              className="build-card reveal"
              key={item.title}
              style={{ '--d': `${i * 60}ms` } as React.CSSProperties}
            >
              <div className="build-card-icon">{item.icon}</div>
              <h3 className="build-card-title">{item.title}</h3>
              <p className="build-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CONTACT / FOOTER ── */
export function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'rajbhokare1@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-main reveal">
          <div className="footer-cta">
            <p className="footer-eyebrow">Direct Contact</p>
            <h2 className="footer-heading">Let's Connect &<br/><em>Build Together.</em></h2>
            <p className="footer-sub">Open to full-stack developer roles, software engineering internships, and technical collaborations.</p>
          </div>
          <div className="footer-links">
            <MagneticButton>
              <a href={`mailto:${email}`} className="footer-social-link primary-contact-btn">
                <FiMail size={16} />
                <span>{email}</span>
                <span className="link-arrow"><FiArrowUpRight size={14} /></span>
              </a>
            </MagneticButton>
            <MagneticButton>
              <button onClick={copyEmail} className="footer-social-link copy-btn">
                {copied ? <FiCheck size={16} color="var(--green)" /> : <FiCopy size={16} />}
                <span>{copied ? 'Email Copied!' : 'Copy Email Address'}</span>
              </button>
            </MagneticButton>
            <MagneticButton>
              <a href="https://linkedin.com/in/rajbhokare1" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FaLinkedin size={16} />
                <span>LinkedIn Profile</span>
                <span className="link-arrow"><FiArrowUpRight size={14} /></span>
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                <FaGithub size={16} />
                <span>GitHub Repositories</span>
                <span className="link-arrow"><FiArrowUpRight size={14} /></span>
              </a>
            </MagneticButton>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Raj Bhokare. All rights reserved.</p>
          <p className="footer-built">
            Full-Stack Software Engineer · React, TypeScript, Three.js & Node.js
          </p>
        </div>
      </div>
    </footer>
  )
}

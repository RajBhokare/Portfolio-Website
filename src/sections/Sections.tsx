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
  FiDownload,
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

/* ── EXPERIENCE & DEVELOPMENT ── */
const experiences = [
  {
    period: '2025 — Present', badge: 'Technical Club', active: true,
    role: 'Web Developer', org: 'Binary Brains Club · Dr. D. Y. Patil Institute of Technology',
    bullets: [
      'Developed responsive full-stack web components using HTML, CSS, JavaScript, and Node.js.',
      'Collaborated with peer engineering members on feature implementation, code reviews, and API testing.',
      'Optimized interface layouts for cross-device mobile responsiveness and browser accessibility.',
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'Git'],
  },
  {
    period: '2025 — Present', badge: 'Independent / Open Source', active: true,
    role: 'Full-Stack Developer', org: 'Independent & Open Source Development',
    bullets: [
      'Built web applications using React for frontend UIs and Express/Node.js for backend services.',
      'Designed database schemas in MySQL and MongoDB for application data persistence.',
      'Integrated RESTful APIs and implemented user authentication workflows.',
    ],
    stack: ['React', 'JavaScript', 'Node.js', 'Express.js', 'MySQL', 'MongoDB'],
  },
  {
    period: '2025', badge: 'Academic Project', active: false,
    role: 'AI Application Engineering', org: 'Academic & Applied Software Development',
    bullets: [
      'Developed Briefly, an automated meeting assistant incorporating OpenAI Whisper API for speech-to-text.',
      'Built Quizzer, an EdTech application leveraging AssemblyAI API for transcript analysis and quiz generation.',
      'Created server-side controllers and view templates for processing media uploads.',
    ],
    stack: ['React', 'Node.js', 'Express.js', 'OpenAI Whisper', 'AssemblyAI API'],
  },
  {
    period: '2024 — 2025', badge: 'Hardware & Systems', active: false,
    role: 'IoT Systems Developer', org: 'Embedded Engineering Projects',
    bullets: [
      'Built DustSense, an environmental monitoring device using ESP8266 microcontroller and optical sensors.',
      'Implemented lightweight MQTT messaging protocol to stream live PM2.5 telemetry over Wi-Fi.',
      'Constructed a web-based analytical dashboard for real-time sensor metrics visualization.',
    ],
    stack: ['ESP8266', 'Arduino C++', 'MQTT', 'JavaScript', 'HTML/CSS'],
  },
]

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">Real-World Software Engineering</span>
          <h2 className="section-title exp-title">Experience & Development</h2>
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

/* ── EDUCATION ── */
export function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">Academic Background</span>
          <h2 className="section-title">Education</h2>
        </div>

        <div className="education-card reveal">
          <div className="edu-main-info">
            <div>
              <span className="edu-year">2022 — 2026 (Expected)</span>
              <h3 className="edu-degree">Bachelor of Technology (B.Tech) in Information Technology</h3>
              <p className="edu-institution">Dr. D. Y. Patil Institute of Technology · Pune, India</p>
            </div>
            <span className="edu-badge">3rd Year Student</span>
          </div>

          <div className="edu-coursework">
            <span className="edu-coursework-title">Relevant Technical Coursework:</span>
            <div className="edu-coursework-tags">
              <span>Data Structures & Algorithms</span>
              <span>Object-Oriented Programming (OOP)</span>
              <span>Database Management Systems (DBMS)</span>
              <span>Web Development</span>
              <span>Software Engineering</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── FEATURED PROJECTS ── */
export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">Practical Software Applications</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Project 1: Briefly */}
        <div className="project-showcase reveal" data-accent="cyan">
          <div className="ps-visual">
            <div className="ps-mockup ps-mockup-briefly">
              <div className="briefly-ui">
                <div className="briefly-header">
                  <span className="briefly-logo">Briefly AI</span>
                  <span className="briefly-status">● Speech Pipeline Active</span>
                </div>
                <div className="briefly-audio">
                  <div className="briefly-title">
                    <FiMic color="var(--cyan)" /> Meeting_Transcription_Sync.mp3
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
                  <div className="briefly-label">AI Extraction Result</div>
                  <div className="briefly-item"><span><FiCheck size={12} /></span> Whisper API speech-to-text complete</div>
                  <div className="briefly-item"><span><FiCheck size={12} /></span> Key decision points & action items extracted</div>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-content">
            <div className="ps-meta">
              <span className="ps-num">01</span>
              <span className="ps-badge ps-badge-ai">Full-Stack · AI</span>
            </div>
            <h3 className="ps-title">Briefly</h3>

            <div className="ps-section-block">
              <span className="ps-section-label">WHAT IT IS</span>
              <p className="ps-tagline">An automated meeting assistant and audio transcription platform for generating structured notes from recorded discussions.</p>
            </div>

            <div className="ps-section-block">
              <span className="ps-section-label">WHAT I BUILT</span>
              <ul className="ps-highlights">
                <li><span className="ps-hi-dot">•</span> Engineered an asynchronous audio upload pipeline to process recorded meeting files.</li>
                <li><span className="ps-hi-dot">•</span> Integrated OpenAI Whisper REST API for high-accuracy speech-to-text transcription.</li>
                <li><span className="ps-hi-dot">•</span> Implemented automated text processing logic to extract key action items and executive decision points.</li>
                <li><span className="ps-hi-dot">•</span> Developed a responsive web interface for managing audio playback, viewing transcripts, and exporting notes.</li>
              </ul>
            </div>

            <div className="ps-tech-row">
              <span className="ps-tech-label">TECHNOLOGIES</span>
              <div className="ps-stack">
                <span>React</span><span>JavaScript</span><span>Node.js</span><span>Express.js</span><span>OpenAI Whisper API</span>
              </div>
            </div>

            <div className="ps-actions">
              <MagneticButton>
                <a href="#contact" className="ps-btn ps-btn-demo">
                  <FiExternalLink size={14} />
                  Live Demo
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="ps-btn ps-btn-github">
                  <FaGithub size={14} />
                  GitHub
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
                  <div className="app-url">quizzer.app/assessment</div>
                </div>
                <div className="app-body">
                  <div className="app-card">
                    <div className="app-card-icon"><FiVideo color="var(--cyan)" size={18} /></div>
                    <div><div className="app-card-label">Media Processed</div><div className="app-card-val">Lecture_ML_Overview.mp4</div></div>
                  </div>
                  <div className="app-progress-row"><span className="app-prog-label">Generating Quiz…</span><span className="app-prog-pct">100%</span></div>
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
            <div className="ps-meta">
              <span className="ps-num">02</span>
              <span className="ps-badge ps-badge-ai">EdTech · Full-Stack</span>
            </div>
            <h3 className="ps-title">Quizzer</h3>

            <div className="ps-section-block">
              <span className="ps-section-label">WHAT IT IS</span>
              <p className="ps-tagline">An educational assessment generator that processes video content to produce interactive multiple-choice quizzes and summaries.</p>
            </div>

            <div className="ps-section-block">
              <span className="ps-section-label">WHAT I BUILT</span>
              <ul className="ps-highlights">
                <li><span className="ps-hi-dot">•</span> Built an automated media processing workflow using AssemblyAI REST API for video transcript extraction.</li>
                <li><span className="ps-hi-dot">•</span> Developed server-side controllers in Node.js to generate structured assessment questions from extracted text.</li>
                <li><span className="ps-hi-dot">•</span> Created interactive client-side quiz interfaces with state management for instant score calculation.</li>
                <li><span className="ps-hi-dot">•</span> Implemented student progress tracking and assessment performance summaries.</li>
              </ul>
            </div>

            <div className="ps-tech-row">
              <span className="ps-tech-label">TECHNOLOGIES</span>
              <div className="ps-stack">
                <span>React</span><span>JavaScript</span><span>Node.js</span><span>Express.js</span><span>AssemblyAI API</span><span>Bootstrap</span>
              </div>
            </div>

            <div className="ps-actions">
              <MagneticButton>
                <a href="#contact" className="ps-btn ps-btn-demo">
                  <FiExternalLink size={14} />
                  Live Demo
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="ps-btn ps-btn-github">
                  <FaGithub size={14} />
                  GitHub
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
                <div className="edu-nav">EduQuest <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FiBookOpen size={12} /> LMS Portal</span></div>
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
            <div className="ps-meta">
              <span className="ps-num">03</span>
              <span className="ps-badge ps-badge-web">Full-Stack · Education</span>
            </div>
            <h3 className="ps-title">EduQuest</h3>

            <div className="ps-section-block">
              <span className="ps-section-label">WHAT IT IS</span>
              <p className="ps-tagline">A full-stack Learning Management System providing course administration, quiz delivery, and student analytics.</p>
            </div>

            <div className="ps-section-block">
              <span className="ps-section-label">WHAT I BUILT</span>
              <ul className="ps-highlights">
                <li><span className="ps-hi-dot">•</span> Architected relational database schemas in MySQL with foreign key relationships for course, quiz, and user data.</li>
                <li><span className="ps-hi-dot">•</span> Implemented role-based authentication and authorization for student and instructor permissions.</li>
                <li><span className="ps-hi-dot">•</span> Developed RESTful CRUD API endpoints in Express to handle course enrollment and quiz submissions.</li>
                <li><span className="ps-hi-dot">•</span> Built responsive analytical dashboards to display student progress metrics and course completion data.</li>
              </ul>
            </div>

            <div className="ps-tech-row">
              <span className="ps-tech-label">TECHNOLOGIES</span>
              <div className="ps-stack">
                <span>Node.js</span><span>Express.js</span><span>MySQL</span><span>JavaScript</span><span>REST APIs</span><span>HTML/CSS</span>
              </div>
            </div>

            <div className="ps-actions">
              <MagneticButton>
                <a href="#contact" className="ps-btn ps-btn-demo">
                  <FiExternalLink size={14} />
                  Live Demo
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="ps-btn ps-btn-github">
                  <FaGithub size={14} />
                  GitHub
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
                  <span className="iot-chip"><span>●</span> Optical Dust Sensor</span>
                  <span className="iot-chip"><span>●</span> MQTT Protocol</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-content">
            <div className="ps-meta">
              <span className="ps-num">04</span>
              <span className="ps-badge ps-badge-iot">IoT · Hardware</span>
            </div>
            <h3 className="ps-title">DustSense</h3>

            <div className="ps-section-block">
              <span className="ps-section-label">WHAT IT IS</span>
              <p className="ps-tagline">A real-time IoT air quality telemetry system streaming PM2.5 particulate concentration metrics to a web dashboard.</p>
            </div>

            <div className="ps-section-block">
              <span className="ps-section-label">WHAT I BUILT</span>
              <ul className="ps-highlights">
                <li><span className="ps-hi-dot">•</span> Programmed ESP8266 microcontroller firmware in C++ to sample optical dust sensor readings.</li>
                <li><span className="ps-hi-dot">•</span> Implemented lightweight MQTT publish-subscribe messaging for real-time sensor payload transmission over Wi-Fi.</li>
                <li><span className="ps-hi-dot">•</span> Developed a backend service to parse incoming telemetry metrics and log historical air quality data.</li>
                <li><span className="ps-hi-dot">•</span> Built a live monitoring web dashboard with dynamic status indicators for real-time environmental tracking.</li>
              </ul>
            </div>

            <div className="ps-tech-row">
              <span className="ps-tech-label">TECHNOLOGIES</span>
              <div className="ps-stack">
                <span>ESP8266</span><span>Arduino C++</span><span>MQTT</span><span>JavaScript</span><span>HTML/CSS</span><span>REST APIs</span>
              </div>
            </div>

            <div className="ps-actions">
              <MagneticButton>
                <a href="#contact" className="ps-btn ps-btn-demo">
                  <FiExternalLink size={14} />
                  Live Demo
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="ps-btn ps-btn-github">
                  <FaGithub size={14} />
                  GitHub
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

/* ── RESUME CTA ── */
export function ResumeCTA() {
  return (
    <section className="section" id="resume-cta">
      <div className="container">
        <div className="resume-cta-card reveal">
          <span className="section-eyebrow">Opportunities & Collaboration</span>
          <h2 className="resume-cta-title">Interested in working together?</h2>
          <p className="resume-cta-desc">
            I'm currently open to internship and junior developer opportunities.
          </p>

          <div className="resume-cta-actions">
            {/* Note: Place your resume PDF file (e.g. resume.pdf) into the public/ folder and update href below to "/resume.pdf" */}
            <MagneticButton>
              <a
                href="#contact"
                className="ps-btn ps-btn-demo resume-btn-primary"
              >
                <FiDownload size={15} />
                Download Resume
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://github.com/RajBhokare"
                target="_blank"
                rel="noopener noreferrer"
                className="ps-btn ps-btn-github"
              >
                <FaGithub size={15} />
                View GitHub
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://linkedin.com/in/raj-bhokare"
                target="_blank"
                rel="noopener noreferrer"
                className="ps-btn ps-btn-github"
              >
                <FaLinkedin size={15} />
                Connect on LinkedIn
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── CONTACT / FOOTER ── */
export function Contact() {
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const email = 'rajbhokare1@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill out all fields before sending.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    }, 600)
  }

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="section-title">Let's Connect</h2>
        </div>

        <div className="contact-grid reveal">
          {/* Left Column: Direct Links */}
          <div className="contact-info">
            <p className="contact-lead">
              If you're looking for a motivated developer for an internship or junior software development opportunity, I'd be happy to connect.
            </p>

            <div className="contact-direct-links">
              <a href={`mailto:${email}`} className="contact-card primary-contact">
                <div className="contact-card-icon"><FiMail size={18} color="var(--cyan)" /></div>
                <div>
                  <span className="contact-card-label">Email Address</span>
                  <strong className="contact-card-val">{email}</strong>
                </div>
                <FiArrowUpRight className="contact-card-arrow" size={16} />
              </a>

              <button onClick={copyEmail} className="contact-card contact-card-button" type="button">
                <div className="contact-card-icon">
                  {copied ? <FiCheck size={18} color="var(--green)" /> : <FiCopy size={18} color="var(--cyan)" />}
                </div>
                <div>
                  <span className="contact-card-label">Quick Copy</span>
                  <strong className="contact-card-val">{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</strong>
                </div>
              </button>

              <a href="https://linkedin.com/in/rajbhokare1" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-card-icon"><FaLinkedin size={18} color="var(--cyan)" /></div>
                <div>
                  <span className="contact-card-label">LinkedIn</span>
                  <strong className="contact-card-val">linkedin.com/in/rajbhokare1</strong>
                </div>
                <FiArrowUpRight className="contact-card-arrow" size={16} />
              </a>

              <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-card-icon"><FaGithub size={18} color="var(--cyan)" /></div>
                <div>
                  <span className="contact-card-label">GitHub</span>
                  <strong className="contact-card-val">github.com/RajBhokare</strong>
                </div>
                <FiArrowUpRight className="contact-card-arrow" size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form-wrap">
            {status === 'success' ? (
              <div className="contact-success-box">
                <div className="success-icon"><FiCheckCircle size={32} color="var(--green)" /></div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. I’ll review your message and get back to you shortly.</p>
                <button onClick={() => setStatus('idle')} className="ps-btn ps-btn-github" type="button">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <h3 className="form-title">Send a Direct Message</h3>

                {errorMessage && (
                  <div className="form-error-banner" role="alert">
                    {errorMessage}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="contact-name">Name <span className="req">*</span></label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name or Organization"
                    required
                    aria-required="true"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Email <span className="req">*</span></label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="recruiter@company.com"
                    required
                    aria-required="true"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message <span className="req">*</span></label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello Raj, we are interested in discussing an opportunity..."
                    required
                    aria-required="true"
                    className="form-input form-textarea"
                  />
                </div>

                <MagneticButton>
                  <button
                    type="submit"
                    className="ps-btn ps-btn-demo form-submit-btn"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? 'Sending Message…' : 'Send Message'}
                  </button>
                </MagneticButton>
              </form>
            )}
          </div>
        </div>

        <div className="site-footer">
          <div className="site-footer-top">
            <div className="site-footer-brand">
              <h3 className="site-footer-name">Raj Bhokare</h3>
              <p className="site-footer-role">MERN Stack Developer</p>
            </div>

            <nav className="site-footer-nav" aria-label="Footer Navigation">
              <a href="#hero">Home</a>
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="site-footer-links">
              <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <FaGithub size={14} /> GitHub
              </a>
              <a href="https://linkedin.com/in/rajbhokare1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <FaLinkedin size={14} /> LinkedIn
              </a>
              <a href={`mailto:${email}`} aria-label="Send Email">
                <FiMail size={14} /> Email
              </a>
            </div>
          </div>

          <div className="site-footer-bottom">
            <p className="footer-copy">© 2026 Raj Bhokare. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

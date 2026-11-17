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
  SiLeetcode,
  SiMongodb,
  SiTailwindcss,
  SiFastapi,
  SiPostman,
  SiFirebase,
  SiVercel,
  SiRender,
  SiLinux,
} from 'react-icons/si'
import { FaJava, FaAws, FaLinkedin, FaGithub } from 'react-icons/fa6'
import {
  FiCode,
  FiServer,
  FiTool,
  FiCloud,
  FiDatabase,
  FiArrowUpRight,
  FiExternalLink,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiCheck,
  FiMic,
  FiVideo,
  FiFileText,
  FiZap,
  FiMail,
  FiCopy,
  FiGlobe,
  FiLock,
  FiGrid,
  FiDownload,
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiCpu,
} from 'react-icons/fi'
import { MagneticButton } from '../components/MagneticButton/MagneticButton'
import './Sections.css'

/* ── ABOUT ── */
export function About() {
  const coreStrengths = [
    { name: 'Full-Stack & Microservices', desc: 'React.js, Node.js, Express.js, MongoDB, MySQL & Python FastAPI microservices.' },
    { name: 'AI Application Engineering', desc: 'Speech-to-text, meeting assistants & video summarization (Whisper API, AssemblyAI).' },
    { name: 'Technical Leadership', desc: 'Web Development Team Lead at Binary Brains Club, directing 10+ engineers.' },
    { name: 'Competitive Coding & Hackathons', desc: '250+ DSA problems solved (LeetCode/GFG); GDG 2026 Finalist; SIH & DevClash participant.' },
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
              Hi, I’m <strong>Raj Bhokare</strong> — a <strong>Full Stack Developer</strong>, <strong>AI Application Developer</strong>, and <strong>Web Development Team Lead</strong> based in Pune, India.
            </p>
            <p>
              Third-Year Information Technology Engineering student at <strong>Dr. D. Y. Patil Institute of Technology, Pune</strong> (CGPA: <strong>8.71/10</strong>), specializing in full-stack web development with <strong>React.js, Node.js, Express.js, MongoDB, and MySQL</strong>, alongside <strong>Python FastAPI microservices</strong>.
            </p>
            <p>
              I build AI-integrated applications using <strong>Whisper API</strong> (meeting transcription and structured summaries) and <strong>AssemblyAI</strong> (video transcription and automated quiz generation), delivering end-to-end solutions within intensive 12 to 24-hour hackathon timelines.
            </p>
            <p>
              As <strong>Web Development Team Lead</strong> at <strong>Binary Brains Club, DIT Pune</strong>, I lead a 10+ member team through sprint planning, task allocation, technical mentoring, and code reviews, while regularly competing in national hackathons including SIH, DevClash, Vortexa, and Kurukshetra.
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
  'React.js': { icon: <SiReact />, color: '#61DAFB' },
  'Tailwind CSS': { icon: <SiTailwindcss />, color: '#06B6D4' },
  'Bootstrap': { icon: <SiBootstrap />, color: '#7952B3' },
  'EJS': { icon: <FiCode />, color: '#B4CA65' },
  'FastAPI': { icon: <SiFastapi />, color: '#009688' },
  'Microservices Architecture': { icon: <FiServer />, color: '#6366F1' },
  'REST API Design': { icon: <FiServer />, color: '#38BDF8' },
  'MongoDB': { icon: <SiMongodb />, color: '#47A248' },
  'MySQL': { icon: <SiMysql />, color: '#4479A1' },
  'C++': { icon: <SiCplusplus />, color: '#00599C' },
  'Java': { icon: <FaJava />, color: '#ED8B00' },
  'Python': { icon: <SiPython />, color: '#3776AB' },
  'SQL': { icon: <FiDatabase />, color: '#00758F' },
  'Whisper API': { icon: <FiMic />, color: '#10B981' },
  'AssemblyAI': { icon: <FiVideo />, color: '#6366F1' },
  'Git': { icon: <SiGit />, color: '#F05032' },
  'GitHub': { icon: <FaGithub />, color: '#E6EDF3' },
  'Postman': { icon: <SiPostman />, color: '#FF6C37' },
  'Firebase': { icon: <SiFirebase />, color: '#FFCA28' },
  'Vercel': { icon: <SiVercel />, color: '#FFFFFF' },
  'Render': { icon: <SiRender />, color: '#46E3B7' },
  'Linux': { icon: <SiLinux />, color: '#FCC624' },
  'Data Structures & Algorithms': { icon: <SiLeetcode />, color: '#FFA116' },
  'Object-Oriented Programming': { icon: <FiCode />, color: '#38BDF8' },
  'DBMS': { icon: <FiDatabase />, color: '#4479A1' },
  'Operating Systems': { icon: <FiCpu />, color: '#EC4899' },
  'Computer Networks': { icon: <FiGlobe />, color: '#06B6D4' },
  'SDLC': { icon: <FiTool />, color: '#A855F7' },
  'Agile Development': { icon: <FiUsers />, color: '#10B981' },
}

const skillGroups = [
  {
    icon: <FiCode size={18} />,
    title: 'Frontend Development',
    pills: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'EJS'],
    span: false,
    accent: 'cyan',
  },
  {
    icon: <FiServer size={18} />,
    title: 'Backend Development',
    pills: ['Node.js', 'Express.js', 'FastAPI', 'Microservices Architecture'],
    span: false,
    accent: 'violet',
  },
  {
    icon: <FiDatabase size={18} />,
    title: 'Databases',
    pills: ['MongoDB', 'MySQL'],
    span: false,
    accent: 'green',
  },
  {
    icon: <FiTool size={18} />,
    title: 'Programming Languages',
    pills: ['Java', 'Python', 'C++', 'JavaScript', 'SQL'],
    span: false,
    accent: 'gold',
  },
  {
    icon: <FiZap size={18} />,
    title: 'APIs & Integrations',
    pills: ['REST API Design', 'Whisper API', 'AssemblyAI'],
    span: false,
    accent: 'cyan',
  },
  {
    icon: <FiCloud size={18} />,
    title: 'Developer Tools & Platforms',
    pills: ['Git', 'GitHub', 'Postman', 'Firebase', 'Vercel', 'Render', 'Linux'],
    span: false,
    accent: 'violet',
  },
  {
    icon: <FiBookOpen size={18} />,
    title: 'Computer Science Fundamentals',
    pills: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
      'SDLC',
      'Agile Development',
    ],
    span: true,
    accent: 'green',
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

/* ── POSITION OF RESPONSIBILITY ── */
const experiences = [
  {
    period: 'September 2026 — Present',
    badge: 'Current Role · Promoted',
    active: true,
    role: 'Web Development Team Lead',
    org: 'Binary Brains Club · Dr. D. Y. Patil Institute of Technology, Pune',
    bullets: [
      'Lead a 10+ member web development team: plan development activities, assign tasks and coordinate project execution.',
      'Mentor junior developers in React.js, JavaScript, Node.js and Git through technical guidance and code reviews.',
      'Collaborate with design, DSA and event teams to deliver web solutions for club initiatives, hackathons and technical events.',
    ],
    stack: ['React.js', 'JavaScript', 'Node.js', 'Git', 'Team Leadership', 'Sprint Delivery'],
  },
  {
    period: 'September 2025 — August 2026',
    badge: 'Previous Role',
    active: false,
    role: 'Member, Web Development Team',
    org: 'Binary Brains Club · Dr. D. Y. Patil Institute of Technology, Pune',
    bullets: [
      'Developed responsive full-stack web applications with modern JavaScript technologies for collaborative hackathons.',
      'Organized DSA-focused coding events; volunteered at Hash It Out (Web Development Hackathon) and AlgoHeist (DSA Contest).',
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express.js', 'Git', 'Hackathon Dev'],
  },
]

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">Leadership & Engineering</span>
          <h2 className="section-title exp-title">Position of Responsibility</h2>
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
  const academicYears = [
    {
      year: '1st Year',
      cgpa: '8.84',
      semesters: [
        { name: '1st Sem', sgpa: '8.68' },
        { name: '2nd Sem', sgpa: '9.00' },
      ],
    },
    {
      year: '2nd Year',
      cgpa: '8.57',
      semesters: [
        { name: '3rd Sem', sgpa: '8.64' },
        { name: '4th Sem', sgpa: '8.50' },
      ],
    },
  ]

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
              <span className="edu-year">September 2024 – May 2028 (Expected)</span>
              <h3 className="edu-degree">Bachelor of Engineering in Information Technology</h3>
              <p className="edu-institution">Dr. D. Y. Patil Institute of Technology · Pune, India</p>
            </div>
            <span className="edu-badge">CGPA: 8.71/10</span>
          </div>

          {/* Continuous GPA Consistency Breakdown */}
          <div className="edu-gpa-section">
            <span className="edu-section-subtitle">Academic Consistency & Semester GPAs:</span>
            <div className="edu-gpa-grid">
              {academicYears.map((yr) => (
                <div key={yr.year} className="edu-gpa-card">
                  <div className="edu-gpa-header">
                    <span className="edu-gpa-year">{yr.year}</span>
                    <span className="edu-gpa-cgpa">CGPA: <strong>{yr.cgpa}</strong></span>
                  </div>
                  <div className="edu-sem-list">
                    {yr.semesters.map((sem) => (
                      <div key={sem.name} className="edu-sem-item">
                        <span className="edu-sem-name">{sem.name} SGPA</span>
                        <span className="edu-sem-sgpa"><strong>{sem.sgpa}</strong></span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="edu-coursework">
            <span className="edu-coursework-title">Relevant Technical Coursework:</span>
            <div className="edu-coursework-tags">
              <span>Data Structures & Algorithms</span>
              <span>Object-Oriented Programming (OOP)</span>
              <span>Database Management Systems (DBMS)</span>
              <span>Operating Systems</span>
              <span>Computer Networks</span>
              <span>Software Development Life Cycle (SDLC)</span>
              <span>Agile Development</span>
              <span>AIML</span>
              <span>Theory of Computation</span>
              <span>Processor Architecture</span>
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
              <span className="ps-badge ps-badge-ai">DevClash 2026 · AI &amp; Full-Stack</span>
            </div>
            <h3 className="ps-title">Briefly</h3>

            <div className="ps-section-block">
              <span className="ps-section-label">WHAT IT IS</span>
              <p className="ps-tagline">AI-Powered Meeting Assistant developed during the DevClash 2026 24-hour hackathon to turn long meeting recordings into structured summaries, extracted action items and searchable transcripts.</p>
            </div>

            <div className="ps-section-block">
              <span className="ps-section-label">KEY CONTRIBUTIONS</span>
              <ul className="ps-highlights">
                <li><span className="ps-hi-dot">•</span> Developed during the DevClash 2026 24-hour hackathon to turn long meeting recordings into structured summaries, extracted action items and searchable transcripts.</li>
                <li><span className="ps-hi-dot">•</span> Integrated the Whisper API into the Node.js and Express.js backend for speech-to-text transcription of uploaded recordings.</li>
                <li><span className="ps-hi-dot">•</span> Designed modular REST APIs to separate the transcription and summarization workflows.</li>
              </ul>
            </div>

            <div className="ps-tech-row">
              <span className="ps-tech-label">TECH STACK</span>
              <div className="ps-stack">
                <span>Node.js</span><span>Express.js</span><span>REST APIs</span><span>Whisper API</span>
              </div>
            </div>

            <div className="ps-actions">
              <MagneticButton>
                <a href="https://brieflyai-three.vercel.app/" target="_blank" rel="noopener noreferrer" className="ps-btn ps-btn-demo">
                  <FiExternalLink size={14} />
                  Live Demo
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://github.com/RajBhokare/briefly_ai" target="_blank" rel="noopener noreferrer" className="ps-btn ps-btn-github">
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
                  <div className="app-url">quizzer-7t6k.onrender.com</div>
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
              <span className="ps-badge ps-badge-ai">Vortexa 2025 · EdTech &amp; AI</span>
            </div>
            <h3 className="ps-title">Quizzer</h3>

            <div className="ps-section-block">
              <span className="ps-section-label">WHAT IT IS</span>
              <p className="ps-tagline">AI-Powered Video Summarizer &amp; Quiz Generator built during the Vortexa 2025 12-hour hackathon: a learning platform that converts video content into transcripts, automated summaries and interactive quizzes.</p>
            </div>

            <div className="ps-section-block">
              <span className="ps-section-label">KEY CONTRIBUTIONS</span>
              <ul className="ps-highlights">
                <li><span className="ps-hi-dot">•</span> Built during the Vortexa 2025 12-hour hackathon: a learning platform that converts video content into transcripts, automated summaries and interactive quizzes.</li>
                <li><span className="ps-hi-dot">•</span> Implemented the AssemblyAI speech-to-text integration and the backend quiz-generation logic in Node.js and Express.js.</li>
                <li><span className="ps-hi-dot">•</span> Developed REST API communication between frontend and server and designed the responsive Bootstrap and EJS interface.</li>
              </ul>
            </div>

            <div className="ps-tech-row">
              <span className="ps-tech-label">TECH STACK</span>
              <div className="ps-stack">
                <span>JavaScript</span><span>Node.js</span><span>Express.js</span><span>EJS</span><span>Bootstrap</span><span>HTML</span><span>CSS</span><span>AssemblyAI</span>
              </div>
            </div>

            <div className="ps-actions">
              <MagneticButton>
                <a href="https://quizzer-7t6k.onrender.com/" target="_blank" rel="noopener noreferrer" className="ps-btn ps-btn-demo">
                  <FiExternalLink size={14} />
                  Live Demo
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://github.com/RajBhokare/Quizzer" target="_blank" rel="noopener noreferrer" className="ps-btn ps-btn-github">
                  <FaGithub size={14} />
                  GitHub
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Project 3: SevaConnect */}
        <div className="project-showcase reveal" data-accent="green">
          <div className="ps-visual">
            <div className="ps-mockup ps-mockup-seva">
              <div className="seva-ui">
                <div className="seva-header">
                  <span className="seva-logo"><FiZap size={13} color="var(--green)" /> SevaConnect</span>
                  <span className="seva-status">● SIH 2026</span>
                </div>
                <div className="seva-card">
                  <div className="seva-card-title">
                    <span>FairMatch Dispatch</span>
                    <span className="seva-badge-match">98.4% Match</span>
                  </div>
                  <div className="seva-worker-row">
                    <span className="seva-worker-name">Verified Professional #418</span>
                    <span style={{ color: 'var(--green)', fontSize: '0.6rem', fontWeight: 600 }}>● Active Dispatch</span>
                  </div>
                  <div className="seva-metrics">
                    <div className="seva-metric-item">
                      <span style={{ color: 'var(--text-3)', display: 'block', fontSize: '0.52rem' }}>AI RANKING</span>
                      <span style={{ fontWeight: 700, color: 'var(--text)' }}>4.92 ★ Bayesian</span>
                    </div>
                    <div className="seva-metric-item">
                      <span style={{ color: 'var(--text-3)', display: 'block', fontSize: '0.52rem' }}>SENTIMENT</span>
                      <span style={{ fontWeight: 700, color: 'var(--green)' }}>96% Positive</span>
                    </div>
                  </div>
                </div>
                <div className="seva-forecast-row">
                  <span style={{ color: 'var(--text-2)' }}>Demand Forecast Engine</span>
                  <span className="seva-forecast-val">HIGH DEMAND</span>
                </div>
                <div className="seva-tags">
                  <span className="seva-tag">FastAPI AI</span>
                  <span className="seva-tag">Node.js REST</span>
                  <span className="seva-tag">Coop Hub</span>
                  <span className="seva-tag">Welfare Track</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-content">
            <div className="ps-meta">
              <span className="ps-num">03</span>
              <span className="ps-badge ps-badge-sih">SIH 2026 · Full-Stack &amp; Microservices</span>
            </div>
            <h3 className="ps-title">SevaConnect</h3>

            <div className="ps-section-block">
              <span className="ps-section-label">WHAT IT IS</span>
              <p className="ps-tagline">AI Cooperative Service Marketplace architected for equitable distribution of service work among workers with FairMatch allocation, AI-powered multi-factor provider ranking, emergency dispatch, and demand forecasting.</p>
            </div>

            <div className="ps-section-block">
              <span className="ps-section-label">KEY CONTRIBUTIONS</span>
              <ul className="ps-highlights">
                <li><span className="ps-hi-dot">•</span> Architected the multi-tier system (React frontend, Node.js/Express.js backend, MongoDB, FastAPI microservices) for a cooperative marketplace aimed at equitable distribution of service work among workers.</li>
                <li><span className="ps-hi-dot">•</span> Engineered role-based portals for Customers, Workers and Cooperative Coordinators with persistent state management.</li>
                <li><span className="ps-hi-dot">•</span> Platform capabilities include FairMatch workforce allocation, emergency dispatch workflows, AI-powered provider ranking and demand forecasting.</li>
              </ul>
            </div>

            <div className="ps-tech-row">
              <span className="ps-tech-label">TECH STACK</span>
              <div className="ps-stack">
                <span>React</span><span>Tailwind CSS</span><span>Node.js</span><span>Express.js</span><span>MongoDB</span><span>Python FastAPI (Microservices)</span>
              </div>
            </div>

            <div className="ps-actions">
              <MagneticButton>
                <a href="https://seva-connect-three.vercel.app/customer/home" target="_blank" rel="noopener noreferrer" className="ps-btn ps-btn-demo">
                  <FiExternalLink size={14} />
                  Live Demo
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://github.com/RajBhokare/SevaConnect-SIH-2026" target="_blank" rel="noopener noreferrer" className="ps-btn ps-btn-github">
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

/* ── ACHIEVEMENTS & HACKATHONS ── */
export function Achievements() {
  const achievements = [
    {
      title: 'Competitive Programming (DSA)',
      badge: '250+ Problems Solved',
      desc: 'Solved 250+ Data Structures and Algorithms problems on LeetCode and GeeksforGeeks.',
      icon: <SiLeetcode color="#FFA116" />,
      accent: 'gold',
    },
    {
      title: 'Adobe 2026, Flipkart GRiD & GDG 2025',
      badge: 'Round 2 Qualified',
      desc: 'Qualified for Round 2 of Adobe 2026, Flipkart GRiD and GDG 2025 national engineering challenges.',
      icon: <FiAward color="var(--cyan)" />,
      accent: 'cyan',
    },
    {
      title: 'Google Developer Groups (GDG) 2026',
      badge: 'Final Round Qualified',
      desc: 'Qualified for the Final Round of GDG 2026 after rigorous competitive rounds.',
      icon: <FiTrendingUp color="var(--green)" />,
      accent: 'green',
    },
    {
      title: 'NPTEL Cloud Computing Certification',
      badge: 'Elite + Silver Rank',
      desc: 'NPTEL Cloud Computing Certification — Elite + Silver, demonstrating deep knowledge of cloud architecture and virtualization.',
      icon: <FiCheckCircle color="#A855F7" />,
      accent: 'violet',
    },
  ]

  const hackathons = [
    {
      name: 'Vortexa (2025 & 2026)',
      badge: '12-Hour Sprint',
      desc: 'Built Quizzer during the Vortexa 2025 12-hour hackathon, converting video content into transcripts, summaries, and interactive quizzes.',
      tag: 'EdTech & AI',
    },
    {
      name: 'DevClash (2025 & 2026)',
      badge: '24-Hour Hackathon',
      desc: 'Engineered Briefly during the DevClash 2026 24-hour hackathon, turning meeting recordings into structured notes and action items.',
      tag: 'Speech AI',
    },
    {
      name: 'Smart India Hackathon (SIH)',
      badge: 'SIH 2025 & 2026',
      desc: 'Participated in Smart India Hackathon (SIH) 2025 and 2026, working on technology-driven solutions to real-world problems.',
      tag: 'Societal Impact',
    },
    {
      name: 'Kurukshetra 2026',
      badge: 'National Hackathon',
      desc: 'Participated in Kurukshetra 2026; built and delivered applications through collaborative teamwork, rapid prototyping, and time-bound hackathon development.',
      tag: 'Team Collaboration',
    },
  ]

  return (
    <section className="section section-dark" id="achievements">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">Honors & Competitions</span>
          <h2 className="section-title">Achievements & Hackathons</h2>
        </div>

        {/* Achievements Grid */}
        <div className="achieve-block reveal">
          <h3 className="achieve-block-title">
            <FiAward size={20} color="var(--cyan)" />
            Achievements &amp; Certifications
          </h3>
          <div className="achieve-grid">
            {achievements.map((item, i) => (
              <div
                className="achieve-card"
                key={item.title}
                data-accent={item.accent}
                style={{ '--d': `${i * 60}ms` } as React.CSSProperties}
              >
                <div className="achieve-card-header">
                  <div className="achieve-icon-wrap">{item.icon}</div>
                  <span className="achieve-badge">{item.badge}</span>
                </div>
                <h4 className="achieve-title">{item.title}</h4>
                <p className="achieve-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hackathons Grid */}
        <div className="achieve-block reveal" style={{ marginTop: '2.5rem' }}>
          <h3 className="achieve-block-title">
            <FiZap size={20} color="var(--green)" />
            Hackathons &amp; Technical Participation
          </h3>
          <div className="hackathon-grid">
            {hackathons.map((h, i) => (
              <div
                className="hackathon-card"
                key={h.name}
                style={{ '--d': `${i * 60}ms` } as React.CSSProperties}
              >
                <div className="hackathon-header">
                  <span className="hackathon-name">{h.name}</span>
                  <span className="hackathon-badge">{h.badge}</span>
                </div>
                <p className="hackathon-desc">{h.desc}</p>
                <div className="hackathon-tag-wrap">
                  <span className="hackathon-tag">{h.tag}</span>
                  <span className="hackathon-tag hackathon-tag-sub">Rapid Prototyping</span>
                </div>
              </div>
            ))}
          </div>
          <div className="hackathon-summary-banner reveal">
            <FiCheck size={16} color="var(--cyan)" />
            <span>Built and delivered applications through collaborative teamwork, rapid prototyping, and time-bound hackathon development.</span>
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
            <div className="btn-resume-group">
              <MagneticButton>
                <a
                  href="/Raj_Bhokare_Resume.pdf"
                  download="Raj_Bhokare_Resume.pdf"
                  className="ps-btn ps-btn-demo resume-btn-primary"
                  title="Download Resume"
                >
                  <FiDownload size={15} />
                  Download Resume
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="/Raj_Bhokare_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-square-open ps-btn-demo"
                  aria-label="Open Resume in new tab"
                  title="Open Resume in new tab"
                >
                  <FiExternalLink size={15} />
                </a>
              </MagneticButton>
            </div>
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
                href="https://linkedin.com/in/rajbhokare1"
                target="_blank"
                rel="noopener noreferrer"
                className="ps-btn ps-btn-github"
              >
                <FaLinkedin size={15} />
                Connect on LinkedIn
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://leetcode.com/Rajbhokare"
                target="_blank"
                rel="noopener noreferrer"
                className="ps-btn ps-btn-github"
              >
                <SiLeetcode size={15} color="#fbbf24" />
                LeetCode Profile
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

  const email = 'bhokareraj281@gmail.com'

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

              <a href="https://leetcode.com/Rajbhokare" target="_blank" rel="noopener noreferrer" className="contact-card">
                <div className="contact-card-icon"><SiLeetcode size={18} color="var(--gold)" /></div>
                <div>
                  <span className="contact-card-label">LeetCode</span>
                  <strong className="contact-card-val">leetcode.com/Rajbhokare</strong>
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
              <p className="site-footer-role">Full Stack Developer | AI Application Developer</p>
            </div>

            <nav className="site-footer-nav" aria-label="Footer Navigation">
              <a href="#hero">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#programming">Programming</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#education">Education</a>
              <a href="#achievements">Achievements</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="site-footer-links">
              <a href="https://github.com/RajBhokare" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <FaGithub size={14} /> GitHub
              </a>
              <a href="https://linkedin.com/in/rajbhokare1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <FaLinkedin size={14} /> LinkedIn
              </a>
              <a href="https://leetcode.com/Rajbhokare" target="_blank" rel="noopener noreferrer" aria-label="LeetCode Profile">
                <SiLeetcode size={14} /> LeetCode
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

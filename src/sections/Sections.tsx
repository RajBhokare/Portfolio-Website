import React, { useState, useEffect } from 'react'
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
  SiGithub,
  SiGooglecloud,
  SiJupyter,
  SiLeetcode,
} from 'react-icons/si'
import { FaJava, FaAws, FaLinkedin, FaQuoteLeft } from 'react-icons/fa6'
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
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiCheck,
  FiMic,
  FiVideo,
  FiFileText,
  FiHeart,
  FiZap,
} from 'react-icons/fi'
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
              I'm a <mark>Full Stack Developer</mark> who loves turning ideas into polished
              digital experiences — from pixel-perfect UIs to cloud-connected backend systems.
            </p>
            <p>
              Currently in my third year at <strong>Dr. D. Y. Patil Institute of Technology, Pune</strong>,
              I specialise in building clean, responsive web interfaces while also exploring cloud computing,
              Data Structures & Algorithms, and backend services. I believe great engineering starts with curiosity, discipline, and a
              deep love for the craft.
            </p>
            <p>
              When I'm not coding, I'm probably solving algorithmic challenges or exploring cloud architecture on AWS and Google Cloud.
            </p>
          </div>
          <div className="about-cards reveal">
            {[
              { icon: <FiBookOpen size={20} color="var(--cyan)" />, label: 'Education',  value: '3rd Year, IT Engineering' },
              { icon: <FiMapPin size={20} color="var(--violet)" />, label: 'Location',   value: 'Pune, India' },
              { icon: <FiCloud size={20} color="var(--gold)" />, label: 'Focus',      value: 'Full Stack & Cloud Computing' },
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
              <div className="info-card-icon"><FiZap size={20} color="var(--green)" /></div>
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
  'GitHub': { icon: <SiGithub />, color: 'var(--text)' },
  'Jupyter Notebook': { icon: <SiJupyter />, color: '#F37626' },
}

const marqueeSkillsRow1 = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'React',
  'Bootstrap',
  'Node.js',
  'Express.js',
  'MySQL',
]

const marqueeSkillsRow2 = [
  'C++',
  'Java',
  'Python',
  'AWS',
  'Google Cloud',
  'Git',
  'GitHub',
  'Jupyter Notebook',
]

const skillGroups = [
  {
    icon: <FiCode size={18} />,
    title: 'Web & Frontend Development',
    pills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap'],
    span: false,
    accent: 'cyan',
  },
  {
    icon: <FiServer size={18} />,
    title: 'Backend & Programming Languages',
    pills: ['Node.js', 'Express.js', 'C++', 'Java', 'Python'],
    span: false,
    accent: 'violet',
  },
  {
    icon: <FiCloud size={18} />,
    title: 'Cloud Computing',
    pills: ['AWS', 'Google Cloud'],
    span: false,
    accent: 'gold',
  },
  {
    icon: <FiDatabase size={18} />,
    title: 'Databases & Storage',
    pills: ['MySQL'],
    span: false,
    accent: 'green',
  },
  {
    icon: <FiTool size={18} />,
    title: 'Developer Tools & Environments',
    pills: ['Git', 'GitHub', 'Jupyter Notebook'],
    span: true,
    accent: 'coral',
  },
]

export function Skills() {
  return (
    <section className="section section-dark" id="skills">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-eyebrow">technical expertise</span>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        {/* Infinite Continuous Marquee Banner */}
        <div className="skills-marquee-container reveal">
          <div className="skills-marquee-track">
            {[...marqueeSkillsRow1, ...marqueeSkillsRow1, ...marqueeSkillsRow1].map((name, idx) => {
              const item = SKILL_ICONS[name] || { icon: <FiCode />, color: 'var(--cyan)' }
              return (
                <div className="skill-logo-card" key={`r1-${idx}`}>
                  <span className="skill-logo-icon" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                  <span>{name}</span>
                </div>
              )
            })}
          </div>

          <div className="skills-marquee-track-reverse">
            {[...marqueeSkillsRow2, ...marqueeSkillsRow2, ...marqueeSkillsRow2].map((name, idx) => {
              const item = SKILL_ICONS[name] || { icon: <FiCode />, color: 'var(--cyan)' }
              return (
                <div className="skill-logo-card" key={`r2-${idx}`}>
                  <span className="skill-logo-icon" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                  <span>{name}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Categorized Professional Skill Cards */}
        <div className="skills-layout">
          {skillGroups.map((g, i) => (
            <div
              key={g.title}
              className={`skill-group reveal${g.span ? ' skill-group-span' : ''}`}
              data-accent={g.accent}
              style={{ '--d': `${i * 100}ms` } as React.CSSProperties}
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
    period: '2025 — Present', badge: 'Club', active: true,
    role: 'Web Developer', org: 'Binary Brains Club, Dr. D. Y. Patil Institute of Technology',
    desc: 'Developing responsive web applications and collaborating on full-stack projects using HTML, CSS, JavaScript, Node.js, and Git. Working in an Agile team environment, contributing to feature development, debugging, API integration, and code reviews.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'Git', 'GitHub'],
  },
  {
    period: '2025 — Present', badge: 'Open Source', active: true,
    role: 'Full-Stack Developer', org: 'Self-Initiated Projects & Open Source',
    desc: 'Building production-ready frontend and full-stack applications using React, Node.js, Express.js, and MySQL. Developing responsive user interfaces, REST APIs, authentication workflows, and deploying applications using modern development tools.',
    stack: ['React', 'JavaScript', 'HTML', 'CSS', 'Node.js', 'Express.js', 'MySQL', 'REST APIs'],
  },
  {
    period: '2025', badge: 'AI', active: false,
    role: 'AI Application Developer', org: 'Academic & Hackathon Projects',
    desc: 'Built AI-powered web applications including Briefly, an AI meeting assistant using OpenAI Whisper API, and Quizzer, an educational platform leveraging AssemblyAI for transcript generation, summarization, and quiz creation.',
    stack: ['OpenAI Whisper', 'AssemblyAI', 'Node.js', 'Express.js', 'JavaScript', 'AI APIs'],
  },
  {
    period: '2024 — 2025', badge: 'Hardware', active: false,
    role: 'IoT & Hardware Developer', org: 'Dr. D. Y. Patil Institute of Technology',
    desc: 'Designed and developed IoT systems using ESP8266 and Arduino, including DustSense, a real-time PM2.5 air quality monitoring system using MQTT with live web-based dashboards for sensor visualization.',
    stack: ['ESP8266', 'Arduino', 'Embedded C', 'MQTT', 'Sensors', 'Dashboards'],
  },
  {
    period: '2024 — Present', badge: 'Academic', active: true,
    role: 'Full-Stack Developer', org: 'Academic Projects',
    desc: 'Developed end-to-end web applications using React, Node.js, Express.js, and MySQL. Designed relational database schemas, implemented RESTful APIs, integrated AI services, and deployed scalable web solutions.',
    stack: ['React', 'Node.js', 'Express.js', 'MySQL', 'REST APIs', 'Git'],
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
                  <span className="exp-period" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <FiCalendar size={13} /> {e.period}
                  </span>
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
                  <div className="briefly-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FiMic color="var(--violet)" /> Meeting_Recording.mp3
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
                  <div className="briefly-label">AI Key Insights</div>
                  <div className="briefly-item"><span><FiCheck size={12} /></span> Whisper speech-to-text transcribed</div>
                  <div className="briefly-item"><span><FiCheck size={12} /></span> 4 action items extracted</div>
                  <div className="briefly-item"><span><FiCheck size={12} /></span> Executive summary ready</div>
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
                  <SiGithub size={16} />
                  GitHub
                </a>
              </MagneticButton>
              <span className="ps-btn ps-btn-disabled" title="Live Demo Coming Soon">
                <FiExternalLink size={16} />
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
                  <div className="app-card">
                    <div className="app-card-icon"><FiVideo color="var(--cyan)" size={18} /></div>
                    <div><div className="app-card-label">Video Processed</div><div className="app-card-val">Lecture_03_ML.mp4</div></div>
                  </div>
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
                  <SiGithub size={16} />
                  GitHub
                </a>
              </MagneticButton>
              <span className="ps-btn ps-btn-disabled" title="Live Demo Coming Soon">
                <FiExternalLink size={16} />
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
                <div className="edu-nav">EduQuest <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><FiBookOpen size={12} /> LMS Platform</span></div>
                <div className="edu-hero-text">Learn. Grow. Succeed.</div>
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
                  <SiGithub size={16} />
                  GitHub
                </a>
              </MagneticButton>
              <span className="ps-btn ps-btn-disabled" title="Live Demo Coming Soon">
                <FiExternalLink size={16} />
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
                  <SiGithub size={16} />
                  GitHub
                </a>
              </MagneticButton>
              <span className="ps-btn ps-btn-disabled" title="Live Demo Coming Soon">
                <FiExternalLink size={16} />
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
            <FaQuoteLeft className="quote-svg" size={36} color="var(--cyan)" style={{ opacity: 0.2 }} />
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
  const socials = [
    { href: 'https://github.com/RajBhokare', label: 'GitHub', icon: <SiGithub size={18} /> },
    { href: 'https://linkedin.com/in/rajbhokare1', label: 'LinkedIn', icon: <FaLinkedin size={18} /> },
    { href: 'https://leetcode.com/u/RajBhokare/', label: 'LeetCode', icon: <SiLeetcode size={18} /> },
  ]

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
            {socials.map(s => (
              <MagneticButton key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  {s.icon}
                  <span>{s.label}</span>
                  <span className="link-arrow"><FiArrowUpRight size={14} /></span>
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Raj Bhokare</p>
          <p className="footer-built">
            Full Stack Developer · Built with React, Vite, Three.js & Lenis{' '}
            <FiHeart size={14} color="#ff4d4d" style={{ display: 'inline', marginLeft: 4, fill: '#ff4d4d', verticalAlign: 'middle' }} />
          </p>
        </div>
      </div>
    </footer>
  )
}

import os
import sys
import shutil
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

class OnePageCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.page_count = 0

    def showPage(self):
        self.page_count += 1
        super().showPage()

    def save(self):
        print(f"Total pages generated: {self.page_count}")
        super().save()

def generate_pdf(output_path="public/Raj_Bhokare_Resume.pdf"):
    # If authentic LaTeX uploaded PDF backup exists and no --force, copy uploaded PDF
    backup_path = os.path.abspath("scripts/Raj_Bhokare_Resume_uploaded.pdf")
    if os.path.exists(backup_path) and "--regenerate" not in sys.argv:
        shutil.copy(backup_path, output_path)
        print(f"Copied authentic LaTeX compiled resume from backup to: {output_path}")
        return

    pdf_path = os.path.abspath(output_path)
    
    # Target letter size with tight, clean margins for 1-page layout
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=24,
        bottomMargin=20
    )

    styles = getSampleStyleSheet()

    # Typography matching Times Roman serif (LaTeX style)
    name_style = ParagraphStyle(
        'DocName',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=18,
        leading=20,
        alignment=1,
        textColor=colors.black
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.5,
        leading=12,
        alignment=1,
        textColor=colors.black
    )

    contact_style = ParagraphStyle(
        'DocContact',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=9.2,
        leading=11.5,
        alignment=1,
        textColor=colors.black
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=10,
        leading=11.5,
        textColor=colors.black,
        spaceBefore=0,
        spaceAfter=0
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.6,
        leading=10.5,
        textColor=colors.black
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.4,
        leading=10.2,
        leftIndent=10,
        firstLineIndent=-6,
        textColor=colors.black,
        spaceAfter=0.5
    )

    job_title_left = ParagraphStyle(
        'JobTitleLeft',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9,
        leading=10.5,
        textColor=colors.black
    )

    job_title_right = ParagraphStyle(
        'JobTitleRight',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.6,
        leading=10.5,
        alignment=2,
        textColor=colors.black
    )

    job_sub_left = ParagraphStyle(
        'JobSubLeft',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=8.6,
        leading=10.2,
        textColor=colors.black
    )

    job_sub_right = ParagraphStyle(
        'JobSubRight',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=8.6,
        leading=10.2,
        alignment=2,
        textColor=colors.black
    )

    project_title_left = ParagraphStyle(
        'ProjectTitleLeft',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9,
        leading=10.5,
        textColor=colors.black
    )

    project_link_right = ParagraphStyle(
        'ProjectLinkRight',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.6,
        leading=10.5,
        alignment=2,
        textColor=colors.black
    )

    story = []

    # Header
    story.append(Paragraph("Raj Bhokare", name_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("Full Stack Developer | AI Application Developer | Web Development Team Lead", subtitle_style))
    story.append(Spacer(1, 1.2))
    story.append(Paragraph("Pune, Maharashtra, India | +91 84597 63914 | <a href='mailto:bhokareraj281@gmail.com' color='#000000'>bhokareraj281@gmail.com</a>", contact_style))
    story.append(Spacer(1, 1.2))
    story.append(Paragraph("<a href='https://raj-portfolio-it.netlify.app/' color='#000000'>Portfolio</a> | <a href='https://github.com/RajBhokare' color='#000000'>GitHub</a> | <a href='https://linkedin.com/in/rajbhokare1' color='#000000'>LinkedIn</a> | <a href='https://leetcode.com/Rajbhokare' color='#000000'>LeetCode</a>", contact_style))
    story.append(Spacer(1, 1.5))

    def add_section_header(title):
        story.append(Spacer(1, 2))
        story.append(Paragraph(title.upper(), section_heading))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.black, spaceBefore=1, spaceAfter=2))

    # Professional Summary
    add_section_header("Professional Summary")
    story.append(Paragraph("&bull; Third-Year Information Technology Engineering student specializing in full-stack development with <b>React.js, Node.js, Express.js, MongoDB and MySQL</b>, plus <b>Python FastAPI microservices</b>.", bullet_style))
    story.append(Paragraph("&bull; Built AI-integrated applications using the <b>Whisper API</b> (meeting transcription and summaries) and <b>AssemblyAI</b> (video transcription and quiz generation), delivered within 12 to 24-hour hackathon timelines.", bullet_style))
    story.append(Paragraph("&bull; <b>Web Development Team Lead</b> at Binary Brains Club, DIT Pune: lead a 10+ member team through task allocation, mentoring and code reviews; regular participant in national-level hackathons.", bullet_style))

    # Education
    add_section_header("Education")
    t_edu = Table([
        [Paragraph("<b>Dr. D. Y. Patil Institute of Technology, Pune</b>", job_title_left), Paragraph("September 2024 &ndash; May 2028 (Expected)", job_title_right)],
        [Paragraph("Bachelor of Engineering in Information Technology", job_sub_left), Paragraph("<b>CGPA: 8.71/10</b>", job_sub_right)]
    ], colWidths=[380, 160])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_edu)

    # Technical Skills
    add_section_header("Technical Skills")
    story.append(Paragraph("<b>Programming Languages:</b> Java, Python, C++, JavaScript, SQL", body_style))
    story.append(Spacer(1, 0.8))
    story.append(Paragraph("<b>Frontend Development:</b> React.js, HTML5, CSS3, Tailwind CSS, Bootstrap, EJS", body_style))
    story.append(Spacer(1, 0.8))
    story.append(Paragraph("<b>Backend Development:</b> Node.js, Express.js, FastAPI, Microservices Architecture", body_style))
    story.append(Spacer(1, 0.8))
    story.append(Paragraph("<b>Databases:</b> MongoDB, MySQL", body_style))
    story.append(Spacer(1, 0.8))
    story.append(Paragraph("<b>APIs &amp; Integrations:</b> REST API Design, Whisper API, AssemblyAI", body_style))
    story.append(Spacer(1, 0.8))
    story.append(Paragraph("<b>Developer Tools &amp; Platforms:</b> Git, GitHub, Postman, Firebase, Vercel, Render, Linux", body_style))
    story.append(Spacer(1, 0.8))
    story.append(Paragraph("<b>Computer Science Fundamentals:</b> Data Structures &amp; Algorithms, Object-Oriented Programming, DBMS, Operating Systems, Computer Networks, SDLC, Agile Development", body_style))

    # Projects
    add_section_header("Projects")

    t_p1 = Table([
        [Paragraph("<b>Briefly &ndash; AI-Powered Meeting Assistant</b>", project_title_left), Paragraph("<a href='https://brieflyai-three.vercel.app/' color='#000000'>Live Demo</a> | <a href='https://github.com/RajBhokare/briefly_ai' color='#000000'>GitHub</a>", project_link_right)]
    ], colWidths=[390, 150])
    t_p1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_p1)
    story.append(Paragraph("<i>Tech Stack: Node.js, Express.js, REST APIs, Whisper API</i>", job_sub_left))
    story.append(Spacer(1, 0.5))
    story.append(Paragraph("&bull; Developed during the DevClash 2026 24-hour hackathon to turn long meeting recordings into structured summaries, extracted action items and searchable transcripts.", bullet_style))
    story.append(Paragraph("&bull; Integrated the Whisper API into the Node.js and Express.js backend for speech-to-text transcription of uploaded recordings.", bullet_style))
    story.append(Paragraph("&bull; Designed modular REST APIs to separate the transcription and summarization workflows.", bullet_style))

    story.append(Spacer(1, 1.2))
    t_p2 = Table([
        [Paragraph("<b>Quizzer &ndash; AI-Powered Video Summarizer &amp; Quiz Generator</b>", project_title_left), Paragraph("<a href='https://quizzer-7t6k.onrender.com/' color='#000000'>Live Demo</a> | <a href='https://github.com/RajBhokare/Quizzer' color='#000000'>GitHub</a>", project_link_right)]
    ], colWidths=[390, 150])
    t_p2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_p2)
    story.append(Paragraph("<i>Tech Stack: JavaScript, Node.js, Express.js, EJS, Bootstrap, HTML, CSS, AssemblyAI</i>", job_sub_left))
    story.append(Spacer(1, 0.5))
    story.append(Paragraph("&bull; Built during the Vortexa 2025 12-hour hackathon: a learning platform that converts video content into transcripts, automated summaries and interactive quizzes.", bullet_style))
    story.append(Paragraph("&bull; Implemented the AssemblyAI speech-to-text integration and the backend quiz-generation logic in Node.js and Express.js.", bullet_style))
    story.append(Paragraph("&bull; Developed REST API communication between frontend and server and designed the responsive Bootstrap and EJS interface.", bullet_style))

    story.append(Spacer(1, 1.2))
    t_p3 = Table([
        [Paragraph("<b>SevaConnect &ndash; AI Cooperative Service Marketplace</b>", project_title_left), Paragraph("<a href='https://seva-connect-three.vercel.app/customer/home' color='#000000'>Live Demo</a> | <a href='https://github.com/RajBhokare/SevaConnect-SIH-2026' color='#000000'>GitHub</a>", project_link_right)]
    ], colWidths=[390, 150])
    t_p3.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_p3)
    story.append(Paragraph("<i>Tech Stack: React, Tailwind CSS, Node.js, Express.js, MongoDB, Python FastAPI (Microservices)</i>", job_sub_left))
    story.append(Spacer(1, 0.5))
    story.append(Paragraph("&bull; Architected the multi-tier system (React frontend, Node.js/Express.js backend, MongoDB, FastAPI microservices) for a cooperative marketplace aimed at equitable distribution of service work among workers.", bullet_style))
    story.append(Paragraph("&bull; Engineered role-based portals for Customers, Workers and Cooperative Coordinators with persistent state management.", bullet_style))
    story.append(Paragraph("&bull; Platform capabilities include FairMatch workforce allocation, emergency dispatch workflows, AI-powered provider ranking and demand forecasting.", bullet_style))

    # Position of Responsibility
    add_section_header("Position of Responsibility")

    t1 = Table([
        [Paragraph("<b>Web Development Team Lead</b> | Binary Brains Club, DIT Pune", job_title_left), Paragraph("September 2026 &ndash; Present", job_title_right)]
    ], colWidths=[400, 140])
    t1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t1)
    story.append(Spacer(1, 0.5))
    story.append(Paragraph("&bull; Lead a 10+ member web development team: plan development activities, assign tasks and coordinate project execution.", bullet_style))
    story.append(Paragraph("&bull; Mentor junior developers in React.js, JavaScript, Node.js and Git through technical guidance and code reviews.", bullet_style))
    story.append(Paragraph("&bull; Collaborate with design, DSA and event teams to deliver web solutions for club initiatives, hackathons and technical events.", bullet_style))

    story.append(Spacer(1, 1))
    t2 = Table([
        [Paragraph("<b>Member, Web Development Team</b> | Binary Brains Club, DIT Pune", job_title_left), Paragraph("September 2025 &ndash; August 2026", job_title_right)]
    ], colWidths=[400, 140])
    t2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t2)
    story.append(Spacer(1, 0.5))
    story.append(Paragraph("&bull; Developed responsive full-stack web applications with modern JavaScript technologies for collaborative hackathons.", bullet_style))
    story.append(Paragraph("&bull; Organized DSA-focused coding events; volunteered at Hash It Out (Web Development Hackathon) and AlgoHeist (DSA Contest).", bullet_style))

    # Achievements & Certifications
    add_section_header("Achievements &amp; Certifications")
    story.append(Paragraph("&bull; Solved <b>250+</b> Data Structures and Algorithms problems on LeetCode and GeeksforGeeks.", bullet_style))
    story.append(Paragraph("&bull; Qualified for <b>Round 2 of Adobe 2026, Flipkart GRiD and GDG 2025</b>; qualified for the <b>Final Round of GDG 2026</b>.", bullet_style))
    story.append(Paragraph("&bull; <b>NPTEL Cloud Computing Certification &ndash; Elite + Silver</b>.", bullet_style))

    # Hackathons & Technical Participation
    add_section_header("Hackathons &amp; Technical Participation")
    story.append(Paragraph("&bull; Participated in <b>Vortexa 2025 and 2026, DevClash 2025, and Kurukshetra 2026</b>.", bullet_style))
    story.append(Paragraph("&bull; Participated in <b>Smart India Hackathon (SIH) 2025 and 2026</b>, working on technology-driven solutions to real-world problems.", bullet_style))
    story.append(Paragraph("&bull; Built and delivered applications through collaborative teamwork, rapid prototyping, and time-bound hackathon development.", bullet_style))

    doc.build(story, canvasmaker=OnePageCanvas)
    print(f"Successfully generated 1-page resume at: {pdf_path}")

if __name__ == "__main__":
    generate_pdf()

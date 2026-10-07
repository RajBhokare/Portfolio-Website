import os
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

def generate_pdf():
    pdf_path = os.path.abspath("public/Raj_Bhokare_Resume.pdf")
    
    # Target letter size with tight, clean margins for a 1-page resume
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=26,
        bottomMargin=20
    )

    styles = getSampleStyleSheet()

    # Typography matching Times Roman serif (LaTeX style) in the provided resume
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
        fontSize=10.5,
        leading=12,
        textColor=colors.black,
        spaceBefore=0,
        spaceAfter=0
    )

    body_style = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.8,
        leading=10.8,
        textColor=colors.black
    )

    bullet_style = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.6,
        leading=10.5,
        leftIndent=11,
        firstLineIndent=-7,
        textColor=colors.black,
        spaceAfter=0.6
    )

    job_title_left = ParagraphStyle(
        'JobTitleLeft',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9.2,
        leading=11,
        textColor=colors.black
    )

    job_title_right = ParagraphStyle(
        'JobTitleRight',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.8,
        leading=11,
        alignment=2,
        textColor=colors.black
    )

    job_sub_left = ParagraphStyle(
        'JobSubLeft',
        parent=styles['Normal'],
        fontName='Times-Italic',
        fontSize=8.8,
        leading=10.5,
        textColor=colors.black
    )

    job_sub_right = ParagraphStyle(
        'JobSubRight',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=8.8,
        leading=10.5,
        alignment=2,
        textColor=colors.black
    )

    project_title_left = ParagraphStyle(
        'ProjectTitleLeft',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=9.2,
        leading=11,
        textColor=colors.black
    )

    project_link_right = ParagraphStyle(
        'ProjectLinkRight',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=8.8,
        leading=11,
        alignment=2,
        textColor=colors.black
    )

    story = []

    # Header
    story.append(Paragraph("Raj Bhokare", name_style))
    story.append(Spacer(1, 1.5))
    story.append(Paragraph("Web Developer &mdash; Full Stack Developer", subtitle_style))
    story.append(Spacer(1, 1.2))
    story.append(Paragraph("Pune, Maharashtra, India &mdash; +91 84597 63914 &mdash; <a href='mailto:bhokareraj281@gmail.com' color='#000000'>bhokareraj281@gmail.com</a>", contact_style))
    story.append(Spacer(1, 1.2))
    story.append(Paragraph("<a href='https://raj-portfolio-it.netlify.app/' color='#000000'>Portfolio</a> &mdash; <a href='https://github.com/RajBhokare' color='#000000'>GitHub</a> &mdash; <a href='https://linkedin.com/in/rajbhokare1' color='#000000'>LinkedIn</a> &mdash; <a href='https://leetcode.com/Rajbhokare' color='#000000'>LeetCode</a>", contact_style))
    story.append(Spacer(1, 1.5))

    def add_section_header(title):
        story.append(Spacer(1, 2.5))
        story.append(Paragraph(title, section_heading))
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.black, spaceBefore=1, spaceAfter=2.5))

    # Professional Summary
    add_section_header("Professional Summary")
    story.append(Paragraph("Full Stack Developer and B.E. Information Technology undergraduate with strong expertise in React.js, Node.js, Express.js, REST APIs, MySQL, and MongoDB. Solved 250+ Data Structures and Algorithms problems and built AI-powered web applications, scalable backend systems, and production-ready full-stack solutions using Agile development, Git, and modern JavaScript technologies.", body_style))

    # Technical Skills
    add_section_header("Technical Skills")
    story.append(Paragraph("<b>Languages:</b> Java, Python, C++, JavaScript, SQL", body_style))
    story.append(Spacer(1, 1))
    story.append(Paragraph("<b>Frontend:</b> React.js, HTML5, CSS3, Tailwind CSS, Bootstrap, EJS, Responsive Web Design", body_style))
    story.append(Spacer(1, 1))
    story.append(Paragraph("<b>Backend:</b> Node.js, Express.js, FastAPI, REST API Development, CRUD Operations", body_style))
    story.append(Spacer(1, 1))
    story.append(Paragraph("<b>Databases:</b> MySQL, MongoDB, Relational Database Design, Schema Design", body_style))
    story.append(Spacer(1, 1))
    story.append(Paragraph("<b>Tools & Platforms:</b> Git, GitHub, Postman, VS Code, Cursor, Firebase, Vercel, Render, Linux", body_style))
    story.append(Spacer(1, 1))
    story.append(Paragraph("<b>Core Concepts:</b> Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, SDLC, Agile Methodology", body_style))

    # Experience
    add_section_header("Experience")

    t1 = Table([
        [Paragraph("Web Development Team Lead", job_title_left), Paragraph("Sep 2026 &ndash; Present", job_title_right)],
        [Paragraph("Binary Brains Club, DIT Pune", job_sub_left), Paragraph("", job_sub_right)]
    ], colWidths=[380, 160])
    t1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t1)
    story.append(Spacer(1, 1))
    story.append(Paragraph("&bull; Lead a 10+ member Web Development team by planning development activities, assigning tasks, and coordinating project execution.", bullet_style))
    story.append(Paragraph("&bull; Mentor junior developers in React.js, JavaScript, Node.js, Git, and modern web development practices through technical guidance and code reviews.", bullet_style))
    story.append(Paragraph("&bull; Collaborate with design, DSA, and event teams to deliver scalable web solutions for club initiatives, hackathons, and technical events.", bullet_style))

    story.append(Spacer(1, 1.5))
    t2 = Table([
        [Paragraph("Member &ndash; Web Development Team", job_title_left), Paragraph("Sep 2025 &ndash; Aug 2026", job_title_right)],
        [Paragraph("Binary Brains Club, DIT Pune", job_sub_left), Paragraph("", job_sub_right)]
    ], colWidths=[380, 160])
    t2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t2)
    story.append(Spacer(1, 1))
    story.append(Paragraph("&bull; Organized DSA-focused coding events and coordinated technical activities for student participants.", bullet_style))
    story.append(Paragraph("&bull; Contributed to multiple collaborative hackathons by developing responsive full-stack web applications using modern JavaScript technologies.", bullet_style))

    # Education
    add_section_header("Education")
    t_edu = Table([
        [Paragraph("Dr. D. Y. Patil Institute of Technology, Pune", job_title_left), Paragraph("Sept 2024 &ndash; May 2028 (Expected)", job_title_right)],
        [Paragraph("Bachelor of Engineering in Information Technology", job_sub_left), Paragraph("CGPA: 8.71/10", job_sub_right)]
    ], colWidths=[380, 160])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_edu)

    # Projects
    add_section_header("Projects")

    t_p1 = Table([
        [Paragraph("Briefly &ndash; AI-Powered Meeting Assistant", project_title_left), Paragraph("<a href='https://github.com/RajBhokare/briefly_ai' color='#000000'>GitHub</a>", project_link_right)]
    ], colWidths=[450, 90])
    t_p1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_p1)
    story.append(Spacer(1, 1))
    story.append(Paragraph("&bull; Developed a full-stack AI meeting assistant that transforms meeting recordings into structured summaries, action items, and searchable transcripts.", bullet_style))
    story.append(Paragraph("&bull; Integrated Whisper API with a Node.js and Express.js backend, designing modular REST APIs for automated speech-to-text and summarization workflows.", bullet_style))
    story.append(Paragraph("&bull; Delivered and deployed the complete application within a 24-hour AI hackathon using Agile collaboration and rapid feature development.", bullet_style))

    story.append(Spacer(1, 1.5))
    t_p2 = Table([
        [Paragraph("Quizzer &ndash; Video Summarizer &amp; Quiz Generator", project_title_left), Paragraph("<a href='https://github.com/RajBhokare/Quizzer' color='#000000'>GitHub</a>", project_link_right)]
    ], colWidths=[450, 90])
    t_p2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_p2)
    story.append(Spacer(1, 1))
    story.append(Paragraph("&bull; Built an AI-powered learning platform that extracts video transcripts and automatically generates summaries and interactive quizzes.", bullet_style))
    story.append(Paragraph("&bull; Implemented AssemblyAI speech-to-text integration, backend quiz generation logic, and REST API communication between frontend and server.", bullet_style))
    story.append(Paragraph("&bull; Designed a responsive user interface using HTML, CSS, JavaScript, Bootstrap, and EJS for seamless educational workflows.", bullet_style))

    story.append(Spacer(1, 1.5))
    t_p3 = Table([
        [Paragraph("SevaConnect &ndash; AI Cooperative Service Marketplace", project_title_left), Paragraph("<a href='https://github.com/RajBhokare/SevaConnect-SIH-2026' color='#000000'>GitHub</a>", project_link_right)]
    ], colWidths=[450, 90])
    t_p3.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_p3)
    story.append(Spacer(1, 1))
    story.append(Paragraph("&bull; Architected a multi-tier cooperative marketplace using React, Tailwind CSS, Node.js, Express.js, MongoDB, and Python FastAPI microservices.", bullet_style))
    story.append(Paragraph("&bull; Engineered FairMatch workforce allocation, emergency dispatch workflows, AI-powered provider ranking, and demand forecasting for equitable service distribution.", bullet_style))
    story.append(Paragraph("&bull; Built secure role-based portals for Customers, Workers, and Cooperative coordinators with scalable backend architecture and persistent state management.", bullet_style))

    # Achievements
    add_section_header("Achievements")
    story.append(Paragraph("&bull; <b>Solved 250+</b> Data Structures and Algorithms problems across LeetCode and GeeksforGeeks.", bullet_style))
    story.append(Paragraph("&bull; Maintained a <b>CGPA of 8.71/10</b> in B.E. Information Technology.", bullet_style))
    story.append(Paragraph("&bull; Qualified for <b>Round 2 of Adobe 2026, Flipkart GRiD, and GDG 2025</b>; Qualified for <b>Final Round of GDG 2026</b>", bullet_style))
    story.append(Paragraph("&bull; Built <b>Briefly AI</b>, an AI-powered meeting assistant, during the <b>DevClash 2026</b> 24-hour hackathon.", bullet_style))
    story.append(Paragraph("&bull; Built <b>Quizzer</b>, an AI-powered video summarizer and quiz generator, during the <b>Vortexa 2025</b> 12-hour hackathon.", bullet_style))

    doc.build(story, canvasmaker=OnePageCanvas)
    print(f"Successfully generated 1-page resume at: {pdf_path}")

if __name__ == "__main__":
    generate_pdf()

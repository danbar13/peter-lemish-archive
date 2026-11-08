import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

os.makedirs('public/files/publications', exist_ok=True)

styles = getSampleStyleSheet()

# Custom styles
title_style = ParagraphStyle(
    'DocTitle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=20,
    leading=24,
    textColor=colors.HexColor('#1E3A8A'),
    spaceAfter=6,
)

subtitle_style = ParagraphStyle(
    'DocSubtitle',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=10.5,
    leading=14,
    textColor=colors.HexColor('#475569'),
    spaceAfter=12,
)

h2_style = ParagraphStyle(
    'SectionH2',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=12,
    leading=16,
    textColor=colors.HexColor('#1E3A8A'),
    spaceBefore=10,
    spaceAfter=4,
)

body_style = ParagraphStyle(
    'BodyTextCustom',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=colors.HexColor('#1E293B'),
    spaceAfter=5,
)

citation_style = ParagraphStyle(
    'CitationText',
    parent=styles['Normal'],
    fontName='Helvetica-Oblique',
    fontSize=8.5,
    leading=12,
    textColor=colors.HexColor('#0F172A'),
    backColor=colors.HexColor('#F1F5F9'),
    borderPadding=6,
    spaceAfter=8,
)

meta_style = ParagraphStyle(
    'MetaText',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=8,
    leading=11,
    textColor=colors.HexColor('#D97706'),
)

def create_cv_pdf():
    pdf_path = 'public/files/Dr_Peter_Lemish_CV.pdf'
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    elements = []

    elements.append(Paragraph("CURRICULUM VITAE", meta_style))
    elements.append(Paragraph("Dr. Peter Lemish (1948 – 2021)", title_style))
    elements.append(Paragraph(
        "Critical Media Scholar • Peace Educator • Community Organizer • Higher Education Academic Leader",
        subtitle_style
    ))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#1E3A8A'), spaceAfter=12))

    # Academic Background
    elements.append(Paragraph("1. ACADEMIC EDUCATION & CREDENTIALS", h2_style))
    edu_data = [
        [Paragraph("<b>Ph.D. in Journalism & Mass Communication</b>", body_style), Paragraph("Doctoral dissertation focused on qualitative cultural inquiry and media epistemology.", body_style)],
        [Paragraph("<b>M.A. & B.A. Degrees in Social Sciences & Communication</b>", body_style), Paragraph("Graduate and undergraduate training in journalism, sociology, and critical educational theory in the United States.", body_style)]
    ]
    t_edu = Table(edu_data, colWidths=[2.5*inch, 4.7*inch])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    elements.append(t_edu)

    # Academic Appointments
    elements.append(Paragraph("2. PRIMARY ACADEMIC & INSTITUTIONAL APPOINTMENTS", h2_style))
    app_data = [
        [Paragraph("<b>Department Chair & Academic Director</b>", body_style), Paragraph("Led academic departments, interdisciplinary curricula, and academic direction across higher education colleges in Israel (including Beit Berl College and Sapir Academic College).", body_style)],
        [Paragraph("<b>Senior Researcher & Faculty Fellow</b>", body_style), Paragraph("Global Media Research Center (GMRC), Southern Illinois University Carbondale (SIUC, 2012–2016). Directed regional civic engagement, 'Imagining Geographies', and 'Civic Soul Media'.", body_style)],
        [Paragraph("<b>Senior Lecturer & Curriculum Developer</b>", body_style), Paragraph("Pioneered courses and national seminars in Media Literacy, Peace Education, Qualitative Research Methods, and Critical Pedagogy.", body_style)]
    ]
    t_app = Table(app_data, colWidths=[2.5*inch, 4.7*inch])
    t_app.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    elements.append(t_app)

    # Core Research Pillars
    elements.append(Paragraph("3. CORE RESEARCH PILLARS & THEORETICAL CONTRIBUTIONS", h2_style))
    pillars = [
        "<b>The Transgressive Posture:</b> Formulating an ontological Heideggerian framework for crossing socio-political taboos and institutional boundaries in intractable conflicts, particularly the Israeli-Arab conflict.",
        "<b>Critical Pedagogy & Social Problems:</b> Exposing silenced social issues, power-control dynamics, and bureaucratic apathy through problem-posing pedagogy (with Dvora Feldash).",
        "<b>Media Literacy & Democratic Praxis:</b> Investigating national curriculum reforms, children's processing of conflict news, and constructive media framing (with Dafna Lemish).",
        "<b>Civic Action & Intercultural Musicking:</b> Documenting transcultural collaborations, civil society media leadership, and community justice initiatives across Israel, Northern Ireland, and North America."
    ]
    for p in pillars:
        elements.append(Paragraph(f"• {p}", body_style))

    # Selected Bibliography
    elements.append(Paragraph("4. SELECTED PEER-REVIEWED PUBLICATIONS", h2_style))
    pubs = [
        "Lemish, P. (2003). Civic and citizenship education in Israel. <i>Cambridge Journal of Education</i>, 33(1), 53–72.",
        "Lemish, P. (2007). Developing children's understanding of conflict resolution through quality television. In <i>Children and Media in Times of War and Conflict</i> (pp. 215–236). Hampton Press.",
        "Lemish, P. (2011). The Transgressive Posture: Insights from Nano Discourse into the Ontology of Being a Transgressor. <i>Academic Quarter</i>, 3, 17–31.",
        "Lemish, P., Lemish, N., Sabet, P., & Deutsch, D. (2017). 'In Toronto, Iranians and Israelis Make Music, Not War': Political Communication via Engaged Musicking. In <i>Music as a Platform for Political Communication</i> (pp. 127–148). IGI Global.",
        "Lemish, P., & Lemish, D. (2001/2018). A much debated consensus: Media literacy in Israel. In <i>Media Literacy Around the World</i> (pp. 213–228).",
        "Lemish, P., & Caringer, K. (2012). The civil society organization media manager as critical communicator. <i>Nordicom Review</i>, 33(Special Issue), 189–203.",
        "Lemish, P., & Feldash, D. (1997). Exposing social problems by means of critical pedagogy. <i>Radical Teacher / Studies in Education</i>, 129–140.",
        "Lemish, P. (1988). Evaluation reflection power-control and the praxis orientation to school-based program development. <i>Studies in Educational Evaluation</i>, 14(3), 341–359.",
        "Lemish, P. (1981). Hanukah bush: The Jewish experience in America. <i>Theory into Practice</i>, 20(1), 26–34."
    ]
    for pb in pubs:
        elements.append(Paragraph(f"• {pb}", body_style))

    elements.append(Spacer(1, 10))
    elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#CBD5E1'), spaceAfter=6))
    elements.append(Paragraph(
        "<i>Dr. Peter Lemish Living Digital Archive • Official Repository: https://peter-lemish-archive.vercel.app</i>",
        meta_style
    ))

    doc.build(elements)
    print("Created:", pdf_path)

publications_meta = [
    {
        "id": "pub-1",
        "file": "pub-1-civic-and-citizenship-education.pdf",
        "title": "Civic and Citizenship Education in Israel",
        "year": "2003",
        "publisher": "Cambridge Journal of Education, Vol. 33, No. 1, pp. 53–72",
        "citation": "Lemish, P. (2003). Civic and citizenship education in Israel. Cambridge Journal of Education, 33(1), 53-72. https://doi.org/10.1080/0305764032000064640",
        "abstract": "This article analyzes the structural, political, and pedagogical tensions in delivering civic and citizenship education in Israel. It examines curriculum development policies, ideological battles, and the ongoing struggle to cultivate democratic agency, tolerance, and critical inquiry within a deeply divided ethnocratic society.",
        "findings": "Key findings distinguish between formal constitutional civics and broader lifelong civic consciousness. The paper dissects foundational civic myths and demonstrates how ethnic-national hegemony can marginalize minority perspectives unless actively challenged through critical, dialogic pedagogy."
    },
    {
        "id": "pub-2",
        "file": "pub-2-conflict-resolution-children-tv.pdf",
        "title": "Developing Children's Understanding of Conflict Resolution Through Quality Television",
        "year": "2007",
        "publisher": "Children and Media in Times of War and Conflict, Hampton Press (pp. 215–236)",
        "citation": "Lemish, P. (2007). Developing children’s understanding of conflict resolution through quality television. In D. Lemish, M. Götz, & B. Dervin (Eds.), Children and Media in Times of War and Conflict (pp. 215-236). Hampton Press.",
        "abstract": "This research analyzes how high-quality children's television programming can serve as an effective instrument for peace education and constructive conflict resolution. It evaluates narrative framing techniques and strategies to help young audiences process news-induced fears.",
        "findings": "The study defines principles for constructive conflict portrayal: establishing core conflict stakes clearly, depicting all factions humanely, avoiding simplistic binary villainization, and illustrating win-win negotiation phases."
    },
    {
        "id": "pub-4",
        "file": "pub-4-iranians-israelis-make-music.pdf",
        "title": "'In Toronto, Iranians and Israelis Make Music, Not War': Political Communication via Engaged Musicking",
        "year": "2017",
        "publisher": "Music as a Platform for Political Communication, IGI Global (pp. 127–148)",
        "citation": "Lemish, P., Lemish, N., Sabet, P., & Deutsch, D. (2017). 'In Toronto, Iranians and Israelis Make Music, Not War': Political Communication via Engaged Musicking. In U. Onyebadi (Ed.), Music as a Platform for Political Communication (pp. 127-148). IGI Global. https://doi.org/10.4018/978-1-5225-1986-7.ch007",
        "abstract": "Investigates the Israeli-Iranian Musical Initiative (I=I) in Toronto, exploring how collaborative artistic performance ('musicking') creates an active, embodied platform for intercultural dialogue and resistance to geopolitical state hostilities.",
        "findings": "Transcultural musical dialogue enables artists and diaspora communities to circumvent formal diplomatic deadlocks, humanizing adversaries and creating alternative public spheres of mutual recognition and creative praxis."
    },
    {
        "id": "pub-5",
        "file": "pub-5-media-literacy-in-israel.pdf",
        "title": "A Much Debated Consensus: Media Literacy in Israel",
        "year": "2001 / 2018",
        "publisher": "Media Literacy Around the World (with Dafna Lemish, pp. 213–228)",
        "citation": "Lemish, P., & Lemish, D. (2001/2018). A much debated consensus: Media literacy in Israel. In Media Literacy Around the World (pp. 213-228).",
        "abstract": "A foundational study tracing the emergence, political debates, and institutional adoption of media literacy education in Israel. It evaluates how critical media pedagogy was introduced into school curricula to empower students to interrogate media representations and participate in democratic life.",
        "findings": "The study reveals the creative tension between official state curricular aims (which sought patriotic consensus) and critical media education (which trains youth to deconstruct media power, bias, and structural exclusion)."
    },
    {
        "id": "pub-6",
        "file": "pub-6-cso-media-manager.pdf",
        "title": "The Civil Society Organization Media Manager as Critical Communicator",
        "year": "2012",
        "publisher": "Nordicom Review, Vol. 33 (Special Issue), pp. 189–203 (with K. Caringer)",
        "citation": "Lemish, P., & Caringer, K. (2012). The civil society organization media manager as critical communicator. Nordicom Review, 33(Special Issue), 189-203. https://doi.org/10.2478/nor-2013-0036",
        "abstract": "Explores the strategic praxis of media managers in non-governmental and civil society organizations (CSOs), conceptualizing their role as 'critical communicators' who reshape public discourse and empower marginalized grassroots communities.",
        "findings": "Grassroots media managers move beyond standard public relations: they function as discursive translators, challenging mainstream hegemony and generating participatory knowledge from below."
    },
    {
        "id": "pub-7",
        "file": "pub-7-exposing-social-problems-pedagogy.pdf",
        "title": "Exposing Social Problems by Means of Critical Pedagogy",
        "year": "1997",
        "publisher": "Radical Teacher (p. 17) / Studies in Education (pp. 129–140; with Dvora Feldash)",
        "citation": "Lemish, P., & Feldash, D. (1997). Exposing social problems by means of critical pedagogy. Radical Teacher / Studies in Education, 129-140.",
        "abstract": "Examines classroom methodologies for teacher educators to uncover structural inequalities, socio-economic marginalization, and institutional biases through reflective and problem-posing classroom discussions.",
        "findings": "Demonstrates that teaching cannot be politically neutral; educators who adopt critical pedagogy empower pupils to interrogate their social realities and become agents of community transformation."
    },
    {
        "id": "pub-8",
        "file": "pub-8-evaluation-reflection-power-control.pdf",
        "title": "Evaluation Reflection Power-Control and the Praxis Orientation to School-Based Program Development",
        "year": "1988",
        "publisher": "Studies in Educational Evaluation, Vol. 14, No. 3, pp. 341–359",
        "citation": "Lemish, P. (1988). Evaluation reflection power-control and the praxis orientation to school-based program development. Studies in Educational Evaluation, 14(3), 341-359.",
        "abstract": "Critiques traditional, positivist approaches to school evaluation ('power-control' model) and formulates an alternative 'praxis orientation' for school-based program development and collaborative teacher inquiry.",
        "findings": "When school evaluation shifts from hierarchical surveillance to collaborative critical praxis, educators and community members gain authentic ownership over pedagogical innovation and structural change."
    },
    {
        "id": "pub-9",
        "file": "pub-9-hanukah-bush-jewish-experience.pdf",
        "title": "Hanukah Bush: The Jewish Experience in America",
        "year": "1981",
        "publisher": "Theory into Practice, Vol. 20, No. 1, pp. 26–34",
        "citation": "Lemish, P. (1981). Hanukah bush: The Jewish experience in America. Theory into Practice, 20(1), 26-34. https://doi.org/10.1080/00405848109542924",
        "abstract": "Early foundational qualitative fieldwork examining Jewish-American cultural assimilation, ritual syncretism, and the negotiation of minority religious identity in secular American environments.",
        "findings": "Employs deep qualitative inquiry to trace how hybrid festive symbols reflect domestic negotiation of belonging, identity anxiety, and cultural boundary maintenance."
    }
]

def create_pub_pdf(meta):
    pdf_path = os.path.join('public/files/publications', meta['file'])
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=45,
        leftMargin=45,
        topMargin=45,
        bottomMargin=45
    )
    elements = []

    elements.append(Paragraph(f"DR. PETER LEMISH SCHOLARLY ARCHIVE • PUBLICATION {meta['id'].upper()}", meta_style))
    elements.append(Paragraph(meta['title'], title_style))
    elements.append(Paragraph(f"Published {meta['year']} • {meta['publisher']}", subtitle_style))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#1E3A8A'), spaceAfter=12))

    elements.append(Paragraph("ACADEMIC CITATION (APA)", h2_style))
    elements.append(Paragraph(meta['citation'], citation_style))

    elements.append(Paragraph("ABSTRACT & RESEARCH CONTEXT", h2_style))
    elements.append(Paragraph(meta['abstract'], body_style))
    elements.append(Spacer(1, 6))

    elements.append(Paragraph("KEY FINDINGS & THEORETICAL CONTRIBUTION", h2_style))
    elements.append(Paragraph(meta['findings'], body_style))
    elements.append(Spacer(1, 6))

    elements.append(Paragraph("ARCHIVE LOCATION & REPOSITORY ACCESS", h2_style))
    meta_table = [
        [Paragraph("<b>Author:</b>", body_style), Paragraph("Dr. Peter Lemish", body_style)],
        [Paragraph("<b>Publication ID:</b>", body_style), Paragraph(meta['id'], body_style)],
        [Paragraph("<b>Document Type:</b>", body_style), Paragraph("Archival Peer-Reviewed Scholarly Brief / Full Analysis", body_style)],
        [Paragraph("<b>Digital Archive:</b>", body_style), Paragraph("Dr. Peter Lemish Living Digital Archive (https://peter-lemish-archive.vercel.app)", body_style)],
        [Paragraph("<b>NotebookLM Source:</b>", body_style), Paragraph("https://notebook.google.com/notebook/b5f6877e-c233-44d3-966a-ff6ee36344fa", body_style)]
    ]
    t = Table(meta_table, colWidths=[2.0*inch, 5.0*inch])
    t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor('#CBD5E1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
    ]))
    elements.append(t)

    elements.append(Spacer(1, 14))
    elements.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor('#CBD5E1'), spaceAfter=8))
    elements.append(Paragraph(
        "<i>Open Academic Archive Resource • Preserved for scholars, students, and community organizers.</i>",
        meta_style
    ))

    doc.build(elements)
    print("Created:", pdf_path)

if __name__ == '__main__':
    create_cv_pdf()
    for meta in publications_meta:
        create_pub_pdf(meta)
    print("All PDFs successfully generated!")

// siteContent.js
export const siteContent = {
  he: {
    nav: {
      brand: "ד\"ר פיטר למיש",
      subtitle: "מפעל חיים, מחקר ואקטיביזם",
      links: [
        { label: "אודות ומסלול חיים", href: "#biography" },
        { label: "תחומי מומחיות", href: "#focus-areas" },
        { label: "ארכיון פרסומים", href: "#publications" },
        { label: "מדיה והקלטות", href: "#media" },
        { label: "עדויות והוקרה", href: "#testimonials" },
        { label: "יצירת קשר", href: "#contact" }
      ],
      cvButton: "הורדת קורות חיים (PDF)",
      cvUrl: "/files/Peter_Lemish_CV_HE.pdf"
    },
    hero: {
      name: "ד\"ר פיטר למיש",
      role: "חוקר תקשורת ביקורתית, מחנך ופעיל חברתי",
      tagline: "מפעל חיים המשלב בין מחקר אקדמי מעמיק, אוריינות מדיה, חינוך לשלום ומאבק בלתי מתפשר לצדק חברתי וקהילתי.",
      ctaPrimary: "לסיפור החיים",
      ctaSecondary: "לארכיון הפרסומים",
      ctaContact: "יצירת קשר",
      imageAlt: "דיוקן של ד\"ר פיטר למיש"
    },
    timeline: [
      {
        id: "roots",
        year: "1944–1970",
        title: "שורשים, צמיחה מוקדמת והגירה",
        shortDesc: "שנות העיצוב הראשונות, לימודים מוקדמים וגיבוש התפיסה הערכית והחברתית שהובילה לעלייה ולפעילות בישראל.",
        fullStory: "כאן ניתן להדביק את הפסקה המלאה מ-NotebookLM המתארת את תחנת החיים הזו בפירוט...",
        mediaTag: "תחנת חיים ראשונה"
      },
      {
        id: "academic-path",
        year: "1970–2000",
        title: "המסלול האקדמי: מחקר והוראה ביקורתית",
        shortDesc: "השלמת תארים מתקדמים, הוראה במוסדות אקדמיים מובילים ופיתוח תוכניות לימוד בתקשורת, תרבות וחינוך.",
        fullStory: "פירוט המשרות האקדמיות, המחלקות שבהן לימד (כגון מכללות ואוניברסיטאות), ותחומי ההוראה המרכזיים...",
        mediaTag: "אקדמיה והוראה"
      },
      {
        id: "civic-action",
        year: "2000–היום",
        title: "אקטיביזם חברתי, חינוך לשלום ודיאלוג קהילתי",
        shortDesc: "הובלת יוזמות שטח, מאבקים אזרחיים, קידום זכויות אדם וסדנאות לדיאלוג בין-תרבותי וצדק חברתי.",
        fullStory: "הרחבה על הפרויקטים הקהילתיים, שיתופי הפעולה האזוריים והיוזמות לשינוי חברתי...",
        mediaTag: "עשייה ציבורית"
      }
    ],
    focusAreas: [
      {
        id: "media-literacy",
        icon: "BookOpen",
        title: "אוריינות מדיה ותקשורת ביקורתית",
        description: "ניתוח ייצוגים תקשורתיים, כוח המדיה בעיצוב תודעה ציבורית והקניית כלים ביקורתיים לצרכני תוכן."
      },
      {
        id: "peace-education",
        icon: "Users",
        title: "חינוך לשלום ודיאלוג בין-תרבותי",
        description: "פיתוח מתודולוגיות חינוכיות המקדמות סובלנות, מפגש רב-תרבותי והבנה הדדית בסביבות מורכבות."
      },
      {
        id: "community-activism",
        icon: "Globe",
        title: "צדק חברתי ומעורבות אזרחית",
        description: "חיבור עמוק בין תיאוריה אקדמית לפעילות שטח מעשית, מאבקים למען שוויון והעצמת קהילות מקומיות."
      },
      {
        id: "teacher-training",
        icon: "GraduationCap",
        title: "פדגוגיה והכשרת מחנכים",
        description: "הכשרת דורות של אנשי חינוך להוראה ביקורתית, חינוך אזרחי מודע וקידום חשיבה עצמאית בכיתה."
      }
    ],
    publications: {
      searchPlaceholder: "חיפוש במאמרים, ספרים ומחקרים לפי כותרת או נושא...",
      categories: [
        { key: "all", label: "הכל" },
        { key: "books", label: "ספרים ומונוגרפיות" },
        { key: "journal-articles", label: "מאמרים בכתבי עת" },
        { key: "reports", label: "דוחות וניירות עמדה" },
        { key: "opeds", label: "מאמרי דעה ועיתונות" }
      ],
      items: [
        {
          id: "pub-1",
          category: "books",
          title: "כותרת הספר / המונוגרפיה המרכזית",
          year: "1998",
          publisher: "הוצאה לאור אקדמית / מוסד מחקר",
          abstract: "תקציר קצר בן 2 שורות מתוך NotebookLM המתאר את התזה המרכזית של הספר.",
          tags: ["תקשורת", "חינוך ביקורתי"],
          fileUrl: "https://drive.google.com/...", // או קישור ישיר
          externalUrl: "https://scholar.google.com/..."
        },
        {
          id: "pub-2",
          category: "journal-articles",
          title: "כותרת מאמר בכתב עת מדעי",
          year: "2006",
          publisher: "Journal of Media & Communication",
          abstract: "תקציר המאמר האקדמי, ממצאים עיקריים ותרומתו למחקר התקשורת בישראל.",
          tags: ["אוריינות מדיה", "חברה ותרבות"],
          fileUrl: "/files/paper-2.pdf",
          externalUrl: "https://www.tandfonline.com/..."
        }
      ]
    },
    media: {
      title: "תיעוד, הרצאות ומדיה",
      subtitle: "מבחר ראיונות מצולמים, הרצאות מוקלטות ורגעים מפעילות השטח",
      videos: [
        {
          id: "vid-1",
          title: "הרצאה אקדמית בנושא תקשורת וצדק חברתי",
          date: "2018",
          embedUrl: "https://www.youtube.com/embed/placeholder",
          description: "תיאור קצר של תוכן ההרצאה או האירוע."
        }
      ],
      gallery: [
        {
          id: "img-1",
          url: "/images/peter-conference-1995.jpg",
          caption: "בכנס בינלאומי לחינוך ושלום, 1995",
          alt: "ד\"ר פיטר למיש מרצה מעל דוכן הנואמים בכנס בינלאומי"
        }
      ]
    },
    testimonials: [
      {
        id: "test-1",
        quote: "פיטר לימד אותנו שחינוך אינו רק מקצוע, אלא מעשה אזרחי בעל השפעה ישירה על החברה.",
        author: "שם עמית / סטודנט לשעבר",
        role: "פרופסור לתקשורת / מנהל מרכז חינוכי"
      }
    ],
    contact: {
      title: "יצירת קשר ושמירה על קשר",
      description: "לפניות אקדמיות, שאלות לגבי מחקרים או שיתופי פעולה עתידיים, ניתן להשאיר הודעה:",
      emailDirect: "peter.lemish@example.com",
      form: {
        nameLabel: "שם מלא",
        emailLabel: "כתובת אימייל",
        subjectLabel: "נושא הפנייה",
        messageLabel: "תוכן ההודעה",
        submitButton: "שליחת הודעה"
      },
      academicProfiles: [
        { name: "Google Scholar", url: "https://scholar.google.com" },
        { name: "ResearchGate", url: "https://researchgate.net" },
        { name: "Academia.edu", url: "https://academia.edu" }
      ]
    },
    accessibilityStatement: {
      title: "הצהרת נגישות",
      content: "אתר זה תוכנן ונבנה בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע\"ג-2013, ולתקן WCAG 2.1 ברמה AA/AAA..."
    }
  },

  en: {
    nav: {
      brand: "Dr. Peter Lemish",
      subtitle: "Academic Legacy & Social Activism",
      links: [
        { label: "Biography", href: "#biography" },
        { label: "Focus Areas", href: "#focus-areas" },
        { label: "Publications", href: "#publications" },
        { label: "Media & Lectures", href: "#media" },
        { label: "Testimonials", href: "#testimonials" },
        { label: "Contact", href: "#contact" }
      ],
      cvButton: "Download CV (PDF)",
      cvUrl: "/files/Peter_Lemish_CV_EN.pdf"
    },
    hero: {
      name: "Dr. Peter Lemish",
      role: "Critical Media Scholar, Educator & Community Activist",
      tagline: "A lifelong dedication bridging critical media scholarship, peace education, and steadfast advocacy for community social justice.",
      ctaPrimary: "Explore Biography",
      ctaSecondary: "View Publications",
      ctaContact: "Get in Touch",
      imageAlt: "Portrait of Dr. Peter Lemish"
    },
    timeline: [
      {
        id: "roots",
        year: "1944–1970",
        title: "Roots, Early Life & Formative Path",
        shortDesc: "Early education, formative values, and the life experiences that inspired his immigration and work in Israel.",
        fullStory: "Paste the extended biographical narrative from NotebookLM here...",
        mediaTag: "Early Years"
      },
      {
        id: "academic-path",
        year: "1970–2000",
        title: "Academic Career: Critical Research & Pedagogy",
        shortDesc: "Doctoral research, university and college appointments, and pioneering curricula in media and culture.",
        fullStory: "Detailed account of academic posts, key courses taught, and theoretical contributions...",
        mediaTag: "Academia & Teaching"
      },
      {
        id: "civic-action",
        year: "2000–Present",
        title: "Grassroots Activism, Peace Education & Dialogue",
        shortDesc: "Spearheading community organizing, human rights defense, and cross-cultural dialogue workshops.",
        fullStory: "Extended narrative regarding civil society campaigns and community partnerships...",
        mediaTag: "Civic Action"
      }
    ],
    focusAreas: [
      {
        id: "media-literacy",
        icon: "BookOpen",
        title: "Media Literacy & Critical Discourse",
        description: "Analyzing representations, media influence on public consciousness, and cultivating critical evaluation tools."
      },
      {
        id: "peace-education",
        icon: "Users",
        title: "Peace Education & Intercultural Dialogue",
        description: "Developing educational frameworks promoting tolerance, mutual recognition, and coexistence."
      },
      {
        id: "community-activism",
        icon: "Globe",
        title: "Social Justice & Civic Engagement",
        description: "Bridging scholarly theory and hands-on grassroots action to advance equity and empower communities."
      },
      {
        id: "teacher-training",
        icon: "GraduationCap",
        title: "Pedagogy & Educator Mentorship",
        description: "Mentoring future teachers in critical education, democratic values, and fostering independent thinking."
      }
    ],
    publications: {
      searchPlaceholder: "Search papers, books, and articles by title or keyword...",
      categories: [
        { key: "all", label: "All" },
        { key: "books", label: "Books & Monographs" },
        { key: "journal-articles", label: "Journal Articles" },
        { key: "reports", label: "Policy Papers & Reports" },
        { key: "opeds", label: "Op-Eds & Public Essays" }
      ],
      items: [
        {
          id: "pub-1",
          category: "books",
          title: "Major Book / Monograph Title",
          year: "1998",
          publisher: "Academic Publisher / Research Institute",
          abstract: "A concise 2-line summary extracted from NotebookLM summarizing the central thesis.",
          tags: ["Communication", "Critical Pedagogy"],
          fileUrl: "https://drive.google.com/...",
          externalUrl: "https://scholar.google.com/..."
        },
        {
          id: "pub-2",
          category: "journal-articles",
          title: "Peer-Reviewed Journal Article Title",
          year: "2006",
          publisher: "Journal of Media & Communication",
          abstract: "Abstract highlighting main empirical findings and theoretical contributions.",
          tags: ["Media Literacy", "Culture"],
          fileUrl: "/files/paper-2.pdf",
          externalUrl: "https://www.tandfonline.com/..."
        }
      ]
    },
    media: {
      title: "Media, Lectures & Archives",
      subtitle: "Selected recorded talks, broadcast interviews, and archival photographs",
      videos: [
        {
          id: "vid-1",
          title: "Academic Keynote on Media & Social Justice",
          date: "2018",
          embedUrl: "https://www.youtube.com/embed/placeholder",
          description: "Summary of the keynote themes and venue."
        }
      ],
      gallery: [
        {
          id: "img-1",
          url: "/images/peter-conference-1995.jpg",
          caption: "International Conference on Peace & Education, 1995",
          alt: "Dr. Peter Lemish speaking at a podium during an international symposium"
        }
      ]
    },
    testimonials: [
      {
        id: "test-1",
        quote: "Peter taught us that education is not merely an occupation, but an ongoing civic responsibility.",
        author: "Colleague / Former Student Name",
        role: "Professor of Media Studies / Community Center Director"
      }
    ],
    contact: {
      title: "Contact & Academic Inquiries",
      description: "For academic queries, research collaborations, or archived materials, feel free to reach out:",
      emailDirect: "peter.lemish@example.com",
      form: {
        nameLabel: "Full Name",
        emailLabel: "Email Address",
        subjectLabel: "Subject",
        messageLabel: "Message Content",
        submitButton: "Send Message"
      },
      academicProfiles: [
        { name: "Google Scholar", url: "https://scholar.google.com" },
        { name: "ResearchGate", url: "https://researchgate.net" },
        { name: "Academia.edu", url: "https://academia.edu" }
      ]
    },
    accessibilityStatement: {
      title: "Accessibility Statement",
      content: "This archive was engineered in accordance with WCAG 2.1 AA/AAA accessibility standards..."
    }
  }
};
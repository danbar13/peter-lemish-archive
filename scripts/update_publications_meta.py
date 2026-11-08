import re

with open('src/data/siteContent.js', 'r', encoding='utf-8') as f:
    text = f.read()

pub_data = {
    'pub-1': {
        'pdfUrl': '/files/publications/pub-1-civic-and-citizenship-education.pdf',
        'pdfFileName': 'Dr_Peter_Lemish_Civic_and_Citizenship_Education_in_Israel_2003.pdf',
        'externalUrl': 'https://doi.org/10.1080/0305764032000064640',
        'notebookLmUrl': 'https://notebook.google.com/notebook/b5f6877e-c233-44d3-966a-ff6ee36344fa',
    },
    'pub-2': {
        'pdfUrl': '/files/publications/pub-2-conflict-resolution-children-tv.pdf',
        'pdfFileName': 'Dr_Peter_Lemish_Conflict_Resolution_Through_Quality_Television_2007.pdf',
        'externalUrl': 'https://scholar.google.com/scholar?q=Developing+children%27s+understanding+of+conflict+resolution+through+quality+television+Peter+Lemish',
        'notebookLmUrl': 'https://notebook.google.com/notebook/b5f6877e-c233-44d3-966a-ff6ee36344fa',
    },
    'pub-3': {
        'pdfUrl': '/files/publications/pub-3-the-transgressive-posture.pdf',
        'pdfFileName': 'Dr_Peter_Lemish_The_Transgressive_Posture_Akademisk_Kvarter_2011.pdf',
        'externalUrl': 'https://journals.aau.dk/index.php/ak/article/view/2956',
        'notebookLmUrl': 'https://notebook.google.com/notebook/b5f6877e-c233-44d3-966a-ff6ee36344fa',
    },
    'pub-4': {
        'pdfUrl': '/files/publications/pub-4-iranians-israelis-make-music.pdf',
        'pdfFileName': 'Dr_Peter_Lemish_Iranians_and_Israelis_Make_Music_Not_War_2017.pdf',
        'externalUrl': 'https://doi.org/10.4018/978-1-5225-1986-7.ch007',
        'notebookLmUrl': 'https://notebook.google.com/notebook/b5f6877e-c233-44d3-966a-ff6ee36344fa',
    },
    'pub-5': {
        'pdfUrl': '/files/publications/pub-5-media-literacy-in-israel.pdf',
        'pdfFileName': 'Dr_Peter_Lemish_Media_Literacy_in_Israel_2018.pdf',
        'externalUrl': 'https://scholar.google.com/scholar?q=A+much+debated+consensus%3A+Media+literacy+in+Israel+Peter+Lemish',
        'notebookLmUrl': 'https://notebook.google.com/notebook/b5f6877e-c233-44d3-966a-ff6ee36344fa',
    },
    'pub-6': {
        'pdfUrl': '/files/publications/pub-6-cso-media-manager.pdf',
        'pdfFileName': 'Dr_Peter_Lemish_CSO_Media_Manager_as_Critical_Communicator_2012.pdf',
        'externalUrl': 'https://doi.org/10.2478/nor-2013-0036',
        'notebookLmUrl': 'https://notebook.google.com/notebook/b5f6877e-c233-44d3-966a-ff6ee36344fa',
    },
    'pub-7': {
        'pdfUrl': '/files/publications/pub-7-exposing-social-problems-pedagogy.pdf',
        'pdfFileName': 'Dr_Peter_Lemish_Exposing_Social_Problems_Critical_Pedagogy_1997.pdf',
        'externalUrl': 'https://scholar.google.com/scholar?q=Exposing+social+problems+by+means+of+critical+pedagogy+Peter+Lemish+Dvora+Feldash',
        'notebookLmUrl': 'https://notebook.google.com/notebook/b5f6877e-c233-44d3-966a-ff6ee36344fa',
    },
    'pub-8': {
        'pdfUrl': '/files/publications/pub-8-evaluation-reflection-power-control.pdf',
        'pdfFileName': 'Dr_Peter_Lemish_Evaluation_Reflection_Power_Control_1988.pdf',
        'externalUrl': 'https://scholar.google.com/scholar?q=Evaluation+reflection+power-control+and+the+praxis+orientation+to+school-based+program+development+Peter+Lemish',
        'notebookLmUrl': 'https://notebook.google.com/notebook/b5f6877e-c233-44d3-966a-ff6ee36344fa',
    },
    'pub-9': {
        'pdfUrl': '/files/publications/pub-9-hanukah-bush-jewish-experience.pdf',
        'pdfFileName': 'Dr_Peter_Lemish_Hanukah_Bush_Jewish_Experience_in_America_1981.pdf',
        'externalUrl': 'https://doi.org/10.1080/00405848109542924',
        'notebookLmUrl': 'https://notebook.google.com/notebook/b5f6877e-c233-44d3-966a-ff6ee36344fa',
    },
}

def replacer(match):
    prefix = match.group(1)
    pub_id = match.group(2)
    middle = match.group(3)
    if pub_id in pub_data:
        d = pub_data[pub_id]
        new_props = (
            f"pdfUrl: '{d['pdfUrl']}',\n"
            f"          pdfFileName: '{d['pdfFileName']}',\n"
            f"          externalUrl: '{d['externalUrl']}',\n"
            f"          notebookLmUrl: '{d['notebookLmUrl']}',"
        )
        return f"{prefix}{middle}{new_props}"
    return match.group(0)

# Replace each pub-X's pdfUrl: '#'
pattern = re.compile(r"(id:\s*'(pub-[1-9])')([\s\S]*?)(pdfUrl:\s*'#',)")
new_text, count = pattern.subn(replacer, text)
print(f"Replacements made: {count}")

assert count == 18, f"Expected 18 replacements (9 Hebrew + 9 English), got {count}"

with open('src/data/siteContent.js', 'w', encoding='utf-8') as f:
    f.write(new_text)

print("src/data/siteContent.js successfully updated!")

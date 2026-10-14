# Hope Ever Foundation — Website

Official website of **Hope Ever Foundation**, a non-profit trust working with
marginalized communities across Tamil Nadu, India.

**Live site:** https://hopeever.org

---

## About Hope Ever Foundation

Hope Ever Foundation is a registered non-profit established in **2012** under the
**Indian Trust Act, 1882** (Reg. No. 63/12). For over a decade it has worked across
**14 districts of Tamil Nadu** to empower Scheduled Castes, Scheduled Tribes, women
and youth through sustainable livelihoods, education, child rights and
environmental conservation, combining grassroots community engagement with
evidence-based planning and strong institutional partnerships.

**Mission:** To raise awareness and build community capacity for environmental
conservation and economic self-reliance.

**Vision:** To ensure sustainable livelihoods for marginalized populations through
eco-friendly practices such as organic agriculture and renewable energy.

### What the foundation does

| Program area | Focus |
|---|---|
| Community Outreach & Awareness | Health, sanitation, education, tribal welfare and social-inclusion campaigns |
| Livelihood Promotion & Rural Development | Organic farming, millets and value-added products, solar and rural enterprise |
| Skill Development & Employability | NSDC-partnered vocational, handicraft and entrepreneurship training |
| Women & Community Empowerment | SHG strengthening, women-led micro-enterprises, financial literacy |
| Research, Capacity Building & Participatory Planning | Field studies, assessments and planning with communities and government |

### Impact so far

450+ youth trained in skill development · 200+ farmers moved to organic farming ·
500+ SC/ST youth trained · 300+ women trained in trades and enterprise ·
20+ villages with Child Rights Clubs · 14 districts · 13+ years of operation

### Recognition

- Approval order under Form 10AB of the Income Tax Act
- Empanelment with the Ministry of Textiles (3 years)
- State Medicinal Plants Board (SMPB) certificate

### Partners

NITI Aayog · NABARD · TAHDCO · NSDC · ASCI · EDII · Ministry of AYUSH ·
DC Handicrafts · National Medicinal Plants Board · Ministry of Tribal Welfare ·
Arise Investment · Skill Council for Green Jobs · CECOWOR · Accenture

### Contact

- **Address:** No. 41, Anna Nedunchalai, Kandanchavadi, Chennai 600096, Tamil Nadu, India
- **Phone:** +91 04446517039
- **Email:** contact@hopeever.org
- **Facebook:** https://www.facebook.com/p/Hope-Ever-Foundation-100079969281675/

Want to help? Volunteers and interns can apply through the
[Get Involved](https://hopeever.org/get-involved.html) page.

---

## About this website

A fast, static, multi-page site: plain HTML, CSS and vanilla JavaScript, with
**no framework and no build step**. Hosted on Vercel.

### Pages

| File | Page |
|---|---|
| `index.html` | Home: hero slider, who we are, stories of change, impact numbers, partners |
| `about.html` | History, team, district map, recognition, partner table |
| `projects.html` | Project cards with sector filters |
| `projects/*.html` | One detail page per project (9 projects) |
| `programs.html` | The five program areas |
| `gallery.html` | Photo gallery with category filters and lightbox |
| `get-involved.html` | Volunteer / internship expression-of-interest form |
| `contact.html` | Contact form, details and map |
| `404.html` | Not-found page |

### Folder structure

```
assets/       images (gallery, partners, icons, logo), district map data
components/   shared navbar and footer snippets
css/          global.css (tokens, layout, motion) + one file per page
docs/         certificates and policy PDFs
js/           main.js (language switcher, transitions, cursor, loaders)
              navbar.js, counter.js, scroll-reveal.js, gallery.js,
              projects.js, contact.js, map.js
```

### Features

- **Speed:** compressed images, lazy loading, deferred scripts; Google Translate
  only loads when a visitor picks a language
- **Responsive:** tested from 375px phones to wide desktops; slide-in mobile menu
- **Language switcher:** English, Tamil, Hindi, Telugu, Malayalam, Kannada
- **Smooth experience:** page transitions, image placeholders, subtle scroll
  reveals, animated impact counters, two-row partner marquee
- **Forms:** Contact and Get Involved forms submit through Web3Forms
- **Accessibility:** semantic landmarks, labelled form fields, keyboard-friendly
  menus, visible focus, and all motion switched off for visitors who prefer
  reduced motion

### Brand

| Token | Value | Use |
|---|---|---|
| Primary green | `#0F6E56` | Headings, buttons, navigation |
| Accent amber | `#D4872A` | Highlights, labels, accents |
| Background | `#F9F6F1` | Warm off-white page background |
| Text | `#1A1A1A` / `#5A5A5A` | Body text / secondary text |

Fonts: **Merriweather** (headings) and **Manrope** (body), via Google Fonts.

### Run locally

Any static file server works. With Python installed:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

---

© 2026 Hope Ever Foundation. All rights reserved.

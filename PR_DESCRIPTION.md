# Site enhancements per client brief (speed, responsiveness, content, Get Involved)

This refines hopeever.org without redesigning it, as the brief asks. Background, fonts, colour palette and visual style are unchanged.

## Speed
- Images recompressed in place with the same filenames: **19.1 MB → 5.8 MB** (photos capped at 1600px, logos at 400px).
- Below-the-fold images and the map iframe are lazy-loaded.
- All local scripts use `defer`, and scroll listeners are passive.
- The contact page no longer loads d3 + map.js, which it never used.

## Responsiveness / bug fixes
- **Mobile menu was broken on 5 pages.** About, Contact, Gallery, Programs and Projects were missing `<header class="site-header">`, so `navbar.js` exited early and the hamburger menu and sticky header did nothing.
- The nav now collapses below 1140px, so the 7 links never wrap onto two lines.
- The About page partner table no longer overflows phone screens.
- **The contact form always showed "sent successfully", even when sending failed.** It now checks the Web3Forms response.
- The contact map showed Adyar. It now shows the Kandanchavadi office.
- The partner marquee loop was missing Accenture in its second copy, which caused a visible jump. It now pauses on hover and keyboard focus.
- sitemap.xml and robots.txt pointed to the old `hopeeverfoundation.org` domain.

## Content
- Home page has a new **Stories of Change** section with 3 cards using real photos. The text is drawn from the existing project pages.
- Project page heroes now use the foundation's own photos instead of Unsplash stock (except Agri-Training, which has no matching photo).
- **New `get-involved.html`**: an expression-of-interest form for volunteering and internships. It uses the same Web3Forms key as the contact form and is linked from every page's nav and from a home-page CTA.

## Accessibility / motion
- Respects the visitor's `prefers-reduced-motion` setting, adds a visible focus outline, and keeps animations subtle.

## Tested
- Every page at 375px, 1000px and 1280px: no horizontal scroll, header present, mobile menu opens, no broken images (other than the pre-existing issue below).

## Needs input from the foundation
- Real success stories or testimonials (names, quotes, photos) with consent. The current cards only summarise program outcomes.
- About page: 4 certificate thumbnails in `assets/certificates/` are missing on the live site too.
- The footer Instagram link is empty (`href=""`), and a handle is marked "to be updated".
- Photos for the Agri-Training hero.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

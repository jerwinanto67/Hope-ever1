# Hope Ever Foundation website: speed, responsiveness, content and polish

## About Hope Ever Foundation

Hope Ever Foundation is a registered non-profit trust established in 2012 under the Indian Trust Act, 1882. It works across 14 districts of Tamil Nadu to empower Scheduled Castes, Scheduled Tribes, women and youth through sustainable livelihoods, skill development, child rights, community health and environmental conservation. Its partners include NITI Aayog, NABARD, NSDC, TAHDCO, EDII and Accenture. Live site: https://hopeever.org

## What this PR does

This follows the client's brief: refine and upgrade the existing site rather than redesign it, keeping its original colours, fonts and classic NGO look while making it faster, more responsive, richer in content and easier to use.

### Speed
- Images recompressed with the same filenames: **19.1 MB → 5.8 MB**.
- Lazy loading for below-the-fold images and the map. All scripts are deferred.
- Google Translate loads only when a visitor picks a language, instead of on every page view.
- The contact page no longer loads an unused mapping library.

### Bugs fixed
- **The mobile menu didn't work on 5 pages.** About, Contact, Gallery, Programs and Projects were missing their header tag.
- **The contact form always said "sent successfully"**, even when sending failed.
- The contact map pointed to Adyar instead of the Kandanchavadi office.
- The partner logo strip jumped at the end of each loop, and the About page partner table overflowed on phones.
- The Projects page and project pages used Arial and a different width, so the header shifted between pages.
- sitemap.xml and robots.txt pointed to the old `hopeeverfoundation.org` domain.

### New content
- **Get Involved page:** a volunteer and internship expression-of-interest form, linked in every page's menu.
- **Stories of Change** section on the home page, with the foundation's own photos.
- Project pages use the foundation's own photos instead of stock images.

### Design and motion (subtle, per the brief)
- **New menu:** amber underline on desktop and "Get Involved" as a button. On phones, a slide-in panel with a dimmed background; the hamburger turns into an ✕.
- **Language switcher:** a globe button with an animated panel for English, Tamil, Hindi, Telugu, Malayalam and Kannada. Google's banner is hidden.
- **Impact numbers:** cards pop in, numbers count up with easing, and a progress bar fills under each.
- **Partners:** two rows drifting in opposite directions with faded edges; logos come to full colour on hover.
- **Page transitions:** the header stays put while the content fades between pages.
- **Loading:** shimmer placeholders where images will appear, then a soft fade-in.
- **Cursor:** a dot with a trailing ring that grows over links (mouse only).
- **Layout:** consistent section spacing, centred home headings, matching page banners.

### Accessibility
- Every page has a `<main>` area, labelled form fields, keyboard-friendly menus and a visible focus outline.
- All animation turns off for visitors who prefer reduced motion.

## Tested
- Every page at 375px, 1000px, 1200px and 1300px+: no sideways scrolling, header aligned, menus open and close.
- Tamil translation, the language choice carrying across pages, and switching back to English.
- Gallery image placeholders, and page transitions between pages.

## Still needed from the foundation
- Real testimonials or success stories with names and consent.
- Four certificate thumbnails on the About page (also missing on the live site).
- Instagram link (currently empty) and a photo for the Agri-Training project.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

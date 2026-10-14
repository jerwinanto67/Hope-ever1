(function () {
  async function injectComponent(selector, filePath) {
    const placeholder = document.querySelector(selector);
    if (!placeholder) {
      return;
    }

    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error('Failed to load component: ' + filePath);
      }
      placeholder.innerHTML = await response.text();
    } catch (error) {
      placeholder.innerHTML = '';
      console.error(error);
    }
  }

  function normalizeRelativeUrls(scope, prefix) {
    if (!scope || !prefix) {
      return;
    }

    const nodes = scope.querySelectorAll('[href], [src]');
    nodes.forEach(function (node) {
      ['href', 'src'].forEach(function (attr) {
        const value = node.getAttribute(attr);
        if (!value) {
          return;
        }

        const isExternal =
          value.startsWith('http') ||
          value.startsWith('mailto:') ||
          value.startsWith('tel:') ||
          value.startsWith('#') ||
          value.startsWith('../') ||
          value.startsWith('./');

        if (!isExternal) {
          node.setAttribute(attr, prefix + value);
        }
      });
    });
  }

  function initModules() {
    if (typeof window.initNavbar === 'function') {
      window.initNavbar();
    }
    if (typeof window.initHeroSlider === 'function') {
      window.initHeroSlider();
    }
    if (typeof window.initCounters === 'function') {
      window.initCounters();
    }
    if (typeof window.initProjectFilters === 'function') {
      window.initProjectFilters();
    }
    if (typeof window.initGallery === 'function') {
      window.initGallery();
    }
    if (typeof window.initContactForm === 'function') {
      window.initContactForm();
    }
    if (typeof window.initScrollReveal === 'function') {
      window.initScrollReveal();
    }
  }

  document.addEventListener('DOMContentLoaded', async function () {
    const inProjectSubdir = window.location.pathname.indexOf('/projects/') !== -1;
    const basePath = inProjectSubdir ? '../' : '';

    await Promise.all([
      injectComponent('#navbar-placeholder', basePath + 'components/navbar.html'),
      injectComponent('#footer-placeholder', basePath + 'components/footer.html')
    ]);

    if (inProjectSubdir) {
      normalizeRelativeUrls(document.querySelector('#navbar-placeholder'), '../');
      normalizeRelativeUrls(document.querySelector('#footer-placeholder'), '../');
    }

    initModules();
  });
})();

// ============================================
// HERO IMAGE SLIDER
// ============================================
window.initHeroSlider = function() {
    const slider = document.getElementById('hero-slider');
    if (!slider) return;

    const images = slider.querySelectorAll('img');
    if (images.length <= 1) return;

    let currentIndex = 0;

    // Change image every 5 seconds
    setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }, 5000);
};

// ============================================
// LANGUAGE SWITCHER (custom UI over Google Translate)
// Google's script only loads once a visitor picks a language, or when a
// previous choice is remembered in the googtrans cookie.
// ============================================
(function() {
    const LANGUAGES = [
        { code: 'en', label: 'English', name: 'English' },
        { code: 'ta', label: 'தமிழ்', name: 'Tamil' },
        { code: 'hi', label: 'हिन्दी', name: 'Hindi' },
        { code: 'te', label: 'తెలుగు', name: 'Telugu' },
        { code: 'ml', label: 'മലയാളം', name: 'Malayalam' },
        { code: 'kn', label: 'ಕನ್ನಡ', name: 'Kannada' }
    ];

    function currentLang() {
        const match = document.cookie.match(/(?:^|;\s*)googtrans=\/en\/([a-z-]+)/i);
        return match ? match[1] : 'en';
    }

    function setCookie(value, expires) {
        const base = 'googtrans=' + value + ';path=/' + (expires ? ';expires=' + expires : '');
        document.cookie = base;
        // Google also writes the cookie on the parent domain on live hosts
        if (location.hostname.indexOf('.') !== -1) {
            document.cookie = base + ';domain=.' + location.hostname.replace(/^www\./, '');
        }
    }

    let scriptRequested = false;
    function loadGoogle() {
        if (scriptRequested) return;
        scriptRequested = true;
        window.googleTranslateElementInit = function() {
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: LANGUAGES.map(function(l) { return l.code; }).join(','),
                autoDisplay: false
            }, 'google_translate_element');
        };
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
    }

    // Drive Google's hidden <select> once it exists
    function applyWithCombo(code, triesLeft) {
        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = code;
            combo.dispatchEvent(new Event('change'));
        } else if (triesLeft > 0) {
            setTimeout(function() { applyWithCombo(code, triesLeft - 1); }, 200);
        }
    }

    function chooseLanguage(code) {
        if (code === currentLang()) return;
        if (code === 'en') {
            // Google's own "restore" is unreliable; clearing the cookie and reloading is not
            setCookie('', 'Thu, 01 Jan 1970 00:00:00 GMT');
            location.reload();
            return;
        }
        setCookie('/en/' + code);
        if (scriptRequested) {
            applyWithCombo(code, 25);
        } else {
            loadGoogle(); // reads the cookie and translates on load
        }
    }

    function buildSwitcher() {
        const navWrap = document.querySelector('.nav-wrap');
        if (!navWrap) return;

        const active = currentLang();
        const activeLang = LANGUAGES.filter(function(l) { return l.code === active; })[0] || LANGUAGES[0];

        const wrapper = document.createElement('div');
        wrapper.className = 'translate-widget-wrapper lang-switcher notranslate';
        wrapper.setAttribute('translate', 'no');
        wrapper.innerHTML =
            '<button type="button" class="lang-toggle" aria-haspopup="true" aria-expanded="false" aria-controls="lang-menu">' +
                '<svg class="lang-globe" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">' +
                    '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c2.6 2.8 3.9 6 3.9 9.5s-1.3 6.7-3.9 9.5c-2.6-2.8-3.9-6-3.9-9.5s1.3-6.7 3.9-9.5z"/>' +
                '</svg>' +
                '<span class="lang-code">' + activeLang.code.toUpperCase() + '</span>' +
                '<svg class="lang-caret" width="10" height="10" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>' +
                '<span class="visually-hidden">Change language, current: ' + activeLang.name + '</span>' +
            '</button>' +
            '<div class="lang-menu" id="lang-menu" role="menu">' +
                '<p class="lang-menu-title">Read this site in</p>' +
                LANGUAGES.map(function(l, i) {
                    return '<button type="button" role="menuitemradio" class="lang-option" style="--i:' + i + '" data-lang="' + l.code + '" aria-checked="' + (l.code === active) + '">' +
                        '<span class="lang-native">' + l.label + '</span>' +
                        '<span class="lang-en">' + l.name + '</span>' +
                    '</button>';
                }).join('') +
                '<p class="lang-note">Automatic translation by Google</p>' +
            '</div>' +
            '<div id="google_translate_element" hidden></div>';

        const brand = navWrap.querySelector('.brand');
        if (brand) {
            brand.insertAdjacentElement('afterend', wrapper);
        } else {
            navWrap.insertBefore(wrapper, navWrap.firstChild);
        }

        const toggle = wrapper.querySelector('.lang-toggle');
        const options = wrapper.querySelectorAll('.lang-option');
        const setOpen = function(open) {
            wrapper.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
            if (open) {
                const checked = wrapper.querySelector('[aria-checked="true"]') || options[0];
                checked.focus({ preventScroll: true });
            }
        };

        toggle.addEventListener('click', function(event) {
            event.stopPropagation();
            setOpen(!wrapper.classList.contains('open'));
        });

        options.forEach(function(option, index) {
            option.addEventListener('click', function() {
                options.forEach(function(o) { o.setAttribute('aria-checked', String(o === option)); });
                wrapper.querySelector('.lang-code').textContent = option.dataset.lang.toUpperCase();
                setOpen(false);
                toggle.focus();
                chooseLanguage(option.dataset.lang);
            });
            option.addEventListener('keydown', function(event) {
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    const step = event.key === 'ArrowDown' ? 1 : -1;
                    options[(index + step + options.length) % options.length].focus();
                }
            });
        });

        document.addEventListener('click', function(event) {
            if (!wrapper.contains(event.target)) setOpen(false);
        });
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && wrapper.classList.contains('open')) {
                setOpen(false);
                toggle.focus();
            }
        });

        if (active !== 'en') loadGoogle();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildSwitcher);
    } else {
        buildSwitcher();
    }
})();

// ============================================
// CURSOR: soft dot + trailing ring (mouse/trackpad only)
// ============================================
(function() {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduceMotion) return;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    document.body.append(dot, ring);
    document.documentElement.classList.add('has-custom-cursor');

    let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
    const INTERACTIVE = 'a, button, [role="button"], label, .chip, .filter-btn, .partner-logo, summary';
    const NATIVE = 'input, textarea, select, iframe, [contenteditable]';

    document.addEventListener('mousemove', function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        dot.style.transform = 'translate(' + mouseX + 'px,' + mouseY + 'px)';
        const target = event.target;
        document.documentElement.classList.toggle('cursor-hover', !!(target.closest && target.closest(INTERACTIVE)));
        document.documentElement.classList.toggle('cursor-native', !!(target.closest && target.closest(NATIVE)));
        document.documentElement.classList.remove('cursor-hidden');
    }, { passive: true });

    document.addEventListener('mousedown', function() { document.documentElement.classList.add('cursor-press'); });
    document.addEventListener('mouseup', function() { document.documentElement.classList.remove('cursor-press'); });
    document.documentElement.addEventListener('mouseleave', function() { document.documentElement.classList.add('cursor-hidden'); });

    // Ring eases toward the pointer each frame for a gentle trailing motion
    (function follow() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px)';
        requestAnimationFrame(follow);
    })();
})();

// ============================================
// FLOATING BACK TO TOP BUTTON - Global Component
// ============================================
(function() {
    // Create button element
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top-btn';
    scrollBtn.id = 'scrollTopBtn';
    scrollBtn.setAttribute('aria-label', 'Back to top');
    scrollBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    `;

    // Add to page
    document.body.appendChild(scrollBtn);

    // Show/hide based on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }, { passive: true });

    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
})();

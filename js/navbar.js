window.initNavbar = function initNavbar() {
  const header = document.querySelector('.site-header');
  const nav = document.querySelector('.primary-nav');
  const toggle = document.querySelector('.nav-toggle');
  const currentPage = document.body.getAttribute('data-page');

  if (!header || !nav || !toggle) {
    return;
  }

  const setMenu = function (open) {
    nav.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };

  const navLinks = nav.querySelectorAll('a[data-nav]');
  navLinks.forEach(function (link) {
    if (link.getAttribute('data-nav') === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }

    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  toggle.addEventListener('click', function (event) {
    event.stopPropagation();
    setMenu(!nav.classList.contains('open'));
  });

  // Close on Escape, on a tap outside the panel, or when the screen grows to desktop width
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', function (event) {
    if (nav.classList.contains('open') && !nav.contains(event.target)) {
      setMenu(false);
    }
  });

  window.matchMedia('(min-width: 1141px)').addEventListener('change', function (mq) {
    if (mq.matches) {
      setMenu(false);
    }
  });

  const setScrollState = function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };

  setScrollState();
  window.addEventListener('scroll', setScrollState, { passive: true });

  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {
    backToTopButton.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

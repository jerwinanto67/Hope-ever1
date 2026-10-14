window.initScrollReveal = function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) {
    return;
  }

  // Stagger cards that share a parent so a row fades in one after another
  elements.forEach(function (element) {
    const siblings = Array.prototype.filter.call(element.parentElement.children, function (child) {
      return child.classList.contains('reveal');
    });
    const index = siblings.indexOf(element);
    if (index % 5) {
      element.style.setProperty('--reveal-delay', (index % 5) * 90 + 'ms');
    }
  });

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(function (element) {
    observer.observe(element);
  });
};

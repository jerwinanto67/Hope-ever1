window.initCounters = function initCounters() {
  const counters = document.querySelectorAll('[data-counter-target]');
  if (!counters.length) {
    return;
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const easeOutCubic = function (x) {
    return 1 - Math.pow(1 - x, 3);
  };

  const animateCounter = function (counter) {
    const target = Number(counter.getAttribute('data-counter-target'));
    const suffix = counter.getAttribute('data-counter-suffix') || '';
    const card = counter.closest('.impact-card');
    const duration = reduceMotion ? 0 : 1800;
    const start = performance.now();

    // Card's progress bar fills in step with the count (see .impact-card.counted in home.css)
    if (card) {
      card.classList.add('counted');
    }

    const step = function (timestamp) {
      const progress = duration ? Math.min((timestamp - start) / duration, 1) : 1;
      const value = Math.round(easeOutCubic(progress) * target);
      counter.textContent = value.toLocaleString('en-IN') + (progress < 1 ? '' : suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
};

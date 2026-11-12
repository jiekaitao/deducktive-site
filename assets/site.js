/* Deducktive site. Optional fade and rise for sections below the fold.
   Nothing is hidden unless this script runs, and nothing at all happens
   when the visitor has asked for reduced motion. No network use. */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) { return; }
  var viewport = window.innerHeight || document.documentElement.clientHeight || 0;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('pre');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
  Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) {
    if (el.getBoundingClientRect().top < viewport) { return; }
    el.classList.add('pre');
    observer.observe(el);
  });
}());

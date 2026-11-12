/* Deducktive site. No network use.
   1. Marks the screen that fills most of the window (.is-current). Only that screen shows its
      duck picture, so two ducks never share a screen.
   2. Marks each screen once it has come into view (.play), which starts its small demonstration.
      Under "reduce motion" the stylesheet ignores .play and shows the finished frame.
   Without this script nothing is hidden and nothing moves. */
(function () {
  'use strict';
  var screens = Array.prototype.slice.call(document.querySelectorAll('[data-screen]'));
  if (!screens.length) { return; }
  document.documentElement.classList.add('js');
  var current = document.querySelector('[data-screen].is-current');
  var waiting = false;

  function update() {
    waiting = false;
    var vh = window.innerHeight || document.documentElement.clientHeight || 0;
    var best = null;
    var bestArea = 0;
    screens.forEach(function (screen) {
      var r = screen.getBoundingClientRect();
      var area = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      if (area > bestArea) { bestArea = area; best = screen; }
      if (!screen.classList.contains('play')) {
        // start when most of the demonstration itself is on screen, not just its section
        var t = (screen.querySelector('[data-play]') || screen).getBoundingClientRect();
        var seen = Math.min(t.bottom, vh) - Math.max(t.top, 0);
        if (seen > Math.min(t.height, vh) * 0.6) { screen.classList.add('play'); }
      }
    });
    if (best && best !== current) {
      if (current) { current.classList.remove('is-current'); }
      best.classList.add('is-current');
      current = best;
    }
  }
  function schedule() {
    if (waiting) { return; }
    waiting = true;
    window.requestAnimationFrame(update);
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
}());

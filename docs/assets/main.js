// Loaded in <head> without defer so a saved theme applies before first paint (no flash).
(function () {
  var root = document.documentElement;
  var KEY = 'theme';
  var ORDER = ['system', 'light', 'dark'];

  // Anti-clickjacking: GitHub Pages cannot send frame-ancestors or X-Frame-Options.
  // If the page is loaded inside another site's frame, hide everything.
  if (window.top !== window.self) root.hidden = true;

  function apply(mode) {
    if (mode === 'light' || mode === 'dark') root.setAttribute('data-theme', mode);
    else root.removeAttribute('data-theme');
  }
  function current() { return root.getAttribute('data-theme') || 'system'; }
  try { apply(localStorage.getItem(KEY)); } catch (e) {}

  document.addEventListener('DOMContentLoaded', function () {
    var t = document.getElementById('theme');
    if (t) {
      // U+FE0E asks for the text glyph, not a coloured emoji.
      var ICON = { system: '\u25D0\uFE0E', light: '\u2600\uFE0E', dark: '\u263E\uFE0E' };
      var label = function () {
        var m = current();
        t.textContent = ICON[m];
        t.setAttribute('aria-label', 'Theme: ' + m + '. Change theme');
        t.title = 'Theme: ' + m;
      };
      label();
      t.addEventListener('click', function () {
        var next = ORDER[(ORDER.indexOf(current()) + 1) % ORDER.length];
        apply(next);
        try { next === 'system' ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, next); } catch (e) {}
        label();
      });
    }

    // Dropdown (<details class="dropdown">): close on outside click or Escape.
    // Works without JS; this only adds convenience.
    var dropdowns = document.querySelectorAll('details.dropdown');
    document.addEventListener('click', function (e) {
      for (var i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].open && !dropdowns[i].contains(e.target)) dropdowns[i].open = false;
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      for (var i = 0; i < dropdowns.length; i++) {
        if (dropdowns[i].open) {
          dropdowns[i].open = false;
          var s = dropdowns[i].querySelector('summary');
          if (s) s.focus();
        }
      }
    });

    var btn = document.getElementById('copy-email');
    var el = document.getElementById('email');
    if (btn && el) {
      var selectText = function () {
        var r = document.createRange(); r.selectNodeContents(el);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      };
      btn.addEventListener('click', function () {
        var done = function (msg) { btn.textContent = msg; setTimeout(function () { btn.textContent = 'Copy'; }, 1600); };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(el.textContent.trim()).then(
            function () { done('Copied'); },
            function () { selectText(); done('Press Ctrl+C'); }
          );
        } else { selectText(); done('Press Ctrl+C'); }
      });
    }
  });
})();

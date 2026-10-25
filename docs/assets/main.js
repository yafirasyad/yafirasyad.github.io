// Dimuat di <head> tanpa defer supaya tema tersimpan terpasang sebelum halaman tampil (tanpa kedip).
(function () {
  var root = document.documentElement;
  var KEY = 'theme';
  var ORDER = ['system', 'light', 'dark'];

  function apply(mode) {
    if (mode === 'light' || mode === 'dark') root.setAttribute('data-theme', mode);
    else root.removeAttribute('data-theme');
  }
  function current() { return root.getAttribute('data-theme') || 'system'; }
  try { apply(localStorage.getItem(KEY)); } catch (e) {}

  document.addEventListener('DOMContentLoaded', function () {
    var t = document.getElementById('theme');
    if (t) {
      var label = function () { t.textContent = 'theme: ' + current(); };
      label();
      t.addEventListener('click', function () {
        var next = ORDER[(ORDER.indexOf(current()) + 1) % ORDER.length];
        apply(next);
        try { next === 'system' ? localStorage.removeItem(KEY) : localStorage.setItem(KEY, next); } catch (e) {}
        label();
      });
    }

    // Dropdown (<details class="dropdown">): tutup saat klik di luar atau tekan Escape.
    // Tanpa JS dropdown tetap jalan; ini cuma kenyamanan.
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

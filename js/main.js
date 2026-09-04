(function () {
  'use strict';

  var CONTACT_EMAIL = 'hello@codecrewailabs.com';

  /* ── Mobile navigation ───────────────────────────────────────────────── */

  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');

  navToggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* ── Grid overlay, toggled with G ────────────────────────────────────── */

  var overlay = document.getElementById('gridOverlay');

  for (var i = 0; i < 12; i++) {
    overlay.appendChild(document.createElement('i'));
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'g' && event.key !== 'G') return;
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    var tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

    overlay.classList.toggle('on');
  });

  /* ── Contact form ────────────────────────────────────────────────────────
     No backend yet, so this validates and hands off to the visitor's mail
     client. Swap the body of the submit handler for a fetch() once an
     endpoint exists (Formspree, Resend, or your own API).
  ─────────────────────────────────────────────────────────────────────────*/

  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var required = form.querySelectorAll('[required]');
    var firstInvalid = null;

    Array.prototype.forEach.call(required, function (input) {
      var valid = input.checkValidity();
      input.closest('.field').classList.toggle('invalid', !valid);
      if (!valid && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      status.textContent = 'Incomplete — check the marked fields';
      firstInvalid.focus();
      return;
    }

    var data = new FormData(form);
    var subject = 'Project brief — ' + data.get('name');
    var body = [
      'Name: ' + data.get('name'),
      'Email: ' + data.get('email'),
      'Discipline: ' + (data.get('scope') || 'Unspecified'),
      '',
      data.get('brief')
    ].join('\n');

    window.location.href =
      'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    status.textContent = 'Opening your mail client';
    form.reset();

    window.setTimeout(function () {
      status.textContent = '';
    }, 6000);
  });
})();

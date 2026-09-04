(function () {
  'use strict';

  var CONTACT_EMAIL = 'hello@codecrewailabs.com';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Sticky header shadow ────────────────────────────────────────────── */

  var header = document.getElementById('header');

  var onScroll = function () {
    header.classList.toggle('is-stuck', window.scrollY > 8);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile navigation ──────────────────────────────────────────────── */

  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
  });

  nav.addEventListener('click', function (event) {
    if (!event.target.closest('a')) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });

  /* ── Headline word rotator ──────────────────────────────────────────── */

  var rotator = document.getElementById('rotator');
  var word = rotator && rotator.querySelector('.rotator-word');

  if (word && !reduceMotion) {
    var words = ['AI agents', 'websites', 'automations', 'platforms'];
    var index = 0;

    window.setInterval(function () {
      word.classList.add('is-out');

      window.setTimeout(function () {
        index = (index + 1) % words.length;
        word.textContent = words[index];
        word.classList.remove('is-out');
      }, 340);
    }, 2600);
  }

  /* ── Scroll reveal ──────────────────────────────────────────────────── */

  var targets = document.querySelectorAll(
    '.section-head, .tile, .work-card, .step, .testimonial-inner, .faq-list, .cta-copy, .form, .hero-panel'
  );

  if (!reduceMotion && 'IntersectionObserver' in window) {
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add('reveal');
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    Array.prototype.forEach.call(targets, function (el) {
      observer.observe(el);
    });
  }

  /* ── FAQ: keep one answer open at a time ────────────────────────────── */

  var faqs = document.querySelectorAll('.faq-item');

  Array.prototype.forEach.call(faqs, function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      Array.prototype.forEach.call(faqs, function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ── Brief form ──────────────────────────────────────────────────────────
     There is no backend, so this validates and then hands the details to the
     visitor's own email app via a mailto: link. That hand-off can fail
     silently — a desktop browser with no default mail client simply does
     nothing — so the form is never cleared and a copy-and-paste fallback is
     shown instead. Swap the marked block below for a fetch() to a form
     endpoint (Formspree, Web3Forms, or your own API) to collect submissions
     properly.
  ─────────────────────────────────────────────────────────────────────────*/

  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  var fallback = document.getElementById('formFallback');
  var fallbackMail = document.getElementById('fallbackMail');
  var lastMessage = '';

  fallbackMail.textContent = CONTACT_EMAIL;
  fallbackMail.href = 'mailto:' + CONTACT_EMAIL;

  var copyToClipboard = function (text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    var scratch = document.createElement('textarea');
    scratch.value = text;
    scratch.setAttribute('readonly', '');
    scratch.style.position = 'fixed';
    scratch.style.opacity = '0';
    document.body.appendChild(scratch);
    scratch.select();
    document.execCommand('copy');
    document.body.removeChild(scratch);

    return Promise.resolve();
  };

  fallback.addEventListener('click', function (event) {
    var button = event.target.closest('[data-copy]');
    if (!button) return;

    var text = button.dataset.copy === 'email' ? CONTACT_EMAIL : lastMessage;
    var label = button.dataset.label || button.textContent;
    button.dataset.label = label;

    copyToClipboard(text).then(function () {
      button.textContent = 'Copied';
      window.setTimeout(function () {
        button.textContent = label;
      }, 1800);
    });
  });

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
      note.textContent = 'Please fill in the highlighted fields.';
      firstInvalid.focus();
      return;
    }

    var data = new FormData(form);
    var subject = 'New project brief — ' + data.get('name');
    var body = [
      'Name: ' + data.get('name'),
      'Email: ' + data.get('email'),
      'Service: ' + (data.get('service') || 'Not specified'),
      'Budget: ' + (data.get('budget') || 'Not specified'),
      '',
      data.get('brief')
    ].join('\n');

    lastMessage = subject + '\n\n' + body;

    /* ↓↓↓ Replace from here to the end of the handler with a fetch() when you
       wire up a real form endpoint. ↓↓↓ */

    window.location.href =
      'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    /* The form is intentionally NOT reset. If the mail app never opened, the
       visitor still has everything they typed and can copy it instead. */
    note.textContent = '';
    fallback.hidden = false;
  });
})();

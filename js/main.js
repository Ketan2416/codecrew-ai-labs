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
     No backend yet, so this validates and hands off to the visitor's mail
     client. Replace the body of the submit handler with a fetch() once an
     endpoint exists (Formspree, Resend, or your own API).
  ─────────────────────────────────────────────────────────────────────────*/

  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');

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

    window.location.href =
      'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    note.textContent = 'Opening your email app…';
    form.reset();

    window.setTimeout(function () {
      note.textContent = '';
    }, 6000);
  });
})();

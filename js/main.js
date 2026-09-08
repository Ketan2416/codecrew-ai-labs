(function () {
  'use strict';

  /* Brief form submissions are handed to WhatsApp. WHATSAPP_NUMBER must be in
     international format with no plus sign, spaces or dashes — that is what
     wa.me requires. WHATSAPP_DISPLAY is only ever shown to the visitor. */
  var WHATSAPP_NUMBER = '919665529494';
  var WHATSAPP_DISPLAY = '+91 96655 29494';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Sticky header shadow and edge rail progress ─────────────────────── */

  var header = document.getElementById('header');
  var edgeProgress = document.getElementById('edgeProgress');

  var onScroll = function () {
    header.classList.toggle('is-stuck', window.scrollY > 8);

    var scrollable = document.documentElement.scrollHeight - window.innerHeight;
    var travelled = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    edgeProgress.style.height = travelled + '%';
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

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
    '.section-head, .package-intro, .tile, .work-card, .step, .plan-card, ' +
      '.package-foundation, .comparison-block, .package-detail, .package-close, ' +
      '.career-card, .faq-list, .cta-copy, .form, .hero-panel'
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
     Validates, then opens WhatsApp with the whole brief pre-typed, so the
     visitor only has to press send. Nothing is posted to a server, so there is
     no endpoint to break and no network filter to trip over.

     The catch: delivery depends on the visitor pressing send in WhatsApp. The
     form is therefore never cleared, and the panel below stays visible with a
     direct chat link and copy buttons — so a blocked tab cannot lose a brief.
  ─────────────────────────────────────────────────────────────────────────*/

  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  var fallback = document.getElementById('formFallback');
  var fallbackChat = document.getElementById('fallbackChat');
  var lastMessage = '';

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

    var text = button.dataset.copy === 'number' ? WHATSAPP_DISPLAY : lastMessage;
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

    lastMessage = [
      'New project brief — ' + data.get('name'),
      '',
      'Name: ' + data.get('name'),
      'Email: ' + data.get('email'),
      'Service: ' + (data.get('service') || 'Not specified'),
      'Budget: ' + (data.get('budget') || 'Not specified'),
      '',
      data.get('brief')
    ].join('\n');

    var chatUrl =
      'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lastMessage);

    fallbackChat.href = chatUrl;
    fallback.hidden = false;

    /* Returns null when the browser blocks the tab, which is the one case the
       visitor needs telling about — otherwise WhatsApp is already open. */
    var opened = window.open(chatUrl, '_blank', 'noopener');

    note.textContent = opened
      ? 'Opening WhatsApp with your brief filled in — just press send there.'
      : 'Your browser blocked the WhatsApp tab. Use the link below to send it.';
  });
})();

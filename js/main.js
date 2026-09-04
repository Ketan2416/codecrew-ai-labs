(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Mobile nav toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal
  const revealElements = document.querySelectorAll(
    '.service-card, .step, .about-content, .about-visual, .contact-card, .section-header'
  );

  revealElements.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));

  // Contact form (demo — opens mailto)
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\n${message}`
    );

    window.location.href = `mailto:hello@codecrewailabs.com?subject=${subject}&body=${body}`;

    formNote.hidden = false;
    contactForm.reset();

    setTimeout(() => {
      formNote.hidden = true;
    }, 5000);
  });

  // Terminal typing effect
  const terminalLines = [
    { text: '$ crew deploy --env production', delay: 0 },
    { text: '→ Building agent workflows...', delay: 800, dim: true },
    { text: '→ Running integration tests...', delay: 1600, dim: true },
    { text: '✓ Deployed. All systems operational.', delay: 2400, success: true },
  ];

  const terminalBody = document.getElementById('terminalBody');
  if (terminalBody) {
    let cycle = 0;

    function runTerminalCycle() {
      terminalBody.innerHTML = '';
      terminalLines.forEach((line) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.className = 'line' + (line.dim ? ' dim' : '') + (line.success ? ' success' : '');
          if (line.text.startsWith('$')) {
            div.innerHTML = `<span class="prompt">$</span> ${line.text.slice(2)}`;
          } else {
            div.textContent = line.text;
          }
          terminalBody.appendChild(div);
        }, line.delay);
      });

      setTimeout(() => {
        const cursorLine = document.createElement('div');
        cursorLine.className = 'line';
        cursorLine.innerHTML = '<span class="prompt">$</span> <span class="cursor-blink">_</span>';
        terminalBody.appendChild(cursorLine);
      }, 3200);
    }

    runTerminalCycle();
    setInterval(() => {
      cycle++;
      runTerminalCycle();
    }, 6000);
  }
})();

/* GILVORA — site-interactie
   Bewust klein en zonder dependencies: header-state, mobiel menu, reveal-on-scroll.
   Geen scroll-jacking, geen zware animaties (zie brandbook: "geen drukke animaties"). */

(function () {
  'use strict';

  /* ---------- Header: vaste balk zodra je van de hero af scrollt ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var solid = false;
    var onScroll = function () {
      var should = window.scrollY > 60;
      if (should !== solid) {
        solid = should;
        header.classList.toggle('shrink', solid);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobiel menu ---------- */
  var burger = document.querySelector('.burger');
  var mnav = document.querySelector('.mobile-nav');
  if (burger && mnav) {
    var setNav = function (open) {
      burger.classList.toggle('open', open);
      mnav.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    burger.addEventListener('click', function () {
      setNav(!mnav.classList.contains('open'));
    });
    mnav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mnav.classList.contains('open')) setNav(false);
    });
    // menu sluiten als we terug naar desktop-breedte gaan
    window.addEventListener('resize', function () {
      // 1180px = het punt waarop de CSS de desktopnavigatie terugbrengt
      if (window.innerWidth > 1180 && mnav.classList.contains('open')) setNav(false);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal');

  var revealAll = function () {
    for (var i = 0; i < targets.length; i++) targets[i].classList.add('in');
  };

  if (reduced || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    targets.forEach(function (el) {
      // lichte trapsgewijze vertraging binnen dezelfde rij/grid
      var stagger = el.getAttribute('data-delay');
      if (stagger) el.style.transitionDelay = stagger + 'ms';
      io.observe(el);
    });

    /* Vangnet. Een IntersectionObserver vuurt niet in elke situatie betrouwbaar af
       (achtergrondtabs, printen, embedded viewers die niet compositen). Zonder deze
       twee controles blijft de pagina in zo'n geval volledig leeg — dat is een veel
       erger falen dan een animatie die overslaat. */
    var sweep = function () {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = 0; i < targets.length; i++) {
        var el = targets[i];
        if (el.classList.contains('in')) continue;
        if (el.getBoundingClientRect().top < vh * 0.95) el.classList.add('in');
      }
    };
    window.addEventListener('scroll', sweep, { passive: true });
    setTimeout(sweep, 300);
    setTimeout(function () {
      // Is er na anderhalve seconde nog niets zichtbaar geworden, dan werkt de
      // observer niet. Alles tonen.
      if (!document.querySelector('.reveal.in')) revealAll();
    }, 1500);
  }

  /* ---------- FAQ: maar één item tegelijk open per groep ---------- */
  document.querySelectorAll('.faq').forEach(function (group) {
    var items = group.querySelectorAll('details');
    items.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        items.forEach(function (other) { if (other !== d) other.open = false; });
      });
    });
  });

  /* ---------- Contactformulier → WhatsApp ----------
     Er is geen backend (statische hosting). Het formulier stelt een nette
     WhatsApp-boodschap samen en opent die; niets wordt hier opgeslagen. */
  var form = document.querySelector('[data-wa-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var get = function (k) { return (d.get(k) || '').toString().trim(); };

      var lines = [
        'Aanvraag via gilvora.be',
        '',
        'Naam: ' + get('naam'),
        'Auto: ' + get('auto'),
        'Interesse: ' + get('dienst'),
        get('budget') ? 'Budget: ' + get('budget') : '',
        '',
        get('bericht')
      ].filter(Boolean);

      var nummer = form.getAttribute('data-wa-number') || '32485482207';
      window.open('https://wa.me/' + nummer + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');

      if (typeof fbq === 'function') fbq('track', 'Lead');

      var status = form.querySelector('[data-form-status]');
      if (status) {
        status.textContent = 'WhatsApp wordt geopend met je aanvraag. Verstuur het bericht om af te ronden.';
        status.hidden = false;
      }
    });
  }

  /* ---------- Kiezer bovenaan de homepage ----------
     Het <select> bevat al de doel-URL als waarde; we navigeren er gewoon heen. */
  document.querySelectorAll('[data-goto]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var sel = form.querySelector('select');
      if (sel && sel.value) window.location.href = sel.value;
    });
  });

  /* ---------- Jaartal in de footer ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

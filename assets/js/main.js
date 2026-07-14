// Gilvora Signmaking — site interactie (nav, scroll reveal, header, contactformulier)
document.addEventListener('DOMContentLoaded', () => {

  /* Sticky header: solid background after scrolling */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('solid');
    else header.classList.remove('solid');

    const toTop = document.querySelector('.to-top');
    if (toTop) {
      if (window.scrollY > 600) toTop.classList.add('show');
      else toTop.classList.remove('show');
    }
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
      document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        nav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Scroll reveal animations */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* Back to top */
  const toTop = document.querySelector('.to-top');
  if (toTop) {
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* Contact form: no e-mail inbox yet, so we route the message straight
     into WhatsApp on the business number instead of faking a submit. */
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const naam = form.querySelector('#naam')?.value.trim() || '';
      const telefoon = form.querySelector('#telefoon')?.value.trim() || '';
      const dienst = form.querySelector('#dienst')?.value || '';
      const bericht = form.querySelector('#bericht')?.value.trim() || '';

      const lines = [
        `Hallo Gilvora Signmaking, mijn naam is ${naam || '...'}.`,
        dienst ? `Interesse in: ${dienst}` : null,
        bericht ? `Bericht: ${bericht}` : null,
        telefoon ? `Terugbellen op: ${telefoon}` : null
      ].filter(Boolean).join('\n');

      const waNumber = '32485482207';
      const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines)}`;

      const success = document.querySelector('#form-success');
      if (success) {
        success.classList.add('show');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      window.open(url, '_blank', 'noopener');
    });
  }
});

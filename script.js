// Small interactive behaviors: theme toggle, nav toggle, smooth scroll, contact form stub
(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const yearEl = document.getElementById('current-year');

  // set year
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // theme from localStorage
  const saved = localStorage.getItem('theme');
  if(saved === 'dark') root.setAttribute('data-theme','dark');

  themeToggle && themeToggle.addEventListener('click', ()=>{
    const isDark = root.getAttribute('data-theme') === 'dark';
    if(isDark){
      root.removeAttribute('data-theme');
      localStorage.setItem('theme','light');
    } else {
      root.setAttribute('data-theme','dark');
      localStorage.setItem('theme','dark');
    }
  });

  navToggle && navToggle.addEventListener('click', ()=>{
    if(mainNav.hasAttribute('open')) mainNav.removeAttribute('open');
    else mainNav.setAttribute('open','');
  });

  // smooth scrolling for anchor links
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const href = a.getAttribute('href');
    if(href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
      // close mobile nav if open
      if(mainNav && mainNav.hasAttribute('open')) mainNav.removeAttribute('open');
    }
  });

  // contact form (stub) — show a quick message
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Sending...';
      setTimeout(()=>{
        btn.textContent = 'Sent — Thanks!';
        btn.disabled = false;
        setTimeout(()=> btn.textContent = original, 2000);
        form.reset();
      }, 900);
    });
  }
})();

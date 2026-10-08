(() => {
  document.documentElement.classList.add('js-enabled');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  const progress = document.querySelector('.timeline-progress');
  const marquee = document.querySelector('.skills-marquee');
  if (marquee) {
    const track = document.createElement('div');
    track.className = 'skills-marquee-track';
    track.innerHTML = marquee.innerHTML + marquee.innerHTML;
    marquee.replaceChildren(track);
  }
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); currentObserver.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    reveals.forEach((item) => observer.observe(item));
  } else { reveals.forEach((item) => item.classList.add('visible')); }
  const updateTimeline = () => { if (!progress) return; const timeline = progress.parentElement; const bounds = timeline.getBoundingClientRect(); const start = window.innerHeight * .7; const distance = Math.max(1, bounds.height - window.innerHeight * .35); progress.style.height = `${Math.min(100, Math.max(0, ((start - bounds.top) / distance) * 100))}%`; };
  window.addEventListener('scroll', updateTimeline, { passive: true }); window.addEventListener('resize', updateTimeline, { passive: true }); updateTimeline();
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.querySelector('.cursor'); let mouseX = -100, mouseY = -100, currentX = -100, currentY = -100;
    window.addEventListener('mousemove', (event) => { mouseX = event.clientX; mouseY = event.clientY; });
    const moveCursor = () => { currentX += (mouseX - currentX) * .18; currentY += (mouseY - currentY) * .18; cursor.style.left = `${currentX}px`; cursor.style.top = `${currentY}px`; requestAnimationFrame(moveCursor); }; moveCursor();
    document.querySelectorAll('a, button, [data-tilt]').forEach((element) => { element.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover')); element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover')); });
    document.querySelectorAll('[data-tilt]').forEach((card) => { card.addEventListener('mousemove', (event) => { const box = card.getBoundingClientRect(); const rotateY = ((event.clientX - box.left) / box.width - .5) * 5; const rotateX = ((event.clientY - box.top) / box.height - .5) * -5; card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`; }); card.addEventListener('mouseleave', () => { card.style.transform = ''; }); });
    document.querySelectorAll('.magnetic').forEach((button) => { button.addEventListener('mousemove', (event) => { const box = button.getBoundingClientRect(); button.style.transform = `translate(${(event.clientX - box.left - box.width / 2) * .14}px, ${(event.clientY - box.top - box.height / 2) * .14}px)`; }); button.addEventListener('mouseleave', () => { button.style.transform = ''; }); });
  }
})();
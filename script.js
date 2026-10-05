/* ============================================================
   ✏️  EDITABLE CONTENT — update your portfolio items here
   Drop images into assets/images/ and update the `img` paths.
   `category` must be one of: posts | videos | posters | presentations
   ============================================================ */
const PROJECTS = [
  { img: "assets/images/post1.jpg",         caption: "Instagram post — brand awareness",     category: "posts" },
  { img: "assets/images/post2.jpg",         caption: "Facebook post — course promotion",      category: "posts" },
  { img: "assets/images/reel1.jpg",         caption: "TikTok reel — trending audio edit",     category: "videos" },
  { img: "assets/images/reel2.jpg",         caption: "Short-form video — campus promo",       category: "videos" },
  { img: "assets/images/poster1.jpg",       caption: "Poster — college event announcement",   category: "posters" },
  { img: "assets/images/poster2.jpg",       caption: "Poster — admission campaign",           category: "posters" },
  { img: "assets/images/presentation1.jpg", caption: "Presentation deck — marketing plan",    category: "presentations" },
  { img: "assets/images/promo1.jpg",        caption: "College promotional material",          category: "posters" },
];

/* ---------- Build portfolio grid ---------- */
const grid = document.getElementById('workGrid');
PROJECTS.forEach(p => {
  const fig = document.createElement('figure');
  fig.className = 'work-card reveal visible';
  fig.dataset.category = p.category;
  fig.innerHTML = `<img src="${p.img}" alt="${p.caption}" loading="lazy"
    onerror="this.src='https://placehold.co/600x450/f7d9dc/5b2a4a?text=Your+Work+Here'" />
    <figcaption>${p.caption}</figcaption>`;
  grid.appendChild(fig);
});

/* ---------- Filters ---------- */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
    const f = btn.dataset.filter;
    document.querySelectorAll('.work-card').forEach(card =>
      card.classList.toggle('hidden', f !== 'all' && card.dataset.category !== f));
  });
});

/* ---------- Dark / light mode toggle ---------- */
const toggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved) document.documentElement.dataset.theme = saved;
toggle.textContent = document.documentElement.dataset.theme === 'dark' ? '☀️' : '🌙';
toggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  toggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

/* ---------- Mobile menu ---------- */
const menuBtn = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- Language meters animate in ---------- */
const meterIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.meter i').forEach(i => i.style.width = i.dataset.w);
      meterIO.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.lang').forEach(l => {
  const bar = l.querySelector('.meter i');
  const w = bar.style.width; bar.dataset.w = w; bar.style.width = '0';
  meterIO.observe(l);
});

/* ---------- Contact form (opens your email app) ---------- */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  const msg = document.getElementById('formMsg');
  if (!f.checkValidity()) { msg.textContent = 'Please fill in all fields correctly.'; return; }
  const body = encodeURIComponent(`${f.message.value}\n\n— ${f.name.value} (${f.email.value})`);
  window.location.href = `mailto:xterimelina98@gmail.com?subject=Portfolio inquiry from ${encodeURIComponent(f.name.value)}&body=${body}`;
  msg.textContent = 'Thanks! Your email app should now open. 💌';
  f.reset();
});

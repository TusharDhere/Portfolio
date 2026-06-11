/* ═══════════════════════════════════════════════════════════
   EMAILJS CONFIGURATION
   Steps (free, ~2 minutes):
   1. https://www.emailjs.com/ → Sign up
   2. Add Email Service → connect Gmail → copy Service ID
   3. Email Templates → Create Template with vars:
      {{from_name}}, {{from_email}}, {{subject}}, {{message}}
      → copy Template ID
   4. Account → API Keys → copy Public Key
   5. Fill below, then remove setup-note div in index.html
═══════════════════════════════════════════════════════════ */
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';

(function () {
  try { emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); } catch(e) {}
})();

/* ═══════════════════════════════════════════
   FLOATING PARTICLES
═══════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], animId;
  const isMobile = () => window.innerWidth <= 640;
  const COUNT = () => isMobile() ? 20 : 50;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomColor() {
    return Math.random() > 0.6
      ? `rgba(240,192,64,${(Math.random() * 0.25 + 0.05).toFixed(2)})`
      : `rgba(255,255,255,${(Math.random() * 0.08 + 0.02).toFixed(2)})`;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      color: randomColor(),
      life: Math.random() * Math.PI * 2
    };
  }

  function init() {
    particles = [];
    const n = COUNT();
    for (let i = 0; i < n; i++) particles.push(createParticle());
  }

  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.life += 0.012;
      p.x += p.dx + Math.sin(p.life * 0.5) * 0.08;
      p.y += p.dy + Math.cos(p.life * 0.5) * 0.08 - scrollY * 0.0002;
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
      if (p.y < -5) p.y = H + 5;
      if (p.y > H + 5) p.y = -5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    animId = requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();

  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ═══════════════════════════════════════════
   CURSOR GLOW
═══════════════════════════════════════════ */
(function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.innerWidth <= 640) return;

  let mx = -500, my = -500;
  let cx = -500, cy = -500;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  // Increase glow on card hover
  document.querySelectorAll('.service-card,.project-card,.cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      glow.style.width  = '420px';
      glow.style.height = '420px';
      glow.style.background = 'radial-gradient(circle, rgba(240,192,64,0.16) 0%, transparent 70%)';
    });
    el.addEventListener('mouseleave', () => {
      glow.style.width  = '350px';
      glow.style.height = '350px';
      glow.style.background = 'radial-gradient(circle, rgba(240,192,64,0.10) 0%, transparent 70%)';
    });
  });

  function animate() {
    cx += (mx - cx) * 0.1;
    cy += (my - cy) * 0.1;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ═══════════════════════════════════════════
   TAB SWITCHING — smooth transition
═══════════════════════════════════════════ */
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const progressDots = document.querySelectorAll('.progress-dot');

function switchTab(target) {
  const current = document.querySelector('.tab-panel.active');
  const next    = document.getElementById(target);
  if (current === next) return;

  // Fade out current
  current.classList.add('leaving');
  setTimeout(() => {
    current.classList.remove('active', 'leaving');
    next.classList.add('active');
    revealElements(next);
    if (target === 'resume') setTimeout(animateSkillBars, 100);
  }, 220);

  // Update tab buttons
  tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === target));

  // Update progress dots
  progressDots.forEach(d => d.classList.toggle('active', d.dataset.tab === target));
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    switchTab(btn.dataset.tab);
    closeSidebar();
  });
});

// Progress dot clicks
progressDots.forEach(dot => {
  dot.addEventListener('click', () => switchTab(dot.dataset.tab));
});

/* ═══════════════════════════════════════════
   STAGGER REVEAL (Intersection Observer)
═══════════════════════════════════════════ */
function revealElements(panel) {
  const items = panel.querySelectorAll(
    '.service-card, .cert-card, .timeline-item, .skill-item, .project-card, .qc-btn'
  );
  items.forEach((el, i) => {
    el.classList.remove('reveal', 'visible');
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.07}s`;
    setTimeout(() => el.classList.add('visible'), 50 + i * 70);
  });
}

// Reveal on first load
revealElements(document.querySelector('.tab-panel.active'));

/* ═══════════════════════════════════════════
   SKILL BAR ANIMATION
═══════════════════════════════════════════ */
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;
  document.querySelectorAll('.skill-fill').forEach((fill, i) => {
    const w = fill.getAttribute('data-width') || '0';
    setTimeout(() => { fill.style.width = w + '%'; }, i * 80);
  });
  skillsAnimated = true;
}

/* ═══════════════════════════════════════════
   PORTFOLIO FILTER
═══════════════════════════════════════════ */
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach((card, i) => {
      const show = filter === 'all' || card.dataset.category === filter;
      if (show) {
        card.classList.remove('hidden');
        card.style.transitionDelay = `${i * 0.05}s`;
      } else {
        card.classList.add('hidden');
        card.style.transitionDelay = '0s';
      }
    });
  });
});

/* ═══════════════════════════════════════════
   EXPANDABLE PROJECT CARDS
═══════════════════════════════════════════ */
function toggleCard(thumbEl) {
  const card   = thumbEl.closest('.project-card');
  const body   = card.querySelector('.project-body');
  const isOpen = card.classList.contains('expanded');

  // Close all others
  document.querySelectorAll('.project-card.expanded').forEach(c => {
    c.classList.remove('expanded');
    c.querySelector('.project-body').classList.remove('open');
  });

  if (!isOpen) {
    card.classList.add('expanded');
    body.classList.add('open');
  }
}

/* ═══════════════════════════════════════════
   MOBILE SIDEBAR
═══════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('sidebarOverlay');
const closeBtn  = document.getElementById('sidebarClose');

function openSidebar() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', openSidebar);
closeBtn?.addEventListener('click', closeSidebar);
overlay?.addEventListener('click', closeSidebar);

/* ═══════════════════════════════════════════
   CONTACT FORM — EmailJS
═══════════════════════════════════════════ */
async function sendEmail(e) {
  e.preventDefault();
  const btn        = document.getElementById('sendBtn');
  const successMsg = document.getElementById('form-success');
  const errorMsg   = document.getElementById('form-error');
  const form       = document.getElementById('contactForm');

  successMsg.classList.add('hidden');
  errorMsg.classList.add('hidden');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> <span>Sending…</span>';

  const templateParams = {
    from_name:  document.getElementById('from_name').value.trim(),
    from_email: document.getElementById('from_email').value.trim(),
    subject:    document.getElementById('subject').value.trim(),
    message:    document.getElementById('message').value.trim(),
    to_email:   'work.tushardhere@gmail.com'
  };

  if (
    EMAILJS_SERVICE_ID  === 'YOUR_SERVICE_ID'  ||
    EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
    EMAILJS_PUBLIC_KEY  === 'YOUR_PUBLIC_KEY'
  ) {
    const mailtoLink =
      `mailto:work.tushardhere@gmail.com` +
      `?subject=${encodeURIComponent(templateParams.subject)}` +
      `&body=${encodeURIComponent(`Name: ${templateParams.from_name}\nEmail: ${templateParams.from_email}\n\n${templateParams.message}`)}`;
    window.location.href = mailtoLink;
    btn.disabled = false;
    btn.innerHTML = '<i class="fa fa-paper-plane"></i> <span>Send Message</span>';
    return;
  }

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    form.reset();
    successMsg.classList.remove('hidden');
    setTimeout(() => successMsg.classList.add('hidden'), 6000);
  } catch (err) {
    console.error('EmailJS error:', err);
    errorMsg.classList.remove('hidden');
    setTimeout(() => errorMsg.classList.add('hidden'), 6000);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa fa-paper-plane"></i> <span>Send Message</span>';
  }
}

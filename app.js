/* ═══════════════════════════════════════════════════════════
   EMAILJS CONFIGURATION
   1. https://www.emailjs.com/ → Sign up free
   2. Add Email Service → connect Gmail → copy Service ID
   3. Email Templates → Create Template:
      {{from_name}}, {{from_email}}, {{subject}}, {{message}}
   4. Account → API Keys → copy Public Key
   5. Paste below, then remove setup-note div in index.html
═══════════════════════════════════════════════════════════ */
const EMAILJS_SERVICE_ID  = 'service_vxrndd8';
const EMAILJS_TEMPLATE_ID = 'template_1bf380t';
const EMAILJS_PUBLIC_KEY  = 'y9FUZWRd0FYRB158P';

(function () {
  try { emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); } catch(e) {}
})();

/* ═══════════════════════════════════════════
   FLOATING PARTICLES — tiny, subtle
═══════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  const isMobile = () => window.innerWidth <= 640;
  const COUNT    = () => isMobile() ? 18 : 45;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkParticle() {
    const mobile = isMobile();
    return {
      x:    Math.random() * W,
      y:    Math.random() * H,
      // ✅ smaller: 0.4–1px mobile, 0.6–1.8px desktop
      r:    mobile ? Math.random() * 0.6 + 0.4 : Math.random() * 1.2 + 0.6,
      // ✅ slower movement
      dx:   (Math.random() - 0.5) * 0.2,
      dy:   (Math.random() - 0.5) * 0.2,
      // ✅ lower opacity: 0.08–0.22
      a:    Math.random() * 0.14 + 0.08,
      gold: Math.random() > 0.55,
      life: Math.random() * Math.PI * 2
    };
  }

  function init() {
    particles = [];
    for (let i = 0; i < COUNT(); i++) particles.push(mkParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.life += 0.008;
      p.x += p.dx + Math.sin(p.life * 0.4) * 0.06;
      p.y += p.dy + Math.cos(p.life * 0.4) * 0.06;
      if (p.x < -4) p.x = W + 4;
      if (p.x > W + 4) p.x = -4;
      if (p.y < -4) p.y = H + 4;
      if (p.y > H + 4) p.y = -4;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? `rgba(240,192,64,${p.a})`
        : `rgba(255,255,255,${p.a * 0.55})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ═══════════════════════════════════════════
   CURSOR GLOW — small & barely visible
═══════════════════════════════════════════ */
(function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.innerWidth <= 640) return;

  let mx = -500, my = -500, cx = -500, cy = -500;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  function tick() {
    // smooth lerp at 12% per frame
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ═══════════════════════════════════════════
   TAB SWITCHING — smooth fade
═══════════════════════════════════════════ */
const tabBtns      = document.querySelectorAll('.tab-btn');
const tabPanels    = document.querySelectorAll('.tab-panel');
const progressDots = document.querySelectorAll('.progress-dot');

function switchTab(target) {
  const current = document.querySelector('.tab-panel.active');
  const next    = document.getElementById(target);
  if (!next || current === next) return;

  current.classList.add('leaving');
  setTimeout(() => {
    current.classList.remove('active', 'leaving');
    next.classList.add('active');
    revealElements(next);
    if (target === 'resume') setTimeout(animateSkillBars, 80);
  }, 180);

  tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === target));
  progressDots.forEach(d => d.classList.toggle('active', d.dataset.tab === target));
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => { switchTab(btn.dataset.tab); closeSidebar(); });
});

progressDots.forEach(dot => {
  dot.addEventListener('click', () => switchTab(dot.dataset.tab));
});

/* ═══════════════════════════════════════════
   STAGGER REVEAL
═══════════════════════════════════════════ */
function revealElements(panel) {
  const items = panel.querySelectorAll(
    '.service-card, .cert-card, .timeline-item, .skill-item, .project-card, .qc-btn'
  );
  items.forEach((el, i) => {
    el.classList.remove('reveal', 'visible');
    void el.offsetWidth; // force reflow
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.06}s`;
    requestAnimationFrame(() => {
      setTimeout(() => el.classList.add('visible'), 30 + i * 60);
    });
  });
}

revealElements(document.querySelector('.tab-panel.active'));

/* ═══════════════════════════════════════════
   SKILL BARS
═══════════════════════════════════════════ */
let skillsAnimated = false;

function animateSkillBars() {
  if (skillsAnimated) return;
  document.querySelectorAll('.skill-fill').forEach((fill, i) => {
    const w = fill.getAttribute('data-width') || '0';
    setTimeout(() => { fill.style.width = w + '%'; }, i * 70);
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
    projectCards.forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

/* ═══════════════════════════════════════════
   EXPANDABLE PROJECT CARDS — instant, no delay
═══════════════════════════════════════════ */
function toggleCard(thumbEl) {
  const card   = thumbEl.closest('.project-card');
  const body   = card.querySelector('.project-body');
  const isOpen = card.classList.contains('expanded');

  // Close all expanded cards immediately
  document.querySelectorAll('.project-card.expanded').forEach(c => {
    c.classList.remove('expanded');
    c.querySelector('.project-body').classList.remove('open');
  });

  // Open clicked one immediately (no setTimeout)
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
overlay?.addEventListener('click', (e) => {
  // Safety net: only close if the click target is the overlay itself,
  // never if it bubbled up from a link/button inside the sidebar.
  if (e.target === overlay) closeSidebar();
});

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

  const params = {
    from_name:  document.getElementById('from_name').value.trim(),
    from_email: document.getElementById('from_email').value.trim(),
    subject:    document.getElementById('subject').value.trim(),
    message:    document.getElementById('message').value.trim(),
    to_email:   'work.tushardhere@gmail.com'
  };

  if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    window.location.href =
      `mailto:work.tushardhere@gmail.com?subject=${encodeURIComponent(params.subject)}&body=${encodeURIComponent(`Name: ${params.from_name}\nEmail: ${params.from_email}\n\n${params.message}`)}`;
    btn.disabled = false;
    btn.innerHTML = '<i class="fa fa-paper-plane"></i> <span>Send Message</span>';
    return;
  }

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);
    form.reset();
    successMsg.classList.remove('hidden');
    setTimeout(() => successMsg.classList.add('hidden'), 6000);
  } catch (err) {
    errorMsg.classList.remove('hidden');
    setTimeout(() => errorMsg.classList.add('hidden'), 6000);
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa fa-paper-plane"></i> <span>Send Message</span>';
  }
}

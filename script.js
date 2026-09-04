// ============================================================
//  Portfolio Script — Muhammad Tayyab Sohail
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────────────
  // 1. PRELOADER
  // ─────────────────────────────────────────────
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1800);
  }

  // ─────────────────────────────────────────────
  // 2. NAVBAR: scroll + mobile toggle
  // ─────────────────────────────────────────────
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  let menuOpen = false;
  navToggle?.addEventListener('click', () => {
    menuOpen = !menuOpen;
    navLinks.classList.toggle('open', menuOpen);
    navbar.classList.toggle('menu-open', menuOpen);
    const spans = navToggle.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      navLinks.classList.remove('open');
      navbar.classList.remove('menu-open');
      const spans = navToggle?.querySelectorAll('span');
      if (spans) {
        spans[0].style.transform = '';
        spans[1].style.opacity   = '';
        spans[2].style.transform = '';
      }
    });
  });

  const sections = document.querySelectorAll('section[id]');
  const updateActiveLink = () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        allNavLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${id}"]`);
        active?.classList.add('active');
      }
    });
  };

  // ─────────────────────────────────────────────
  // 3. HERO VIDEO & VOICE CONTROLS
  //    Plays the talking video + voice audio in sync
  // ─────────────────────────────────────────────
  const heroVideo      = document.getElementById('heroVideo');
  const heroAudio      = document.getElementById('heroAudio');
  const clickToPlayBtn = document.getElementById('clickToPlayBtn');
  const playBtnText    = document.getElementById('playBtnText');
  const playIcon       = clickToPlayBtn?.querySelector('.play-icon');
  const pauseIcon      = clickToPlayBtn?.querySelector('.pause-icon');

  let isPlayingMedia = false;

  const startMedia = () => {
    isPlayingMedia = true;
    if (heroVideo) {
      heroVideo.currentTime = 0;
      heroVideo.play().catch(() => {});
      heroVideo.classList.add('playing');
    }
    if (heroAudio) {
      heroAudio.currentTime = 0;
      heroAudio.play().catch(() => {});
    }
    if (clickToPlayBtn) clickToPlayBtn.classList.add('active');
    if (playIcon) playIcon.style.display = 'none';
    if (pauseIcon) pauseIcon.style.display = '';
    if (playBtnText) playBtnText.textContent = 'Pause Video';
  };

  const stopMedia = () => {
    isPlayingMedia = false;
    if (heroVideo) {
      heroVideo.pause();
      heroVideo.classList.remove('playing');
    }
    if (heroAudio) {
      heroAudio.pause();
    }
    if (clickToPlayBtn) clickToPlayBtn.classList.remove('active');
    if (playIcon) playIcon.style.display = '';
    if (pauseIcon) pauseIcon.style.display = 'none';
    if (playBtnText) playBtnText.textContent = 'Click to Play';
  };

  clickToPlayBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlayingMedia) {
      stopMedia();
    } else {
      startMedia();
    }
  });

  heroAudio?.addEventListener('ended', () => {
    stopMedia();
  });

  heroVideo?.addEventListener('ended', () => {
    stopMedia();
  });

  // ─────────────────────────────────────────────
  // 4. SCROLL ANIMATIONS
  // ─────────────────────────────────────────────
  const aosElements = document.querySelectorAll('[data-aos]');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.08
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = el.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          el.classList.add('aos-animated');
          el.querySelectorAll('.bar-fill').forEach(bar => {
            bar.classList.add('animated');
          });
        }, parseInt(delay));
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  aosElements.forEach(el => observer.observe(el));

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.classList.add('animated');
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-card').forEach(card => barObserver.observe(card));

  // ─────────────────────────────────────────────
  // 5. CONTACT FORM
  // ─────────────────────────────────────────────
  const contactForm  = document.getElementById('contactForm');
  const submitBtn    = document.getElementById('submitBtn');
  const submitText   = document.getElementById('submitText');
  const formSuccess  = document.getElementById('formSuccess');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.disabled  = true;
    submitText.textContent = 'Sending...';

    setTimeout(() => {
      submitBtn.disabled  = false;
      submitText.textContent = 'Send Message';
      formSuccess.style.display = 'block';
      contactForm.reset();
      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    }, 1500);
  });

  // ─────────────────────────────────────────────
  // 6. SMOOTH SCROLL for anchor links
  // ─────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = navbar?.offsetHeight || 80;
        const top  = target.offsetTop - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ─────────────────────────────────────────────
  // 7. CURSOR GLOW (subtle red glow following mouse)
  // ─────────────────────────────────────────────
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = `
    position:fixed; pointer-events:none; z-index:9998;
    width:400px; height:400px;
    border-radius:50%;
    background: radial-gradient(circle, rgba(255,42,42,0.06) 0%, transparent 70%);
    transform:translate(-50%,-50%);
    transition: left 0.12s ease, top 0.12s ease;
    left:-999px; top:-999px;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });

  // ─────────────────────────────────────────────
  // 8. TYPING EFFECT on hero title role
  // ─────────────────────────────────────────────
  const roles = [
    'Problem<br />Solver',
    'AI<br />Developer',
    'Full Stack<br />Engineer',
    'ML<br />Specialist'
  ];
  const heroRole = document.getElementById('heroRole');
  if (heroRole) {
    let roleIdx = 0;
    setInterval(() => {
      heroRole.style.opacity = '0';
      heroRole.style.transform = 'translateY(8px)';
      heroRole.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

      setTimeout(() => {
        roleIdx = (roleIdx + 1) % roles.length;
        heroRole.innerHTML = roles[roleIdx];
        heroRole.style.opacity = '1';
        heroRole.style.transform = 'translateY(0)';
      }, 400);
    }, 3200);
  }

  // ─────────────────────────────────────────────
  // 9. PROJECT CARD TILT (subtle 3D on hover)
  // ─────────────────────────────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect    = card.getBoundingClientRect();
      const x       = (e.clientX - rect.left) / rect.width  - 0.5;
      const y       = (e.clientY - rect.top)  / rect.height - 0.5;
      const rotateX = -y * 5;
      const rotateY =  x * 5;
      card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ─────────────────────────────────────────────
  // Init
  // ─────────────────────────────────────────────
  handleScroll();

}); // end DOMContentLoaded

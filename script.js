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
    }, 2200);
  }

  // ─────────────────────────────────────────────
  // 2. NAVBAR: scroll + mobile toggle
  // ─────────────────────────────────────────────
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link');

  const handleScroll = () => {
    if (window.scrollY > 60) {
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
  // 3. HERO VIDEO → IMAGE TRANSITION
  //    Video autoplays full-screen on load.
  //    When it ends, it fades out and the hero
  //    content + image fade in.
  // ─────────────────────────────────────────────
  const heroVideo    = document.getElementById('heroVideo');
  const heroContent  = document.getElementById('heroContent');
  const heroImageWrap = document.getElementById('heroImageWrap');
  const unmuteBtn    = document.getElementById('unmuteBtn');

  if (heroVideo) {
    // Video starts muted (browsers require muted for autoplay).
    // Show unmute button so user can enable sound.
    heroVideo.muted = true;

    // Attempt autoplay
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Autoplay started successfully
        if (unmuteBtn) unmuteBtn.style.display = '';
      }).catch(() => {
        // Autoplay blocked — skip to hero content immediately
        transitionToHero();
      });
    }

    // When video ends → transition to hero image
    heroVideo.addEventListener('ended', () => {
      transitionToHero();
    });

    // Unmute button
    unmuteBtn?.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      const label = unmuteBtn.querySelector('span');
      if (heroVideo.muted) {
        if (label) label.textContent = 'Unmute';
      } else {
        if (label) label.textContent = 'Mute';
      }
    });
  } else {
    // No video — show content immediately
    transitionToHero();
  }

  function transitionToHero() {
    // Fade out video
    if (heroVideo) {
      heroVideo.classList.remove('hero-video-active');
      heroVideo.classList.add('hero-video-ended');
      heroVideo.pause();
    }
    // Hide unmute button
    if (unmuteBtn) unmuteBtn.style.display = 'none';

    // Fade in hero content and image
    if (heroContent) {
      heroContent.classList.remove('hero-content-hidden');
      heroContent.classList.add('hero-content-visible');
    }
    if (heroImageWrap) {
      heroImageWrap.classList.remove('hero-image-hidden');
      heroImageWrap.classList.add('hero-image-visible');
    }
  }

  // ─────────────────────────────────────────────
  // 4. SCROLL ANIMATIONS (lightweight AOS clone)
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
    }, 1800);
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
  // 8. TYPING EFFECT on hero title
  // ─────────────────────────────────────────────
  const roles = [
    'AI & Full Stack Developer',
    'Machine Learning Engineer',
    'Python Enthusiast',
    'Problem Solver'
  ];
  const heroTitleRed = document.querySelector('.hero-title-red');
  if (heroTitleRed) {
    let roleIdx  = 0;
    let charIdx  = 0;
    let deleting = false;
    let paused   = false;

    const type = () => {
      const current = roles[roleIdx];

      if (!deleting) {
        heroTitleRed.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
          paused = true;
          setTimeout(() => { paused = false; deleting = true; }, 2200);
        }
      } else {
        heroTitleRed.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          roleIdx  = (roleIdx + 1) % roles.length;
        }
      }
    };

    setInterval(() => {
      if (!paused) type();
    }, 90);
  }

  // ─────────────────────────────────────────────
  // 9. PROJECT CARD TILT (subtle 3D on hover)
  // ─────────────────────────────────────────────
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = (e.clientX - rect.left) / rect.width  - 0.5;
      const y      = (e.clientY - rect.top)  / rect.height - 0.5;
      const rotateX = -y * 6;
      const rotateY =  x * 6;
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

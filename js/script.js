document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initNavigation();
    initStickyNavbar();
    initSmoothScrolling();
    initFilterBars();
    initProjectFilters();
    initFiveMFilters();
    initTutorialFilters();
    initContactForm();
    initScrollAnimations();
    initCommandPalette();
    initMagneticButtons();
});

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    if (!themeToggle || !themeIcon) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    if (themeToggle.dataset.themeBound !== 'true') {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
        themeToggle.dataset.themeBound = 'true';
    }

    function setTheme(theme) {
        body.setAttribute('data-theme', theme);

        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }

        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        metaThemeColor.content = theme === 'dark' ? '#070b14' : '#f8fafc';
    }
}

function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = () => {
        navbar.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!mobileMenu || !navMenu) return;

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');

        const bars = mobileMenu.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (mobileMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.querySelectorAll('.bar').forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 120) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            link.classList.toggle('active', href === `#${current}`);
        });
    }, { passive: true });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            e.preventDefault();
            const offsetTop = targetSection.offsetTop - 64;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        });
    });
}

function initFilterBars() {
    document.querySelectorAll('.filter-bar').forEach(bar => {
        const underline = bar.querySelector('.filter-underline');
        const buttons = bar.querySelectorAll('.filter-btn');
        if (!underline || !buttons.length) return;

        const moveUnderline = (btn) => {
            underline.style.width = `${btn.offsetWidth}px`;
            underline.style.left = `${btn.offsetLeft}px`;
        };

        const active = bar.querySelector('.filter-btn.active') || buttons[0];
        moveUnderline(active);

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                moveUnderline(btn);
            });
        });

        window.addEventListener('resize', () => {
            const current = bar.querySelector('.filter-btn.active');
            if (current) moveUnderline(current);
        });
    });
}

function initProjectFilters() {
    const section = document.querySelector('#projects');
    if (!section) return;

    section.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            section.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            loadOtherProjects(this.getAttribute('data-filter'));
        });
    });
}

function initFiveMFilters() {
    const section = document.querySelector('#fivem');
    if (!section) return;

    section.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            section.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            loadFiveMProjects(this.getAttribute('data-filter'));
        });
    });
}

function initTutorialFilters() {
    const section = document.querySelector('#tutorials');
    if (!section) return;

    section.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            section.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            loadTutorials(this.getAttribute('data-filter'));
        });
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    const contactEndpoint = 'https://webhook.reminmohammed123.workers.dev/';

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const subject = formData.get('subject')?.trim();
        const message = formData.get('message')?.trim();

        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        const payload = {
            name,
            email,
            subject,
            message: `Project type: ${subject}\n\n${message}`
        };



        try {
            const response = await fetch("https://webhook.reminmohammed123.workers.dev/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: name,
    email: email,
    message: message
  })
})

            if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`);

            showNotification('Message sent successfully. I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            console.error('Contact form webhook error:', error);
            showNotification('Message could not be sent. Please try again later.', 'error');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'info') {
    document.querySelector('.notification')?.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" type="button">&times;</button>
        </div>
    `;

    const bg = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
    notification.style.cssText = `
        position: fixed; top: 88px; right: 20px; background: ${bg}; color: white;
        padding: 1rem 1.25rem; border-radius: 14px; box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        z-index: 12000; transform: translateX(110%); transition: transform 0.28s ease; max-width: 380px;
    `;
    notification.querySelector('.notification-content').style.cssText =
        'display:flex;align-items:center;justify-content:space-between;gap:1rem;';
    notification.querySelector('.notification-close').style.cssText =
        'background:none;border:none;color:white;font-size:1.4rem;cursor:pointer;padding:0;';

    document.body.appendChild(notification);
    requestAnimationFrame(() => { notification.style.transform = 'translateX(0)'; });

    const dismiss = () => {
        notification.style.transform = 'translateX(110%)';
        setTimeout(() => notification.remove(), 280);
    };

    notification.querySelector('.notification-close').addEventListener('click', dismiss);
    setTimeout(dismiss, 5000);
}

let revealObserver;

function initScrollAnimations() {
    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    refreshScrollAnimations();
}

function refreshScrollAnimations() {
    if (!revealObserver) return;

    document.querySelectorAll('.reveal, .reveal-stagger, .project-card, .stat-item, .skill-item, .about-text, .contact-info, .contact-form').forEach(el => {
        if (!el.classList.contains('reveal') && !el.classList.contains('reveal-stagger')) {
            el.classList.add('reveal-stagger');
        }
        if (!el.dataset.revealBound) {
            el.dataset.revealBound = 'true';
            revealObserver.observe(el);
        }
    });
}

window.refreshScrollAnimations = refreshScrollAnimations;

function initMagneticButtons() {
    document.querySelectorAll('.btn-magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

function initCommandPalette() {
    const palette = document.getElementById('command-palette');
    const input = document.getElementById('command-input');
    const list = document.getElementById('command-list');
    if (!palette || !input || !list) return;

    const baseCommands = [
        { label: 'View projects', hint: 'Featured', action: () => scrollToId('featured') },
        { label: 'Open Github', hint: 'External', action: () => window.open('https://github.com/anxxity', '_blank') },
        { label: 'Contact', hint: 'Section', action: () => scrollToId('contact') },
        { label: 'Hardware & automation', hint: 'Section', action: () => scrollToId('projects') },
        { label: 'FiveM resources', hint: 'Section', action: () => scrollToId('fivem') }
    ];

    const projectCommands = (typeof fivemProjects !== 'undefined' ? fivemProjects : []).map(p => ({
        label: `Search ${p.title}`,
        hint: 'Open project',
        action: () => {
            scrollToId('featured');
            setTimeout(() => {
                if (typeof openProjectModal === 'function') openProjectModal(p);
            }, 400);
        }
    }));

    let allCommands = [...baseCommands, ...projectCommands];
    let filtered = [...allCommands];
    let selectedIndex = 0;

    function scrollToId(id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function renderList() {
        list.innerHTML = '';
        filtered.forEach((cmd, i) => {
            const li = document.createElement('li');
            li.className = `command-item${i === selectedIndex ? ' is-selected' : ''}`;
            li.innerHTML = `${cmd.label}<span>${cmd.hint || ''}</span>`;
            li.addEventListener('click', () => runCommand(cmd));
            li.addEventListener('mouseenter', () => { selectedIndex = i; renderList(); });
            list.appendChild(li);
        });
    }

    function runCommand(cmd) {
        closePalette();
        cmd.action();
    }

    function openPalette() {
        filtered = [...allCommands];
        selectedIndex = 0;
        input.value = '';
        renderList();
        palette.classList.add('is-open');
        palette.setAttribute('aria-hidden', 'false');
        setTimeout(() => input.focus(), 50);
    }

    function closePalette() {
        palette.classList.remove('is-open');
        palette.setAttribute('aria-hidden', 'true');
    }

    palette.querySelector('[data-close-palette]')?.addEventListener('click', closePalette);

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        filtered = q
            ? allCommands.filter(c => c.label.toLowerCase().includes(q))
            : [...allCommands];
        selectedIndex = 0;
        renderList();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1);
            renderList();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, 0);
            renderList();
        } else if (e.key === 'Enter' && filtered[selectedIndex]) {
            e.preventDefault();
            runCommand(filtered[selectedIndex]);
        }
    });

    document.addEventListener('keydown', (e) => {
        const tag = document.activeElement?.tagName;
        const typing = tag === 'INPUT' || tag === 'TEXTAREA';

        if (e.key === '/' && !typing && !palette.classList.contains('is-open')) {
            e.preventDefault();
            openPalette();
        }
        if (e.key === 'Escape' && palette.classList.contains('is-open')) {
            closePalette();
        }
    });
}

window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => { preloader.style.display = 'none'; }, 450);
    }

    document.querySelectorAll('.reveal').forEach(el => {
        requestAnimationFrame(() => el.classList.add('is-visible'));
    });
});





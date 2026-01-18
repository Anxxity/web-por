document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initNavigation();
    loadTutorials();
    initTutorialFilters();
});


function loadTutorials(filter = 'all') {
    const tutorialsContainer = document.getElementById('tutorials-grid');
    if (!tutorialsContainer) return;


    tutorialsContainer.innerHTML = '';

    const filteredTutorials = filter === 'all' 
        ? tutorials 
        : tutorials.filter(tutorial => tutorial.category === filter);

    if (filteredTutorials.length === 0) {
        tutorialsContainer.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-book-open" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p style="font-size: 1.1rem;">No tutorials found in this category.</p>
            </div>
        `;
        return;
    }

    filteredTutorials.forEach(tutorial => {
        const tutorialCard = createTutorialCard(tutorial);
        tutorialsContainer.appendChild(tutorialCard);
    });
}

function createTutorialCard(tutorial) {
    const card = document.createElement('div');
    card.className = 'tutorial-card';
    card.setAttribute('data-category', tutorial.category);

    const tags = tutorial.tags ? tutorial.tags.map(tag => 
        `<span class="tech-tag">${tag}</span>`
    ).join('') : '';

    card.innerHTML = `
        <div class="tutorial-image">
            <img src="${tutorial.image}" alt="${tutorial.title}" loading="lazy">
            <div class="tutorial-badge">
                <span class="difficulty-badge difficulty-${tutorial.difficulty.toLowerCase()}">${tutorial.difficulty}</span>
                <span class="duration-badge"><i class="fas fa-clock"></i> ${tutorial.duration}</span>
            </div>
        </div>
        <div class="tutorial-content">
            <h3>${tutorial.title}</h3>
            <p>${tutorial.description}</p>
            <div class="tutorial-meta">
                <span class="tutorial-category">${tutorial.category.charAt(0).toUpperCase() + tutorial.category.slice(1)}</span>
            </div>
            <div class="tutorial-tech">
                ${tags}
            </div>
            <a href="tutorial-detail.html?id=${tutorial.id}" class="btn btn-primary view-tutorial-btn">
                View Tutorial <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;

    return card;
}

function initTutorialFilters() {
    const filterButtons = document.querySelectorAll('.tutorial-filters .filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            loadTutorials(filter);
        });
    });
}


function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    setTimeout(() => {
        updateNavbarBackground();
    }, 100);

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    function setTheme(theme) {
        body.setAttribute('data-theme', theme);

        if (theme === 'dark') {
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
            if (themeToggle) {
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
            }
        } else {
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon';
            }
            if (themeToggle) {
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
        }

        updateNavbarBackground();
    }
}


function initNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (mobileMenu) mobileMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', function() {
        updateNavbarBackground();
    });
}

function updateNavbarBackground() {
    const navbar = document.getElementById('navbar');
    const currentTheme = document.body.getAttribute('data-theme');

    if (navbar) {
        if (window.scrollY > 50) {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(17, 24, 39, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        } else {
            if (currentTheme === 'dark') {
                navbar.style.background = 'rgba(17, 24, 39, 0.95)';
                navbar.style.boxShadow = 'none';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    }
}

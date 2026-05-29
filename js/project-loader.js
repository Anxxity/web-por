document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    loadPersonalInfo();
    loadSkills();
    loadStats();
    loadContactInfo();
    loadTutorials();
    initProjectModalHandlers();
});

let currentFivemPage = 1;
let currentProjectsPage = 1;
const projectsPerPage = 6;

let currentFivemFilter = 'all';
let currentProjectsFilter = 'all';

function getYouTubeId(url) {
    if (!url) return null;
    try {
        const u = new URL(url);
        if (u.hostname.includes('youtu.be')) {
            return u.pathname.replace(/^\//, '').split('/')[0] || null;
        }
        if (u.hostname.includes('youtube.com')) {
            const v = u.searchParams.get('v');
            if (v) return v;
            const shorts = u.pathname.match(/\/shorts\/([^/?]+)/);
            if (shorts) return shorts[1];
            const embed = u.pathname.match(/\/embed\/([^/?]+)/);
            if (embed) return embed[1];
        }
    } catch (_) {
        return null;
    }
    return null;
}

function getYouTubeEmbedUrl(videoId) {
    if (!videoId) return null;
    const params = new URLSearchParams({
        rel: '0',
        modestbranding: '1',
        playsinline: '1'
    });
    if (typeof window !== 'undefined' && window.location?.origin && window.location.origin !== 'null') {
        params.set('origin', window.location.origin);
    }
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function getYouTubeThumb(url) {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

function isValidUrl(url) {
    if (!url || url === '#') return false;
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function buildProjectCard(project, options = {}) {
    const { featured = false } = options;
    const card = document.createElement('article');
    card.className = `project-card${featured ? ' project-card-featured' : ''} fivem-card`;
    card.setAttribute('data-category', project.category || '');
    card.setAttribute('data-project-id', project.id);
    card.setAttribute('data-project-source', project._source || 'fivem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open ${project.title}`);

    const frameworks = (project.frameworks || []).map(f =>
        `<span class="framework-badge">${escapeHtml(f)}</span>`
    ).join('');

    const techTags = (project.technologies || []).slice(0, 3).map(tech =>
        `<span class="tech-tag">${escapeHtml(tech)}</span>`
    ).join('');

    const highlights = (project.features || []).slice(0, 2).map(f =>
        `<li>${escapeHtml(f)}</li>`
    ).join('');

    const thumb = getYouTubeThumb(project.demo) || project.image;
    const hasVideo = Boolean(getYouTubeId(project.demo));

    const version = project.version
        ? `<span class="project-version">v${escapeHtml(project.version)}</span>`
        : '';

    card.innerHTML = `
        <div class="project-media">
            <img src="${thumb}" alt="${escapeHtml(project.title)}" loading="lazy">
            ${hasVideo ? '<span class="project-play" aria-hidden="true"><i class="fas fa-play"></i></span>' : ''}
            <div class="project-card-hover">
                <span class="open-label">Open <i class="fas fa-arrow-right"></i></span>
            </div>
        </div>
        <div class="project-content">
            <div class="project-card-head">
                <h3>${escapeHtml(project.title)}</h3>
                ${version}
            </div>
            <p class="project-card-desc">${escapeHtml(project.description)}</p>
            ${frameworks ? `<div class="project-frameworks">${frameworks}</div>` : ''}
            ${highlights ? `<ul class="project-highlights">${highlights}</ul>` : ''}
            <div class="project-card-footer">
                <div class="project-tech">${techTags}</div>
                ${isValidUrl(project.github) ? `
                <div class="project-card-actions">
                    <a href="${project.github}" class="card-action" target="_blank" rel="noopener" onclick="event.stopPropagation()">Code</a>
                </div>` : ''}
            </div>
        </div>
    `;

    return card;
}

function createFiveMProjectCard(project) {
    return buildProjectCard({ ...project, _source: 'fivem' });
}

function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category || '');
    card.setAttribute('data-project-id', project.id);
    card.setAttribute('data-project-source', 'robotics');
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Open ${project.title}`);

    const techTags = (project.technologies || []).map(tech =>
        `<span class="tech-tag">${escapeHtml(tech)}</span>`
    ).join('');

    const highlights = (project.features || []).slice(0, 2).map(f =>
        `<li>${escapeHtml(f)}</li>`
    ).join('');

    const thumb = getYouTubeThumb(project.demo) || project.image;

    card.innerHTML = `
        <div class="project-media">
            <img src="${thumb}" alt="${escapeHtml(project.title)}" loading="lazy">
            <div class="project-card-hover">
                <span class="open-label">Open <i class="fas fa-arrow-right"></i></span>
            </div>
        </div>
        <div class="project-content">
            <h3>${escapeHtml(project.title)}</h3>
            <p class="project-card-desc">${escapeHtml(project.description)}</p>
            ${highlights ? `<ul class="project-highlights">${highlights}</ul>` : ''}
            <div class="project-tech">${techTags}</div>
        </div>
    `;

    return card;
}

function loadFeaturedProjects() {
    const grid = document.getElementById('featured-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const ids = typeof featuredProjectIds !== 'undefined'
        ? featuredProjectIds
        : fivemProjects.filter(p => p.featured).map(p => p.id);

    const featuredFivemProjects = ids
        .map(id => fivemProjects.find(p => p.id === id))
        .filter(Boolean)
        .map(project => ({ ...project, _source: 'fivem' }));

    const featuredOtherProjects = otherProjects
        .filter(project => project.featured)
        .map(project => ({ ...project, _source: 'robotics' }));

    [...featuredOtherProjects,...featuredFivemProjects].forEach(project => {
        grid.appendChild(buildProjectCard(project, { featured: true }));
    });

    staggerCards(grid);
}

function loadFiveMProjects(filter = currentFivemFilter) {
    const fivemContainer = document.querySelector('#fivem .projects-grid');
    if (!fivemContainer) return;

    if (filter !== currentFivemFilter) {
        currentFivemPage = 1;
    }

    currentFivemFilter = filter;
    fivemContainer.innerHTML = '';

    const filteredProjects = filter === 'all'
        ? fivemProjects
        : fivemProjects.filter(project => project.category === filter);

    const startIndex = (currentFivemPage - 1) * projectsPerPage;
    const paginatedProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

    paginatedProjects.forEach(project => {
        fivemContainer.appendChild(createFiveMProjectCard(project));
    });

    addPaginationControls('#fivem', filteredProjects.length, 'fivem');
    staggerCards(fivemContainer);
}

function loadOtherProjects(filter = currentProjectsFilter) {
    const projectsContainer = document.querySelector('#projects .projects-grid');
    if (!projectsContainer) return;

    if (filter !== currentProjectsFilter) {
        currentProjectsPage = 1;
    }

    currentProjectsFilter = filter;
    projectsContainer.innerHTML = '';

    const filteredProjects = filter === 'all'
        ? otherProjects
        : otherProjects.filter(project => project.category === filter);

    const startIndex = (currentProjectsPage - 1) * projectsPerPage;
    const paginatedProjects = filteredProjects.slice(startIndex, startIndex + projectsPerPage);

    paginatedProjects.forEach(project => {
        projectsContainer.appendChild(createProjectCard(project));
    });

    addPaginationControls('#projects', filteredProjects.length, 'projects');
    staggerCards(projectsContainer);
}

function findProjectById(id, source) {
    if (source === 'robotics') {
        return otherProjects.find(p => p.id === id);
    }
    return fivemProjects.find(p => p.id === id);
}

function buildModalHtml(project) {
    const videoId = getYouTubeId(project.demo);
    const embedUrl = videoId ? getYouTubeEmbedUrl(videoId) : null;
   console.log(embedUrl)
    const videoBlock = embedUrl
    
        ? `<div class="modal-video">
            <iframe
                src="${embedUrl}"
                title="${escapeHtml(project.title)} preview"
                referrerpolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                loading="lazy"
            ></iframe>
           </div>`
        : `<div class="modal-video modal-video-fallback">
            <img src="${project.image}" alt="${escapeHtml(project.title)}">
           </div>`;

    const gallery = (project.gallery || [project.image]).filter(Boolean);
    const galleryHtml = gallery.length
        ? `<div class="modal-gallery">
            <h3>Screenshots</h3>
            <div class="modal-gallery-grid">
                ${gallery.map(src => `<button type="button" class="gallery-thumb" data-full="${src}"><img src="${src}" alt="" loading="lazy"></button>`).join('')}
            </div>
           </div>`
        : '';

    const frameworks = (project.frameworks || []).map(f =>
        `<span class="framework-badge">${escapeHtml(f)}</span>`
    ).join('');

    const techTags = (project.technologies || []).map(tech =>
        `<span class="tech-tag">${escapeHtml(tech)}</span>`
    ).join('');

    const detailBlock = (label, text) => text
        ? `<div class="modal-detail">
            <h4>${label}</h4>
            <p>${escapeHtml(text)}</p>
           </div>`
        : '';

    return `
        <div class="project-modal active" role="dialog" aria-modal="true" aria-label="${escapeHtml(project.title)}">
            <div class="modal-backdrop" data-close-modal></div>
            <div class="modal-content modal-content-lg">
                <button class="modal-close" type="button" aria-label="Close">&times;</button>
                <div class="modal-hero">
                    ${videoBlock}
                    <div class="modal-hero-info">
                        <div class="modal-title-row">
                            <h2>${escapeHtml(project.title)}</h2>
                            ${project.version ? `<span class="project-version">v${escapeHtml(project.version)}</span>` : ''}
                        </div>
                        <p>${escapeHtml(project.description)}</p>
                        ${frameworks ? `<div class="project-frameworks">${frameworks}</div>` : ''}
                        ${isValidUrl(project.github) ? `
                        <div class="modal-links">
                            <a href="${project.github}" class="btn btn-secondary" target="_blank" rel="noopener">View Code</a>
                        </div>` : ''}
                    </div>
                </div>
                <div class="modal-body">
                    <div class="modal-details-grid">
                        ${detailBlock('Problem', project.problem)}
                        ${detailBlock('Solution', project.solution)}
                        ${detailBlock('Result', project.result)}
                    </div>
                    ${project.challenges ? detailBlock('Challenges', project.challenges) : ''}
                    ${project.performance ? detailBlock('Performance', project.performance) : ''}
                    ${project.features ? `
                        <div class="modal-features">
                            <h3>Features</h3>
                            <ul>${project.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
                        </div>
                    ` : ''}
                    <div class="modal-tech">
                        <h3>Tech Stack</h3>
                        <div class="tech-tags">${techTags}</div>
                    </div>
                    ${galleryHtml}
                </div>
            </div>
        </div>
    `;
}

function openProjectModal(project) {
    const shell = document.getElementById('project-modal-shell');
    if (!shell) return;

    shell.innerHTML = buildModalHtml(project);
    shell.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const modal = shell.querySelector('.project-modal');
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        shell.setAttribute('aria-hidden', 'true');
        setTimeout(() => { shell.innerHTML = ''; }, 220);
    };

    shell.querySelector('.modal-close').addEventListener('click', closeModal);
    shell.querySelector('[data-close-modal]').addEventListener('click', closeModal);
    shell.querySelector('.modal-content').addEventListener('click', e => e.stopPropagation());

    shell.querySelectorAll('.gallery-thumb').forEach(btn => {
        btn.addEventListener('click', () => {
            const img = shell.querySelector('.modal-video-fallback img, .modal-video iframe');
            if (btn.dataset.full) {
                const preview = shell.querySelector('.modal-video');
                if (preview) {
                    preview.innerHTML = `<img src="${btn.dataset.full}" alt="${escapeHtml(project.title)}">`;
                    preview.classList.add('modal-video-fallback');
                }
            }
        });
    });

    const onEscape = e => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', onEscape);
        }
    };
    document.addEventListener('keydown', onEscape);
}

function initProjectModalHandlers() {
    document.addEventListener('click', function(e) {
        if (e.target.closest('.card-action, .project-link')) return;

        const card = e.target.closest('.project-card');
        if (!card) return;

        const projectId = parseInt(card.dataset.projectId, 10);
        const source = card.dataset.projectSource || 'fivem';
        const project = findProjectById(projectId, source);

        if (project) openProjectModal(project);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key !== 'Enter') return;
        const card = e.target.closest('.project-card');
        if (!card) return;
        e.preventDefault();
        const projectId = parseInt(card.dataset.projectId, 10);
        const source = card.dataset.projectSource || 'fivem';
        const project = findProjectById(projectId, source);
        if (project) openProjectModal(project);
    });
}

function loadPersonalInfo() {
    document.title = 'Remin Mohammed — FiveM Systems • UI • Robotics';
}

function loadSkills() {
    const grids = document.querySelectorAll('.skills-grid, .experience-grid');
    if (!grids.length) return;

    grids.forEach(skillsGrid => {
        skillsGrid.innerHTML = '';
        skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <i class="${skill.icon}"></i>
                <span>${escapeHtml(skill.name)}</span>
            `;
            skillsGrid.appendChild(skillItem);
        });
    });
}

function loadStats() {
    const statsContainer = document.querySelector('.about-stats');
    if (!statsContainer) return;

    statsContainer.innerHTML = '';
    stats.forEach(stat => {
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <h3>${escapeHtml(stat.number)}</h3>
            <p>${escapeHtml(stat.label)}</p>
        `;
        statsContainer.appendChild(statItem);
    });
}

function loadContactInfo() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        const span = item.querySelector('span');
        if (!span) return;
        if (index === 0) span.textContent = contactInfo.email;
        if (index === 1) span.textContent = contactInfo.discord;
        if (index === 2) span.textContent = contactInfo.github;
    });

    document.querySelectorAll('.social-link').forEach(link => {
        const icon = link.querySelector('i');
        if (!icon) return;
        if (icon.classList.contains('fa-github')) {
            link.href = contactInfo.socialLinks.github;
        } else if (icon.classList.contains('fa-discord')) {
            link.href = contactInfo.socialLinks.discord;
        } else if (icon.classList.contains('fa-envelope')) {
            link.href = `mailto:${contactInfo.email}`;
        }
    });
}

function loadProjects() {
    loadFeaturedProjects();
    loadFiveMProjects();
    loadOtherProjects();
}

function staggerCards(container) {
    const cards = container.querySelectorAll('.project-card');
    cards.forEach((card, i) => {
        card.classList.add('reveal-stagger');
        card.style.transitionDelay = `${Math.min(i * 0.07, 0.42)}s`;
        delete card.dataset.revealBound;
    });
    if (typeof window.refreshScrollAnimations === 'function') {
        window.refreshScrollAnimations();
    }
}

function loadTutorials(filter = 'all') {
    const tutorialsContainer = document.querySelector('#tutorials-grid');
    if (!tutorialsContainer) return;

    tutorialsContainer.innerHTML = '';

    const filteredTutorials = filter === 'all'
        ? tutorials
        : tutorials.filter(tutorial => tutorial.category === filter);

    filteredTutorials.forEach(tutorial => {
        tutorialsContainer.appendChild(createTutorialCard(tutorial));
    });
}

function createTutorialCard(tutorial) {
    const card = document.createElement('div');
    card.className = 'tutorial-card';
    card.setAttribute('data-category', tutorial.category);
    card.setAttribute('data-tutorial-id', tutorial.id);

    const tags = tutorial.tags ? tutorial.tags.map(tag =>
        `<span class="tech-tag">${escapeHtml(tag)}</span>`
    ).join('') : '';

    card.innerHTML = `
        <div class="tutorial-image">
            <img src="${tutorial.image}" alt="${escapeHtml(tutorial.title)}" loading="lazy">
            <div class="tutorial-badge">
                <span class="difficulty-badge difficulty-${tutorial.difficulty.toLowerCase().replace(/\s+/g, '-')}">${escapeHtml(tutorial.difficulty)}</span>
                <span class="duration-badge"><i class="fas fa-clock"></i> ${escapeHtml(tutorial.duration)}</span>
            </div>
        </div>
        <div class="tutorial-content">
            <h3>${escapeHtml(tutorial.title)}</h3>
            <p>${escapeHtml(tutorial.description)}</p>
            <div class="tutorial-meta">
                <span class="tutorial-category">${escapeHtml(tutorial.category.charAt(0).toUpperCase() + tutorial.category.slice(1))}</span>
            </div>
            <div class="tutorial-tech">${tags}</div>
            <a href="tutorial-detail.html?id=${tutorial.id}" class="btn btn-primary view-tutorial-btn" data-tutorial-id="${tutorial.id}">
                View Tutorial <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;

    return card;
}

function addPaginationControls(sectionSelector, totalProjects, pageType) {
    const existingPagination = document.querySelector(`${sectionSelector} .pagination`);
    if (existingPagination) existingPagination.remove();

    if (totalProjects <= projectsPerPage) return;

    const section = document.querySelector(sectionSelector);
    const totalPages = Math.ceil(totalProjects / projectsPerPage);
    const currentPage = pageType === 'fivem' ? currentFivemPage : currentProjectsPage;

    const pagination = document.createElement('nav');
    pagination.className = 'pagination';
    pagination.setAttribute('aria-label', 'Project pages');
    pagination.innerHTML = `
        <button class="pagination-btn prev" type="button" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> Previous
        </button>
        <div class="pagination-pages"></div>
        <button class="pagination-btn next" type="button" ${currentPage === totalPages ? 'disabled' : ''}>
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;

    const pagesWrap = pagination.querySelector('.pagination-pages');
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `pagination-page${i === currentPage ? ' active' : ''}`;
        btn.textContent = String(i);
        btn.addEventListener('click', () => goToPage(pageType, i, sectionSelector));
        pagesWrap.appendChild(btn);
    }

    section.querySelector('.projects-grid').after(pagination);

    pagination.querySelector('.prev').addEventListener('click', () => {
        if (currentPage > 1) goToPage(pageType, currentPage - 1, sectionSelector);
    });

    pagination.querySelector('.next').addEventListener('click', () => {
        if (currentPage < totalPages) goToPage(pageType, currentPage + 1, sectionSelector);
    });
}

function goToPage(pageType, page, sectionSelector) {
    if (pageType === 'fivem') {
        currentFivemPage = page;
        loadFiveMProjects(currentFivemFilter);
        document.getElementById('fivem')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        currentProjectsPage = page;
        loadOtherProjects(currentProjectsFilter);
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

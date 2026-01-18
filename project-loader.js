document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    loadPersonalInfo();
    loadSkills();
    loadStats();
    loadContactInfo();
    loadTutorials();
});

let currentFivemPage = 1;
let currentProjectsPage = 1;
const projectsPerPage = 9;

let currentFivemFilter = 'all';
let currentProjectsFilter = 'all';

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
    const endIndex = startIndex + projectsPerPage;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    paginatedProjects.forEach(project => {
        const projectCard = createFiveMProjectCard(project);
        fivemContainer.appendChild(projectCard);
    });

    addPaginationControls('#fivem', filteredProjects.length, 'fivem');
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
    const endIndex = startIndex + projectsPerPage;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    paginatedProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });

    addPaginationControls('#projects', filteredProjects.length, 'projects');
}

function createFiveMProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card fivem-card';
    card.setAttribute('data-category', project.category);

    const techTags = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    const features = project.features ? project.features.map(feature => 
        `<li>${feature}</li>`
    ).join('') : '';

    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="project-overlay">
                <div class="project-links">
                    ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    ${project.github ? `<a href="${project.github}" class="project-link" target="_blank" rel="noopener"><i class="fab fa-github"></i></a>` : ''}
                </div>
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${features ? `
                <div class="project-features">
                    <h4>Key Features:</h4>
                    <ul>${features}</ul>
                </div>
            ` : ''}
            <div class="project-tech">
                ${techTags}
            </div>
        </div>
    `;

    return card;
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);

    const techTags = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');

    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="project-overlay">
                <div class="project-links">
                    ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    ${project.github ? `<a href="${project.github}" class="project-link" target="_blank" rel="noopener"><i class="fab fa-github"></i></a>` : ''}
                </div>
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${techTags}
            </div>
        </div>
    `;

    return card;
}

function loadPersonalInfo() {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) heroTitle.textContent = personalInfo.name;
    if (heroSubtitle) heroSubtitle.textContent = personalInfo.title;

    const aboutText = document.querySelector('.about-text');
    if (aboutText && personalInfo.bio) {
        const paragraphs = personalInfo.bio.map(paragraph => `<p>${paragraph}</p>`).join('');
        aboutText.innerHTML = paragraphs + aboutText.querySelector('.skills').outerHTML;
    }

    document.title = `${personalInfo.name} - Portfolio | ${personalInfo.title}`;
}

function loadSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = '';

    skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <i class="${skill.icon}"></i>
            <span>${skill.name}</span>
        `;
        skillsGrid.appendChild(skillItem);
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
            <h3>${stat.number}</h3>
            <p>${stat.label}</p>
        `;
        statsContainer.appendChild(statItem);
    });
}

function loadContactInfo() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        const span = item.querySelector('span');
        if (span) {
            switch(index) {
                case 0:
                    span.textContent = contactInfo.email;
                    break;
                case 1:
                    span.textContent = contactInfo.discord;
                    break;
                case 2:
                    span.textContent = contactInfo.github;
                    break;
            }
        }
    });

    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        const icon = link.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-github')) {
                link.href = contactInfo.socialLinks.github;
            } else if (icon.classList.contains('fa-discord')) {
                link.href = contactInfo.socialLinks.discord;
            } else if (icon.classList.contains('fa-twitter')) {
                link.href = contactInfo.socialLinks.twitter;
            } else if (icon.classList.contains('fa-linkedin')) {
                link.href = contactInfo.socialLinks.linkedin;
            }
        }
    });
}

function loadProjects() {
    loadFiveMProjects();
    loadOtherProjects();
}


function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}


function createProjectModal(project) {
    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-header">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="modal-info">
                        <h2>${project.title}</h2>
                        <p>${project.description}</p>
                        <div class="modal-links">
                            ${project.demo && isValidUrl(project.demo) ? `<a href="${project.demo}" class="btn btn-primary" target="_blank">Live Demo</a>` : ''}
                            ${project.github && isValidUrl(project.github) ? `<a href="${project.github}" class="btn btn-secondary" target="_blank">View Code</a>` : ''}
                        </div>
                    </div>
                </div>
                ${project.features ? `
                    <div class="modal-features">
                        <h3>Features</h3>
                        <ul>
                            ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                <div class="modal-tech">
                    <h3>Technologies Used</h3>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    const modalStyles = `
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(5px);
            padding: 1rem;
            box-sizing: border-box;
        }

        .project-modal.active {
            opacity: 1;
        }

        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: transparent;
            z-index: 1;
        }

        .modal-content {
            background: var(--bg-primary);
            color: var(--text-primary);
            border: 1px solid var(--border-color);
            border-radius: 15px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            margin: 0 auto;
            transform: scale(0.9);
            transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            z-index: 2;
            box-shadow: var(--shadow-hover);
        }

        .project-modal.active .modal-content {
            transform: scale(1);
        }

        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: var(--bg-secondary);
            border: 2px solid var(--border-color);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 3;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition);
        }

        .modal-close:hover {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        .modal-header {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem;
        }

        .modal-header img {
            width: 100%;
            border-radius: 10px;
        }

        .modal-info h2 {
            color: var(--text-primary);
            margin-bottom: 1rem;
        }

        .modal-info p {
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }

        .modal-links {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .modal-features, .modal-tech {
            padding: 0 2rem 2rem;
        }

        .modal-features h3, .modal-tech h3 {
            color: var(--text-primary);
            margin-bottom: 1rem;
        }

        .modal-features ul {
            list-style: none;
            padding: 0;
        }

        .modal-features li {
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--border-color);
            color: var(--text-secondary);
        }

        .modal-features li:last-child {
            border-bottom: none;
        }

        .tech-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .modal-tech .tech-tag {
            background: var(--bg-secondary);
            color: var(--primary-color);
            border: 1px solid var(--border-color);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
        }

        @media (max-width: 768px) {
            .modal-header {
                grid-template-columns: 1fr;
            }

            .modal-content {
                margin: 0;
                max-height: 95vh;
                border-radius: 15px 15px 0 0;
            }

            .modal-close {
                top: 0.5rem;
                right: 0.5rem;
                width: 35px;
                height: 35px;
                font-size: 1.2rem;
            }

            .project-modal {
                align-items: flex-end;
                padding: 0;
            }

            .project-modal.active .modal-content {
                transform: translateY(0);
            }

            .modal-content {
                transform: translateY(100%);
                transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            }
        }
    `;

    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }

    return modal;
}

document.addEventListener('click', function(e) {
    const projectCard = e.target.closest('.project-card');
    if (projectCard && !e.target.closest('.project-link')) {
        const projectId = parseInt(projectCard.dataset.projectId);
        let project;
        
        if (projectCard.classList.contains('fivem-card')) {
            project = fivemProjects.find(p => p.id === projectId);
        } else {
            project = otherProjects.find(p => p.id === projectId);
        }
        
        if (project) {
            const modal = createProjectModal(project);
            document.body.appendChild(modal);

            document.body.classList.add('modal-open');

            setTimeout(() => modal.classList.add('active'), 10);

            const closeModal = () => {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
                setTimeout(() => modal.remove(), 300);
            };

            modal.querySelector('.modal-close').addEventListener('click', closeModal);

            modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

            modal.querySelector('.modal-content').addEventListener('click', (e) => {
                e.stopPropagation();
            });

            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        }
    }
});

function loadTutorials(filter = 'all') {
    const tutorialsContainer = document.querySelector('#tutorials-grid');
    if (!tutorialsContainer) return;

    tutorialsContainer.innerHTML = '';

    const filteredTutorials = filter === 'all' 
        ? tutorials 
        : tutorials.filter(tutorial => tutorial.category === filter);

    filteredTutorials.forEach(tutorial => {
        const tutorialCard = createTutorialCard(tutorial);
        tutorialsContainer.appendChild(tutorialCard);
    });
}

function createTutorialCard(tutorial) {
    const card = document.createElement('div');
    card.className = 'tutorial-card';
    card.setAttribute('data-category', tutorial.category);
    card.setAttribute('data-tutorial-id', tutorial.id);

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
            <button class="btn btn-primary view-tutorial-btn" data-tutorial-id="${tutorial.id}">
                View Tutorial <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;

    return card;
}

function addProjectIds() {
    const fivemCards = document.querySelectorAll('#fivem .project-card');
    fivemCards.forEach((card, index) => {
        card.dataset.projectId = fivemProjects[index].id;
    });
    
    const otherCards = document.querySelectorAll('#projects .project-card');
    otherCards.forEach((card, index) => {
        card.dataset.projectId = otherProjects[index].id;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addProjectIds, 100);
});

function addPaginationControls(sectionSelector, totalProjects, pageType) {
    const existingPagination = document.querySelector(`${sectionSelector} .pagination`);
    if (existingPagination) {
        existingPagination.remove();
    }

    if (totalProjects <= projectsPerPage) {
        return;
    }

    const section = document.querySelector(sectionSelector);
    const container = section.querySelector('.container');
    
    const totalPages = Math.ceil(totalProjects / projectsPerPage);
    const currentPage = pageType === 'fivem' ? currentFivemPage : currentProjectsPage;

    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    pagination.innerHTML = `
        <button class="pagination-btn prev" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="fas fa-chevron-left"></i> Previous
        </button>
        <div class="pagination-info">
            Page ${currentPage} of ${totalPages}
        </div>
        <button class="pagination-btn next" ${currentPage === totalPages ? 'disabled' : ''}>
            Next <i class="fas fa-chevron-right"></i>
        </button>
    `;

    if (!document.querySelector('#pagination-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'pagination-styles';
        styleSheet.textContent = `
            .pagination {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 2rem;
                margin-top: 3rem;
                padding: 1.5rem 0;
            }

            .pagination-btn {
                padding: 0.75rem 1.5rem;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: var(--transition);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .pagination-btn:hover:not(:disabled) {
                background: var(--secondary-color);
                transform: translateY(-2px);
                box-shadow: var(--shadow);
            }

            .pagination-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .pagination-info {
                font-size: 1rem;
                font-weight: 500;
                color: var(--text-primary);
            }

            @media (max-width: 768px) {
                .pagination {
                    gap: 1rem;
                }

                .pagination-btn {
                    padding: 0.5rem 1rem;
                    font-size: 0.9rem;
                }

                .pagination-info {
                    font-size: 0.9rem;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }

    const grid = section.querySelector('.projects-grid');
    grid.after(pagination);

    pagination.querySelector('.prev').addEventListener('click', () => {
        if (pageType === 'fivem') {
            if (currentFivemPage > 1) {
                currentFivemPage--;
                loadFiveMProjects(currentFivemFilter);
                document.getElementById('fivem').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            if (currentProjectsPage > 1) {
                currentProjectsPage--;
                loadOtherProjects(currentProjectsFilter);
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });

    pagination.querySelector('.next').addEventListener('click', () => {
        if (pageType === 'fivem') {
            if (currentFivemPage < totalPages) {
                currentFivemPage++;
                loadFiveMProjects(currentFivemFilter);

                document.getElementById('fivem').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            if (currentProjectsPage < totalPages) {
                currentProjectsPage++;
                loadOtherProjects(currentProjectsFilter);
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
}

// Project Loader - Dynamically populate projects from data
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    loadPersonalInfo();
    loadSkills();
    loadStats();
    loadContactInfo();
});

// Load and display FiveM projects
function loadFiveMProjects() {
    const fivemContainer = document.querySelector('#fivem .projects-grid');
    if (!fivemContainer) return;

    fivemContainer.innerHTML = '';

    fivemProjects.forEach(project => {
        const projectCard = createFiveMProjectCard(project);
        fivemContainer.appendChild(projectCard);
    });
}

// Load and display other projects
function loadOtherProjects() {
    const projectsContainer = document.querySelector('#projects .projects-grid');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = '';

    otherProjects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
}

// Create FiveM project card
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

// Create regular project card
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

// Load personal information
function loadPersonalInfo() {
    // Update hero section
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) heroTitle.textContent = personalInfo.name;
    if (heroSubtitle) heroSubtitle.textContent = personalInfo.title;

    // Update about section
    const aboutText = document.querySelector('.about-text');
    if (aboutText && personalInfo.bio) {
        const paragraphs = personalInfo.bio.map(paragraph => `<p>${paragraph}</p>`).join('');
        aboutText.innerHTML = paragraphs + aboutText.querySelector('.skills').outerHTML;
    }

    // Update page title
    document.title = `${personalInfo.name} - Portfolio | ${personalInfo.title}`;
}

// Load skills
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

// Load statistics
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

// Load contact information
function loadContactInfo() {
    // Update contact items
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

    // Update social links
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

// Main function to load all projects
function loadProjects() {
    loadFiveMProjects();
    loadOtherProjects();
}

// Add project modal functionality
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
                            ${project.demo ? `<a href="${project.demo}" class="btn btn-primary" target="_blank">Live Demo</a>` : ''}
                            ${project.github ? `<a href="${project.github}" class="btn btn-secondary disable" target="_blank">View Code</a>` : ''}
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

    // Add modal styles
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

    // Add styles to head if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }

    return modal;
}

// Enhanced project card click handlers
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

            // Prevent body scroll
            document.body.classList.add('modal-open');

            setTimeout(() => modal.classList.add('active'), 10);

            // Close modal function
            const closeModal = () => {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
                setTimeout(() => modal.remove(), 300);
            };

            // Close modal handlers
            modal.querySelector('.modal-close').addEventListener('click', closeModal);

            modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

            // Prevent closing when clicking on modal content
            modal.querySelector('.modal-content').addEventListener('click', (e) => {
                e.stopPropagation();
            });

            // Close on escape key
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

// Add project IDs to cards after they're created
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

// Call addProjectIds after projects are loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addProjectIds, 100);
});

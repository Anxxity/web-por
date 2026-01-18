document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initNavigation();
    loadTutorialDetail();
    initSidebarToggle();
    initSmoothScroll();
});

function loadTutorialDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const tutorialId = parseInt(urlParams.get('id'));

    if (!tutorialId) {
        redirectToTutorials();
        return;
    }

    const tutorial = tutorials.find(t => t.id === tutorialId);

    if (!tutorial) {
        redirectToTutorials();
        return;
    }

    document.getElementById('page-title').textContent = `${tutorial.title} | Tutorials`;
    
    document.getElementById('breadcrumb-title').textContent = tutorial.title;

    document.getElementById('tutorial-title').textContent = tutorial.title;
    document.getElementById('tutorial-description').textContent = tutorial.description;
    document.getElementById('tutorial-image').src = tutorial.image;
    document.getElementById('tutorial-image').alt = tutorial.title;

    const categoryBadge = document.getElementById('tutorial-category');
    const difficultyBadge = document.getElementById('tutorial-difficulty');
    const durationBadge = document.getElementById('tutorial-duration');

    categoryBadge.textContent = tutorial.category.charAt(0).toUpperCase() + tutorial.category.slice(1);
    categoryBadge.className = 'category-badge';

    difficultyBadge.textContent = tutorial.difficulty;
    difficultyBadge.className = `difficulty-badge difficulty-${tutorial.difficulty.toLowerCase()}`;

    durationBadge.innerHTML = `<i class="fas fa-clock"></i> ${tutorial.duration}`;
    durationBadge.className = 'duration-badge';

    loadTutorialContent(tutorial);

    generateSidebarNav(tutorial);
}

function loadTutorialContent(tutorial) {
    const article = document.getElementById('tutorial-article');
    
    if (!tutorial.content || tutorial.content.length === 0) {
        article.innerHTML = '<p style="color: var(--text-secondary);">No content available for this tutorial.</p>';
        return;
    }

    article.innerHTML = tutorial.content.map((section, index) => {
        const stepId = `step-${index + 1}`;
        const stepNumber = index + 1;
        
        const imageHtml = section.image ? `
            <div class="step-image">
                <img src="${section.image}" alt="${section.heading}" loading="lazy">
            </div>
        ` : '';
        
        return `
            <div class="tutorial-content-step" id="${stepId}">
                <h2 class="step-heading">
                    <span class="step-number">${stepNumber}</span>
                    ${section.heading}
                </h2>
                ${imageHtml}
                <div class="step-content">${formatStepContent(section.text)}</div>
            </div>
        `;
    }).join('');

    updateActiveSidebarOnScroll();
    
    setTimeout(() => {
        initCopyCodeButtons();
    }, 100);
}

function formatStepContent(text) {
    if (!text) return '';
    
    let processed = text;
    const codeBlocks = [];
    let codeBlockIndex = 0;
    
    processed = processed.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, language, code) {
        const blockId = `code-block-${codeBlockIndex++}`;
        const lang = language || 'text';
        const codeBlockHtml = createCodeBlock(blockId, code.trim(), lang);
        codeBlocks.push({ id: blockId, code: code.trim(), language: lang, html: codeBlockHtml });
        return `\n__CODEBLOCK_START_${blockId}__CODEBLOCK_END__\n`;
    });
    
    processed = processed.replace(/`([^`\n]+)`/g, function(match, code) {
        if (!match.includes('__CODEBLOCK_')) {
            return `<code class="inline-code">${escapeHtml(code)}</code>`;
        }
        return match;
    });
    
    processed = processed.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, function(match, alt, url) {
        const escapedAlt = alt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<div class="step-inline-image"><img src="${url}" alt="${escapedAlt}" loading="lazy"></div>`;
    });
    
    const lines = processed.split('\n');
    let result = [];
    let inList = false;
    let listType = null;
    let currentParagraph = [];
    
    lines.forEach((line, index) => {
        const trimmedLine = line.trim();
        
        if (line.includes('__CODEBLOCK_START_') && line.includes('__CODEBLOCK_END__')) {
            const match = line.match(/__CODEBLOCK_START_(.+?)__CODEBLOCK_END__/);
            if (match) {
                const blockId = match[1];
                const block = codeBlocks.find(b => b.id === blockId);
                if (block && block.html) {
                    if (inList) {
                        result.push(`</${listType}>`);
                        inList = false;
                        listType = null;
                    }
                    if (currentParagraph.length > 0) {
                        result.push(`<p>${currentParagraph.join(' ')}</p>`);
                        currentParagraph = [];
                    }
                    result.push(block.html);
                }
            }
        }
        else if (line.includes('<div class="code-block-wrapper">')) {
            if (inList) {
                result.push(`</${listType}>`);
                inList = false;
                listType = null;
            }
            if (currentParagraph.length > 0) {
                result.push(`<p>${currentParagraph.join(' ')}</p>`);
                currentParagraph = [];
            }
            result.push(line);
        }
        else if (line.includes('<div class="step-inline-image">')) {
            if (inList) {
                result.push(`</${listType}>`);
                inList = false;
                listType = null;
            }
            if (currentParagraph.length > 0) {
                result.push(`<p>${currentParagraph.join(' ')}</p>`);
                currentParagraph = [];
            }
            result.push(line);
        }
        else if (/^\d+\.\s+/.test(trimmedLine)) {
            if (currentParagraph.length > 0) {
                result.push(`<p>${currentParagraph.join(' ')}</p>`);
                currentParagraph = [];
            }
            
            if (!inList || listType !== 'ol') {
                if (inList && listType === 'ul') {
                    result.push('</ul>');
                }
                result.push('<ol>');
                inList = true;
                listType = 'ol';
            }
            let itemText = trimmedLine.replace(/^\d+\.\s+/, '');
            if (!itemText.includes('<code') && !itemText.includes('<div') && !itemText.includes('<img')) {
                itemText = itemText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }
            result.push(`<li>${itemText}</li>`);
        }
        else if (/^-\s+/.test(trimmedLine)) {
            if (currentParagraph.length > 0) {
                result.push(`<p>${currentParagraph.join(' ')}</p>`);
                currentParagraph = [];
            }
            
            if (!inList || listType !== 'ul') {
                if (inList && listType === 'ol') {
                    result.push('</ol>');
                }
                result.push('<ul>');
                inList = true;
                listType = 'ul';
            }
            let itemText = trimmedLine.replace(/^-\s+/, '');
            if (!itemText.includes('<code') && !itemText.includes('<div') && !itemText.includes('<img')) {
                itemText = itemText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }
            result.push(`<li>${itemText}</li>`);
        }
        else {
            if (inList) {
                result.push(`</${listType}>`);
                inList = false;
                listType = null;
            }
            
            if (trimmedLine) {
                if (trimmedLine.includes('<div') || trimmedLine.includes('<img')) {
                    if (currentParagraph.length > 0) {
                        result.push(`<p>${currentParagraph.join(' ')}</p>`);
                        currentParagraph = [];
                    }
                    result.push(trimmedLine);
                }
                else if (trimmedLine.includes('<code class="inline-code">')) {
                    currentParagraph.push(trimmedLine);
                }
                else {
                    if (trimmedLine.includes('<code')) {
                        currentParagraph.push(trimmedLine);
                    } else {
                        const escaped = trimmedLine.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                        currentParagraph.push(escaped);
                    }
                }
            } else if (currentParagraph.length > 0 || (index > 0 && index < lines.length - 1)) {
                if (currentParagraph.length > 0) {
                    result.push(`<p>${currentParagraph.join(' ')}</p>`);
                    currentParagraph = [];
                } else if (index > 0 && index < lines.length - 1) {
                    result.push('<br>');
                }
            }
        }
    });
    
    if (inList) {
        result.push(`</${listType}>`);
    }
    
    if (currentParagraph.length > 0) {
        result.push(`<p>${currentParagraph.join(' ')}</p>`);
    }
    
    return result.join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function createCodeBlock(id, code, language) {
    const escapedCode = escapeHtml(code);
    return `
        <div class="code-block-wrapper">
            <div class="code-block-header">
                <span class="code-language">${language}</span>
                <button class="copy-code-btn" data-code-id="${id}" aria-label="Copy code">
                    <i class="fas fa-copy"></i>
                    <span class="copy-text">Copy</span>
                </button>
            </div>
            <pre class="code-block"><code id="${id}" class="language-${language}">${escapedCode}</code></pre>
        </div>
    `;
}

function initCopyCodeButtons() {
    document.querySelectorAll('.copy-code-btn').forEach(button => {
        button.addEventListener('click', function() {
            const codeId = this.getAttribute('data-code-id');
            const codeElement = document.getElementById(codeId);
            
            if (codeElement) {
                const code = codeElement.textContent;
                copyToClipboard(code, this);
            }
        });
    });
}

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const icon = button.querySelector('i');
        const textSpan = button.querySelector('.copy-text');
        
        icon.className = 'fas fa-check';
        if (textSpan) textSpan.textContent = 'Copied!';
        
        setTimeout(() => {
            icon.className = 'fas fa-copy';
            if (textSpan) textSpan.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            const icon = button.querySelector('i');
            const textSpan = button.querySelector('.copy-text');
            icon.className = 'fas fa-check';
            if (textSpan) textSpan.textContent = 'Copied!';
            setTimeout(() => {
                icon.className = 'fas fa-copy';
                if (textSpan) textSpan.textContent = 'Copy';
            }, 2000);
        } catch (err) {
            console.error('Fallback copy failed:', err);
        }
        document.body.removeChild(textArea);
    });
}

function generateSidebarNav(tutorial) {
    const sidebarNav = document.getElementById('sidebar-nav');
    const sidebarTitle = document.getElementById('sidebar-title');

    if (!tutorial.content || tutorial.content.length === 0) {
        sidebarNav.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem; padding: 1rem;">No sections available.</p>';
        return;
    }

    sidebarTitle.textContent = 'Table of Contents';
    
    sidebarNav.innerHTML = tutorial.content.map((section, index) => {
        const stepId = `step-${index + 1}`;
        return `
            <a href="#${stepId}" class="sidebar-nav-item" data-step-id="${stepId}">
                ${index + 1}. ${section.heading}
            </a>
        `;
    }).join('');

    sidebarNav.querySelectorAll('.sidebar-nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const stepId = this.getAttribute('data-step-id');
            const stepElement = document.getElementById(stepId);
            
            if (stepElement) {
                stepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function updateActiveSidebarOnScroll() {
    const steps = document.querySelectorAll('.tutorial-content-step');
    const navItems = document.querySelectorAll('.sidebar-nav-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepId = entry.target.id;
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('data-step-id') === stepId) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });

    steps.forEach(step => observer.observe(step));
}

function initSidebarToggle() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarNav = document.getElementById('sidebar-nav');

    if (sidebarToggle && sidebarNav) {
        sidebarToggle.addEventListener('click', function() {
            sidebarNav.classList.toggle('active');
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

function redirectToTutorials() {
    window.location.href = 'tutorials.html';
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
            if (themeIcon) themeIcon.className = 'fas fa-sun';
            if (themeToggle) themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            if (themeIcon) themeIcon.className = 'fas fa-moon';
            if (themeToggle) themeToggle.setAttribute('aria-label', 'Switch to dark mode');
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

// ====================================
// Dutton Family Tree - Main JavaScript
// ====================================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initLanguageToggle();
    initScrollEffects();
    initSmoothScroll();
});

// ====================================
// Navigation Active State
// ====================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ====================================
// Language Toggle
// ====================================

let currentLanguage = 'en';

function initLanguageToggle() {
    const langBtn = document.getElementById('lang-toggle');
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('language') || 'en';
    currentLanguage = savedLang;
    
    langBtn.textContent = currentLanguage === 'en' ? '中文' : 'English';
    
    langBtn.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
        langBtn.textContent = currentLanguage === 'en' ? '中文' : 'English';
        updateLanguage();
        localStorage.setItem('language', currentLanguage);
    });
    
    // Set initial language
    if (currentLanguage === 'zh') {
        updateLanguage();
    }
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en]');
    
    elements.forEach(element => {
        if (currentLanguage === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else if (currentLanguage === 'zh') {
            element.textContent = element.getAttribute('data-zh');
        }
    });
    
    // Update body class for font adjustments
    document.body.classList.toggle('lang-zh', currentLanguage === 'zh');
}

// ====================================
// Scroll Effects
// ====================================

function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards for fade-in effects
    const cards = document.querySelectorAll('.about-card, .series-card, .doc-card, .feature-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ====================================
// Smooth Scroll
// ====================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ====================================
// Utility Functions
// ====================================

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ====================================
// Print and Export Functions
// ====================================

function printPage() {
    window.print();
}

function exportHTML() {
    const html = document.documentElement.outerHTML;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dutton-family-tree-' + new Date().toISOString().split('T')[0] + '.html';
    a.click();
    URL.revokeObjectURL(url);
}

// ====================================
// Performance Monitoring (optional)
// ====================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}

console.log('%c🌲 Welcome to Dutton Family Tree', 'color: #d4af37; font-size: 16px; font-weight: bold;');
console.log('%cA comprehensive wiki for the Yellowstone universe', 'color: #a0a0a0; font-size: 12px;');
console.log('%cGitHub: https://github.com/Starmadebydata/dutton-family-tree', 'color: #d4af37;');

// Main JavaScript file for Sparkwise Solutions website

// DOM Elements
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const navLinks = document.querySelectorAll('.nav__link');
const backToTopBtn = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('projectModal');

// Navigation functionality
function initNavigation() {
    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.contains('nav__menu--active');
            navToggle.setAttribute('aria-expanded', !isActive);
            navMenu.classList.toggle('nav__menu--active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('nav__menu--active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('nav__menu--active');
            navToggle.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger animation
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('nav__menu--active');
            navToggle.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger animation
            const spans = navToggle?.querySelectorAll('span') || [];
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });
}

// Back to top functionality
function initBackToTop() {
    if (!backToTopBtn) return;

    // Show/hide back to top button based on scroll position
    function toggleBackToTop() {
        if (window.scrollY > 600) {
            backToTopBtn.style.display = 'block';
            setTimeout(() => {
                backToTopBtn.style.opacity = '1';
            }, 10);
        } else {
            backToTopBtn.style.opacity = '0';
            setTimeout(() => {
                backToTopBtn.style.display = 'none';
            }, 250);
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll(`
        .service-card,
        .value-prop,
        .testimonial,
        .portfolio-card,
        .step,
        .value,
        .info-card,
        .pricing-card
    `);

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Portfolio filtering (for portfolio page)
function initPortfolioFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('filter-btn--active'));
            button.classList.add('filter-btn--active');

            // Filter portfolio items
            portfolioItems.forEach(item => {
                const categories = item.dataset.category.split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

// Portfolio project details modal
function initProjectModal() {
    const projectButtons = document.querySelectorAll('[data-project]');
    const modal = document.getElementById('projectModal');
    const modalClose = modal?.querySelector('.modal__close');
    const projectDetails = modal?.querySelector('.project-details');

    if (!modal) return;

    // Project data
    const projects = {
        manufacturing: {
            title: 'Smart Manufacturing Dashboard',
            description: 'A comprehensive real-time monitoring and AI-powered predictive analytics solution for a leading automotive manufacturer.',
            challenge: 'The client needed real-time visibility into their manufacturing processes and wanted to implement predictive analytics to prevent equipment failures and optimize production.',
            solution: 'We developed a modern web dashboard with real-time data visualization, integrated AI algorithms for predictive maintenance, and mobile companion apps for field technicians.',
            results: [
                { label: 'Efficiency Increase', value: '40%' },
                { label: 'Downtime Reduction', value: '60%' },
                { label: 'Cost Savings', value: '25%' },
                { label: 'ROI Achievement', value: '6 months' }
            ],
            technologies: ['React', 'Node.js', 'Python', 'TensorFlow', 'Azure IoT', 'SignalR']
        },
        hmi: {
            title: 'Industrial HMI System',
            description: 'Custom Human Machine Interface for controlling and monitoring complex industrial processes in a chemical manufacturing facility.',
            challenge: 'Legacy control systems were outdated and difficult to use, leading to operator errors and inefficient process management.',
            solution: 'Developed a modern, intuitive HMI system with touch-friendly interfaces, real-time process visualization, and comprehensive alarm management.',
            results: [
                { label: 'Operator Efficiency', value: '45%' },
                { label: 'Error Reduction', value: '70%' },
                { label: 'Training Time', value: '-50%' },
                { label: 'System Uptime', value: '99.8%' }
            ],
            technologies: ['.NET WPF', 'OPC-UA', 'SQL Server', 'Modbus', 'Custom Graphics']
        },
        inspection: {
            title: 'Field Inspection App',
            description: 'Offline-capable mobile application for equipment inspections and maintenance tracking in remote industrial locations.',
            challenge: 'Field technicians needed a reliable way to conduct inspections and log maintenance activities in areas with poor or no network connectivity.',
            solution: 'Built a robust mobile app with offline-first architecture, automatic synchronization, and comprehensive inspection workflows.',
            results: [
                { label: 'Inspection Speed', value: '+75%' },
                { label: 'Data Accuracy', value: '+90%' },
                { label: 'Paperwork Reduction', value: '100%' },
                { label: 'Compliance Score', value: '98%' }
            ],
            technologies: ['React Native', 'SQLite', 'Azure Mobile Apps', 'Camera APIs', 'GPS Integration']
        },
        quality: {
            title: 'AI Quality Control System',
            description: 'Computer vision system for automated defect detection in high-speed manufacturing lines.',
            challenge: 'Manual quality inspection was becoming a bottleneck in production, with inconsistent results and high labor costs.',
            solution: 'Implemented AI-powered computer vision system with real-time defect detection and automatic sorting capabilities.',
            results: [
                { label: 'Detection Accuracy', value: '99.5%' },
                { label: 'Processing Speed', value: '500 items/min' },
                { label: 'Labor Cost Reduction', value: '60%' },
                { label: 'False Positive Rate', value: '<0.1%' }
            ],
            technologies: ['Python', 'OpenCV', 'TensorFlow', 'CUDA', 'Industrial Cameras', 'PLC Integration']
        },
        energy: {
            title: 'Energy Management Portal',
            description: 'Comprehensive web platform for monitoring and optimizing energy consumption across multiple manufacturing facilities.',
            challenge: 'The client needed centralized visibility into energy usage patterns across multiple facilities to identify optimization opportunities.',
            solution: 'Developed a comprehensive energy management portal with real-time monitoring, analytics, and optimization recommendations.',
            results: [
                { label: 'Energy Savings', value: '22%' },
                { label: 'Cost Reduction', value: '$2M annually' },
                { label: 'Carbon Footprint', value: '-18%' },
                { label: 'Payback Period', value: '14 months' }
            ],
            technologies: ['Angular', 'C# .NET', 'Azure', 'Power BI', 'IoT Sensors', 'Machine Learning']
        },
        predictive: {
            title: 'Predictive Maintenance Suite',
            description: 'Desktop application with machine learning algorithms for equipment failure prediction and maintenance optimization.',
            challenge: 'Unplanned equipment failures were causing significant production losses and maintenance costs were spiraling out of control.',
            solution: 'Created a comprehensive predictive maintenance system using machine learning to predict failures before they occur.',
            results: [
                { label: 'Unplanned Downtime', value: '-65%' },
                { label: 'Maintenance Cost', value: '-35%' },
                { label: 'Equipment Life', value: '+25%' },
                { label: 'Prediction Accuracy', value: '92%' }
            ],
            technologies: ['C# WPF', 'Python', 'Scikit-learn', 'SQL Server', 'REST APIs', 'Real-time Analytics']
        },
        warehouse: {
            title: 'Warehouse Management System',
            description: 'Integrated mobile and web solution for inventory tracking and warehouse operations optimization.',
            challenge: 'Manual inventory management was error-prone and time-consuming, leading to stockouts and overstock situations.',
            solution: 'Built an integrated WMS with mobile apps for warehouse workers and web dashboards for managers.',
            results: [
                { label: 'Inventory Accuracy', value: '99.7%' },
                { label: 'Order Fulfillment', value: '+85%' },
                { label: 'Labor Efficiency', value: '+40%' },
                { label: 'Space Utilization', value: '+30%' }
            ],
            technologies: ['React', 'React Native', 'Node.js', 'MongoDB', 'Barcode Scanning', 'RFID']
        },
        safety: {
            title: 'Safety Compliance Portal',
            description: 'Web-based platform for managing safety protocols, incidents, and compliance reporting across industrial facilities.',
            challenge: 'Managing safety compliance across multiple facilities was complex and time-consuming, with inconsistent reporting.',
            solution: 'Developed a centralized safety management platform with automated compliance tracking and reporting.',
            results: [
                { label: 'Incident Reduction', value: '55%' },
                { label: 'Compliance Score', value: '100%' },
                { label: 'Reporting Time', value: '-80%' },
                { label: 'Audit Preparation', value: '-90%' }
            ],
            technologies: ['Vue.js', 'PHP Laravel', 'MySQL', 'Chart.js', 'Document Management', 'Workflow Engine']
        },
        optimization: {
            title: 'Process Optimization Engine',
            description: 'AI-powered desktop application for optimizing manufacturing processes and resource allocation.',
            challenge: 'Production planning was largely manual and suboptimal, leading to resource waste and missed delivery targets.',
            solution: 'Created an AI-powered optimization engine that automatically optimizes production schedules and resource allocation.',
            results: [
                { label: 'Production Efficiency', value: '+32%' },
                { label: 'Resource Utilization', value: '+28%' },
                { label: 'On-time Delivery', value: '98%' },
                { label: 'Planning Time', value: '-75%' }
            ],
            technologies: ['Python', 'Django', 'PostgreSQL', 'Optimization Libraries', 'Desktop App', 'APIs']
        }
    };

    // Open modal
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectKey = button.dataset.project;
            const project = projects[projectKey];

            if (project) {
                projectDetails.innerHTML = `
                    <h2 class="project-details__title">${project.title}</h2>
                    <p class="project-details__description">${project.description}</p>
                    
                    <div class="project-section">
                        <h3>Challenge</h3>
                        <p>${project.challenge}</p>
                    </div>
                    
                    <div class="project-section">
                        <h3>Solution</h3>
                        <p>${project.solution}</p>
                    </div>
                    
                    <div class="project-section">
                        <h3>Results</h3>
                        <div class="project-results">
                            ${project.results.map(result => `
                                <div class="project-result">
                                    <div class="project-result__value">${result.value}</div>
                                    <div class="project-result__label">${result.label}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="project-section">
                        <h3>Technologies Used</h3>
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span class="badge">${tech}</span>`).join('')}
                        </div>
                    </div>
                `;

                modal.classList.add('modal--active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('modal--active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__overlay')) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('modal--active')) {
            closeModal();
        }
    });
}

// Contact form validation and submission
function initContactForm() {
    if (!contactForm) return;

    const formFields = {
        name: contactForm.querySelector('#name'),
        email: contactForm.querySelector('#email'),
        company: contactForm.querySelector('#company'),
        projectType: contactForm.querySelector('#projectType'),
        budget: contactForm.querySelector('#budget'),
        message: contactForm.querySelector('#message')
    };

    const errorElements = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        projectType: document.getElementById('projectTypeError'),
        message: document.getElementById('messageError')
    };

    // Validation functions
    const validators = {
        name: (value) => {
            if (!value.trim()) return 'Name is required';
            if (value.trim().length < 2) return 'Name must be at least 2 characters';
            return null;
        },
        email: (value) => {
            if (!value.trim()) return 'Email is required';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return 'Please enter a valid email address';
            return null;
        },
        projectType: (value) => {
            if (!value) return 'Please select a project type';
            return null;
        },
        message: (value) => {
            if (!value.trim()) return 'Message is required';
            if (value.trim().length < 10) return 'Message must be at least 10 characters';
            return null;
        }
    };

    // Show error function
    function showError(field, message) {
        const input = formFields[field];
        const errorEl = errorElements[field];
        
        if (input && errorEl) {
            input.classList.add('form__input--error');
            errorEl.textContent = message;
            errorEl.classList.add('form__error--show');
        }
    }

    // Clear error function
    function clearError(field) {
        const input = formFields[field];
        const errorEl = errorElements[field];
        
        if (input && errorEl) {
            input.classList.remove('form__input--error');
            errorEl.classList.remove('form__error--show');
        }
    }

    // Real-time validation
    Object.keys(validators).forEach(field => {
        const input = formFields[field];
        if (input) {
            input.addEventListener('blur', () => {
                const error = validators[field](input.value);
                if (error) {
                    showError(field, error);
                } else {
                    clearError(field);
                }
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('form__input--error')) {
                    const error = validators[field](input.value);
                    if (!error) {
                        clearError(field);
                    }
                }
            });
        }
    });

    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Clear all errors
        Object.keys(errorElements).forEach(field => clearError(field));

        // Validate all fields
        let isValid = true;
        Object.keys(validators).forEach(field => {
            const error = validators[field](formFields[field].value);
            if (error) {
                showError(field, error);
                isValid = false;
            }
        });

        if (!isValid) return;

        // Simulate form submission
        const submitButton = contactForm.querySelector('.form__submit');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Hide form and show success message
            contactForm.style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';
            
            // Scroll to success message
            document.getElementById('formSuccess').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }, 2000);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#top') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header scroll effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollTop = 0;
    const scrollThreshold = 100;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            header.style.background = 'rgba(248, 250, 252, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(248, 250, 252, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', handleScroll);
}

// Add CSS for project details modal
function addProjectDetailsStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .project-details__title {
            margin-bottom: 1rem;
            color: var(--text);
        }
        .project-details__description {
            color: var(--muted);
            margin-bottom: 2rem;
            font-size: 1.125rem;
            line-height: 1.6;
        }
        .project-section {
            margin-bottom: 2rem;
        }
        .project-section h3 {
            color: var(--text);
            margin-bottom: 1rem;
            font-size: 1.25rem;
        }
        .project-section p {
            color: var(--muted);
            line-height: 1.6;
        }
        .project-results {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin: 1rem 0;
        }
        .project-result {
            text-align: center;
            padding: 1rem;
            background: var(--bg);
            border-radius: 8px;
        }
        .project-result__value {
            font-size: 2rem;
            font-weight: 700;
            color: var(--blue-700);
            display: block;
            margin-bottom: 0.5rem;
        }
        .project-result__label {
            color: var(--muted);
            font-size: 0.875rem;
        }
        .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 1rem;
        }
    `;
    document.head.appendChild(style);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initBackToTop();
    initScrollAnimations();
    initPortfolioFiltering();
    initProjectModal();
    initContactForm();
    initSmoothScrolling();
    initHeaderScrollEffect();
    addProjectDetailsStyles();
});

// Handle page visibility change for performance optimization
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations or heavy operations when page is not visible
        console.log('Page is hidden - pausing animations');
    } else {
        // Resume animations when page becomes visible
        console.log('Page is visible - resuming animations');
    }
});

// Handle resize events for responsive behavior
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav__menu');
            const navToggle = document.querySelector('.nav__toggle');
            
            if (navMenu && navToggle) {
                navMenu.classList.remove('nav__menu--active');
                navToggle.setAttribute('aria-expanded', 'false');
                
                // Reset hamburger animation
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        }
    }, 250);
});

// Error handling for any uncaught errors
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send error reports to analytics in production
});

// Performance monitoring (for development)
if (window.performance && window.performance.mark) {
    window.addEventListener('load', () => {
        window.performance.mark('page-load-complete');
        
        // Log loading performance
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            console.log(`Page load time: ${Math.round(navigation.loadEventEnd - navigation.loadEventStart)}ms`);
            console.log(`DOM ready time: ${Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart)}ms`);
        }
    });
}
// Scroll-triggered animations with Intersection Observer

(function() {
    'use strict';
    
    // Animation observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    // Create Intersection Observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Remove observer after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.scroll-zoom-in, .scroll-slide-left, .scroll-slide-right, .animate, .scroll-fade-in, .scroll-rotate-in'
        );
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }
    
    // Re-initialize for dynamically loaded content
    window.addEventListener('load', function() {
        setTimeout(initScrollAnimations, 100);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .project-card, .industry-card');
    cards.forEach(card => {
        card.classList.add('hover-zoom');
    });
    
    // Stagger animations for grid items
    const grids = document.querySelectorAll('.features-grid, .projects-grid, .industries-grid');
    grids.forEach(grid => {
        const items = grid.querySelectorAll('.feature-card, .project-card, .industry-card');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
        });
    });
})();

// Page Transitions - Consistent fade animation for all pages

document.addEventListener('DOMContentLoaded', function() {
    // Use consistent fade animation for all pages
    const enterAnimation = 'page-enter-fade';
    const exitAnimation = 'page-exit-fade';
    
    // Add page enter animation
    document.body.classList.add(enterAnimation);
    
    // Handle link clicks for smooth transitions
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip external links, anchors, and special links
            if (!href || 
                href.startsWith('#') || 
                href.startsWith('http') || 
                href.startsWith('mailto:') || 
                href.startsWith('tel:') ||
                this.hasAttribute('download')) {
                return;
            }
            
            e.preventDefault();

            // Add exit animation
            document.body.classList.add(exitAnimation);

            // Navigate after animation
            const animationDuration = 300;
            setTimeout(() => {
                window.location.href = href;
            }, animationDuration);
        });
    });

    // Make primary CTAs open the contact page with the same exit animation
    const ctaButtons = document.querySelectorAll('.header-cta, .btn-primary, .cta-button');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // If this button is inside a form (submit), let the form handle it
            if (this.closest && this.closest('form')) return;
            e.preventDefault();

            const href = 'contact.html';
            document.body.classList.add(exitAnimation);
            const animationDuration = 300;
            setTimeout(() => { window.location.href = href; }, animationDuration);
        });
    });
    
    // Add transition classes to cards and sections
    const cards = document.querySelectorAll('.feature-card, .project-card, .industry-card');
    cards.forEach((card, index) => {
        card.classList.add('scroll-zoom-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add slide animations to alternating elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index % 2 === 0) {
            section.classList.add('scroll-slide-left');
        } else {
            section.classList.add('scroll-slide-right');
        }
    });
    
    // Add fade-in animation to header and footer
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    if (header) {
        header.style.animation = 'pageFadeIn 0.6s ease-out';
    }
    if (footer) {
        footer.style.animation = 'pageFadeIn 0.6s ease-out 0.2s';
        footer.style.opacity = '0';
        footer.style.animationFillMode = 'forwards';
    }
});

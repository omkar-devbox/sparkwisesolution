// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});



// Infinite Smooth Scrolling Setup with Working Buttons
function setupInfiniteScroll(gridId, prevSelector, nextSelector, cardWidth = 350, gap = 30) {
    const grid = document.getElementById(gridId);
    const prevBtn = document.querySelector(prevSelector);
    const nextBtn = document.querySelector(nextSelector);

    if (!grid) return;

    // Clone all children to create seamless loop
    const children = Array.from(grid.children);
    children.forEach(child => {
        const clone = child.cloneNode(true);
        grid.appendChild(clone);
    });

    let currentPosition = 0;
    let isAutoScrolling = true;
    let autoScrollInterval = null;
    let manualScrollTimeout = null;
    const scrollAmount = cardWidth + gap;
    const totalWidth = grid.scrollWidth / 2; // Half because we duplicated
    const autoScrollSpeed = 1; // pixels per frame

    // Get current transform value from computed style
    const getCurrentTransform = () => {
        const style = window.getComputedStyle(grid);
        const transform = style.transform;
        if (transform === 'none' || !transform) return 0;
        try {
            const matrix = new DOMMatrix(transform);
            return matrix.m41;
        } catch (e) {
            // Fallback for browsers that don't support DOMMatrix
            const match = transform.match(/translateX\(([^)]+)\)/);
            return match ? parseFloat(match[1]) : 0;
        }
    };

    // Set transform position
    const setPosition = (pos) => {
        currentPosition = pos;
        grid.style.transform = `translateX(${pos}px)`;
    };

    // Normalize position for infinite loop
    const normalizePosition = (pos) => {
        while (pos < -totalWidth) {
            pos += totalWidth;
        }
        while (pos > 0) {
            pos -= totalWidth;
        }
        return pos;
    };

    // Auto-scroll function
    const autoScroll = () => {
        if (!isAutoScrolling) return;

        currentPosition = getCurrentTransform();
        currentPosition -= autoScrollSpeed;

        // Normalize when reaching the end
        if (currentPosition <= -totalWidth) {
            currentPosition = normalizePosition(currentPosition);
        }

        setPosition(currentPosition);
    };

    // Start auto-scroll
    const startAutoScroll = () => {
        if (autoScrollInterval) return;
        isAutoScrolling = true;
        autoScrollInterval = setInterval(() => {
            requestAnimationFrame(autoScroll);
        }, 16); // ~60fps
    };

    // Stop auto-scroll
    const stopAutoScroll = () => {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
        isAutoScrolling = false;
    };

    // Smooth manual scroll
    const manualScroll = (direction) => {
        stopAutoScroll();
        clearTimeout(manualScrollTimeout);

        currentPosition = getCurrentTransform();
        const startPos = currentPosition;
        const targetPos = direction === 'next'
            ? currentPosition - scrollAmount
            : currentPosition + scrollAmount;

        const distance = targetPos - startPos;
        const duration = 600; // 600ms
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-in-out)
            const ease = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            const newPos = startPos + (distance * ease);
            let normalizedPos = newPos;

            // Normalize during animation
            if (normalizedPos < -totalWidth) {
                normalizedPos += totalWidth;
            } else if (normalizedPos > 0) {
                normalizedPos -= totalWidth;
            }

            setPosition(normalizedPos);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Resume auto-scroll after manual scroll completes
                manualScrollTimeout = setTimeout(() => {
                    currentPosition = normalizePosition(getCurrentTransform());
                    setPosition(currentPosition);
                    startAutoScroll();
                }, 500);
            }
        };

        requestAnimationFrame(animate);
    };

    // Next button - scroll right (content moves left)
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            manualScroll('next');
        });
        nextBtn.disabled = false;
    }

    // Previous button - scroll left (content moves right)
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            manualScroll('prev');
        });
        prevBtn.disabled = false;
    }

    // Pause on hover
    const wrapper = grid.closest('.stories-wrapper, .industries-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', () => {
            stopAutoScroll();
        });

        wrapper.addEventListener('mouseleave', () => {
            if (!manualScrollTimeout) {
                currentPosition = normalizePosition(getCurrentTransform());
                setPosition(currentPosition);
                startAutoScroll();
            }
        });
    }

    // Initialize position and start auto-scroll
    setPosition(0);

    // Start auto-scroll when element is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    startAutoScroll();
                }, 1000);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(grid);

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoScroll();
        } else {
            if (!manualScrollTimeout) {
                startAutoScroll();
            }
        }
    });
}

// Initialize infinite scroll on page load
document.addEventListener('DOMContentLoaded', () => {
    // Setup infinite scroll for stories with working buttons
    setupInfiniteScroll(
        'storiesGrid',
        '.stories-navigation .prev',
        '.stories-navigation .next',
        350,
        30
    );

    // Setup infinite scroll for industries with working buttons
    setupInfiniteScroll(
        'industriesGrid',
        '.industries-navigation .prev',
        '.industries-navigation .next',
        280,
        30
    );

    // Setup infinite scroll for resources page stories
    // DISABLED as per user request (static grid)
    /* setupInfiniteScroll(
        'resourcesStoriesGrid',
        '#resourcesStoriesPrev',
        '#resourcesStoriesNext',
        350,
        30
    ); */
});

// Touch/swipe support for all carousels
function addSwipeSupport(gridSelector, prevSelector, nextSelector) {
    const grid = document.querySelector(gridSelector);
    const prevBtn = document.querySelector(prevSelector);
    const nextBtn = document.querySelector(nextSelector);

    if (!grid || !prevBtn || !nextBtn) return;

    let touchStartX = 0;
    let touchEndX = 0;

    grid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    grid.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && !nextBtn.disabled) {
                // Swipe left - go next
                nextBtn.click();
            } else if (diff < 0 && !prevBtn.disabled) {
                // Swipe right - go previous
                prevBtn.click();
            }
        }
    }
}

// Add swipe support to all carousels
document.addEventListener('DOMContentLoaded', () => {
    addSwipeSupport('.stories-grid', '.stories-navigation .prev', '.stories-navigation .next');
    addSwipeSupport('.industries-grid', '.industries-navigation .prev', '.industries-navigation .next');
    // addSwipeSupport('#resourcesStoriesGrid', '#resourcesStoriesPrev', '#resourcesStoriesNext');
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            countryCode: document.getElementById('countryCode').value,
            company: document.getElementById('company').value,
            message: document.getElementById('message').value,
            privacy: document.getElementById('privacy').checked
        };

        // Validate form
        if (!formData.privacy) {
            alert('Please agree to the privacy policy to continue.');
            return;
        }

        // Simulate form submission
        console.log('Form submitted:', formData);

        // Show success message
        alert('Thank you for your interest! We will contact you soon.');

        // Reset form
        contactForm.reset();
    });
}


// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }

    navbar.style.transition = 'transform 0.3s ease-in-out';
    lastScroll = currentScroll;
});

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animated');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
            }, index * 100); // Stagger animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Story cards
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });

    // Application cards
    const applicationCards = document.querySelectorAll('.application-card');
    applicationCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });

    // Industry cards
    const industryCards = document.querySelectorAll('.industry-card');
    industryCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'scale(0.9)';
        el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });

    // Feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(el);
    });

    // Other animated elements
    const otherAnimated = document.querySelectorAll('.animate-on-scroll, .value-card, .team-member, .position-card, .benefit-card, .capability-card');
    otherAnimated.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Parallax effect for hero section (subtle effect)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero, .page-hero');
    if (hero && scrolled < hero.offsetHeight) {
        const parallaxSpeed = 0.3;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// Add ripple effect to buttons
document.querySelectorAll('button, .cta-button, .submit-button').forEach(button => {
    button.addEventListener('click', function (e) {
        // Only add ripple if button doesn't have href (is not a link)
        if (this.tagName !== 'A' || !this.hasAttribute('href')) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Add page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Initialize scroll progress on page load
document.addEventListener('DOMContentLoaded', createScrollProgress);

// Product Gallery Modal



// Shared AI Applications data used across pages (Restored with new products)
const aiApplicationsData = [
    {
        id: 'visionInspection',
        title: productData.visionInspection.title,
        description: productData.visionInspection.description,
        features: productData.visionInspection.features,
        image: productData.visionInspection.images[0]
    },
    {
        id: 'threadAssure',
        title: productData.threadAssure.title,
        description: productData.threadAssure.description,
        features: productData.threadAssure.features,
        image: productData.threadAssure.images[0]
    },
    {
        id: 'optiMeasure',
        title: productData.optiMeasure.title,
        description: productData.optiMeasure.description,
        features: productData.optiMeasure.features,
        image: productData.optiMeasure.images[0]
    },
    {
        id: 'codeSure',
        title: productData.codeSure.title,
        description: productData.codeSure.description,
        features: productData.codeSure.features,
        image: productData.codeSure.images[0]
    }
];

// Render AI Applications on the product page (and other pages using this ID)
function renderAiApplications() {
    const grid = document.getElementById('applicationsGrid');
    if (!grid) return;

    grid.innerHTML = aiApplicationsData.map(app => `
        <div class="application-card">
            <div class="application-content">
                <h3>${app.title}</h3>
                <p>${app.description.substring(0, 100) + '...'}</p>
                <ul class="feature-list">
                    ${app.features.slice(0, 3).map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            <div class="application-image" data-product="${app.id}" style="cursor: pointer;">
                <img src="${app.image}" alt="${app.title}" loading="lazy">
                <div class="image-overlay">
                    <span class="view-gallery">View Gallery →</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Product Gallery Dynamically
function renderProductGallery() {
    const grid = document.getElementById('productGalleryGrid');
    if (!grid) return;

    grid.innerHTML = Object.entries(productData).map(([key, product]) => `
        <div class="gallery-item" data-product="${key}">
            <div class="gallery-item-image">
                <div class="product-placeholder">
                   <img src="${product.images[0]}" alt="${product.title}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div class="gallery-overlay">
                    <span class="gallery-badge">View Details</span>
                </div>
            </div>
            <div class="gallery-item-content">
                <h3>${product.title}</h3>
                <p>${product.shortDescription || product.description.substring(0, 80) + '...'}</p>
                <span class="view-product">View Details <span class="arrow-icon">→</span></span>
            </div>
        </div>
    `).join('');

    // Re-attach event listeners
    attachGalleryListeners();
}

function attachGalleryListeners() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const productId = item.getAttribute('data-product');
            openProductModal(productId);
        });
    });
}

// Initialize product gallery
document.addEventListener('DOMContentLoaded', () => {
    // Render AI application cards from shared JSON data
    renderAiApplications();
    renderProductGallery();


    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');
    const mainImage = document.getElementById('mainProductImage');
    const thumbnailGallery = document.getElementById('thumbnailGallery');
    const modalTitle = document.getElementById('modalProductTitle');
    const modalDescription = document.getElementById('modalProductDescription');
    const modalFeatures = document.getElementById('modalProductFeatures');
    const modalSpecs = document.getElementById('modalProductSpecs');
    const prevBtn = document.getElementById('prevImageBtn');
    const nextBtn = document.getElementById('nextImageBtn');
    const imageCounter = document.getElementById('imageCounter');
    const currentImageIndex = document.getElementById('currentImageIndex');
    const totalImages = document.getElementById('totalImages');
    const imageLoader = document.getElementById('imageLoader');

    let currentProduct = null;
    let currentImageIdx = 0;
    let productImages = [];

    // Open modal when gallery item is clicked
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const productId = item.getAttribute('data-product');
            openProductModal(productId);
        });
    });

    // Open modal when application image is clicked
    const applicationImages = document.querySelectorAll('.application-image[data-product]');
    applicationImages.forEach(img => {
        img.addEventListener('click', () => {
            const productId = img.getAttribute('data-product');
            openProductModal(productId);
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        currentProduct = null;
        currentImageIdx = 0;
        productImages = [];
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Image navigation functions with smooth transitions
    function showImage(index, direction = 'next') {
        if (!productImages || productImages.length === 0) return;

        const newIndex = index;
        let finalIndex = newIndex;

        // Handle wrap-around
        if (finalIndex < 0) finalIndex = productImages.length - 1;
        if (finalIndex >= productImages.length) finalIndex = 0;

        // Don't do anything if same image
        if (finalIndex === currentImageIdx) return;

        currentImageIdx = finalIndex;

        // Add fade transition
        mainImage.style.opacity = '0';
        mainImage.style.transition = 'opacity 0.3s ease';

        // Show loader
        if (imageLoader) imageLoader.style.display = 'flex';
        mainImage.classList.add('loading');

        // Load new image
        const img = new Image();
        img.onload = () => {
            mainImage.src = productImages[currentImageIdx];
            mainImage.alt = `${currentProduct.title} ${currentImageIdx + 1}`;
            mainImage.classList.remove('loading');
            if (imageLoader) imageLoader.style.display = 'none';

            // Fade in new image
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 50);

            updateThumbnails();
            updateCounter();
            updateNavButtons();

            // Auto-scroll thumbnail into view with a small delay to ensure DOM is updated
            setTimeout(() => {
                scrollThumbnailIntoView();
            }, 100);
        };
        img.onerror = () => {
            mainImage.classList.remove('loading');
            if (imageLoader) imageLoader.style.display = 'none';
            mainImage.style.opacity = '1';
        };
        img.src = productImages[currentImageIdx];
    }

    function scrollThumbnailIntoView() {
        const activeThumbnail = document.querySelector('.thumbnail-item.active');
        if (activeThumbnail && thumbnailGallery) {
            // Prevent any scroll on modal body during thumbnail scroll
            const modalBody = document.querySelector('.modal-body');
            const bodyScrollTop = modalBody ? modalBody.scrollTop : 0;

            // Calculate scroll position to center the active thumbnail
            const thumbnailOffset = activeThumbnail.offsetLeft;
            const thumbnailWidth = activeThumbnail.offsetWidth;
            const galleryWidth = thumbnailGallery.offsetWidth;
            const galleryScrollLeft = thumbnailGallery.scrollLeft;

            // Calculate the position to center the thumbnail
            const targetScroll = thumbnailOffset - (galleryWidth / 2) + (thumbnailWidth / 2);

            // Only scroll if thumbnail is not already in view
            const thumbnailLeft = thumbnailOffset - galleryScrollLeft;
            const thumbnailRight = thumbnailLeft + thumbnailWidth;
            const needsScroll = thumbnailLeft < 20 || thumbnailRight > galleryWidth - 20;

            if (needsScroll) {
                // Smooth scroll only within the thumbnail gallery
                thumbnailGallery.scrollTo({
                    left: Math.max(0, targetScroll),
                    behavior: 'smooth'
                });
            }

            // Restore modal body scroll position if it was changed
            if (modalBody && modalBody.scrollTop !== bodyScrollTop) {
                modalBody.scrollTop = bodyScrollTop;
            }
        }
    }

    function nextImage() {
        showImage(currentImageIdx + 1, 'next');
    }

    function prevImage() {
        showImage(currentImageIdx - 1, 'prev');
    }

    function updateThumbnails() {
        document.querySelectorAll('.thumbnail-item').forEach((thumb, index) => {
            if (index === currentImageIdx) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    function updateCounter() {
        if (currentImageIndex) currentImageIndex.textContent = currentImageIdx + 1;
        if (totalImages) totalImages.textContent = productImages.length;
    }

    function updateNavButtons() {
        if (prevBtn) prevBtn.disabled = productImages.length <= 1;
        if (nextBtn) nextBtn.disabled = productImages.length <= 1;
    }

    // Navigation button handlers with proper event handling
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!nextBtn.disabled) {
                nextImage();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!prevBtn.disabled) {
                prevImage();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevImage();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextImage();
        }
    });

    // Swipe support for touch devices
    let touchStartX = 0;
    let touchEndX = 0;
    const mainImageContainer = document.querySelector('.main-image-container');

    if (mainImageContainer) {
        mainImageContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        mainImageContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next image
                    nextImage();
                } else {
                    // Swipe right - previous image
                    prevImage();
                }
            }
        }
    }

    // Open product modal
    function openProductModal(productId) {
        const product = productData[productId];
        if (!product) return;

        currentProduct = product;
        productImages = product.images;
        currentImageIdx = 0;

        // Set product information
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;

        // Set main image with initial state
        mainImage.style.opacity = '1';
        mainImage.style.transition = 'opacity 0.3s ease';

        if (imageLoader) imageLoader.style.display = 'flex';
        mainImage.classList.add('loading');

        const img = new Image();
        img.onload = () => {
            mainImage.src = productImages[0];
            mainImage.alt = product.title;
            mainImage.classList.remove('loading');
            if (imageLoader) imageLoader.style.display = 'none';
        };
        img.onerror = () => {
            mainImage.classList.remove('loading');
            if (imageLoader) imageLoader.style.display = 'none';
        };
        img.src = productImages[0];

        // Create thumbnails
        thumbnailGallery.innerHTML = '';
        product.images.forEach((imageUrl, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail-item';
            if (index === 0) thumbnail.classList.add('active');

            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `${product.title} ${index + 1}`;
            img.loading = 'lazy';

            // Ensure image becomes visible when loaded
            img.onload = function () {
                this.classList.add('loaded');
                this.style.opacity = '1';
            };
            img.onerror = function () {
                this.style.opacity = '1';
                this.style.background = 'rgba(255, 102, 0, 0.1)';
            };

            thumbnail.appendChild(img);
            thumbnail.addEventListener('click', () => {
                showImage(index);
            });
            thumbnailGallery.appendChild(thumbnail);
        });

        // Set features
        modalFeatures.innerHTML = '';
        if (product.features && product.features.length > 0) {
            product.features.forEach(feature => {
                const featureItem = document.createElement('div');
                featureItem.className = 'feature-item-list';
                featureItem.innerHTML = `<span class="feature-check">✓</span> ${feature}`;
                modalFeatures.appendChild(featureItem);
            });
        }

        // Set Working Section
        const workingList = document.getElementById('modalProductWorking');
        const workingSection = document.getElementById('workingSection');
        if (workingList && workingSection) {
            workingList.innerHTML = '';
            if (product.working && product.working.length > 0) {
                workingSection.style.display = 'block';
                product.working.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    workingList.appendChild(li);
                });
            } else {
                workingSection.style.display = 'none';
            }
        }

        // Set Uses Section
        const usesList = document.getElementById('modalProductUses');
        const usesSection = document.getElementById('usesSection');
        if (usesList && usesSection) {
            usesList.innerHTML = '';
            if (product.uses && product.uses.length > 0) {
                usesSection.style.display = 'block';
                product.uses.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    usesList.appendChild(li);
                });
            } else {
                usesSection.style.display = 'none';
            }
        }

        // Set Integrations Section
        const integrationsList = document.getElementById('modalProductIntegrations');
        const integrationsSection = document.getElementById('integrationsSection');
        if (integrationsList && integrationsSection) {
            integrationsList.innerHTML = '';
            if (product.integrations && product.integrations.length > 0) {
                integrationsSection.style.display = 'block';
                product.integrations.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    integrationsList.appendChild(li);
                });
            } else {
                integrationsSection.style.display = 'none';
            }
        }

        // Set specifications (optional now)
        modalSpecs.innerHTML = '';
        if (product.specs) {
            Object.entries(product.specs).forEach(([key, value]) => {
                const specItem = document.createElement('div');
                specItem.className = 'spec-item';
                specItem.innerHTML = `
                    <span class="spec-label">${key}:</span>
                    <span class="spec-value">${value}</span>
                `;
                modalSpecs.appendChild(specItem);
            });
        }

        // Update counter and navigation
        updateCounter();
        updateNavButtons();

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
});

// CTA Button click handler (for buttons that should scroll to contact)
const ctaButtons = document.querySelectorAll('.cta-button:not([href])');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Only prevent default if it's not a link
        if (button.tagName === 'BUTTON') {
            e.preventDefault();
            const contactSection = document.querySelector('.contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add loading animation for images (if you add images later)
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('load', function () {
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s';
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target % 1 === 0 ? Math.floor(target) : target.toFixed(1);
            clearInterval(timer);
        } else {
            element.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
        }
    }, 16);
}

// Initialize stats counter when in view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseFloat(stat.getAttribute('data-target'));
                if (target && stat.textContent === '0') {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.company-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Enhanced Milestone Animation with Scroll-Synced Effects
function initJourneyScrollEffects() {
    const milestonesSection = document.querySelector('.milestones');
    if (!milestonesSection) return;

    const milestones = milestonesSection.querySelectorAll('.milestone-item');
    const timeline = milestonesSection.querySelector('.milestones-timeline');
    const sectionHeader = milestonesSection.querySelector('.section-header');

    // Initialize milestone states
    milestones.forEach((milestone, index) => {
        milestone.style.opacity = '0';
        milestone.style.transform = 'translateY(50px) scale(0.95)';
        milestone.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        milestone.dataset.index = index;
    });

    // Initialize header
    if (sectionHeader) {
        sectionHeader.style.opacity = '0';
        sectionHeader.style.transform = 'translateY(-30px)';
        sectionHeader.style.transition = 'all 0.8s ease-out';
    }

    // Initialize timeline
    if (timeline) {
        timeline.style.opacity = '0';
        timeline.style.transform = 'scaleY(0)';
        timeline.style.transformOrigin = 'top';
        timeline.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    // Scroll handler for progressive reveal
    let ticking = false;

    function updateMilestonesOnScroll() {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            const sectionRect = milestonesSection.getBoundingClientRect();
            const sectionTop = sectionRect.top;
            const sectionHeight = sectionRect.height;
            const windowHeight = window.innerHeight;
            const scrollProgress = Math.max(0, Math.min(1,
                (windowHeight - sectionTop) / (windowHeight + sectionHeight)
            ));

            // Animate header when section enters view
            if (sectionHeader && sectionTop < windowHeight * 0.8) {
                const headerProgress = Math.max(0, Math.min(1,
                    (windowHeight * 0.8 - sectionTop) / (windowHeight * 0.3)
                ));
                sectionHeader.style.opacity = headerProgress;
                sectionHeader.style.transform = `translateY(${-30 * (1 - headerProgress)}px)`;
            }

            // Animate timeline with scroll progress
            if (timeline && sectionTop < windowHeight) {
                const timelineProgress = Math.max(0, Math.min(1,
                    (windowHeight - sectionTop) / (windowHeight * 0.5)
                ));
                timeline.style.opacity = timelineProgress;
                timeline.style.transform = `scaleY(${timelineProgress})`;

                // Update timeline line progress based on milestones
                const totalMilestones = milestones.length;
                let activeMilestones = 0;

                milestones.forEach((milestone) => {
                    const milestoneRect = milestone.getBoundingClientRect();
                    const milestoneTop = milestoneRect.top;
                    const viewportMiddle = windowHeight * 0.6;

                    if (milestoneTop < viewportMiddle) {
                        activeMilestones++;
                    }
                });

                // Calculate timeline fill progress
                const timelineFillProgress = Math.min(1, activeMilestones / totalMilestones);
                timeline.style.setProperty('--timeline-progress', timelineFillProgress);
            }

            // Animate each milestone based on scroll position
            milestones.forEach((milestone, index) => {
                const milestoneRect = milestone.getBoundingClientRect();
                const milestoneTop = milestoneRect.top;
                const milestoneHeight = milestoneRect.height;

                // Calculate progress for this specific milestone
                const viewportMiddle = windowHeight * 0.6;
                const distanceFromViewport = milestoneTop - viewportMiddle;
                const milestoneProgress = Math.max(0, Math.min(1,
                    1 - (distanceFromViewport / (windowHeight * 0.5))
                ));

                // Apply animation based on progress
                if (milestoneProgress > 0.1) {
                    const easedProgress = easeOutCubic(milestoneProgress);
                    const translateY = 50 * (1 - easedProgress);
                    const scale = 0.95 + (0.05 * easedProgress);
                    const opacity = easedProgress;

                    milestone.style.opacity = opacity;
                    milestone.style.transform = `translateY(${translateY}px) scale(${scale})`;

                    // Add animated class for CSS transitions
                    if (milestoneProgress > 0.5) {
                        milestone.classList.add('animated');
                    }
                } else {
                    milestone.style.opacity = '0';
                    milestone.style.transform = 'translateY(50px) scale(0.95)';
                    milestone.classList.remove('animated');
                }

                // Add parallax effect to milestone year
                const yearElement = milestone.querySelector('.milestone-year');
                if (yearElement && milestoneProgress > 0.3) {
                    const parallaxOffset = (milestoneProgress - 0.3) * 20;
                    yearElement.style.transform = `translateY(${-parallaxOffset}px) scale(${1 + milestoneProgress * 0.1})`;
                    yearElement.style.transition = 'transform 0.3s ease-out';
                }

                // Add slide-in effect for content
                const contentElement = milestone.querySelector('.milestone-content');
                if (contentElement && milestoneProgress > 0.2) {
                    const isEven = index % 2 === 1;
                    const slideOffset = isEven ? -30 * (1 - milestoneProgress) : 30 * (1 - milestoneProgress);
                    contentElement.style.transform = `translateX(${slideOffset}px)`;
                    contentElement.style.opacity = Math.max(0, (milestoneProgress - 0.2) / 0.8);
                    contentElement.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }
            });

            ticking = false;
        });
    }

    // Easing function for smooth animations
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    // Use Intersection Observer for performance
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                window.addEventListener('scroll', updateMilestonesOnScroll, { passive: true });
                updateMilestonesOnScroll(); // Initial call
            } else {
                // Optional: remove listener when section is far from view for performance
                // window.removeEventListener('scroll', updateMilestonesOnScroll);
            }
        });
    }, {
        root: null,
        rootMargin: '200px 0px',
        threshold: 0
    });

    scrollObserver.observe(milestonesSection);

    // Initial call
    updateMilestonesOnScroll();
}

// Initialize journey scroll effects
document.addEventListener('DOMContentLoaded', () => {
    initJourneyScrollEffects();
});

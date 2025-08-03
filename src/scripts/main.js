// DOM Elements
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const contactForm = document.getElementById("contact-form");
const portfolioModal = document.getElementById("portfolio-modal");
const modalClose = document.getElementById("modal-close");
const modalBody = document.getElementById("modal-body");
const successMessage = document.getElementById("success-message");

// Portfolio project data (unchanged)
const portfolioData = {
  "ecommerce-app": {
    title: "E-commerce Mobile App",
    category: "Android Development",
    description: "A comprehensive e-commerce mobile application built with Kotlin, featuring user authentication, product catalog, shopping cart, payment integration, and order tracking.",
    technologies: ["Kotlin", "Android SDK", "Firebase", "Stripe API", "Material Design"],
    features: ["User registration and authentication", "Product browsing and search", "Shopping cart and wishlist", "Secure payment processing", "Order tracking and history", "Push notifications", "Offline mode support"],
    images: ["https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"],
  },
  "corporate-website": {
    title: "Corporate Website",
    category: "Web Development",
    description: "A modern, responsive corporate website built with React and optimized for performance and SEO. Features include dynamic content management, contact forms, and analytics integration.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
    features: ["Responsive design across all devices", "SEO optimization", "Content management system", "Contact form with validation", "Analytics integration", "Fast loading performance", "Accessibility compliance"],
    images: ["https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"],
  },
  "project-management": {
    title: "Project Management Tool",
    category: "Desktop Application",
    description: "A comprehensive project management desktop application built with Electron, featuring task management, team collaboration, time tracking, and reporting capabilities.",
    technologies: ["Electron", "React", "Node.js", "SQLite", "Chart.js"],
    features: ["Task and project management", "Team collaboration tools", "Time tracking and reporting", "File sharing and storage", "Calendar integration", "Offline functionality", "Cross-platform compatibility"],
    images: ["https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"],
  },
  "fitness-app": {
    title: "Fitness Tracking App",
    category: "Android Development",
    description: "A comprehensive fitness tracking application built with Flutter, featuring workout planning, progress tracking, nutrition logging, and social features.",
    technologies: ["Flutter", "Dart", "Firebase", "Google Fit API", "Material Design"],
    features: ["Workout planning and tracking", "Nutrition and calorie logging", "Progress visualization", "Social features and challenges", "Wearable device integration", "Offline workout support", "Personalized recommendations"],
    images: ["https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"],
  },
  "analytics-dashboard": {
    title: "Analytics Dashboard",
    category: "Web Development",
    description: "A powerful analytics dashboard built with Vue.js, providing real-time data visualization, custom reports, and business intelligence insights.",
    technologies: ["Vue.js", "D3.js", "Express.js", "PostgreSQL", "Redis"],
    features: ["Real-time data visualization", "Custom report generation", "Interactive charts and graphs", "Data filtering and segmentation", "Export functionality", "User role management", "API integration"],
    images: ["https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"],
  },
  "inventory-system": {
    title: "Inventory Management System",
    category: "Desktop Application",
    description: "A robust inventory management system built with .NET, featuring stock tracking, supplier management, automated reordering, and comprehensive reporting.",
    technologies: [".NET Core", "WPF", "SQL Server", "Entity Framework", "Crystal Reports"],
    features: ["Stock level monitoring", "Supplier and vendor management", "Automated reorder alerts", "Barcode scanning support", "Comprehensive reporting", "Multi-location support", "Data backup and recovery"],
    images: ["https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800", "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"],
  },
};


// Initialize the application when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeScrollEffects();
  initializeScrollAnimations();
  initializePortfolio();
  initializeContactForm();
  initializeAccessibility();
  initializeLazyLoading();
});

/**
 * Sets up navigation, including mobile menu toggle and smooth scrolling.
 */
function initializeNavigation() {
  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when a navigation link is clicked
  navMenu.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  // Smooth scroll for all anchor links pointing to an ID
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Offset for the fixed navbar height
        const offsetTop = targetElement.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    });
  });
}

/**
 * Adds visual effects on scroll, like changing the navbar background.
 */
function initializeScrollEffects() {
  window.addEventListener("scroll", () => {
    // Add a 'scrolled' class to the navbar when the user scrolls down
    if (window.pageYOffset > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/**
 * Animates elements into view as the user scrolls down using IntersectionObserver.
 */
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing once it's visible
      }
    });
  }, observerOptions);

  // Observe all elements that should fade in
  const elementsToAnimate = document.querySelectorAll(".fade-in");
  elementsToAnimate.forEach(el => observer.observe(el));
}


/**
 * Manages the portfolio modal functionality.
 */
function initializePortfolio() {
  // Open modal when a portfolio button is clicked
  document.querySelectorAll(".portfolio-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevents clicks from bubbling up
      const projectId = btn.dataset.project;
      if (projectId) {
        openPortfolioModal(projectId);
      }
    });
  });

  // Close modal functionality
  modalClose.addEventListener("click", closePortfolioModal);
  portfolioModal.addEventListener("click", (e) => {
    // Close if the click is on the modal background itself
    if (e.target === portfolioModal) {
      closePortfolioModal();
    }
  });

  // Close modal with the Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && portfolioModal.classList.contains("show")) {
      closePortfolioModal();
    }
  });
}

/**
 * Populates the modal with project data and displays it.
 * @param {string} projectId - The ID of the project to display.
 */
function openPortfolioModal(projectId) {
  const project = portfolioData[projectId];
  if (!project) return;

  const modalContent = `
        <div class="project-details">
            <div class="media-scroller">
                ${project.images.map(img => `<img src="${img}" class="media-image" loading="lazy" alt="${project.title} screenshot">`).join("")}
            </div>
            <div class="project-info">
                <span class="project-category">${project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-technologies">
                    <h4>Technologies Used:</h4>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join("")}
                    </div>
                </div>
                <div class="project-features">
                    <h4>Key Features:</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join("")}
                    </ul>
                </div>
            </div>
        </div>
    `;

  modalBody.innerHTML = modalContent;
  portfolioModal.classList.add("show");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}


/**
 * Hides the portfolio modal.
 */
function closePortfolioModal() {
  portfolioModal.classList.remove("show");
  document.body.style.overflow = "auto"; // Restore background scrolling
}

/**
 * Sets up contact form validation and submission.
 */
function initializeContactForm() {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateForm()) {
      submitForm();
    }
  });

  // Add real-time validation feedback as the user types or moves away from a field
  contactForm.querySelectorAll("input, select, textarea").forEach(input => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => clearError(input));
  });
}

/**
 * Validates all fields in the contact form.
 * @returns {boolean} - True if the form is valid, false otherwise.
 */
function validateForm() {
  let isValid = true;
  const fields = contactForm.querySelectorAll("input, select, textarea");
  fields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  return isValid;
}

/**
 * Validates a single form field and displays an error if necessary.
 * @param {HTMLElement} field - The input, select, or textarea element to validate.
 * @returns {boolean} - True if the field is valid, false otherwise.
 */
function validateField(field) {
  const value = field.value.trim();
  let errorMessage = "";

  if (field.required && !value) {
    errorMessage = `${field.name} is required.`;
  } else if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    errorMessage = "Please enter a valid email address.";
  } else if (field.minLength > 0 && value.length < field.minLength) {
    errorMessage = `${field.name} must be at least ${field.minLength} characters.`;
  }

  showError(field, errorMessage);
  return !errorMessage;
}

/**
 * Displays an error message for a form field.
 * @param {HTMLElement} field - The field with the error.
 * @param {string} message - The error message to display.
 */
function showError(field, message) {
  const errorElement = document.getElementById(`${field.id}-error`);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = message ? "block" : "none";
    field.classList.toggle("is-invalid", !!message);
  }
}

/**
 * Clears the error message for a form field.
 * @param {HTMLElement} field - The field to clear the error from.
 */
function clearError(field) {
  showError(field, "");
}

/**
 * Handles the form submission process.
 */
function submitForm() {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);

  submitBtn.classList.add("loading");
  submitBtn.disabled = true;

  // NOTE: This uses a 'mailto:' link. This is simple but requires the user to have a
  // configured email client. For a more robust solution, consider a backend service
  // or a third-party form handler like Formspree or Netlify Forms.
  setTimeout(() => {
    const subject = encodeURIComponent(`New inquiry from ${formData.get("name")} - ${formData.get("service")}`);
    const body = encodeURIComponent(`Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\nService: ${formData.get("service")}\n\nMessage:\n${formData.get("message")}`);
    window.location.href = `mailto:hello@sparkwse.com?subject=${subject}&body=${body}`;

    showSuccessMessage();
    contactForm.reset();
    contactForm.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
    submitBtn.classList.remove("loading");
    submitBtn.disabled = false;
  }, 1500); // Simulate network delay
}

/**
 * Shows a temporary success message after form submission.
 */
function showSuccessMessage() {
  successMessage.classList.add("show");
  setTimeout(() => {
    successMessage.classList.remove("show");
  }, 4000);
}

/**
 * Improves accessibility by managing focus states for keyboard vs. mouse users.
 */
function initializeAccessibility() {
  // Show focus outlines only when tabbing (keyboard navigation)
  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });
  // Hide focus outlines when using the mouse
  document.body.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation");
  });
}

/**
 * Implements lazy loading for images for better performance.
 */
function initializeLazyLoading() {
  // Use IntersectionObserver to lazy-load images for performance.
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          // The actual image source is in 'data-src'. If not, it uses 'src'.
          const src = img.dataset.src || img.src;
          if (src) {
              img.src = src;
              img.classList.remove("lazy");
          }
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}
// Add CSS for modal project details
const modalStyles = `
<style>

/* Animations */
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Service Card Hover Effect */
.service-card {
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.service-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Portfolio Item Hover Effect */
.portfolio-item .portfolio-image-wrapper {
    overflow: hidden; /* Important for containing the scaled image */
    border-radius: 8px;
}

.portfolio-item img {
    transition: transform 0.4s ease;
}

.portfolio-item:hover img {
    transform: scale(1.1);
}


/* --- Portfolio Modal Styles --- */

.portfolio-modal {
    /* ... your existing modal styles ... */
    /* ensure it's positioned, hidden by default, etc. */
}

.project-details {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.project-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.project-category {
    color: #667eea;
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.project-title {
    font-size: 1.75rem;
    color: #2d3748;
    margin: 0;
}

.project-description {
    color: #4a5568;
    line-height: 1.7;
}

.project-technologies h4,
.project-features h4 {
    color: #2d3748;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
    border-bottom: 2px solid #edf2f7;
    padding-bottom: 0.5rem;
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.tech-tag {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.35rem 0.85rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
}

.project-features ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.project-features li {
    color: #4a5568;
    position: relative;
    padding: 0.5rem 0 0.5rem 1.75rem;
}

.project-features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #667eea;
    font-weight: bold;
    font-size: 1.1rem;
}

/* Media Scroller for Project Images (Mobile Friendly) */
.media-scroller {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 1rem;
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
}

/* Custom scrollbar for better aesthetics */
.media-scroller::-webkit-scrollbar {
    height: 8px;
}

.media-scroller::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

.media-scroller::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
}

.media-scroller::-webkit-scrollbar-thumb:hover {
    background: #aaa;
}

.media-image {
    width: 90%;
    max-width: 500px; /* Max width for larger screens */
    height: 350px;
    border-radius: 10px;
    object-fit: cover;
    flex-shrink: 0;
    scroll-snap-align: center; /* Center the snapped image */
}

/* Responsive adjustments for modal on smaller screens */
@media (max-width: 768px) {
    .modal-content {
        padding: 1.5rem;
        margin: 1rem;
        max-height: 90vh; /* Ensure modal fits on screen */
    }
    .project-title {
        font-size: 1.5rem;
    }
    .media-image {
        height: 250px;
    }
}
</style>
`;

// Inject modal styles
document.head.insertAdjacentHTML("beforeend", modalStyles);
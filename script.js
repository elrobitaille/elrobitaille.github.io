// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Navbar show/hide on scroll direction
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Hide navbar when scrolling down, show when scrolling up
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });
}

// Expandable Project Cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const header = card.querySelector('.project-header');
    const expandBtn = card.querySelector('.project-expand');

    if (header && expandBtn) {
        // Make entire header clickable
        header.addEventListener('click', (e) => {
            // Toggle expanded state
            card.classList.toggle('expanded');
        });

        // Prevent double-toggle when clicking the button specifically
        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.toggle('expanded');
        });
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
    observer.observe(element);
});

// Observe page titles for underline animation
const pageTitles = document.querySelectorAll('.page-title');
pageTitles.forEach(title => {
    observer.observe(title);
});

// Add current year to footer
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Carousel Functionality
function initCarousel(container) {
    const items = container.querySelectorAll('.carousel-item');
    const dotsContainer = container.querySelector('.carousel-dots');
    const prevBtn = container.querySelector('.carousel-btn.prev');
    const nextBtn = container.querySelector('.carousel-btn.next');

    if (items.length === 0) return;

    let currentIndex = 0;
    let autoRotateInterval;

    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function goToSlide(index) {
        // Remove active and prev classes
        items[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');

        // Add prev class for animation
        if (index > currentIndex) {
            items[currentIndex].classList.add('prev');
        }

        currentIndex = index;

        // Add active class to new slide
        items[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');

        // Remove prev class after animation
        setTimeout(() => {
            items.forEach(item => item.classList.remove('prev'));
        }, 600);

        // Reset auto-rotate
        resetAutoRotate();
    }

    function nextSlide() {
        const nextIndex = (currentIndex + 1) % items.length;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        goToSlide(prevIndex);
    }

    function startAutoRotate() {
        autoRotateInterval = setInterval(nextSlide, 5000); // Rotate every 5 seconds
    }

    function stopAutoRotate() {
        clearInterval(autoRotateInterval);
    }

    function resetAutoRotate() {
        stopAutoRotate();
        startAutoRotate();
    }

    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Pause auto-rotate on hover
    container.addEventListener('mouseenter', stopAutoRotate);
    container.addEventListener('mouseleave', startAutoRotate);

    // Start auto-rotate
    startAutoRotate();
}

// Initialize all carousels on the page
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(carousel => initCarousel(carousel));
});

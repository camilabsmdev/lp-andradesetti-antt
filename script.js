document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. Scroll Reveal Animation using Intersection Observer
       ========================================================================== */
    const revealElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once animated, we don't need to observe it anymore
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for browsers that do not support IntersectionObserver
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }

    /* ==========================================================================
       2. Lawyer Carousel Slider
       ========================================================================== */
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.carousel-indicators .dot');
    const container = document.querySelector('.carousel-container');
    
    let currentSlide = 0;
    let autoPlayTimer = null;
    const autoPlayInterval = 5000; // 5 seconds
    
    function showSlide(index) {
        // Handle out-of-bounds indices
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        // Update active class on slides
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update active class on dots/indicators
        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Auto-play functions
    function startAutoPlay() {
        if (!autoPlayTimer) {
            autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
        }
    }
    
    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }
    
    // Event listeners for controls
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay(); // Restart timer
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay(); // Restart timer
        });
    }
    
    // Event listeners for dot indicators
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            stopAutoPlay();
            startAutoPlay(); // Restart timer
        });
    });
    
    // Pause auto-play when hovering over container
    if (container) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Initialize Carousel
    if (slides.length > 0) {
        showSlide(0);
        startAutoPlay();
    }

    /* ==========================================================================
       3. FAQ Accordion
       ========================================================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = this.nextElementSibling;
            const isOpen = item.classList.contains('active');
            
            // Close all other items (accordion behavior)
            const activeItems = document.querySelectorAll('.accordion-item.active');
            activeItems.forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    const activeContent = activeItem.querySelector('.accordion-content');
                    activeContent.style.maxHeight = null;
                    activeItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle current item
            if (isOpen) {
                item.classList.remove('active');
                content.style.maxHeight = null;
                this.setAttribute('aria-expanded', 'false');
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
    
    // Handle dynamic window resizing (recalculating scrollHeight for expanded accordions)
    window.addEventListener('resize', () => {
        const openContent = document.querySelector('.accordion-item.active .accordion-content');
        if (openContent) {
            openContent.style.maxHeight = openContent.scrollHeight + 'px';
        }
    });

});

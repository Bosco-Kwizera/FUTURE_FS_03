// ===== COMPLETE JAVASCRIPT FOR THE DAILY GRIND WEBSITE =====
// Includes: Mobile Menu, Carousel Slider, Contact Form, Active Navigation, and more

document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // 1. MOBILE MENU TOGGLE FUNCTIONALITY
    // =============================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('show');
            
            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                navLinks.classList.remove('show');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // =============================================
    // 2. CAROUSEL SLIDER FUNCTIONALITY (Home Page)
    // =============================================
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    // Only run carousel if elements exist (Home page)
    if (slides.length > 0 && prevBtn && nextBtn) {
        
        // Function to show specific slide
        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remove active class from all indicators
            indicators.forEach(indicator => {
                indicator.classList.remove('active');
            });
            
            // Show current slide
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            currentSlide = index;
        }

        // Next slide function
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Previous slide function
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        // Auto advance slides every 5 seconds
        function startAutoSlide() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        // Stop auto slide on hover
        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        // Add event listeners for buttons
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart timer
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart timer
        });

        // Pause auto-slide on hover
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }

        // Add click events to indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                stopAutoSlide();
                startAutoSlide(); // Restart timer
            });
        });

        // Start auto slide
        startAutoSlide();
    }

    // =============================================
    // 3. TODAY'S SPECIALS GRID (Alternative/Backup)
    // =============================================
    const specialsGrid = document.getElementById('specialsGrid');
    if (specialsGrid) {
        // Only run if not using carousel (backup or alternative)
        const specials = [
            { 
                name: 'Hazelnut Latte', 
                desc: 'Espresso with hazelnut and steamed milk', 
                price: '$4.50', 
                img: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=300' 
            },
            { 
                name: 'Butter Croissant', 
                desc: 'Flaky, golden, baked fresh', 
                price: '$3.25', 
                img: 'https://images.pexels.com/photos/461064/pexels-photo-461064.jpeg?auto=compress&cs=tinysrgb&w=300' 
            },
            { 
                name: 'Avocado Toast', 
                desc: 'Sourdough, avocado, chili flakes', 
                price: '$7.95', 
                img: 'https://images.pexels.com/photos/983497/pexels-photo-983497.jpeg?auto=compress&cs=tinysrgb&w=300' 
            }
        ];

        specialsGrid.innerHTML = specials.map(special => `
            <div class="special-card">
                <div class="special-image">
                    <img src="${special.img}" alt="${special.name}">
                </div>
                <div class="special-content">
                    <h3>${special.name}</h3>
                    <p>${special.desc}</p>
                    <span class="price">${special.price}</span>
                    <a href="menu.html" class="btn-small">View</a>
                </div>
            </div>
        `).join('');
    }

    // =============================================
    // 4. CONTACT FORM HANDLING
    // =============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            // Simple validation
            let isValid = true;
            
            // Validate name
            if (!nameInput.value.trim()) {
                isValid = false;
                nameInput.style.borderColor = 'red';
                nameInput.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            } else {
                nameInput.style.borderColor = '#ddd';
                nameInput.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            }
            
            // Validate email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = 'red';
                emailInput.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            } else {
                emailInput.style.borderColor = '#ddd';
                emailInput.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                isValid = false;
                messageInput.style.borderColor = 'red';
                messageInput.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
            } else {
                messageInput.style.borderColor = '#ddd';
                messageInput.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            }

            if (isValid) {
                // Show success message
                alert('Thank you for your message! We\'ll get back to you soon.');
                
                // Reset form
                this.reset();
                
                // Optional: You could send the form data to a server here
                // fetch('/send-message', { method: 'POST', body: formData })
            } else {
                alert('Please fill in all fields correctly.');
            }
        });
        
        // Remove red border when user starts typing
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#ddd';
                this.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            });
        });
    }

    // =============================================
    // 5. ACTIVE NAVIGATION HIGHLIGHT
    // =============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks2 = document.querySelectorAll('.nav-links a');
    
    navLinks2.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // =============================================
    // 6. SMOOTH SCROLL FOR ANCHOR LINKS
    // =============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =============================================
    // 7. IMAGE LAZY LOADING & ERROR HANDLING
    // =============================================
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add lazy loading
        img.setAttribute('loading', 'lazy');
        
        // Handle image loading errors
        img.addEventListener('error', function() {
            this.src = 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=600'; // Fallback image
            this.alt = 'Image not available';
        });
        
        // Add fade-in effect when loaded
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });

    // =============================================
    // 8. BACK TO TOP BUTTON (Create if needed)
    // =============================================
    // Create back to top button if it doesn't exist
    if (!document.getElementById('backToTop')) {
        const backToTop = document.createElement('button');
        backToTop.id = 'backToTop';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.title = 'Back to Top';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--coffee-tan, #c49a6c);
            color: white;
            border: none;
            cursor: pointer;
            display: none;
            font-size: 1.2rem;
            z-index: 999;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        
        backToTop.addEventListener('mouseenter', function() {
            this.style.background = '#b0835a';
            this.style.transform = 'translateY(-3px)';
        });
        
        backToTop.addEventListener('mouseleave', function() {
            this.style.background = 'var(--coffee-tan, #c49a6c)';
            this.style.transform = 'translateY(0)';
        });
        
        document.body.appendChild(backToTop);
        
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        // Scroll to top when clicked
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // =============================================
    // 9. CURRENT YEAR IN FOOTER (Optional)
    // =============================================
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }

    // =============================================
    // 10. RESERVATION MODAL (If needed)
    // =============================================
    const reservationBtn = document.getElementById('reservationBtn');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    if (reservationBtn && modal) {
        reservationBtn.addEventListener('click', function() {
            modal.classList.add('active');
        });
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                modal.classList.remove('active');
            });
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }

    // =============================================
    // 11. MENU FILTERING (For menu page if needed)
    // =============================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-category');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                if (filter === 'all') {
                    menuItems.forEach(item => {
                        item.style.display = 'block';
                    });
                } else {
                    menuItems.forEach(item => {
                        if (item.classList.contains(filter)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    }

    // =============================================
    // 12. ANIMATION ON SCROLL (Simple fade-in)
    // =============================================
    const animateElements = document.querySelectorAll('.feature-card, .menu-card, .team-member, .value-card');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Check on load
    checkScroll();
});

// =============================================
// 13. PAGE LOAD PERFORMANCE
// =============================================
window.addEventListener('load', function() {
    // Remove any loading spinners or add loaded class to body
    document.body.classList.add('page-loaded');
    
    // Prefetch next pages for faster navigation
    const pages = ['menu.html', 'about.html', 'contact.html'];
    pages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
});

// =============================================
// 14. SERVICE WORKER (For offline capability - optional)
// =============================================
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registered');
        }).catch(function(err) {
            console.log('ServiceWorker registration failed');
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
            const video = document.getElementById('bgVideo');
            const muteBtn = document.getElementById('muteBtn');
            const pauseBtn = document.getElementById('pauseBtn');
            const videoLoading = document.getElementById('videoLoading');
            const fallbackHero = document.getElementById('fallbackHero');
            const videoHero = document.querySelector('.video-hero');
            
            // Hide loading when video is ready
            video.addEventListener('loadeddata', function() {
                videoLoading.style.display = 'none';
            });
            
            // Fallback if video fails to load
            video.addEventListener('error', function() {
                videoLoading.style.display = 'none';
                videoHero.style.display = 'none';
                fallbackHero.classList.add('show-fallback');
            });
            
            // Mute/Unmute functionality
            muteBtn.addEventListener('click', function() {
                if (video.muted) {
                    video.muted = false;
                    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                } else {
                    video.muted = true;
                    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                }
            });
            
            // Play/Pause functionality
            pauseBtn.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    video.pause();
                    pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
            
            // Auto-hide loading after 5 seconds (fallback)
            setTimeout(function() {
                if (videoLoading.style.display !== 'none') {
                    videoLoading.style.display = 'none';
                }
            }, 5000);
        });
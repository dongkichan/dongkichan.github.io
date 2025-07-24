// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
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

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Contact form handling with Formspree
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            // Form will be submitted to Formspree
            // This code handles the after-submission behavior
            fetch(this.action, {
                method: this.method,
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success message
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Message Sent!';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                    }, 3000);
                } else {
                    // Error handling
                    response.json().then(data => {
                        if (Object.hasOwnProperty.call(data, 'errors')) {
                            const errorMsg = data["errors"].map(error => error["message"]).join(", ");
                            alert("Oops! There was a problem: " + errorMsg);
                        } else {
                            alert("Oops! There was a problem submitting your form");
                        }
                        submitBtn.classList.remove('loading');
                        submitBtn.disabled = false;
                    });
                }
            })
            .catch(() => {
                // Network error handling
                alert("Oops! There was a network problem. Please try again.");
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            });
            
            // Prevent the default form submission
            e.preventDefault();
        });
    }
});

// Skill tags hover effect
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.skill-list span').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Certificate Modal Functions
function openCertificateModal(imageSrc, caption) {
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalCertificateImage');
    const modalTitle = document.getElementById('modalCertificateTitle');
    
    if (modal && modalImg && modalTitle) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
        modalTitle.textContent = caption;
        
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    }
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.style.display = 'none';
        // Restore body scroll
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside the certificate content
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            const modalImg = document.getElementById('modalCertificateImage');
            const modalCaption = document.querySelector('.modal-caption');
            const modalClose = document.querySelector('.modal-close');
            
            // Don't close if clicking on the image, caption, or close button
            if (e.target === modalImg || 
                e.target === modalCaption || 
                modalCaption?.contains(e.target) ||
                e.target === modalClose) {
                return;
            }
            
            // Close modal for any other clicks
            closeCertificateModal();
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCertificateModal();
        }
    });
});

// This event listener is already defined inside the DOMContentLoaded event above

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        // Toggle mobile menu
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// Recommendations Slider
let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.recommendation-slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Hide all slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (dots[i]) {
            dots[i].classList.remove('active');
        }
    });
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    // Update track position
    const track = document.querySelector('.slider-track');
    if (track) {
        track.style.transform = `translateX(-${index * 100}%)`;
    }
}

function changeSlide(direction) {
    currentSlide += direction;
    
    // Wrap around
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Initialize slider
document.addEventListener('DOMContentLoaded', () => {
    if (slides.length > 0) {
        showSlide(0);
        
        // Pause on hover
        const sliderContainer = document.querySelector('.recommendations-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
        }
        
        // Touch/swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        const slider = document.querySelector('.slider-container');
        if (slider) {
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                changeSlide(1); // Swipe left, next slide
            }
            if (touchEndX > touchStartX + 50) {
                changeSlide(-1); // Swipe right, previous slide
            }
        }
    }
});
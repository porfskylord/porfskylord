// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll animations
function handleScrollAnimations() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        if (isInViewport(category) && !category.classList.contains('animate')) {
            category.classList.add('animate');
        }
    });
}

// Add event listener for scroll
window.addEventListener('scroll', handleScrollAnimations);

// Initial check in case elements are already in view
window.addEventListener('load', handleScrollAnimations);

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const submitBtnText = submitBtn.querySelector('span');
        const submitBtnIcon = submitBtn.querySelector('i');
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtnText.textContent = 'Sending...';
        submitBtnIcon.className = 'fas fa-spinner fa-spin';
        
        try {
            // Here you would typically send the form data to a server
            // For example, using fetch() to your backend endpoint
            // This is a simulation of a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            formMessage.textContent = 'Your message has been sent successfully! I\'ll get back to you soon.';
            formMessage.className = 'form-message success';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => {
                    formMessage.className = 'form-message';
                    formMessage.style.opacity = '';
                }, 300);
            }, 5000);
            
        } catch (error) {
            // Show error message
            formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
            formMessage.className = 'form-message error';
            console.error('Form submission error:', error);
            
            // Hide error message after 5 seconds
            setTimeout(() => {
                formMessage.style.opacity = '0';
                setTimeout(() => {
                    formMessage.className = 'form-message';
                    formMessage.style.opacity = '';
                }, 300);
            }, 5000);
            
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtnText.textContent = 'Send Message';
            submitBtnIcon.className = 'fas fa-paper-plane';
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuButton.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuButton?.classList.remove('active');
    });
});

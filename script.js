// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}
// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
if (window.scrollY > 100) {
    navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.6)';
} else {
    navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    navbar.style.boxShadow = 'none';
}
});

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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to elements
const animateElements = () => {
    const elements = document.querySelectorAll('.project-card, .skill-category, .stat-item, .about-text');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', animateElements);

// Typing effect for hero title
const typeWriter = () => {
    const heroTitle = document.querySelector('.hero-title');

    if (!heroTitle) return;

    const fullText = "Hi, I'm Sam Clinton Ogoti";
    heroTitle.innerHTML = '';

    let i = 0;
    const speed = 100;

    function type() {
        if (i < fullText.length) {
            const currentText = fullText.substring(0, i + 1);

            // Wrap only the name in highlight
            if (currentText.includes("Sam Clinton Ogoti")) {
                heroTitle.innerHTML = currentText.replace(
                    "Sam Clinton Ogoti",
                    `<span class="highlight">Sam Clinton Ogoti</span>`
                );
            } else {
                heroTitle.innerHTML = currentText;
            }

            i++;
            setTimeout(type, speed);
        }
    }

    setTimeout(type, 500);
};

document.addEventListener('DOMContentLoaded', typeWriter);

// Counter animation for statistics
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const countUp = (counter) => {
        const target = +counter.innerText.replace(/\D/g, '');
        const increment = target / speed;
        
        const updateCount = () => {
            const count = +counter.innerText.replace(/\D/g, '');
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment) + counter.innerText.replace(/\d/g, '');
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + counter.innerText.replace(/\d/g, '');
            }
        };
        
        updateCount();
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                countUp(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
};

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

// Form submission handling
// Form submission handling (Formspree)
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showNotification("Message sent successfully! I'll get back to you soon.", "success");
                contactForm.reset();
            } else {
                showNotification("Failed to send message. Try again.", "error");
            }
        } catch (error) {
            showNotification("Network error. Please try again.", "error");
        }
    });
}

// Notification system
const showNotification = (message, type = 'info') => {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        info: '#3B82F6',
        warning: '#F59E0B'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.style.color = 'white';
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0;
    `;
    
    const closeNotification = () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeNotification);
    
    // Auto-close after 5 seconds
    setTimeout(closeNotification, 5000);
};

// Parallax effect for hero section
const parallaxEffect = () => {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = hero.style.backgroundPositionY || 0;
        const speed = 0.5;
        
        hero.style.backgroundPositionY = -(scrolled * speed) + 'px';
    });
};

// Initialize parallax effect
document.addEventListener('DOMContentLoaded', parallaxEffect);

// Skill bar animation (if you want to add skill bars later)
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const skillLevel = bar.getAttribute('data-skill');
                bar.style.width = skillLevel + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

};
// Read More Toggle
document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', () => {

        const allContents = document.querySelectorAll('.read-more-content');
        const content = button.nextElementSibling;

        // Close all other open sections
        allContents.forEach(item => {
            if (item !== content) {
                item.classList.remove('active');
                const otherBtn = item.previousElementSibling;
                if (otherBtn) otherBtn.textContent = "Read More";
            }
        });

        // Toggle current section
        content.classList.toggle('active');

        // Update button text
        button.textContent = content.classList.contains('active')
            ? "Read Less"
            : "Read More";
    });
});
// Initialize skill bars (when implemented)
// document.addEventListener('DOMContentLoaded', animateSkillBars);

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Cursor trail effect (optional)
const createCursorTrail = () => {
    const trail = [];
    const maxTrailLength = 20;
    
    document.addEventListener('mousemove', (e) => {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: rgba(79, 70, 229, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(dot);
        trail.push(dot);
        
        if (trail.length > maxTrailLength) {
            const oldDot = trail.shift();
            oldDot.style.opacity = '0';
            setTimeout(() => oldDot.remove(), 500);
        }
        
        setTimeout(() => {
            dot.style.opacity = '0';
            setTimeout(() => dot.remove(), 500);
        }, 100);
    });
};

// Initialize cursor trail (optional - comment out if not desired)
// document.addEventListener('DOMContentLoaded', createCursorTrail);

// Console welcome message
console.log('%c👋 Welcome to Shikokoti\'s Portfolio!', 'font-size: 20px; color: #4F46E5; font-weight: bold;');
console.log('%cBuilt with passion and lots of ☕', 'font-size: 14px; color: #10B981;');
console.log('%cFeel free to explore the code!', 'font-size: 12px; color: #F59E0B;');

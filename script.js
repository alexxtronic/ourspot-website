/**
 * OurSpot Landing Page — Interactive Enhancements
 * Smooth scroll, reveals, and micro-interactions
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initParallaxOrbs();
    initSmoothScroll();
    initNavShrink();
    initButtonRipple();
});

/**
 * Scroll Reveal Animation
 * Elements fade in and slide up as they enter viewport
 */
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add reveal class to elements
    const revealElements = document.querySelectorAll(
        '.statement-card, .stat, .big-text, .cta-content'
    );

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, 
                               transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add the revealed state styles
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Parallax effect for floating orbs
 * Subtle movement based on mouse position
 */
function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.orb');
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 15;
            const x = currentX * speed;
            const y = currentY * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100; // Account for fixed nav
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Navigation shrink/enhance on scroll
 */
function initNavShrink() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.style.padding = '0.75rem 1.5rem';
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            nav.style.padding = '1.5rem 2rem';
            nav.style.background = 'rgba(10, 10, 10, 0.8)';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Button ripple effect
 */
function initButtonRipple() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple styles
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple-effect 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-effect {
            to {
                transform: translate(-50%, -50%) scale(40);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Typing effect for hero subtitle (optional enhancement)
 */
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const text = subtitle.innerHTML;
    subtitle.innerHTML = '';

    let i = 0;
    const speed = 30;

    function type() {
        if (i < text.length) {
            subtitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    // Start after a delay
    setTimeout(type, 1000);
}

// Console easter egg 🥚
console.log('%c🔥 OurSpot', 'font-size: 24px; font-weight: bold; color: #F97316;');
console.log('%cThe meetup app you\'ve been waiting for.', 'font-size: 14px; color: #A3A3A3;');
console.log('%cBuilding something? We should hang out → hello@ourspot.app', 'font-size: 12px; color: #525252;');

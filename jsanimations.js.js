/**
 * Master Motion UI Orchestrator Module
 */

class MotionOrchestrator {
    constructor() {
        this.initLenisScroll();
        this.initTypewriter();
        this.initCustomCursor();
        this.initViewportScrollReveals();
        this.initMagneticControls();
        this.initContactFormValidation();
    }

    initLenisScroll() {
        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true
        });

        const renderLoop = (time) => {
            this.lenis.raf(time);
            requestAnimationFrame(renderLoop);
        };
        requestAnimationFrame(renderLoop);
    }

    initTypewriter() {
        const textTargetNode = document.getElementById('typed-pharmacy-strings');
        if (!textTargetNode) return;

        new Typed('#typed-pharmacy-strings', {
            strings: [
                'Student Pharmacist.',
                'Clinical Pharmacy Enthusiast.',
                'Community Health Advocate.',
                'Drug Information Researcher.',
                'Learning Web Development.'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    initCustomCursor() {
        const cursor = document.getElementById('customCursor');
        if (!cursor) return;

        window.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        const standardLinks = document.querySelectorAll('a, button, input, textarea');
        standardLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 1.8, duration: 0.2 });
                cursor.style.background = 'transparent';
                cursor.style.border = '1px solid var(--accent-cyan)';
            });
            link.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, duration: 0.2 });
                cursor.style.background = 'radial-gradient(circle, var(--accent-cyan) 0%, rgba(0,200,150,0.4) 100%)';
                cursor.style.border = 'none';
            });
        });
    }

    initViewportScrollReveals() {
        const revealElements = document.querySelectorAll('[data-gsap]');
        
        const observerOptions = { root: null, threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                
                const targetNode = entry.target;
                const mode = targetNode.getAttribute('data-gsap');

                if (mode === 'fade-up') gsap.fromTo(targetNode, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 });
                else if (mode === 'fade-right') gsap.fromTo(targetNode, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8 });
                else if (mode === 'fade-left') gsap.fromTo(targetNode, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8 });
                else if (mode === 'scale-in') gsap.fromTo(targetNode, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.6 });

                if (targetNode.classList.contains('about-text')) this.triggerNumericalCounters();

                revealObserver.unobserve(targetNode);
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    }

    triggerNumericalCounters() {
        const counters = document.querySelectorAll('.counter-num');
        counters.forEach(counter => {
            const boundaryTarget = parseInt(counter.getAttribute('data-target'), 10);
            const trackingObject = { value: 0 };

            gsap.to(trackingObject, {
                value: boundaryTarget,
                duration: 2,
                onUpdate: () => { counter.textContent = Math.floor(trackingObject.value); }
            });
        });
    }

    initMagneticControls() {
        const magneticElements = document.querySelectorAll('.magnetic');
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const boundBox = element.getBoundingClientRect();
                const localX = e.clientX - boundBox.left - (boundBox.width / 2);
                const localY = e.clientY - boundBox.top - (boundBox.height / 2);
                
                gsap.to(element, { x: localX * 0.35, y: localY * 0.35, duration: 0.3 });
            });
            element.addEventListener('mouseleave', () => { gsap.to(element, { x: 0, y: 0, duration: 0.5 }); });
        });
    }

    initContactFormValidation() {
        const form = document.getElementById('portfolioContactForm');
        const submitBtn = document.getElementById('submitFormBtn');
        const feedback = document.getElementById('formFeedback');

        if (!form || !submitBtn || !feedback) return;

        submitBtn.addEventListener('click', () => {
            if (!form.checkValidity()) { form.reportValidity(); return; }

            submitBtn.disabled = true;
            submitBtn.textContent = "Transmitting...";
            feedback.style.color = "var(--accent-cyan)";
            feedback.textContent = "Processing secure laboratory messaging request vector...";

            setTimeout(() => {
                submitBtn.textContent = "Sent Confirmed";
                feedback.style.color = "var(--primary-emerald)";
                feedback.textContent = "Data packet safely logged inside Dr. Isaac's clinical queue.";
                form.reset();
            }, 1500);
        });
    }
}

window.addEventListener('DOMContentLoaded', () => { window.MotionEngine = new MotionOrchestrator(); });
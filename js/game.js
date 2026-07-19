/**
 * Timing-Based Pharmaceutical Stabilization Gate Game Solution
 */

class TimingMatrixGame {
    constructor() {
        this.gameOverlay = document.getElementById('game-gate');
        this.portfolioWrapper = document.getElementById('main-portfolio');
        this.reactorButton = document.getElementById('reactorCapsule');
        this.statusLabel = document.getElementById('gameStatusLabel');

        if (!this.gameOverlay || !this.reactorButton) return;

        // Custom Pharmaceutical Color Array spectrum loops
        this.colorsArray = ['#FF3B30', '#FF9500', '#3A0CA3', '#B6FF2E', '#0057FF']; 
        this.currentIndex = 0;
        this.isGameActive = true;

        this.startColorCycleLoop();
        this.bindInteractionHook();
    }

    startColorCycleLoop() {
        if (!this.isGameActive) return;

        this.cycleInterval = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.colorsArray.length;
            const currentActiveColor = this.colorsArray[this.currentIndex];

            gsap.to(this.reactorButton, {
                backgroundColor: currentActiveColor + "22", 
                borderColor: currentActiveColor,
                boxShadow: `0 0 25px ${currentActiveColor}`,
                duration: 0.2
            });
        }, 650);
    }

    bindInteractionHook() {
        this.reactorButton.addEventListener('click', () => {
            if (!this.isGameActive) return;

            // Target color is Lime Spark match profile
            if (this.colorsArray[this.currentIndex] === '#B6FF2E') {
                this.executeAccessGrantedSequence();
            } else {
                this.executeAccessDeniedSequence();
            }
        });
    }

    executeAccessGrantedSequence() {
        this.isGameActive = false;
        clearInterval(this.cycleInterval);

        this.statusLabel.textContent = "Solution Stabilized. Cleanroom Access Granted.";
        this.statusLabel.style.color = "var(--primary-accent)";

        gsap.to(this.reactorButton, { scale: 1.15, boxShadow: "0 0 40px #B6FF2E", duration: 0.3 });

        const transitionTimeline = gsap.timeline();

        transitionTimeline.to(this.gameOverlay, {
            opacity: 0,
            y: -60,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: () => {
                this.gameOverlay.style.display = 'none';
                // CRITICAL BUGFIX: Restores scroll metrics globally to document elements
                document.documentElement.style.overflow = 'auto';
                document.body.style.overflow = 'auto';
                if (window.MotionEngine) {
                    window.MotionEngine.initLenisScroll();
                }
            }
        });

        transitionTimeline.to(this.portfolioWrapper, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            onStart: () => {
                this.portfolioWrapper.classList.remove('portfolio-hidden');
            }
        }, "-=0.4");
    }

    executeAccessDeniedSequence() {
        this.statusLabel.textContent = "Chemical compound volatile! Recalibrating suspension...";
        this.statusLabel.style.color = "#FF3B30";

        gsap.fromTo(this.reactorButton, { x: -12 }, { x: 0, duration: 0.4, ease: "rough", clearProps: "x" });
    }
}

window.addEventListener('DOMContentLoaded', () => { 
    // Lockdown initial scrolling values while overlay authentication matrix handles logic
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    new TimingMatrixGame(); 
});

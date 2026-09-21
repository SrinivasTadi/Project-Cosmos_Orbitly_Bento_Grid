/**
 * Orbitly - Vanilla JS Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // Scroll Reveal Animation
    // ==========================================================================
    const ob_revealElements = document.querySelectorAll('.ob_animate_reveal');
    
    // Check if user prefers reduced motion
    const ob_prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!ob_prefersReducedMotion && ob_revealElements.length > 0) {
        
        const ob_revealOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px', // Trigger slightly before it comes fully into view
            threshold: 0.1
        };
        
        const ob_revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ob_revealed');
                    // Unobserve after revealing to prevent repeated animations
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const ob_revealObserver = new IntersectionObserver(ob_revealCallback, ob_revealOptions);
        
        ob_revealElements.forEach(el => {
            ob_revealObserver.observe(el);
        });
        
    } else {
        // If reduced motion is preferred, reveal everything immediately
        ob_revealElements.forEach(el => {
            el.classList.add('ob_revealed');
        });
    }
    
    // ==========================================================================
    // Interactive Parallax on Hero Card (Subtle)
    // ==========================================================================
    const ob_heroCard = document.querySelector('.ob_hero_card');
    const ob_floatingElements = document.querySelectorAll('.ob_floating_element');
    
    if (ob_heroCard && !ob_prefersReducedMotion) {
        ob_heroCard.addEventListener('mousemove', (e) => {
            const ob_rect = ob_heroCard.getBoundingClientRect();
            
            // Calculate mouse position relative to card center (-1 to 1)
            const ob_x = (e.clientX - ob_rect.left - ob_rect.width / 2) / (ob_rect.width / 2);
            const ob_y = (e.clientY - ob_rect.top - ob_rect.height / 2) / (ob_rect.height / 2);
            
            // Apply slight translation to floating elements based on mouse position
            ob_floatingElements.forEach((el, index) => {
                const ob_speed = (index + 1) * 10; 
                el.style.transform = `translate(${ob_x * ob_speed}px, ${ob_y * ob_speed}px)`;
            });
        });
        
        // Reset position when mouse leaves
        ob_heroCard.addEventListener('mouseleave', () => {
            ob_floatingElements.forEach(el => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // ==========================================================================
    // Smooth Button Micro-interactions (Ripple effect placeholder)
    // ==========================================================================
    const ob_buttons = document.querySelectorAll('.ob_btn');
    
    ob_buttons.forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.96)';
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = '';
            // If it has hover lift, CSS will handle the hover state transform
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

(function() {
    const initGlow = () => {
        if (document.getElementById('glow-styles')) return;

        const style = document.createElement('style');
        style.id = 'glow-styles';
        style.innerHTML = `
            /* Card & Button Glow Effect */
            .glow-card, .card-hover, .nav-link-glow { 
                position: relative; 
                overflow: hidden; 
                z-index: 1; 
            }
            
            .glow-card::after, .card-hover::after, .nav-link-glow::after {
                content: ""; 
                position: absolute; 
                top: 0; 
                left: 0; 
                width: 100%; 
                height: 100%;
                /* Smaller radius for buttons, larger for cards */
                background: radial-gradient(
                    150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                    rgba(56, 189, 248, 0.25), 
                    transparent 60%
                );
                opacity: 0; 
                transition: opacity 0.3s ease; 
                pointer-events: none; 
                z-index: 2;
            }
            
            .glow-card:hover::after, .card-hover:hover::after, .nav-link-glow:hover::after { 
                opacity: 1; 
            }

            /* Global Cursor Glow */
            #cursor-glow {
                position: fixed;
                top: 0;
                left: 0;
                width: 500px;
                height: 500px;
                background: radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                mix-blend-mode: screen;
            }
        `;
        document.head.appendChild(style);

        const cursorGlow = document.createElement('div');
        cursorGlow.id = 'cursor-glow';
        document.body.appendChild(cursorGlow);

        window.addEventListener('mousemove', (e) => {
            // Updated to include nav-link-glow
            const targets = document.querySelectorAll('.glow-card, .card-hover, .nav-link-glow');
            targets.forEach(el => {
                const rect = el.getBoundingClientRect();
                el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            });

            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlow);
    } else {
        initGlow();
    }
})();
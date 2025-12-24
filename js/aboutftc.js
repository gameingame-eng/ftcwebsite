// Mobile Menu Toggle
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// Initialize Scroll Animation
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    
    // Endgame link functionality
    document.querySelectorAll('.endgame-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('ftcrules').scrollIntoView({ behavior: 'smooth' });
            const card = document.getElementById('endgame-card');
            card.classList.add('highlight');
            setTimeout(() => card.classList.remove('highlight'), 2000);
        });
    });
});
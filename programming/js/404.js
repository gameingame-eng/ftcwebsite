document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const logo = document.querySelector('img');
    const buttons = document.querySelectorAll('a');

    // 1. Fade in the entire container on load
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    container.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

    setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);

    // 2. Simple Floating Animation for the logo
    let floatY = 0;
    let direction = 1;
    function animateLogo() {
        floatY += 0.1 * direction;
        if (floatY > 10 || floatY < -10) direction *= -1;
        logo.style.transform = `translateY(${floatY}px)`;
        requestAnimationFrame(animateLogo);
    }
    animateLogo();

    // 3. Button Click Ripple or Scale Effect
    buttons.forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.95)';
        });
        btn.addEventListener('mouseup', () => {
            btn.style.transform = 'scale(1)';
        });
    });
});

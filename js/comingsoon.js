        function initScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
        }

        document.addEventListener('DOMContentLoaded', initScrollAnimations);
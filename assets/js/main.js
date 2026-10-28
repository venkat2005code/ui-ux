document.addEventListener('DOMContentLoaded', () => {
    // Icons
    const outlineSun = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
    const outlineMoon = `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

    // Dark Mode Toggle Logic
    const darkModeBtn = document.getElementById('darkModeToggle');
    if (darkModeBtn) {
        // Setup initial icon based on HTML class (which is set instantly by the inline <head> script)
        if (document.documentElement.classList.contains('dark')) {
            darkModeBtn.innerHTML = outlineSun;
        } else {
            darkModeBtn.innerHTML = outlineMoon;
        }

        // Toggle functionality
        darkModeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            const theme = isDark ? 'dark' : 'light';
            try { 
                localStorage.setItem('theme', theme); 
            } catch(e) {
                // Ignore localStorage security errors when running via file://
            }
            darkModeBtn.innerHTML = isDark ? outlineSun : outlineMoon;
        });
    }

    // RTL Toggle Logic
    const rtlBtn = document.getElementById('rtlToggle');
    if (rtlBtn) {
        // Update button text and active state based on current direction
        const updateRtlBtnState = () => {
            const isRtl = document.documentElement.dir === 'rtl';
            rtlBtn.textContent = isRtl ? 'LTR' : 'RTL';
            if (isRtl) {
                rtlBtn.classList.add('active');
            } else {
                rtlBtn.classList.remove('active');
            }
        };

        // Initialize state
        updateRtlBtnState();

        rtlBtn.addEventListener('click', () => {
            const currentlyRtl = document.documentElement.dir === 'rtl';
            if (currentlyRtl) {
                document.documentElement.dir = 'ltr';
                document.body.classList.remove('rtl');
                try { localStorage.setItem('direction', 'ltr'); } catch(e) {}
            } else {
                document.documentElement.dir = 'rtl';
                document.body.classList.add('rtl');
                try { localStorage.setItem('direction', 'rtl'); } catch(e) {}
            }
            updateRtlBtnState();
        });
    }

    // Active Navigation Link Logic
    const currentPath = window.location.pathname;
    const navLinksList = document.querySelectorAll('.nav-menu .nav-link');
    
    navLinksList.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            if (currentPath.endsWith(href)) {
                link.classList.add('active');
            } else if (href === 'index.html' && (currentPath.endsWith('/') || currentPath.match(/index.*\.html$/))) {
                link.classList.add('active');
            } else if (href === 'services.html' && currentPath.endsWith('service-details.html')) {
                link.classList.add('active');
            }
        }
    });

    // Counter Animation Logic
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.2 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Fade Up Animation Logic
    const fadeElements = document.querySelectorAll('.fade-up');
    if (fadeElements.length > 0) {
        const fadeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
        
        fadeElements.forEach(el => fadeObserver.observe(el));
    }
});
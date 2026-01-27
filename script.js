gsap.registerPlugin(ScrollTrigger);

// ========================================
// 1. SMOOTH LOADER & REVEAL
// ========================================
function initLoader() {
    const counterElement = document.querySelector(".counter");
    const loaderLine = document.querySelector(".loader-line");
    const loaderLogo = document.querySelector(".loader-logo");
    const loaderText = document.querySelector(".loader-text");
    let loadObj = { val: 0 };

    // Animate loader elements in
    gsap.to(loaderLogo, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    gsap.to(loaderText, { opacity: 1, duration: 0.8, delay: 0.3 });

    gsap.to(loadObj, {
        val: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
            const value = Math.floor(loadObj.val);
            counterElement.textContent = value;
            loaderLine.style.width = value + "%";
        },
        onComplete: () => {
            revealSite();
        }
    });
}

function revealSite() {
    const tl = gsap.timeline();
    
    tl.to(".loader", { 
        y: "-100%", 
        duration: 1, 
        ease: "power4.inOut" 
    })
    .to(".hero-badge", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.3")
    .to(".hero-h1", {
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out"
    }, "-=0.5")
    .to(".hero-footer", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5");
}

// ========================================
// 2. CUSTOM CURSOR
// ========================================
function initCursor() {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");
    const cursorText = document.querySelector(".cursor-text");

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.transform = `translate(${cursorX - 6}px, ${cursorY - 6}px)`;

        // Follower
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.transform = `translate(${followerX - 25}px, ${followerY - 25}px)`;

        // Cursor text
        cursorText.style.transform = `translate(${mouseX - 15}px, ${mouseY - 10}px)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .magnetic, .work-item, .tech-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            follower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            follower.classList.remove('active');
        });
    });

    // Work items special cursor
    document.querySelectorAll('.work-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorText.style.opacity = '1';
            follower.classList.add('hidden');
        });
        item.addEventListener('mouseleave', () => {
            cursorText.style.opacity = '0';
            follower.classList.remove('hidden');
        });
    });
}

// ========================================
// 3. MAGNETIC EFFECT
// ========================================
function initMagnetic() {
    if (window.matchMedia("(max-width: 768px)").matches) return;

    document.querySelectorAll('.magnetic').forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(elem, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        elem.addEventListener('mouseleave', () => {
            gsap.to(elem, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

// ========================================
// 4. SCROLL PROGRESS
// ========================================
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ========================================
// 5. NAVBAR SCROLL
// ========================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach((link, i) => {
        link.style.transitionDelay = `${0.1 * i}s`;
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ========================================
// 6. SCROLL REVEALS
// ========================================
function initScrollReveals() {
    // About text
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Stats with counter
    gsap.utils.toArray('.stat-item').forEach((stat, i) => {
        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            onComplete: () => {
                // Animate number
                const numEl = stat.querySelector('.stat-number');
                const target = parseInt(numEl.dataset.count);
                gsap.to({ val: 0 }, {
                    val: target,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: function() {
                        numEl.textContent = Math.floor(this.targets()[0].val);
                    }
                });
            }
        });
    });

    // Tech rows
    gsap.utils.toArray('.tech-row').forEach((row, i) => {
        gsap.to(row, {
            scrollTrigger: {
                trigger: row,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out"
        });
    });

    // Work items
    gsap.utils.toArray('.work-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.15,
            ease: "power3.out"
        });
    });

    // Experience items
    gsap.utils.toArray('.exp-item').forEach((item, i) => {
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out"
        });
    });
}

// ========================================
// 7. PROJECT MODAL
// ========================================
function initModal() {
    const modal = document.querySelector(".project-modal");
    const overlay = document.querySelector(".modal-overlay");
    const closeBtn = document.querySelector(".modal-close-btn");
    const workItems = document.querySelectorAll(".work-item");
    
    const mTitle = document.getElementById("modal-title");
    const mNumber = document.querySelector(".modal-number");
    const mDesc = document.getElementById("modal-desc");
    const mTags = document.getElementById("modal-tags");
    const mLink = document.getElementById("modal-link");
    const mImg = document.getElementById("modal-img");

    workItems.forEach(item => {
        item.addEventListener("click", () => {
            mTitle.textContent = item.dataset.title;
            mNumber.textContent = item.dataset.number;
            mDesc.textContent = item.dataset.desc;
            mLink.href = item.dataset.link;
            mImg.src = item.dataset.img;
            
            mTags.innerHTML = "";
            item.dataset.tags.split(",").forEach(tag => {
                const span = document.createElement("span");
                span.textContent = tag.trim();
                mTags.appendChild(span);
            });

            modal.classList.add('active');
            document.body.style.overflow = "hidden";
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = "";
    }

    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", closeModal);
    
    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ========================================
// 8. FOOTER TIME
// ========================================
function initFooterTime() {
    const timeEl = document.getElementById('current-time');
    
    function updateTime() {
        const now = new Date();
        const options = { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Kolkata'
        };
        timeEl.textContent = now.toLocaleTimeString('en-IN', options) + ' IST';
    }
    
    updateTime();
    setInterval(updateTime, 1000);
}

// ========================================
// 9. SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// 10. PARALLAX EFFECTS
// ========================================
function initParallax() {
    gsap.utils.toArray('.gradient-orb').forEach((orb, i) => {
        gsap.to(orb, {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            },
            y: (i + 1) * 200,
            ease: "none"
        });
    });
}

// ========================================
// INITIALIZE EVERYTHING
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initMagnetic();
    initScrollProgress();
    initNavbar();
    initScrollReveals();
    initModal();
    initFooterTime();
    initSmoothScroll();
    initParallax();
});

// Refresh ScrollTrigger on resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});
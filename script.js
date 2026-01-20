gsap.registerPlugin(ScrollTrigger);

// 1. SMOOTH LOADER & REVEAL
function initLoader() {
    const counterElement = document.querySelector(".counter");
    const loaderLine = document.querySelector(".loader-line");
    let loadObj = { val: 0 };

    gsap.to(loadObj, {
        val: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
            counterElement.textContent = Math.floor(loadObj.val);
            loaderLine.style.width = Math.floor(loadObj.val) + "%";
        },
        onComplete: () => {
            revealSite();
        }
    });
}

function revealSite() {
    gsap.to(".loader", { y: "-100%", duration: 1.2, ease: "power4.inOut" });
    
    // Smooth Text Slide Up (Mask Effect)
    gsap.to(".hero-h1", {
        y: 0,
        duration: 1.2,
        delay: 0.5,
        stagger: 0.15,
        ease: "power3.out" 
    });
}

// 2. MODAL LOGIC
const modal = document.querySelector(".project-modal");
const closeModalBtn = document.querySelector(".modal-close-btn");
const workItems = document.querySelectorAll(".work-item");
const mTitle = document.getElementById("modal-title");
const mDesc = document.getElementById("modal-desc");
const mTags = document.getElementById("modal-tags");
const mLink = document.getElementById("modal-link");
const mImg = document.getElementById("modal-img");

workItems.forEach(item => {
    item.addEventListener("click", () => {
        mTitle.textContent = item.getAttribute("data-title");
        mDesc.textContent = item.getAttribute("data-desc");
        mLink.href = item.getAttribute("data-link");
        mImg.src = item.getAttribute("data-img");
        
        mTags.innerHTML = "";
        const tags = item.getAttribute("data-tags").split(",");
        tags.forEach(tag => {
            const span = document.createElement("span");
            span.textContent = tag.trim();
            mTags.appendChild(span);
        });

        gsap.to(modal, { y: "0%", duration: 0.8, ease: "power3.inOut" });
        document.body.style.overflow = "hidden";
    });
});

closeModalBtn.addEventListener("click", () => {
    gsap.to(modal, { y: "100%", duration: 0.8, ease: "power3.inOut" });
    document.body.style.overflow = "auto";
});

// 3. SCROLL REVEALS (Smooth Fade Up)
// Skills
gsap.utils.toArray('.tech-row').forEach(row => {
    gsap.from(row, {
        scrollTrigger: { trigger: row, start: "top 90%" },
        y: 40, opacity: 0, duration: 1, ease: "power3.out"
    });
});

// Work
gsap.utils.toArray('.work-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 90%" },
        y: 40, opacity: 0, duration: 1, ease: "power3.out"
    });
});

// Experience
gsap.utils.toArray('.exp-item').forEach(item => {
    gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 90%" },
        y: 40, opacity: 0, duration: 1, ease: "power3.out"
    });
});

// 4. CUSTOM CURSOR
if (window.matchMedia("(min-width: 769px)").matches) {
    const cursor = document.querySelector(".cursor");
    const follower = document.querySelector(".cursor-follower");

    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(follower, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.3 });
    });

    document.querySelectorAll('.magnetic, .work-item, .tech-item, a').forEach(elem => {
        elem.addEventListener("mouseenter", () => {
            gsap.to(cursor, { scale: 3 });
            gsap.to(follower, { scale: 0, opacity: 0 });
        });
        elem.addEventListener("mouseleave", () => {
            gsap.to(cursor, { scale: 1 });
            gsap.to(follower, { scale: 1, opacity: 1 });
        });
    });
}

initLoader();
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Normalize scroll for better mobile experience
ScrollTrigger.normalizeScroll(false); // Disable normalizeScroll for native swipe

function initHorizontalPanels() {
  const container = document.querySelector(".panels");
  if (!container) return;

  // kill previous triggers on hot reloads
  ScrollTrigger.getAll().forEach((st) => st.kill());

  // Staggered Entrance for Skills Grid
  const skillsItems = document.querySelectorAll(".skills-grid__item");
  if (skillsItems.length > 0) {
    gsap.to(skillsItems, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".skills-section",
        scroller: ".panels", // Watch the horizontal scroll container
        horizontal: true,    // Enable horizontal mode
        start: "left center",
        toggleActions: "play none none reverse",
      },
    });

    // 3D Tilt Effect (Keep existing logic)
    skillsItems.forEach((item) => {
      const el = item as HTMLElement;
      
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const xPct = (x / rect.width - 0.5) * 2;
        const yPct = (y / rect.height - 0.5) * 2;
        
        const rotateX = -yPct * 10;
        const rotateY = xPct * 10;
        
        gsap.to(el, {
          rotationX: rotateX,
          rotationY: rotateY,
          scale: 1.05,
          duration: 0.1,
          ease: "power1.out",
          boxShadow: "0 20px 30px rgba(0,0,0,0.4)",
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
          boxShadow: "none",
          clearProps: "boxShadow"
        });
      });
    });
  }

  // Intro Animations
  const introTl = gsap.timeline();
  introTl
    .to(".intro-content", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.5,
    })
    .to(
      ".swipe-hint",
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.5"
    );

  // Experience Cards Entrance
  const expCards = document.querySelectorAll(".experience-card");
  if (expCards.length > 0) {
    gsap.to(expCards, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".experience-section",
        scroller: ".panels", // Watch the horizontal scroll container
        horizontal: true,    // Enable horizontal mode
        start: "left center",
        toggleActions: "play none none reverse",
      },
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHorizontalPanels);
} else {
  initHorizontalPanels();
}

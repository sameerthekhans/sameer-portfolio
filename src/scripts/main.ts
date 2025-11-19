import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function initHorizontalPanels() {
  const container = document.querySelector("main");
  const panels = gsap.utils.toArray<HTMLElement>(".panels > section");
  if (!container || panels.length <= 1) return;

  // kill previous triggers on hot reloads
  ScrollTrigger.getAll().forEach((st) => st.kill());

  const totalPanels = panels.length;
  const totalWidth = (totalPanels - 1) * window.innerWidth;

  gsap.to(".panels", {
    x: () => `-${totalWidth}px`,
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 0.8,
      end: () => `+=${totalWidth}`,
      invalidateOnRefresh: true,
    },
  });

  panels.forEach((p, i) => {
    p.setAttribute("role", "region");
    p.setAttribute("aria-roledescription", "panel");
    p.setAttribute("aria-label", `panel ${i + 1} of ${totalPanels}`);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHorizontalPanels);
} else {
  initHorizontalPanels();
}

let resizeTimer: string | number | NodeJS.Timeout | undefined;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    initHorizontalPanels();
    ScrollTrigger.refresh();
  }, 150);
});

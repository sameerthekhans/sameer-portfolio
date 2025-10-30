import { gsap } from "gsap";

gsap.from("nav a", {
  y: -100,
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
  ease: "back",
});

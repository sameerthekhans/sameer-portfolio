import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

gsap.set(".paper-plane", { scaleX: -1 });

const tl = gsap.timeline();

document.fonts.ready.then(() => {
  SplitText.create(".greeting", {
    type: "lines",
    linesClass: "line",
    autoSplit: true,
    mask: "lines",
    onSplit: (self) => {
      tl.from(self.lines, {
        duration: 1,
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        ease: "expo.out",
      });
    },
  });

  const h1Split = new SplitText("h1", { type: "chars" });

  tl.from(
    h1Split.chars,
    {
      opacity: 0,
      scale: 0.5,
      duration: 0.6,
      stagger: 0.05,
      ease: "back.out(1.7)",
    },
    "-=0.5"
  );

  tl.from(
    ".role",
    {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
    },
    "-=0.5"
  );

  gsap.to(".paper-plane", {
    motionPath: {
      path: "M 0,0 Q 100,-150 200,0 T 400,0 T 600,0 T 800,0",
      autoRotate: true,
    },
    rotationX: "+=1080", // Rolls along the path
    duration: 4,
    ease: "power1.inOut",
  });
});

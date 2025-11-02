import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

const tl = gsap.timeline();

document.fonts.ready.then(() => {
  const nameSplit = SplitText.create("h1.name", { type: "words,chars" });
  const roleSplit = SplitText.create("h1.role", { type: "words,chars" });

  // Position role on top of name
  gsap.set("h1.role", { position: "absolute", top: 0, left: 0 });
  gsap.set(roleSplit.chars, { display: "none" });

  // 1. Show name
  tl.from(nameSplit.chars, {
    opacity: 0,
    scale: 0.5,
    duration: 0.6,
    stagger: 0.05,
    ease: "back.out(1.7)",
  });

  // 2. Show greeting
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

  // 3. Fade out name
  tl.to(nameSplit.chars, {
    opacity: 0,
    duration: 0.5,
  });

  // 4. Show role
  tl.set(roleSplit.chars, { display: "inline-block" });

  tl.from(roleSplit.chars, {
    opacity: 0,
    scale: 0.5,
    duration: 0.6,
    stagger: 0.05,
    ease: "back.out(1.7)",
  });
});

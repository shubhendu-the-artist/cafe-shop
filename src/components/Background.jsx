import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Food from "./Food";

gsap.registerPlugin(ScrollTrigger);

export default function Background() {
  const canvasRef = useRef(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const frames = {
      currentIndex: 0,
      maxIndex: 320,
    };

    const images = [];
    let loaded = 0;

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Set real pixel size (important)
      canvas.width = width * dpr;
      canvas.height = height * dpr;

      // Set display size (CSS)
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      // Reset transform before scaling (important)
      context.setTransform(1, 0, 0, 1, 0, 0);

      // Scale drawing to match DPR
      context.scale(dpr, dpr);
    }
    function loadImage(index) {
      const i = Math.floor(index);
      const img = images[i];
      if (!img) return;

      resizeCanvas();

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      const scale = Math.max(
        canvasWidth / img.width,
        canvasHeight / img.height,
      );

      const w = img.width * scale;
      const h = img.height * scale;

      const x = (canvasWidth - w) / 2;
      const y = (canvasHeight - h) / 2;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(img, x, y, w, h);
    }
    function startAnimation() {
      const initialFrames = 60;

      gsap.to(frames, {
        currentIndex: initialFrames - 1,
        duration: 2.5,
        stagger: 2,
        ease: "linear",
        onUpdate: () => loadImage(frames.currentIndex),
        onComplete: () => {
          gsap.to(frames, {
            currentIndex: frames.maxIndex - 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".parent",
              start: "top top",
              end: "bottom bottom",
              scrub: 2,
            },
            onUpdate: () => loadImage(frames.currentIndex),
          });
        },
      });
    }

    for (let i = 1; i <= frames.maxIndex; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;

      img.onload = () => {
        loaded++;
        if (loaded === frames.maxIndex) {
          loadImage(0);
          startAnimation();
        }
      };

      images.push(img);
    }

    window.addEventListener("resize", () => loadImage(frames.currentIndex));
  },[]);
  useGSAP(() => {
  gsap.to("#items", {
    //make pin during scrolling
    

    scrollTrigger: {
      trigger: "#items",
      start: "top top",
      end: "bottom+=1900 top",
      markers: true,
    },
  });
});
  return (
    <>
      <div id="bg-canvas" className="parent h-[700vh] bg-zinc-800">
        <div className=" w-full bg-transparent absolute z-2">
          <section id="landing" className="flex mb-[200vh]">
            <div className="left w-1/2 h-full py-[5vw] items-center justify-end pr-[8vw]">
              <h1 className="text-[6.4vw] text-right leading-none font-[times-new-roman] font-semibold text-white">
                Your
                <br />
                Second <br />
                Home
              </h1>
            </div>
            <div className="right flex h-screen text-xl text-white flex-col justify-end w-1/2 p-20">
              <p className="mb-[1vw] font-medium">
                Good coffee deserves great company.{" "}
              </p>{" "}
              <p className="font-light leading-none">
                We pair our handcrafted brews with fresh, locally-sourced
                pastries and seasonal snacks. It’s simple food made with honest
                ingredients, served right in the heart of the neighborhood.
              </p>
            </div>
          </section>

          <section id="items" className="flex flex-col gap-10 opacity-[0.5] pl-32">
            <Food category="Creamy Comfort" title="Cappuccino" />
            <Food category="Chilled Energy" title="Cold Coffee" />
            <Food category="Classic Brew" title="Espresso" />
            <Food category="Velvety Indulgence" title="Latte" />
            <Food category="Bold & Bitter" title="Americano" />
            <Food category="Cheesy Slice" title="Pizza" />
            <Food category="Flaky Delight" title="Croissant" />



          </section>
        </div>

        <div className="sticky top-0 h-screen w-full overflow-hidden ">
          <canvas
            ref={canvasRef}
            className="block w-full h-full"
            style={{ filter: "brightness(0.5) contrast(1.5) saturate(1.5)" }}
          />
        </div>
      </div>
    </>
  );
}

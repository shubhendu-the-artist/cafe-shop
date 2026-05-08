import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { Mesh } from "three";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Environment } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

function Cup() {
  const cupRef = useRef();

  useThree(({ camera }) => {
    camera.position.set(0, 0, 0.25);
  });

  const { scene } = useGLTF("/models/coffee_cup_with_plate.glb");

  // useFrame((state, delta) => {
  //   if (cupRef.current) {
  //     cupRef.current.rotation.y += delta * 0.5;
  //   }
  // });

  useGSAP(() => {
    gsap.set(cupRef.current.rotation, {
      //want to make the cup tilted by rotaing it on the x axis by 40 degrees
      x: (40 * Math.PI) / 180,
    });
    gsap.to(cupRef.current.rotation, {
      //make infinite rotation
      y: "+=6.28319",
      duration: 20,
      ease: "none",
      repeat: -1,
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#bg-canvas",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: false,
      },
    });

    tl.to(cupRef.current.position, {
      z: "-=0.1",
      y: "+=0.1",
    })
      .to(
        cupRef.current.rotation,
        {
          x: Math.PI / 2,

        },
        "normal",
      )

      .to(
        cupRef.current.position,
        {
          z: "+=0.15",
          y: "-=0.03",

        },
        "normal",
      )
      
      
      // cup moves upward and hides after all animation on scroll is done
      const tlCanvas1 = gsap.timeline({
        scrollTrigger: {
          trigger: "#section-1",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
          markers: true,
        },
      });
      tlCanvas1.to(cupRef.current.position, {
        y: "+=0.27"});


  }, []);
  return (
    <>
      <fog attach="fog" args={["#1a120b", 2, 6]} />

      <primitive
        ref={cupRef}
        object={scene}
        position={[0, -0.06, 0]}
        // rotation={[Math.PI / 3.7, Math.PI / 13, Math.PI / 18]}
      />

      <ambientLight intensity={0.1} />

      <directionalLight
        position={[2, 3, 2]}
        intensity={1.5}
        color="#ffb38a"
        castShadow
      />

      <pointLight position={[-2, 1, -2]} intensity={0.5} color="#ff7a3d" />

      <Environment preset="night" />
      {/* <OrbitControls /> */}
    </>
  );
}

export default Cup;

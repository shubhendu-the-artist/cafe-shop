import React from "react";
import { Canvas } from "@react-three/fiber";
import Cup from "./components/Cup";
import Background from "./components/Background";

function App() {
  return (
    <>
      <main className="relative">
        <Background />

        <Canvas style={{ height: "100vh", width: "100vw" ,position: "fixed", top: 0, left: 0 ,zIndex: 1}}>
          <Cup />
        </Canvas>

        <section id="section-1" className=" min-h-screen border border-zinc-900"></section>
        <section id="section-2" className=" min-h-screen border border-zinc-900"></section>
        <section id="section-3" className=" min-h-screen border border-zinc-900"></section>
      </main>
    </>
  );
}

export default App;

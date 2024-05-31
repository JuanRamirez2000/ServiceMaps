"use client";

import MapWrapper from "@/components/MapWrapper";
import { Switch } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const TAILWIND_SM_SCREEN: number = 640;

export default function Home() {
  const [sideNavOpen, setsideNavOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < TAILWIND_SM_SCREEN) {
      setsideNavOpen(false);
    }
    if (windowWidth > TAILWIND_SM_SCREEN) {
      setsideNavOpen(true);
    }
  }, [windowWidth]);

  return (
    <main className="relative h-screen w-screen">
      <section
        className={`absolute top-10 left-10 z-10 rounded-xl bg-slate-50 flex flex-col ${
          sideNavOpen ? "min-w-72 h-[90%] p-4 " : "w-fit h-fit p-0"
        }`}
      >
        <Switch
          checked={sideNavOpen}
          onChange={setsideNavOpen}
          className="size-10 p-1.5 rounded-lg bg-slate-400"
        >
          {sideNavOpen ? <Bars3BottomLeftIcon /> : <XMarkIcon />}
        </Switch>
        {<div className={sideNavOpen ? "size-full" : "hidden"}></div>}
      </section>
      <MapWrapper />
    </main>
  );
}

"use client";
import { Switch } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const TAILWIND_SM_SCREEN: number = 640;
const TAILWIND_MD_SCREEN: number = 768;
export default function SideNav({ children }: { children: React.ReactNode }) {
  const [sideNavOpen, setsideNavOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(TAILWIND_MD_SCREEN);

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
    if (windowWidth < TAILWIND_MD_SCREEN) {
      setsideNavOpen(false);
    }
    if (windowWidth > TAILWIND_MD_SCREEN) {
      setsideNavOpen(true);
    }
  }, [windowWidth]);
  return (
    <aside>
      <aside
        className={`absolute top-1.5 left-1.5 md:left-4 z-10 rounded-xl bg-slate-50 flex flex-col shadow-2xl  ${
          sideNavOpen ? "min-w-72 h-[90%] p-4" : "w-fit h-fit p-0"
        }`}
      >
        <Switch
          checked={sideNavOpen}
          onChange={setsideNavOpen}
          className="size-10 p-1.5 rounded-lg bg-slate-200"
        >
          {sideNavOpen ? <Bars3BottomLeftIcon /> : <XMarkIcon />}
        </Switch>
        {
          <section className={sideNavOpen ? "size-full py-10" : "hidden"}>
            {children}
          </section>
        }
      </aside>
    </aside>
  );
}

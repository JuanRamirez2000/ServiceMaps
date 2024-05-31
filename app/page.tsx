"use client";

import MapWrapper from "@/components/MapWrapper";
import { Input } from "@/components/ui/input";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { Switch } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const TAILWIND_SM_SCREEN: number = 640;
const COMMUTING_MODES = ["driving", "driving-traffic", "walking", "cycling"];

export default function Home() {
  const [sideNavOpen, setsideNavOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(TAILWIND_SM_SCREEN);

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
    <main className="relative h-screen w-screen  ">
      <aside
        className={`absolute top-5 left-10 z-10 rounded-xl bg-primary-50 flex flex-col ${
          sideNavOpen ? "min-w-72 h-[90%] p-4 " : "w-fit h-fit p-0"
        }`}
      >
        <Switch
          checked={sideNavOpen}
          onChange={setsideNavOpen}
          className="size-10 p-1.5 rounded-lg bg-primary-200"
        >
          {sideNavOpen ? <Bars3BottomLeftIcon /> : <XMarkIcon />}
        </Switch>
        {
          <section className={sideNavOpen ? "size-full py-10" : "hidden"}>
            <form className="h-full">
              <ul className="space-y-8">
                <li className="">
                  <Input />
                </li>
                <li>
                  <RadioGroup className="space-y-2">
                    {COMMUTING_MODES.map((commuting_mode) => (
                      <Radio
                        key={commuting_mode}
                        value={commuting_mode}
                        className="group relative flex cursor-pointer rounded-xl py-4 px-5 shadow-md bg-slate-50"
                      >
                        <p>{commuting_mode}</p>
                      </Radio>
                    ))}
                  </RadioGroup>
                </li>
              </ul>
            </form>
          </section>
        }
      </aside>
      <MapWrapper />
    </main>
  );
}

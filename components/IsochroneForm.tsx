"use client";
import { findIsochrone } from "@/actions/findIsochrones";
import {
  Label,
  Input,
  Field,
  Fieldset,
  RadioGroup,
  Radio,
  Listbox,
  Button,
} from "@headlessui/react";
import { useState } from "react";
type COMMUTING_MODES_TYPES =
  | "driving"
  | "driving-traffic"
  | "walking"
  | "cycling";
export default function IsochroneForm() {
  const [selectedMode, setSelectedMode] =
    useState<COMMUTING_MODES_TYPES | null>();

  const handleFindIsochrones = async () => {
    try {
      const isochrones = await findIsochrone({});
      if (!isochrones) {
        throw new Error("Failed finding isochrones");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="h-full">
      <Fieldset className="space-y-8">
        <Field className="flex flex-col gap-1">
          <Label> Zip Code </Label>
          <Input
            name="Zip Code"
            className="rounded-lg px-3.5 py-1.5 w-20 bg-slate-500 text-slate-50"
          />
        </Field>
        <RadioGroup
          value={selectedMode}
          onChange={setSelectedMode}
          className="space-y-2"
        >
          <Label>Commuting Mode</Label>
          {/*COMMUTING_MODES.map((mode) => (
            <Radio
              value={mode}
              key={mode}
              className="group relative flex cursor-pointer rounded-lg bg-slate-500 py-4 px-5 text-slate-50 transition data-[checked]:bg-slate-600 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-slate-50"
            >
              <div className="flex ">
                <span>{mode}</span>
              </div>
            </Radio>
          ))*/}
        </RadioGroup>
        <Button
          onClick={async () => {
            await handleFindIsochrones;
          }}
          className="inline-flex items-center gap-2 rounded-md bg-slate-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-slate-600 data-[open]:bg-slate-700 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Run
        </Button>
      </Fieldset>
    </form>
  );
}

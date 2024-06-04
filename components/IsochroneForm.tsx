"use client";
import { Label, Input, Field } from "@headlessui/react";
const COMMUTING_MODES = ["driving", "driving-traffic", "walking", "cycling"];

export default function IsochroneForm() {
  return (
    <form className="h-full">
      <ul className="space-y-8">
        <li>
          <Field className="flex flex-col gap-1">
            <Label> Zip Code </Label>
            <Input name="Zip Code" className="rounded-lg px-3.5 py-1.5 w-20" />
          </Field>
        </li>
      </ul>
    </form>
  );
}

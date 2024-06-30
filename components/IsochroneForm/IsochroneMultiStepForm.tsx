"use client";

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { FormStepItem, FormStepList } from "../ui/FormStep";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { COMMUTING_MODES, formSchema } from "./IsochroneFormTypings";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dynamic from "next/dynamic";

const MapboxSearch = dynamic(
  () =>
    import("../MapboxSearchBox/MapboxSearch").then((mod) => mod.MapboxSearch),
  { ssr: false }
);

const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function IsochroneMultiStepForm() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const { register, handleSubmit, control } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: 92707,
      commutingMode: "driving-traffic",
      firstCutoff: 15,
      secondCutoff: 30,
      thirdCutoff: 45,
      fourthCutoff: 60,
    },
  });

  const checkIfPreviousStepIsValid = () => {
    if (currentStep > 0) {
      return true;
    }
    return false;
  };

  const checkIfNextStepIsValid = () => {
    if (currentStep < 2) {
      return true;
    }
    return false;
  };

  const incrementStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const decrementStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <section className="h-4/5 w-4/5 p-4 bg-slate-400 rounded-lg shadow-lg max-w-6xl flex flex-col gap-4">
      <nav className="w-full h-32 bg-slate-100 rounded-lg">
        <FormStepList>
          <FormStepItem
            className="h-full w-1/3"
            variant={currentStep === 0 ? "active" : "default"}
          >
            <p></p>
          </FormStepItem>
          <FormStepItem
            className="h-full w-1/3"
            variant={currentStep === 1 ? "active" : "default"}
          >
            <p></p>
          </FormStepItem>
          <FormStepItem
            className="h-full w-1/3"
            variant={currentStep === 2 ? "active" : "default"}
          >
            <p></p>
          </FormStepItem>
        </FormStepList>
      </nav>
      <form className="w-full grow bg-slate-100 rounded-lg">
        <div className="size-full flex items-center justify-center">
          {currentStep === 0 && (
            <Field className="flex flex-col gap-1 w-64">
              <Label> Location </Label>
              <MapboxSearch accessToken={MAPBOX_ACCESS_TOKEN as string} />
            </Field>
          )}
          {currentStep === 1 && (
            <>
              <Controller
                control={control}
                defaultValue="driving-traffic"
                name="commutingMode"
                render={({ field }) => (
                  <RadioGroup className="space-y-2" {...field}>
                    <Label>Commuting Mode</Label>
                    {COMMUTING_MODES.map((mode) => (
                      <Radio
                        value={mode}
                        key={mode}
                        className="group relative flex cursor-pointer rounded-lg bg-slate-500 py-4 px-5 text-slate-50 transition data-[checked]:bg-slate-600 focus:outline-none data-[focus]:outline-1 data-[focus]:outline-slate-50"
                        {...register("commutingMode")}
                      >
                        <div className="flex ">
                          <span>{mode}</span>
                        </div>
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
              ></Controller>
              <Fieldset className="space-y-2">
                <Legend className="text-sm">
                  Cutoff Time (Minutes) <br />
                  Max 60 Minutes
                </Legend>
                <Field className="flex flex-row justify-between">
                  <Label className="text-lg font-semibold">First Cutoff</Label>
                  <Input
                    type="number"
                    className="rounded-lg px-3.5 py-1.5 w-16 bg-slate-500 text-slate-50"
                    defaultValue={15}
                    {...register("firstCutoff", {
                      min: 0,
                      max: 60,
                      valueAsNumber: true,
                    })}
                  />
                </Field>
                <Field className="flex flex-row justify-between">
                  <Label className="text-lg font-semibold">Second Cutoff</Label>
                  <Input
                    type="number"
                    className="rounded-lg px-3.5 py-1.5 w-16 bg-slate-500 text-slate-50"
                    defaultValue={30}
                    {...register("secondCutoff", {
                      min: 0,
                      max: 60,
                      valueAsNumber: true,
                    })}
                  />
                </Field>
                <Field className="flex flex-row justify-between">
                  <Label className="text-lg font-semibold">Third Cutoff</Label>
                  <Input
                    type="number"
                    className="rounded-lg px-3.5 py-1.5 w-16 bg-slate-500 text-slate-50"
                    defaultValue={45}
                    {...register("thirdCutoff", {
                      min: 0,
                      max: 60,
                      valueAsNumber: true,
                    })}
                  />
                </Field>
                <Field className="flex flex-row justify-between">
                  <Label className="text-lg font-semibold">Fourth Cutoff</Label>
                  <Input
                    type="number"
                    className="rounded-lg px-3.5 py-1.5 w-16 bg-slate-500 text-slate-50"
                    defaultValue={60}
                    {...register("fourthCutoff", {
                      min: 0,
                      max: 60,
                      valueAsNumber: true,
                    })}
                  />
                </Field>
              </Fieldset>
            </>
          )}
        </div>
      </form>
      <footer className="w-full h-32 bg-slate-100 rounded-lg flex flex-row p-4 items-center justify-between">
        <Button
          className="size-12 rounded-lg bg-green-200 disabled:cursor-events-none disabled:opacity-60  text-green-800 p-2"
          disabled={!checkIfPreviousStepIsValid()}
          onClick={decrementStep}
        >
          <ArrowLeftCircleIcon />
        </Button>
        <Button
          className="size-12 rounded-lg bg-green-200 disabled:cursor-events-none disabled:opacity-60 text-green-800 p-2"
          disabled={!checkIfNextStepIsValid()}
          onClick={incrementStep}
        >
          <ArrowRightCircleIcon />
        </Button>
      </footer>
    </section>
  );
  return;
}

"use client";

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { FormStepItem, FormStepList } from "../ui/FormStep";
import { Button } from "@headlessui/react";

export default function IsochroneMultiStepForm() {
  const [currentStep, setCurrentStep] = useState<number>(0);

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
      <form className="w-full grow bg-slate-100 rounded-lg"></form>
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

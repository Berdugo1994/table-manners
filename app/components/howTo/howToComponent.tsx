import { HowToDescription, HowToTitle, steps } from "./copy";
import { useState } from "react";
import HowToCarousel from "./carousel";

export default function HowToComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl font-bold">{HowToTitle}</div>
        <div className="text-sm">{HowToDescription}</div>
      </div>
      <HowToCarousel
        steps={steps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
}

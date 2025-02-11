import React from "react";
import { Step, Steps } from "../Types";

interface StepIndicatorProps {
  currentStep: Step;
  steps: Steps;
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {Object.entries(steps).map(([key, label], index) => (
          <div key={key} className="flex items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${currentStep === key ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-600"}
              `}
            >
              {index + 1}
            </div>
            <div className="hidden sm:block ml-2 text-sm font-medium text-gray-600">{label}</div>
            {index < Object.keys(steps).length - 1 && (
              <div className="hidden sm:block w-20 h-1 mx-4 bg-gray-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
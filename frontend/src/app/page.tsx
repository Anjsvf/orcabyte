"use client";
import React, { useState, useRef } from "react";
import { Calculator, ArrowRight, ArrowLeft } from "lucide-react";
import { Step, ProjectDetails } from "../Types";
import { StepIndicator } from "../Components/StepIndicator";
import { ProjectDetailsForm } from "../Components/ProjectDetailsForm";
import { ComplexitySelector } from "../Components/ComplexitySelector";
import { AIAnalysis } from "../Components/Aianalis";
import { BudgetResult } from "../Components/BudgetResult";

function App() {
  const [currentStep, setCurrentStep] = useState<Step>("details");
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    title: "",
    description: "",
    type: "web",
    deadline: "",
    hourlyRate: 50,
    currency: "BRL", 
    hasDesign: false, 
    willFreelancerDesign: false, 
    externalDesignerCost: 0, 
    hasServer: false, 
    willFreelancerSetupServer: false, 
    hostingCost: 0, 
    hasDomain: false, 
    domainCost: 0, 
  });
  const [complexity, setComplexity] = useState<number>(3);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const budgetImageRef = useRef<HTMLDivElement>(null);

  const steps = {
    details: "Detalhes do projeto",
    complexity: "Complexidade do Projeto",
    "ai-suggestion": "Sugestão",
    result: "Orçamento Final",
  };

  const handleNext = () => {
    const stepOrder: Step[] = ["details", "complexity", "ai-suggestion", "result"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ["details", "complexity", "ai-suggestion", "result"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${projectDetails.title} - Project Budget`,
        text: `Orçamento do Projeto Por R${
          projectDetails.title
        }\nTotal Estimate: $${projectDetails.hourlyRate * complexity * 40}`,
      });
      setShowShareSuccess(true);
      setTimeout(() => setShowShareSuccess(false), 3000);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="min-h-screen bg-purple-950">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-[#aba4d0d7] rounded-lg shadow-xl p-8">
          <div className="flex items-center mb-8">
            <Calculator className="w-8 h-8 text-purple-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Orçabyte</h1>
          </div>
          <StepIndicator currentStep={currentStep} steps={steps} />
          <div className="mt-8">
            {currentStep === "details" && (
              <ProjectDetailsForm
                projectDetails={projectDetails}
                setProjectDetails={setProjectDetails}
              />
            )}
            {currentStep === "complexity" && (
              <ComplexitySelector
                complexity={complexity}
                setComplexity={setComplexity}
              />
            )}
            {currentStep === "ai-suggestion" && (
              <AIAnalysis
                complexity={complexity}
                currency={projectDetails.currency}
                hourlyRate={projectDetails.hourlyRate}
                projectDetails={projectDetails}
              />
            )}
            {currentStep === "result" && (
              <BudgetResult
                projectDetails={projectDetails}
                complexity={complexity}
                budgetImageRef={budgetImageRef}
                onShare={handleShare}
                showShareSuccess={showShareSuccess}
              />
            )}
          </div>
          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === "details"}
              className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
                currentStep === "details"
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </button>
            {currentStep !== "result" && (
              <button
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
              >
                Próximo
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
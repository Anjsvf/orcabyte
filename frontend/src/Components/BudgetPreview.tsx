import React from "react";
import { Calculator } from "lucide-react";
import { ProjectDetails, ProjectFactors } from "../Types";
import {
  convertCurrency,
  formatCurrency,
  calculateDaysDifference,
  applyUrgencyFactor,
} from "../utils/CurrencyUtils";

interface BudgetPreviewProps {
  projectDetails: ProjectDetails | null;
  complexity: number;
  budgetImageRef: React.RefObject<HTMLDivElement | null>;
}

export function BudgetPreview({
  projectDetails,
  complexity,
  budgetImageRef,
}: BudgetPreviewProps) {
  if (!projectDetails) {
    return <p className="text-red-500">Os detalhes do projeto não estão disponíveis.</p>;
  }

  const daysDifference = calculateDaysDifference(projectDetails.deadline);

 
  const calculateTotalCost = () => {
    const factors = ProjectFactors[projectDetails.type];
    let cost = 0;

  
    cost += (complexity / 5) * projectDetails.hourlyRate * factors.baseHours;

    
    if (!projectDetails.hasDesign) {
      if (projectDetails.willFreelancerDesign) {
        cost += factors.designHours * projectDetails.hourlyRate;
      } else {
        cost += projectDetails.externalDesignerCost;
      }
    }

    if (["web"].includes(projectDetails.type)) {
      if (!projectDetails.hasServer) {
        if (projectDetails.willFreelancerSetupServer) {
          cost += factors.serverSetupHours * projectDetails.hourlyRate;
        } else {
          cost += projectDetails.hostingCost;
        }
      }
    }

    if (["web"].includes(projectDetails.type)) {
      if (!projectDetails.hasDomain) {
        cost += projectDetails.domainCost;
      }
    }

    // Aplicar fator de urgência com base na diferença de dias
    cost = applyUrgencyFactor(daysDifference, cost);

    // Converter moeda
    return convertCurrency(cost, "USD", projectDetails.currency);
  };

  return (
    <div
      ref={budgetImageRef}
      className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-8 rounded-lg border border-blue-100 shadow-lg"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <Calculator className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Proposta de Orçamento do Projeto
          </h2>
        </div>
        <div className="text-sm text-gray-500">
          Gerado em {new Date().toLocaleDateString()}
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-4">
          {projectDetails.title}
        </h3>
        <p className="text-gray-600 mb-4">{projectDetails.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Tipo de projeto:</span>
            <span className="ml-2 font-medium">{projectDetails.type}</span>
          </div>
          <div>
            <span className="text-gray-500">Prazo final:</span>
            <span className="ml-2 font-medium">{projectDetails.deadline}</span>
          </div>
          <div>
            <span className="text-gray-500">Complexidade:</span>
            <span className="ml-2 font-medium">{complexity}/5</span>
          </div>
          <div>
            <span className="text-gray-500">Taxa horária:</span>
            <span className="ml-2 font-medium">
              {formatCurrency(projectDetails.hourlyRate, projectDetails.currency)}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Diferença de Dias:</span>
            <span className="ml-2 font-medium">{daysDifference} dias</span>
          </div>
          <div>
            <span className="text-gray-500">Fator de Urgência:</span>
            <span className="ml-2 font-medium">
              {daysDifference <= 15 ? "50%" : daysDifference <= 30 ? "20%" : "Nenhum"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-purple-600 text-white rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h4 className="text-lg font-semibold mb-1">Estimativa de orçamento total</h4>
            <p className="text-sm opacity-80">Com base na complexidade e na taxa horária</p>
          </div>
          <div className="text-2xl sm:text-3xl font-bold">
            {formatCurrency(calculateTotalCost(), projectDetails.currency)}
          </div>
        </div>
      </div>
    </div>
  );
}
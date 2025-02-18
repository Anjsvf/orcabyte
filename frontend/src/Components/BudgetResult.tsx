import React from "react";
import {  Download } from "lucide-react";
import { ProjectDetails } from "../Types";
import { BudgetPreview } from "./BudgetPreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { convertCurrency } from "../utils/CurrencyUtils";
import { ProjectFactors } from "../Types";
import { calculateDaysDifference, applyUrgencyFactor } from "../utils/CurrencyUtils";

const formatCurrency = (value: number, currency: string) => {
  if (currency === "BRL") {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
  return currency === "USD" ? `$${value.toFixed(2)}` : `R$${value.toFixed(2)}`;
};

interface BudgetResultProps {
  projectDetails: ProjectDetails;
  complexity: number;
  budgetImageRef: React.RefObject<HTMLDivElement | null>;
  onShare: () => void;
  showShareSuccess: boolean;
}

export function BudgetResult({
  projectDetails,
  complexity,
  budgetImageRef,
 
  showShareSuccess,
}: BudgetResultProps) {
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
    const daysDifference = calculateDaysDifference(projectDetails.deadline);
    cost = applyUrgencyFactor(daysDifference, cost);

    // Converter moeda
    const convertedCost = convertCurrency(cost, "USD", projectDetails.currency);
    return convertedCost;
  };

  const handleExportAsImage = async () => {
    if (budgetImageRef.current) {
      const canvas = await html2canvas(budgetImageRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const image = canvas.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.href = image;
      link.download = `${projectDetails.title}-budget.png`;
      link.click();
    }
  };

  const handleExportAsPDF = async () => {
    if (budgetImageRef.current) {
      const canvas = await html2canvas(budgetImageRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const pageWidth = 210; 
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = (canvasHeight * pageWidth) / canvasWidth;
      const pdf = new jsPDF('p', 'mm', 'a4');

      if (imgHeight > pageHeight) {
        const newImgWidth = (canvasWidth * pageHeight) / canvasHeight;
        const newImgHeight = pageHeight;
        const xOffset = (pageWidth - newImgWidth) / 2;
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          xOffset,
          0,
          newImgWidth,
          newImgHeight
        );
      } else {
        const yOffset = (pageHeight - imgHeight) / 2;
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          0,
          yOffset,
          imgWidth,
          imgHeight
        );
      }

      pdf.save(`${projectDetails.title}-budget.pdf`);
    }
  };

  
  const daysDifference = calculateDaysDifference(projectDetails.deadline);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
          Resumo do Orçamento
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Detalhes do Projeto</h4>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Título</dt>
                <dd className="text-gray-900">{projectDetails.title}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Tipo</dt>
                <dd className="text-gray-900">{projectDetails.type}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Prazo Final</dt>
                <dd className="text-gray-900">{projectDetails.deadline}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Diferença de Dias</dt>
                <dd className="text-gray-900">{daysDifference} dias</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Fator de Urgência</dt>
                <dd className="text-gray-900">
                  {daysDifference <= 15 ? "50%" : daysDifference <= 30 ? "20%" : "Nenhum"}
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Divisão de Custos</h4>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Taxa Horária</dt>
                <dd className="text-gray-900">
                  {formatCurrency(projectDetails.hourlyRate, projectDetails.currency)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Fator de Complexidade</dt>
                <dd className="text-gray-900">{complexity}/5</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Estimativa Total</dt>
                <dd className="text-xl sm:text-2xl font-bold text-purple-600">
                  {formatCurrency(calculateTotalCost(), projectDetails.currency)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">
          Visualização do Orçamento Compartilhável
        </h4>
        <BudgetPreview
          projectDetails={projectDetails}
          complexity={complexity}
          budgetImageRef={budgetImageRef}
        />
        <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
         
          <button
            onClick={handleExportAsImage}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporte em Imagem
          </button>
          <button
            onClick={handleExportAsPDF}
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Download className="w-4 h-4 mr-2" />
            Exporte em PDF
          </button>
        </div>
        {showShareSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-700 px-4 py-2 rounded-lg shadow-lg flex items-center">
            <span className="mr-2">Compartilhado com sucesso!</span>
          </div>
        )}
      </div>
    </div>
  );
}
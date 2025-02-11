import React from "react";
import { Brain } from "lucide-react";

interface AIAnalysisProps {
  complexity: number;
  currency: "USD" | "BRL";
  hourlyRate: number; 
}

export function AIAnalysis({ complexity, currency, hourlyRate }: AIAnalysisProps) {
  const getTimeline = () => {
    if (complexity <= 2) return "2-4 Semanas";
    if (complexity <= 4) return "4-6 Semanas";
    return "6-8 Semanas";
  };

  const getEstimatedHours = () => {
    if (complexity <= 2) return 40;
    if (complexity <= 4) return 80; 
    return 120; 
  };

  const getBudgetRange = () => {
    const estimatedHours = getEstimatedHours();
    const totalCost = estimatedHours * hourlyRate;

    
    return `${currency === "USD" ? "$" : "R$"}${totalCost.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="animate-pulse">
        <div className="bg-blue-100 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-lg font-medium text-purple-600">Análise de Orçamento de IA</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded">
              <h4 className="font-medium text-gray-900 mb-2">Cronograma Estimado</h4>
              <p className="text-gray-600">{getTimeline()}</p>
            </div>
            <div className="bg-white p-4 rounded">
              <h4 className="font-medium text-gray-900 mb-2">Faixa de Orçamento Sugerida</h4>
              <p className="text-gray-600">{getBudgetRange()}</p>
            </div>
            <div className="bg-white p-4 rounded">
              <h4 className="font-medium text-gray-900 mb-2">Análise de Mercado</h4>
              <p className="text-gray-600">
                Com base nas taxas atuais de mercado e na complexidade do projeto ({complexity}/5).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
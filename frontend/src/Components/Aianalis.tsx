import React, { useState } from "react";
import { Brain, ChevronDown, ChevronUp } from "lucide-react";

interface AIAnalysisProps {
  complexity: number;
  currency: "USD" | "BRL";
  hourlyRate: number;
  language?: "pt" | "en";
  estimatedHours?: number; // Add optional custom hours
}

export function AIAnalysis({ 
  complexity, 
  currency, 
  hourlyRate,
  language = "pt",
  estimatedHours 
}: AIAnalysisProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  const getTimeline = () => {
    if (complexity <= 2) return language === "pt" ? "2-4 Semanas" : "2-4 Weeks";
    if (complexity <= 4) return language === "pt" ? "4-6 Semanas" : "4-6 Weeks";
    return language === "pt" ? "6-8 Semanas" : "6-8 Weeks";
  };

  const getEstimatedHours = () => {
    // Use provided hours if available
    if (estimatedHours !== undefined) {
      return estimatedHours;
    }
    
    // Default calculation
    if (complexity <= 2) return 40;
    if (complexity <= 4) return 80; 
    return 120; 
  };

  const getBudgetRange = () => {
    const hours = getEstimatedHours();
    const totalCost = hours * hourlyRate;
    
    return `${currency === "USD" ? "$" : "R$"}${totalCost.toLocaleString()}`;
  };

  const texts = {
    title: language === "pt" ? "Análise de Orçamento de IA" : "AI Budget Analysis",
    timeline: language === "pt" ? "Cronograma Estimado" : "Estimated Timeline",
    budget: language === "pt" ? "Faixa de Orçamento Sugerida" : "Suggested Budget Range",
    market: language === "pt" ? "Análise de Mercado" : "Market Analysis",
    marketText: language === "pt" 
      ? `Com base nas taxas atuais de mercado e na complexidade do projeto (${complexity}/5).`
      : `Based on current market rates and project complexity (${complexity}/5).`,
    details: language === "pt" ? "Ver detalhes" : "View details",
    hideDetails: language === "pt" ? "Ocultar detalhes" : "Hide details",
    hours: language === "pt" ? "Horas estimadas" : "Estimated hours",
    rate: language === "pt" ? "Taxa horária" : "Hourly rate",
  };

  return (
    <div className="space-y-6">
      <div className="hover:animate-pulse">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-lg font-medium text-purple-600">{texts.title}</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded">
              <h4 className="font-medium text-gray-900 mb-2">{texts.timeline}</h4>
              <p className="text-gray-600">{getTimeline()}</p>
            </div>
            <div className="bg-white p-4 rounded">
              <h4 className="font-medium text-gray-900 mb-2">{texts.budget}</h4>
              <p className="text-gray-600">{getBudgetRange()}</p>
            </div>
            <div className="bg-white p-4 rounded">
              <h4 className="font-medium text-gray-900 mb-2">{texts.market}</h4>
              <p className="text-gray-600">{texts.marketText}</p>
            </div>
            
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
            >
              {showDetails ? <ChevronUp className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
              {showDetails ? texts.hideDetails : texts.details}
            </button>
            
            {showDetails && (
              <div className="bg-white p-4 rounded mt-2 border border-purple-100">
                <h4 className="font-medium text-gray-900 mb-2">{texts.hours}</h4>
                <p className="text-gray-600">{getEstimatedHours()} h</p>
                <h4 className="font-medium text-gray-900 mb-2 mt-4">{texts.rate}</h4>
                <p className="text-gray-600">{currency === "USD" ? "$" : "R$"}{hourlyRate}/h</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
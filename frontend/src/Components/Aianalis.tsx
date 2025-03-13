import React, { useState, useEffect, useCallback } from "react";
import { Brain, ChevronDown, ChevronUp, Lightbulb, RefreshCw } from "lucide-react";
import { ProjectDetails } from "../Types"; 

interface AIAnalysisProps {
  complexity: number;
  currency: "USD" | "BRL";
  hourlyRate: number;
  language?: "pt" | "en";
  estimatedHours?: number;
  projectDetails?: ProjectDetails | null; 
}

export function AIAnalysis({ 
  complexity, 
  currency, 
  hourlyRate,
  language = "pt",
  estimatedHours,
  projectDetails = null
}: AIAnalysisProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [aiTip, setAiTip] = useState<string>("");
  const [loadingTip, setLoadingTip] = useState<boolean>(false);
  

  const getTimeline = useCallback(() => {
    if (complexity <= 2) return language === "pt" ? "2-4 Semanas" : "2-4 Weeks";
    if (complexity <= 4) return language === "pt" ? "4-6 Semanas" : "4-6 Weeks";
    return language === "pt" ? "6-8 Semanas" : "6-8 Weeks";
  }, [complexity, language]);

  const getEstimatedHours = useCallback(() => {
    if (estimatedHours !== undefined) {
      return estimatedHours;
    }
    
    if (complexity <= 2) return 40;
    if (complexity <= 4) return 80; 
    return 120; 
  }, [complexity, estimatedHours]);

  const getBudgetRange = useCallback(() => {
    const hours = getEstimatedHours();
    const totalCost = hours * hourlyRate;
    
    return `${currency === "USD" ? "$" : "R$"}${totalCost.toLocaleString('en-US')}`;
  }, [currency, hourlyRate, getEstimatedHours]);


  const fetchAITip = useCallback(async () => {
    setLoadingTip(true);
    try {
      const hours = getEstimatedHours();
      const budget = hours * hourlyRate;
      
      
      let projectContext = "";
      if (projectDetails) {
        projectContext = language === "pt" 
          ? `Título do projeto: ${projectDetails.title}. 
             Descrição: ${projectDetails.description}. 
             Tipo: ${projectDetails.type}. 
             Prazo: ${projectDetails.deadline}.`
          : `Project title: ${projectDetails.title}. 
             Description: ${projectDetails.description}. 
             Type: ${projectDetails.type}. 
             Deadline: ${projectDetails.deadline}.`;
             
      
        if (projectDetails.hasDesign !== undefined) {
          projectContext += language === "pt"
            ? ` O cliente ${projectDetails.hasDesign ? 'já tem' : 'não tem'} design.`
            : ` The client ${projectDetails.hasDesign ? 'already has' : 'does not have'} design.`;
        }
        
        if (projectDetails.hasServer !== undefined && ["web", "fullstack"].includes(projectDetails.type)) {
          projectContext += language === "pt"
            ? ` O cliente ${projectDetails.hasServer ? 'já tem' : 'não tem'} servidor.`
            : ` The client ${projectDetails.hasServer ? 'already has' : 'does not have'} a server.`;
        }
        
        if (projectDetails.hasDomain !== undefined && ["web", "fullstack"].includes(projectDetails.type)) {
          projectContext += language === "pt"
            ? ` O cliente ${projectDetails.hasDomain ? 'já tem' : 'não tem'} domínio.`
            : ` The client ${projectDetails.hasDomain ? 'already has' : 'does not have'} a domain.`;
        }
      }
      
      const prompt = language === "pt" 
        ? `Com base nas seguintes informações do projeto: ${projectContext} 
           Complexidade: ${complexity}/5. 
           Orçamento: ${currency === "USD" ? "$" : "R$"}${budget}. 
           Prazo: ${getTimeline()}.
           
           Dê uma dica profissional específica e útil sobre como gerenciar este projeto com eficiência, considerando suas características particulares.`
        : `Based on the following project information: ${projectContext} 
           Complexity: ${complexity}/5. 
           Budget: ${currency === "USD" ? "$" : "R$"}${budget}. 
           Timeline: ${getTimeline()}.
           
           Give a specific and useful professional tip on how to efficiently manage this project, considering its particular characteristics.`;
      
      const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY}`
        },
        body: JSON.stringify({ 
          inputs: prompt,
          parameters: {
            max_new_tokens: 1000,
            temperature: 0.7,
            top_p: 0.95,
            return_full_text: false
          }
        })
      });
      
      const result = await response.json();
      
     
      let tipText = "";
      if (Array.isArray(result) && result.length > 0 && result[0].generated_text) {
        tipText = result[0].generated_text.trim();
      } else if (typeof result === 'object' && result.generated_text) {
        tipText = result.generated_text.trim();
      }
      
      if (tipText) {
        setAiTip(tipText);
      } else {
        setAiTip(language === "pt" 
          ? "Mantenha uma comunicação clara e constante com o cliente para garantir o alinhamento de expectativas."
          : "Maintain clear and constant communication with the client to ensure alignment of expectations.");
      }
    } catch (error) {
      console.error("Error fetching AI tip:", error);
      setAiTip(language === "pt" 
        ? "Mantenha uma comunicação clara e constante com o cliente para garantir o alinhamento de expectativas."
        : "Maintain clear and constant communication with the client to ensure alignment of expectations.");
    } finally {
      setLoadingTip(false);
    }
  }, [complexity, currency, hourlyRate, language, getEstimatedHours, getTimeline, projectDetails]);


  useEffect(() => {
    fetchAITip();
  }, [fetchAITip]);

  
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
    aiTip: language === "pt" ? "Dica de IA" : "AI Tip",
    refreshTip: language === "pt" ? "Atualizar dica" : "Refresh tip",
    loading: language === "pt" ? "Carregando..." : "Loading...",
    projectContext: language === "pt" ? "Contexto do Projeto" : "Project Context",
  };

 
  return (
    <div className="space-y-6">
      <div className="hover:animate-pulse">
        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-lg font-medium text-purple-600">{texts.title}</h3>
          </div>
          
      
          {projectDetails && (
            <div className="bg-white p-4 rounded mb-4">
              <h4 className="font-medium text-gray-900 mb-2">{texts.projectContext}</h4>
              <p className="text-gray-600 mb-2">{projectDetails.title}</p>
              <p className="text-gray-500 text-sm">{projectDetails.description}</p>
            </div>
          )}
          
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
            
            {/* AI Tip Section */}
            <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
                  <h4 className="font-medium text-gray-900">{texts.aiTip}</h4>
                </div>
                <button 
                  onClick={fetchAITip}
                  disabled={loadingTip}
                  className="text-sm px-2 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded transition-colors flex items-center"
                >
                  {loadingTip ? (
                    <span className="flex items-center">
                      <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                      {texts.loading}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <RefreshCw className="w-3 h-3 mr-1" />
                      {texts.refreshTip}
                    </span>
                  )}
                </button>
              </div>
              <p className="text-gray-700 italic">
                {loadingTip ? (
                  <span className="flex items-center justify-center py-2">
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    {texts.loading}
                  </span>
                ) : aiTip}
              </p>
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
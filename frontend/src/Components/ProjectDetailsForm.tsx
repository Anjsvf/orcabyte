import React, { useState } from 'react';
import { ProjectDetails, ProjectType } from "../Types";
import {
  Calendar,
  Clock,
  CreditCard,
  Globe,
  Layout,
  Paintbrush,
  Server,
  Type,
  User,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../Components/ui/card";

interface ProjectDetailsFormProps {
  projectDetails: ProjectDetails;
  setProjectDetails: (details: ProjectDetails) => void;
}

interface StepProps {
  projectDetails: ProjectDetails;
  updateField: <K extends keyof ProjectDetails>(field: K, value: ProjectDetails[K]) => void;
  errors: Record<string, string>;
}


const BasicInformationStep: React.FC<StepProps> = ({ projectDetails, updateField, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Type className="w-5 h-5 mr-2 text-purple-600" />
          Título do projeto
        </label>
        <input
          type="text"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600 ${
            errors.title ? 'border-red-500' : ''
          }`}
          value={projectDetails.title}
          onChange={(e) => updateField('title', e.target.value)}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Layout className="w-5 h-5 mr-2 text-purple-600" />
          Descrição do Projeto
        </label>
        <textarea
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600 ${
            errors.description ? 'border-red-500' : ''
          }`}
          rows={4}
          value={projectDetails.description}
          onChange={(e) => updateField('description', e.target.value)}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-purple-600" />
          Tipo de projeto
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600"
          value={projectDetails.type}
          onChange={(e) => updateField('type', e.target.value as ProjectType)}
        >
          <option value="web">Aplicativo Web</option>
          <option value="mobile">Aplicativo Móvel</option>
          <option value="desktop">Software de Área de Trabalho</option>
          <option value="other">Outros</option>
        </select>
      </div>
    </div>
  );
};


const PrazoCustoStep: React.FC<StepProps> = ({ projectDetails, updateField, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-600" />
          Prazo Final
        </label>
        <input
          type="date"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600 ${
            errors.deadline ? 'border-red-500' : ''
          }`}
          value={projectDetails.deadline}
          onChange={(e) => updateField('deadline', e.target.value)}
        />
        {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-purple-600" />
          Taxa Horária ({projectDetails.currency})
        </label>
        <input
          type="number"
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600 ${
            errors.hourlyRate ? 'border-red-500' : ''
          }`}
          value={projectDetails.hourlyRate}
          onChange={(e) => updateField('hourlyRate', Number(e.target.value))}
        />
        {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
          Moeda
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600"
          value={projectDetails.currency}
          onChange={(e) => updateField('currency', e.target.value as "USD" | "BRL")}
        >
          <option value="USD">USD (Dólar)</option>
          <option value="BRL">BRL (Real Brasileiro)</option>
        </select>
      </div>
    </div>
  );
};


const DesignStep: React.FC<StepProps> = ({ projectDetails, updateField, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Paintbrush className="w-5 h-5 mr-2 text-purple-600" />
          O cliente já possui um design?
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600"
          value={projectDetails.hasDesign.toString()}
          onChange={(e) => updateField('hasDesign', e.target.value === "true")}
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>
      {!projectDetails.hasDesign && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <User className="w-5 h-5 mr-2 text-purple-600" />
              Você criará o design?
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600"
              value={projectDetails.willFreelancerDesign.toString()}
              onChange={(e) => updateField('willFreelancerDesign', e.target.value === "true")}
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
          {!projectDetails.willFreelancerDesign && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Paintbrush className="w-5 h-5 mr-2 text-purple-600" />
                Custo de design externo ({projectDetails.currency})
              </label>
              <input
                type="number"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600 ${
                  errors.externalDesignerCost ? 'border-red-500' : ''
                }`}
                value={projectDetails.externalDesignerCost}
                onChange={(e) => updateField('externalDesignerCost', Number(e.target.value))}
              />
              {errors.externalDesignerCost && (
                <p className="text-red-500 text-sm mt-1">{errors.externalDesignerCost}</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};


const InfraestruturaStep: React.FC<StepProps> = ({ projectDetails, updateField, errors }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Server className="w-5 h-5 mr-2 text-purple-600" />
          O cliente já possui um servidor?
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600"
          value={projectDetails.hasServer.toString()}
          onChange={(e) => updateField('hasServer', e.target.value === "true")}
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>
      {!projectDetails.hasServer && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Server className="w-5 h-5 mr-2 text-purple-600" />
              Você configurará o servidor?
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600"
              value={projectDetails.willFreelancerSetupServer.toString()}
              onChange={(e) => updateField('willFreelancerSetupServer', e.target.value === "true")}
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
          {!projectDetails.willFreelancerSetupServer && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Server className="w-5 h-5 mr-2 text-purple-600" />
                Custo de hospedagem ({projectDetails.currency})
              </label>
              <input
                type="number"
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600 ${
                  errors.hostingCost ? 'border-red-500' : ''
                }`}
                value={projectDetails.hostingCost}
                onChange={(e) => updateField('hostingCost', Number(e.target.value))}
              />
              {errors.hostingCost && <p className="text-red-500 text-sm mt-1">{errors.hostingCost}</p>}
            </div>
          )}
        </>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
          <Globe className="w-5 h-5 mr-2 text-purple-600" />
          O cliente já possui um domínio?
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600"
          value={projectDetails.hasDomain.toString()}
          onChange={(e) => updateField('hasDomain', e.target.value === "true")}
        >
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>
      {!projectDetails.hasDomain && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Globe className="w-5 h-5 mr-2 text-purple-600" />
            Custo de domínio ({projectDetails.currency})
          </label>
          <input
            type="number"
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 focus:border-purple-600 focus:ring-purple-600 ${
              errors.domainCost ? 'border-red-500' : ''
            }`}
            value={projectDetails.domainCost}
            onChange={(e) => updateField('domainCost', Number(e.target.value))}
          />
          {errors.domainCost && <p className="text-red-500 text-sm mt-1">{errors.domainCost}</p>}
        </div>
      )}
    </div>
  );
};



export function ProjectDetailsForm({ projectDetails, setProjectDetails }: ProjectDetailsFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

 
  const updateField = <K extends keyof ProjectDetails>(field: K, value: ProjectDetails[K]) => {
    setProjectDetails({ ...projectDetails, [field]: value });
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

 
  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 0:
        if (!projectDetails.title.trim()) {
          newErrors.title = "Título do projeto é obrigatório";
        }
        if (!projectDetails.description.trim()) {
          newErrors.description = "Descrição do projeto é obrigatória";
        }
        break;
      case 1:
        if (!projectDetails.deadline) {
          newErrors.deadline = "Prazo final é obrigatório";
        } else {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const deadlineDate = new Date(projectDetails.deadline);
          if (deadlineDate < today) {
            newErrors.deadline = "Prazo deve ser uma data futura";
          }
        }
        if (!projectDetails.hourlyRate || projectDetails.hourlyRate <= 0) {
          newErrors.hourlyRate = "Taxa horária inválida";
        }
        break;
      case 2:
        if (!projectDetails.hasDesign) {
          if (!projectDetails.willFreelancerDesign) {
            if (!projectDetails.externalDesignerCost || projectDetails.externalDesignerCost <= 0) {
              newErrors.externalDesignerCost = "Custo de designer externo é obrigatório";
            }
          }
        }
        break;
      case 3:
        if (!projectDetails.hasServer) {
          if (!projectDetails.willFreelancerSetupServer) {
            if (!projectDetails.hostingCost || projectDetails.hostingCost <= 0) {
              newErrors.hostingCost = "Custo de hospedagem é obrigatório";
            }
          }
        }
        if (!projectDetails.hasDomain) {
          if (!projectDetails.domainCost || projectDetails.domainCost <= 0) {
            newErrors.domainCost = "Custo de domínio é obrigatório";
          }
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => Math.min(steps.length - 1, prev + 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
    setErrors({});
  };

  
  const steps = [
    {
      title: "Informações Básicas",
      description: "Detalhes essenciais do projeto",
      component: <BasicInformationStep projectDetails={projectDetails} updateField={updateField} errors={errors} />,
    },
    {
      title: "Prazos e Custos",
      description: "Definição de prazos e valores",
      component: <PrazoCustoStep projectDetails={projectDetails} updateField={updateField} errors={errors} />,
    },
    {
      title: "Design",
      description: "Informações sobre o design do projeto",
      component: <DesignStep projectDetails={projectDetails} updateField={updateField} errors={errors} />,
    },
    {
      title: "Infraestrutura",
      description: "Configurações de servidor e domínio",
      
      condition: ["web"].includes(projectDetails.type),
      component: <InfraestruturaStep projectDetails={projectDetails} updateField={updateField} errors={errors} />,
    },
  ].filter(step => step.condition === undefined || step.condition);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{steps[currentStep].title}</CardTitle>
        <CardDescription>{steps[currentStep].description}</CardDescription>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </CardHeader>

      <CardContent>
        {steps[currentStep].component}
      </CardContent>

      <CardFooter className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Anterior
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 disabled:opacity-50"
        >
          {currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </CardFooter>
    </Card>
  );
}

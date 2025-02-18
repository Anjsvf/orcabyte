import React from 'react';

interface ComplexitySelectorProps {
  complexity: number;
  setComplexity: (complexity: number) => void;
}

export function ComplexitySelector({ complexity, setComplexity }: ComplexitySelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-4">
        Nível de complexidade do projeto (1-5)
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={complexity}
          onChange={(e) => setComplexity(Number(e.target.value))}
          className="w-full h-2 bg-purple-600 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Simples</span>
          <span>Moderado</span>
          <span>Complexo</span>
        </div>
      </div>
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nível de complexidade {complexity}</h3>
        <p className="text-gray-600">
          {complexity === 1 && "Projeto básico com recursos mínimos e implementação simples."}
          {complexity === 2 && "Projeto simples com alguns recursos customizados e integrações básicas."}
          {complexity === 3 && "Complexidade moderada com vários recursos e integrações de terceiros."}
          {complexity === 4 && "Projeto complexo com recursos avançados e arquitetura sofisticada."}
          {complexity === 5 && "Projeto de alta complexidade com tecnologia de ponta e ampla customização."}
        </p>
      </div>
    </div>
  );
}
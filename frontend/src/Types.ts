export type Step = "details" | "complexity" | "ai-suggestion" | "result";
export type ProjectType = "web" | "mobile" | "desktop" | "other";

export interface ProjectDetails {
  title: string;
  description: string;
  type: ProjectType;
  deadline: string;
  hourlyRate: number;
  currency: "USD" | "BRL";
  hasDesign: boolean;
  willFreelancerDesign: boolean;
  externalDesignerCost: number;
  hasServer: boolean;
  willFreelancerSetupServer: boolean;
  hostingCost: number;
  hasDomain: boolean;
  domainCost: number;
}


export type Steps = Record<Step, string>;


export const ProjectFactors = {
  web: {
    baseHours: 20,
    designHours: 10,
    serverSetupHours: 5,
    domainCost: 15,
    externalDesignerCost: 500,
    hostingCost: 200,
  },
  mobile: {
    baseHours: 100,
    designHours: 20,
    serverSetupHours: 15,
    domainCost: 0,
    externalDesignerCost: 1000,
    hostingCost: 500,
  },
  desktop: {
    baseHours: 80,
    designHours: 15,
    serverSetupHours: 0,
    domainCost: 0,
    externalDesignerCost: 600,
    hostingCost: 0,
  },
  other: {
    baseHours: 40,
    designHours: 10,
    serverSetupHours: 5,
    domainCost: 0,
    externalDesignerCost: 300,
    hostingCost: 100,
  },
};
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProjectDetails } from '../Types';

interface ProjectContextType {
  projectDetails: ProjectDetails | null;
  updateProjectDetails: (details: ProjectDetails) => void;
  clearProjectDetails: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(null);

  const updateProjectDetails = (details: ProjectDetails) => {
    setProjectDetails(details);
  };

  const clearProjectDetails = () => {
    setProjectDetails(null);
  };

  return (
    <ProjectContext.Provider value={{ projectDetails, updateProjectDetails, clearProjectDetails }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
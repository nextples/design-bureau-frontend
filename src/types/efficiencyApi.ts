
export interface ProjectEfficiencyDTO {
  project: {
    id: string;
    name: string;
    description: string;
    status: string;
    responsibleDepartmentId: string;
    startDate: string;
    endDate: string | null;
    cost: number;
    internalProgress: number;
    totalProgress: number;
    employeeIds: string[] | null;
    equipmentIds: string[] | null;
    contractIds: string[] | null;
    subcontractorWorks: any[] | null;
  };
  costPerDay: number;
}

export interface ContractEfficiencyDTO {
  contract: {
    contractId: string;
    name: string;
    startDate: string;
    endDate: string | null;
    managerId: string;
    projectIds: string[] | null;
  };
  costPerDay: number;
}

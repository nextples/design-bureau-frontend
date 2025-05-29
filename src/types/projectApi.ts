
export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface ProjectCreateDTO {
  name: string;
  description?: string;
  responsibleDepartmentId: string;
  cost: number;
}

export interface ProjectUpdateDTO {
  name?: string;
  description?: string;
  responsibleDepartmentId?: string;
  cost?: number;
}

export interface SubcontractorWorkDTO {
  id: string;
  workPercentage: number;
  progress: number;
  cost: number;
  project: ProjectDTO;
  subcontractor: SubcontractorDTO;
}

export interface ProjectDTO {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  responsibleDepartmentId: string;
  cost?: number;
  startDate?: string;
  endDate?: string;
  internalProgress: number;
  totalProgress: number;
  employeeIds?: string[];
  equipmentIds?: string[];
  contractIds?: string[];
  subcontractorWorks?: SubcontractorWorkDTO[];
}

export interface SubcontractorCreateDTO {
  companyName: string;
  email?: string;
  phoneNumber?: string;
}

export interface SubcontractorUpdateDTO {
  companyName?: string;
  email?: string;
  phoneNumber?: string;
}

export interface SubcontractorDTO {
  id: string;
  companyName: string;
  email?: string;
  phoneNumber?: string;
  works?: SubcontractorWorkDTO[];
}

export interface AddEquipmentRequestDTO {
  equipmentIds: string[];
  purpose: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

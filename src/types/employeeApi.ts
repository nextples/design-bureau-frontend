import {EquipmentDTO} from "./equipmentApi.ts";

export type EmployeeType = 'ENGINEER' | 'DESIGNER' | 'TECHNICIAN' | 'LAB_ASSISTANT';

export interface PositionDTO {
  id: string;
  name: string;
}

export interface EngineerSpecializationDTO {
  id: string;
  name: string;
}

export interface LaboratoryDTO {
  id: string;
  name: string;
}

export interface DepartmentDTO {
  id: string;
  name: string;
  totalEmployees?: number;
  head?: EmployeeDTO;
  employees?: EmployeeDTO[];
}

export interface EmployeeDTO {
  id: string;
  firstName: string;
  lastName: string;
  position: PositionDTO;
  employeeType: EmployeeType;
  age?: number;
  department?: DepartmentDTO;
  managedDepartment?: DepartmentDTO;
  specializations?: EngineerSpecializationDTO[];
  patentsCount?: number;
  laboratory?: LaboratoryDTO;
  assignedEquipment?: EquipmentDTO[];
}

export interface DepartmentCreateDTO {
  name: string;
  headId?: string;
}

export interface DepartmentUpdateDTO {
  name?: string;
  headId?: string | null;
}

export interface EmployeeCreateDTO {
  firstName: string;
  lastName: string;
  age: number;
  employeeType: EmployeeType;
  positionId: string;
  departmentId: string;
  patentsCount?: number;
  specializationIds?: string[];
  laboratoryId?: string;
  equipmentIds?: string[];
}

export interface EmployeeUpdateDTO {
  firstName?: string;
  lastName?: string;
  age?: number;
  employeeType?: EmployeeType;
  positionId?: string;
  departmentId?: string;
  patentsCount?: number;
  specializationIds?: string[];
  laboratoryId?: string;
  equipmentIds?: string[];
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

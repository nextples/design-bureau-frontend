
export interface EquipmentTypeDTO {
    id: string;
    name: string;
    description: string;
    category: string;
}

export interface AssignmentDTO {
    id: string;
    equipment: EquipmentDTO;
    departmentId: string;
    projectId: string;
    startDate: string;
    endDate?: string;
    hoursUsed?: number;
    purpose: string;
}

export interface AssignmentRequestDTO {
    projectId: string;
    responsibleDepartmentId: string;
    purpose: string;
}

export interface ReturnRequestDTO {
    hoursUsed: number;
}

export interface EquipmentDTO {
    id: string;
    name: string;
    currentDepartmentId?: string;
    currentProjectId?: string;
    equipmentType: EquipmentTypeDTO;
    serialNumber?: string;
    purchaseDate?: string;
    isShared?: boolean;
    isAvailable?: boolean;
    assignments?: AssignmentDTO[];
}

export interface EquipmentCreateDTO {
    name: string;
    serialNumber?: string;
    equipmentTypeId: string;
    purchaseDate?: string;
    ownerDepartmentId?: string;
}

export interface EquipmentUpdateDTO {
    name?: string;
    serialNumber?: string;
    equipmentTypeId?: string;
    purchaseDate?: string;
    ownerDepartmentId?: string;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

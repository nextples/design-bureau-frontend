import {
    AssignmentDTO,
    AssignmentRequestDTO,
    EquipmentCreateDTO,
    EquipmentDTO,
    EquipmentTypeDTO,
    EquipmentUpdateDTO,
    PageResponse, ReturnRequestDTO
} from "../types/equipmentApi.ts";
import {ClientApi} from "./clientApi.ts";

const API_BASE_URL = 'http://localhost:8082/api/v1';

class EquipmentApi extends ClientApi {
    // Equipment API
    async getEquipment(filters?: {
        name?: string;
        departmentId?: string;
        typeId?: string;
        page?: number;
        size?: number;
    }): Promise<PageResponse<EquipmentDTO>> {
        const params = new URLSearchParams();
        if (filters?.name) params.append('name', filters.name);
        if (filters?.departmentId) params.append('departmentId', filters.departmentId);
        if (filters?.typeId && filters.typeId !== 'all') params.append('typeId', filters.typeId);
        if (filters?.page !== undefined) params.append('page', filters.page.toString());
        if (filters?.size !== undefined) params.append('size', filters.size.toString());

        const query = params.toString() ? `?${params.toString()}` : '';
        return this.request<PageResponse<EquipmentDTO>>(`${API_BASE_URL}/equipment${query}`);
    }

    async getEquipmentById(id: string): Promise<EquipmentDTO> {
        return this.request<EquipmentDTO>(`${API_BASE_URL}/equipment/${id}`);
    }

    async createEquipment(data: EquipmentCreateDTO): Promise<EquipmentDTO> {
        return this.request<EquipmentDTO>(`${API_BASE_URL}/equipment`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateEquipment(id: string, data: EquipmentUpdateDTO): Promise<EquipmentDTO> {
        return this.request<EquipmentDTO>(`${API_BASE_URL}/equipment/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }

    async deleteEquipment(id: string): Promise<void> {
        return this.request<void>(`${API_BASE_URL}/equipment/${id}`, {
            method: 'DELETE',
        });
    }

    // Equipment Types API
    async getEquipmentTypes(filters?: {
        page?: number;
        size?: number;
    }): Promise<PageResponse<EquipmentTypeDTO>> {
        const params = new URLSearchParams();
        if (filters?.page !== undefined) params.append('page', filters.page.toString());
        if (filters?.size !== undefined) params.append('size', filters.size.toString());

        const query = params.toString() ? `?${params.toString()}` : '';
        return this.request<PageResponse<EquipmentTypeDTO>>(`${API_BASE_URL}/equipment-types${query}`);
    }

    // Assignment API
    async assignToProject(equipmentId: string, data: AssignmentRequestDTO): Promise<AssignmentDTO> {
        return this.request<AssignmentDTO>(`${API_BASE_URL}/assignments/project/${equipmentId}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async returnFromProject(assignmentId: string, data: ReturnRequestDTO): Promise<AssignmentDTO> {
        return this.request<AssignmentDTO>(`${API_BASE_URL}/assignments/project/${assignmentId}/return`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getAssignmentHistory(equipmentId: string, filters?: {
        startDate?: string;
        endDate?: string;
        page?: number;
        size?: number;
    }): Promise<PageResponse<AssignmentDTO>> {
        const params = new URLSearchParams();
        if (filters?.startDate) params.append('startDate', filters.startDate);
        if (filters?.endDate) params.append('endDate', filters.endDate);
        if (filters?.page !== undefined) params.append('page', filters.page.toString());
        if (filters?.size !== undefined) params.append('size', filters.size.toString());

        const query = params.toString() ? `?${params.toString()}` : '';
        return this.request<PageResponse<AssignmentDTO>>(`${API_BASE_URL}/assignments/equipment/${equipmentId}/history${query}`);
    }
}

export const equipmentApi = new EquipmentApi();

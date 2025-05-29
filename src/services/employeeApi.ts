import {
  DepartmentCreateDTO,
  DepartmentDTO,
  DepartmentUpdateDTO,
  EmployeeCreateDTO,
  EmployeeDTO,
  EmployeeType,
  EmployeeUpdateDTO,
  EngineerSpecializationDTO,
  LaboratoryDTO,
  PageResponse,
  PositionDTO
} from '../types/employeeApi';
import {ClientApi} from './clientApi';

const API_BASE_URL = 'http://localhost:8081/api/v1';

class EmployeeApi extends ClientApi {

  // Departments API
  async getDepartments(filters?: { name?: string; headId?: string }): Promise<DepartmentDTO[]> {
    const params = new URLSearchParams();
    if (filters?.name) params.append('name', filters.name);
    if (filters?.headId) params.append('headId', filters.headId);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<DepartmentDTO[]>(`${API_BASE_URL}/departments${query}`);
  }

  async getDepartmentById(id: string): Promise<DepartmentDTO> {
    return this.request<DepartmentDTO>(`${API_BASE_URL}/departments/${id}`);
  }

  async createDepartment(data: DepartmentCreateDTO): Promise<DepartmentDTO> {
    return this.request<DepartmentDTO>(`${API_BASE_URL}/departments`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDepartment(id: string, data: DepartmentUpdateDTO): Promise<DepartmentDTO> {
    return this.request<DepartmentDTO>(`${API_BASE_URL}/departments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDepartment(id: string): Promise<void> {
    return this.request<void>(`${API_BASE_URL}/departments/${id}`, {
      method: 'DELETE',
    });
  }

  // Employees API
  async getEmployees(filters?: {
    firstName?: string;
    lastName?: string;
    ageFrom?: number;
    ageTo?: number;
    employeeType?: EmployeeType;
    positionId?: string;
    departmentId?: string;
    page?: number;
    size?: number;
  }): Promise<PageResponse<EmployeeDTO>> {
    const params = new URLSearchParams();
    if (filters?.firstName) params.append('firstName', filters.firstName);
    if (filters?.lastName) params.append('lastName', filters.lastName);
    if (filters?.ageFrom) params.append('ageFrom', filters.ageFrom.toString());
    if (filters?.ageTo) params.append('ageTo', filters.ageTo.toString());
    if (filters?.employeeType) params.append('employeeType', filters.employeeType);
    if (filters?.positionId) params.append('positionId', filters.positionId);
    if (filters?.departmentId) params.append('departmentId', filters.departmentId);
    if (filters?.page !== undefined) params.append('page', filters.page.toString());
    if (filters?.size !== undefined) params.append('size', filters.size.toString());
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<PageResponse<EmployeeDTO>>(`${API_BASE_URL}/employees${query}`);
  }

  async getEmployeeById(id: string): Promise<EmployeeDTO> {
    return this.request<EmployeeDTO>(`${API_BASE_URL}/employees/${id}`);
  }

  async createEmployee(data: EmployeeCreateDTO): Promise<EmployeeDTO> {
    return this.request<EmployeeDTO>(`${API_BASE_URL}/employees`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEmployee(id: string, data: EmployeeUpdateDTO): Promise<EmployeeDTO> {
    return this.request<EmployeeDTO>(`${API_BASE_URL}/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEmployee(id: string): Promise<void> {
    return this.request<void>(`${API_BASE_URL}/employees/${id}`, {
      method: 'DELETE',
    });
  }

  // Helper endpoints
  async getSpecializations(filters?: {
    id?: string;
    name?: string;
    page?: number;
    size?: number;
  }): Promise<PageResponse<EngineerSpecializationDTO>> {
    const params = new URLSearchParams();
    if (filters?.id) params.append('id', filters.id);
    if (filters?.name) params.append('name', filters.name);
    if (filters?.page !== undefined) params.append('page', filters.page.toString());
    if (filters?.size !== undefined) params.append('size', filters.size.toString());
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<PageResponse<EngineerSpecializationDTO>>(`${API_BASE_URL}/specializations${query}`);
  }

  async getLaboratories(filters?: {
    id?: string;
    name?: string;
    page?: number;
    size?: number;
  }): Promise<PageResponse<LaboratoryDTO>> {
    const params = new URLSearchParams();
    if (filters?.id) params.append('id', filters.id);
    if (filters?.name) params.append('name', filters.name);
    if (filters?.page !== undefined) params.append('page', filters.page.toString());
    if (filters?.size !== undefined) params.append('size', filters.size.toString());
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<PageResponse<LaboratoryDTO>>(`${API_BASE_URL}/labs${query}`);
  }

  async getPositions(filters?: {
    type?: EmployeeType;
    name?: string;
    page?: number;
    size?: number;
  }): Promise<PageResponse<PositionDTO>> {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.name) params.append('name', filters.name);
    if (filters?.page !== undefined) params.append('page', filters.page.toString());
    if (filters?.size !== undefined) params.append('size', filters.size.toString());
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<PageResponse<PositionDTO>>(`${API_BASE_URL}/positions${query}`);
  }
}

export const employeeApi = new EmployeeApi();

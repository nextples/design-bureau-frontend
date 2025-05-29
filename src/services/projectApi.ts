import { ClientApi } from './clientApi';
import { 
  ProjectDTO, 
  ProjectCreateDTO, 
  ProjectUpdateDTO,
  SubcontractorDTO,
  SubcontractorCreateDTO,
  SubcontractorUpdateDTO,
  SubcontractorWorkDTO,
  AddEquipmentRequestDTO
} from '@/types/projectApi';

class ProjectApi extends ClientApi {
  private baseUrl = 'http://localhost:8083/api/v1';

  // Projects
  async getProjects(): Promise<ProjectDTO[]> {
    return this.request<ProjectDTO[]>(`${this.baseUrl}/projects`);
  }

  async getProjectById(id: string): Promise<ProjectDTO> {
    return this.request<ProjectDTO>(`${this.baseUrl}/projects/${id}`);
  }

  async createProject(data: ProjectCreateDTO): Promise<ProjectDTO> {
    return this.request<ProjectDTO>(`${this.baseUrl}/projects`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: ProjectUpdateDTO): Promise<ProjectDTO> {
    return this.request<ProjectDTO>(`${this.baseUrl}/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string): Promise<void> {
    return this.request<void>(`${this.baseUrl}/projects/${id}`, {
      method: 'DELETE',
    });
  }

  async getProjectEmployees(projectId: string): Promise<string[]> {
    return this.request<string[]>(`${this.baseUrl}/projects/${projectId}/employees`);
  }

  async addEmployeesToProject(projectId: string, employeeIds: string[]): Promise<ProjectDTO> {
    return this.request<ProjectDTO>(`${this.baseUrl}/projects/${projectId}/employees`, {
      method: 'PUT',
      body: JSON.stringify(employeeIds),
    });
  }

  async removeEmployeeFromProject(projectId: string, employeeId: string): Promise<ProjectDTO> {
    return this.request<ProjectDTO>(`${this.baseUrl}/projects/${projectId}/employees/remove`, {
      method: 'PATCH',
      body: JSON.stringify(employeeId),
    });
  }

  async addEquipmentToProject(projectId: string, data: AddEquipmentRequestDTO): Promise<ProjectDTO> {
    return this.request<ProjectDTO>(`${this.baseUrl}/projects/${projectId}/equipments`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async removeEquipmentFromProject(projectId: string, equipmentId: string): Promise<ProjectDTO> {
    return this.request<ProjectDTO>(`${this.baseUrl}/projects/${projectId}/equipments/remove`, {
      method: 'PATCH',
      body: JSON.stringify(equipmentId),
    });
  }

  async updateProjectProgress(projectId: string, progress: number): Promise<ProjectDTO> {
    return this.request<ProjectDTO>(`${this.baseUrl}/projects/${projectId}/progress?val=${progress}`, {
      method: 'PUT',
    });
  }

  async getProjectCosts(projectIds: string[]): Promise<Record<string, number>> {
    return this.request<Record<string, number>>(`${this.baseUrl}/projects/costs`, {
      method: 'GET',
      body: JSON.stringify(projectIds),
    });
  }

  // Subcontractors
  async getSubcontractors(name?: string): Promise<SubcontractorDTO[]> {
    const params = name ? `?name=${encodeURIComponent(name)}` : '';
    return this.request<SubcontractorDTO[]>(`${this.baseUrl}/subcontractors${params}`);
  }

  async getSubcontractorById(id: string): Promise<SubcontractorDTO> {
    return this.request<SubcontractorDTO>(`${this.baseUrl}/subcontractors/${id}`);
  }

  async createSubcontractor(data: SubcontractorCreateDTO): Promise<SubcontractorDTO> {
    return this.request<SubcontractorDTO>(`${this.baseUrl}/subcontractors`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSubcontractor(id: string, data: SubcontractorUpdateDTO): Promise<SubcontractorDTO> {
    return this.request<SubcontractorDTO>(`${this.baseUrl}/subcontractors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSubcontractor(id: string): Promise<void> {
    return this.request<void>(`${this.baseUrl}/subcontractors/${id}`, {
      method: 'DELETE',
    });
  }

  async assignWorkToSubcontractor(projectId: string, subcontractorId: string, percentage: number): Promise<SubcontractorWorkDTO> {
    return this.request<SubcontractorWorkDTO>(`${this.baseUrl}/subcontractors/works/assign?project=${projectId}&subcontractor=${subcontractorId}&percentage=${percentage}`, {
      method: 'POST',
    });
  }

  async updateSubcontractorProgress(workId: string, progress: number): Promise<SubcontractorWorkDTO> {
    return this.request<SubcontractorWorkDTO>(`${this.baseUrl}/subcontractors/works/${workId}/progress?val=${progress}`, {
      method: 'PATCH',
    });
  }

  async getSubcontractorWorks(): Promise<SubcontractorWorkDTO[]> {
    return this.request<SubcontractorWorkDTO[]>(`${this.baseUrl}/subcontractors/works/costs`);
  }
}

export const projectApi = new ProjectApi();

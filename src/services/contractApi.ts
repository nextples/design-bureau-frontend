
import { ClientApi } from './clientApi';

export interface ContractCreateDTO {
  name: string;
  managerId: string;
}

export interface ContractUpdateDTO {
  name?: string;
  managerId?: string;
}

export interface ContractDTO {
  contractId: string;
  name: string;
  startDate: string;
  endDate: string;
  managerId: string;
  projectIds: string[];
}

class ContractApi extends ClientApi {
  private baseUrl = 'http://localhost:8084/api/v1/contracts';

  async createContract(data: ContractCreateDTO): Promise<ContractDTO> {
    return this.request<ContractDTO>(this.baseUrl, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateContract(id: string, data: ContractUpdateDTO): Promise<ContractDTO> {
    return this.request<ContractDTO>(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAllContracts(startDate?: string, endDate?: string): Promise<ContractDTO[]> {
    const params = new URLSearchParams();
    if (startDate) {
      params.append('startDate', startDate);
    }
    if (endDate) {
      params.append('endDate', endDate);
    }
    
    const queryString = params.toString();
    const url = queryString ? `${this.baseUrl}?${queryString}` : this.baseUrl;
    
    return this.request<ContractDTO[]>(url);
  }

  async getContract(id: string): Promise<ContractDTO> {
    return this.request<ContractDTO>(`${this.baseUrl}/${id}`);
  }

  async deleteContract(id: string): Promise<void> {
    return this.request<void>(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
  }

  async addProjectsToContract(contractId: string, projectIds: string[]): Promise<ContractDTO> {
    return this.request<ContractDTO>(`${this.baseUrl}/${contractId}/projects`, {
      method: 'PUT',
      body: JSON.stringify(projectIds),
    });
  }

  async removeProjectFromContract(contractId: string, projectId: string): Promise<ContractDTO> {
    return this.request<ContractDTO>(`${this.baseUrl}/${contractId}/projects/remove`, {
      method: 'PATCH',
      body: JSON.stringify(projectId),
    });
  }
}

export const contractApi = new ContractApi();

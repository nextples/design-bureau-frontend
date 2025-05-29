
import { ClientApi } from './clientApi';
import { ProjectEfficiencyDTO, ContractEfficiencyDTO } from '@/types/efficiencyApi';

class EfficiencyApi extends ClientApi {
  private projectsBaseUrl = 'http://localhost:8083/api/v1/projects';
  private contractsBaseUrl = 'http://localhost:8084/api/v1/contracts';

  async getProjectsEfficiency(): Promise<ProjectEfficiencyDTO[]> {
    return this.request<ProjectEfficiencyDTO[]>(`${this.projectsBaseUrl}/reports/efficiency`);
  }

  async getContractsEfficiency(): Promise<ContractEfficiencyDTO[]> {
    return this.request<ContractEfficiencyDTO[]>(`${this.contractsBaseUrl}/reports/efficiency`);
  }
}

export const efficiencyApi = new EfficiencyApi();


import { useQuery } from '@tanstack/react-query';
import { efficiencyApi } from '@/services/efficiencyApi';

export function useProjectsEfficiency() {
  return useQuery({
    queryKey: ['projects-efficiency'],
    queryFn: () => efficiencyApi.getProjectsEfficiency(),
  });
}

export function useContractsEfficiency() {
  return useQuery({
    queryKey: ['contracts-efficiency'],
    queryFn: () => efficiencyApi.getContractsEfficiency(),
  });
}

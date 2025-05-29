
import { useQuery } from '@tanstack/react-query';
import { employeeApi } from '@/services/employeeApi';
import { EmployeeType } from '@/types/employeeApi';

export const usePositions = (filters?: {
  type?: EmployeeType;
  name?: string;
  page?: number;
  size?: number;
}) => {
  return useQuery({
    queryKey: ['positions', filters],
    queryFn: () => employeeApi.getPositions(filters),
  });
};

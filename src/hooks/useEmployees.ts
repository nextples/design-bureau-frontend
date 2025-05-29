
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeApi } from '@/services/employeeApi';
import { EmployeeCreateDTO, EmployeeUpdateDTO, EmployeeType } from '@/types/employeeApi';
import { useToast } from '@/hooks/use-toast';

export const useEmployees = (filters?: {
  firstName?: string;
  lastName?: string;
  ageFrom?: number;
  ageTo?: number;
  employeeType?: EmployeeType;
  positionId?: string;
  departmentId?: string;
  page?: number;
  size?: number;
}) => {
  return useQuery({
    queryKey: ['employees', filters],
    queryFn: () => employeeApi.getEmployees(filters),
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ['employees', id],
    queryFn: () => employeeApi.getEmployeeById(id),
    enabled: !!id,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: EmployeeCreateDTO) => employeeApi.createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast({
        title: "Успех",
        description: "Сотрудник успешно создан",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EmployeeUpdateDTO }) => 
      employeeApi.updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast({
        title: "Успех",
        description: "Сотрудник успешно обновлен",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => employeeApi.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast({
        title: "Успех",
        description: "Сотрудник успешно удален",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Ошибка",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Новые хуки для специализаций и лабораторий
export const useSpecializations = () => {
  return useQuery({
    queryKey: ['specializations'],
    queryFn: () => employeeApi.getSpecializations({ size: 100 }),
  });
};

export const useLaboratories = () => {
  return useQuery({
    queryKey: ['laboratories'],
    queryFn: () => employeeApi.getLaboratories({ size: 100 }),
  });
};

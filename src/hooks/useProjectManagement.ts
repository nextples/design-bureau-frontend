
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/services/projectApi';
import { AddEquipmentRequestDTO } from '@/types/projectApi';
import { toast } from '@/hooks/use-toast';

export function useAddEmployeesToProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ projectId, employeeIds }: { projectId: string; employeeIds: string[] }) => 
      projectApi.addEmployeesToProject(projectId, employeeIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast({
        title: "Успех",
        description: "Сотрудники успешно добавлены к проекту",
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
}

export function useRemoveEmployeeFromProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ projectId, employeeId }: { projectId: string; employeeId: string }) => 
      projectApi.removeEmployeeFromProject(projectId, employeeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast({
        title: "Успех",
        description: "Сотрудник успешно удален из проекта",
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
}

export function useAddEquipmentToProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ projectId, data }: { projectId: string; data: AddEquipmentRequestDTO }) => 
      projectApi.addEquipmentToProject(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast({
        title: "Успех",
        description: "Оборудование успешно добавлено к проекту",
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
}

export function useRemoveEquipmentFromProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ projectId, equipmentId }: { projectId: string; equipmentId: string }) => 
      projectApi.removeEquipmentFromProject(projectId, equipmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast({
        title: "Успех",
        description: "Оборудование успешно удалено из проекта",
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
}

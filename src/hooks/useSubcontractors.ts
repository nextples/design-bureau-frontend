import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/services/projectApi';
import { SubcontractorCreateDTO, SubcontractorUpdateDTO } from '@/types/projectApi';
import { toast } from '@/hooks/use-toast';

export function useSubcontractors(filters?: { name?: string }) {
  return useQuery({
    queryKey: ['subcontractors', filters],
    queryFn: () => projectApi.getSubcontractors(filters?.name),
  });
}

export function useSubcontractorById(id: string) {
  return useQuery({
    queryKey: ['subcontractors', id],
    queryFn: () => projectApi.getSubcontractorById(id),
    enabled: !!id,
  });
}

export function useCreateSubcontractor() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SubcontractorCreateDTO) => projectApi.createSubcontractor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcontractors'] });
      toast({
        title: "Успех",
        description: "Субподрядчик успешно создан",
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

export function useUpdateSubcontractor() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SubcontractorUpdateDTO }) => 
      projectApi.updateSubcontractor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcontractors'] });
      toast({
        title: "Успех",
        description: "Субподрядчик успешно обновлен",
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

export function useDeleteSubcontractor() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => projectApi.deleteSubcontractor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcontractors'] });
      toast({
        title: "Успех",
        description: "Субподрядчик успешно удален",
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

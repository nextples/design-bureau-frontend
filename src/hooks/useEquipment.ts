import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { equipmentApi } from '@/services/equipmentApi';
import { EquipmentCreateDTO, EquipmentUpdateDTO } from '@/types/equipmentApi';
import { useToast } from '@/hooks/use-toast';

export const useEquipment = (filters?: { 
  name?: string; 
  type?: string; 
  available?: boolean; 
  page?: number; 
  size?: number; 
}) => {
  return useQuery({
    queryKey: ['equipment', filters],
    queryFn: () => equipmentApi.getEquipment(filters),
  });
};

export const useEquipmentById = (id: string) => {
  return useQuery({
    queryKey: ['equipment', id],
    queryFn: () => equipmentApi.getEquipmentById(id),
    enabled: !!id,
  });
};

export const useEquipmentTypes = () => {
  return useQuery({
    queryKey: ['equipment-types'],
    queryFn: () => equipmentApi.getEquipmentTypes(),
  });
};

export const useAssignmentHistory = (equipmentId: string, filters?: {
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}) => {
  return useQuery({
    queryKey: ['assignment-history', equipmentId, filters],
    queryFn: () => equipmentApi.getAssignmentHistory(equipmentId, filters),
    enabled: !!equipmentId,
  });
};

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: EquipmentCreateDTO) => equipmentApi.createEquipment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast({
        title: "Успех",
        description: "Оборудование успешно создано",
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

export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: EquipmentUpdateDTO }) => 
      equipmentApi.updateEquipment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast({
        title: "Успех",
        description: "Оборудование успешно обновлено",
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

export const useDeleteEquipment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => equipmentApi.deleteEquipment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast({
        title: "Успех",
        description: "Оборудование успешно удалено",
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

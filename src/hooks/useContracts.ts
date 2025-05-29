
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contractApi } from '@/services/contractApi';
import { ContractCreateDTO, ContractUpdateDTO } from '@/types/contractApi';
import { useToast } from '@/hooks/use-toast';

export const useContracts = (filters?: { name?: string; managerId?: string }) => {
  return useQuery({
    queryKey: ['contracts', filters],
    queryFn: () => contractApi.getAllContracts(),
  });
};

export const useContract = (id: string) => {
  return useQuery({
    queryKey: ['contracts', id],
    queryFn: () => contractApi.getContract(id),
    enabled: !!id,
  });
};

export const useCreateContract = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ContractCreateDTO) => contractApi.createContract(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: "Успех",
        description: "Договор успешно создан",
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

export const useUpdateContract = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ContractUpdateDTO }) => 
      contractApi.updateContract(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: "Успех",
        description: "Договор успешно обновлен",
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

export const useDeleteContract = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => contractApi.deleteContract(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: "Успех",
        description: "Договор успешно удален",
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

export const useAddProjectsToContract = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ contractId, projectIds }: { contractId: string; projectIds: string[] }) => 
      contractApi.addProjectsToContract(contractId, projectIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: "Успех",
        description: "Проекты успешно добавлены в договор",
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

export const useRemoveProjectFromContract = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ contractId, projectId }: { contractId: string; projectId: string }) => 
      contractApi.removeProjectFromContract(contractId, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: "Успех",
        description: "Проект успешно удален из договора",
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

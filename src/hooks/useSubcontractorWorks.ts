import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/services/projectApi';
import { SubcontractorWorkDTO, ProjectDTO } from '@/types/projectApi';
import { toast } from 'sonner';

export const useSubcontractorWorks = (filters?: {
  sortBy?: string;
  sortOrder?: string;
}) => {
  return useQuery({
    queryKey: ['subcontractor-works', filters],
    queryFn: async () => {
      console.log('Fetching subcontractor works...');
      const works = await projectApi.getSubcontractorWorks();
      console.log('Subcontractor works response:', works);
      
      // Применяем сортировку на фронтенде, пока API не поддерживает
      let sortedWorks = works || [];
      if (filters?.sortBy === 'cost' && filters?.sortOrder) {
        sortedWorks = [...sortedWorks].sort((a, b) => {
          const aValue = a.cost || 0;
          const bValue = b.cost || 0;
          return filters.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });
      }
      
      return sortedWorks;
    },
  });
};

export const useAssignWorkToSubcontractor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, subcontractorId, percentage }: {
      projectId: string;
      subcontractorId: string;
      percentage: number;
    }) => {
      return projectApi.assignWorkToSubcontractor(projectId, subcontractorId, percentage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcontractor-works'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Работа успешно назначена субподрядчику');
    },
    onError: (error: any) => {
      toast.error('Ошибка при назначении работы: ' + error.message);
    },
  });
};

export const useUpdateSubcontractorWorkProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ workId, progress }: { workId: string; progress: number }) => {
      return projectApi.updateSubcontractorProgress(workId, progress);
    },
    onSuccess: (updatedWork: SubcontractorWorkDTO, variables) => {
      console.log('Updated work received:', updatedWork);
      console.log('Variables:', variables);
      
      // Немедленно обновляем кэш субподрядных работ с новыми данными
      queryClient.setQueryData(['subcontractor-works'], (oldData: SubcontractorWorkDTO[] | undefined) => {
        if (!oldData) {
          return [updatedWork];
        }
        
        // Обновляем конкретную работу в кэше
        const newData = oldData.map(work => {
          if (work.id === variables.workId) {
            return updatedWork;
          }
          return work;
        });
        
        console.log('Updated subcontractor works cache:', newData);
        return newData;
      });

      // Обновляем кэш проектов если обновленная работа содержит данные проекта
      if (updatedWork.project) {
        queryClient.setQueryData(['projects'], (oldProjects: ProjectDTO[] | undefined) => {
          if (!oldProjects) return [updatedWork.project];
          
          return oldProjects.map(project => 
            project.id === updatedWork.project.id ? updatedWork.project : project
          );
        });

        // Обновляем кэш отдельного проекта если он есть
        queryClient.setQueryData(['projects', updatedWork.project.id], updatedWork.project);

        // Проверяем статус проекта и показываем соответствующее уведомление
        if (updatedWork.project.status === 'COMPLETED') {
          toast.success('Прогресс обновлен. Проект завершен!', {
            description: `Проект "${updatedWork.project.name}" достиг 100% прогресса и завершен.`
          });
        } else {
          toast.success('Прогресс работы обновлен');
        }
      } else {
        toast.success('Прогресс работы обновлен');
      }
    },
    onError: (error: any) => {
      toast.error('Ошибка при обновлении прогресса: ' + error.message);
    },
  });
};

export const useDeleteSubcontractorWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (workId: string) => {
      // This would need to be implemented in the projectApi
      // For now, we'll create a placeholder that throws an error
      throw new Error('Delete subcontractor work API not implemented');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcontractor-works'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Субподрядная работа удалена');
    },
    onError: (error: any) => {
      toast.error('Ошибка при удалении работы: ' + error.message);
    },
  });
};

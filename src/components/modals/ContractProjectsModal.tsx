
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useProjects } from '@/hooks/useProjects';
import { useAddProjectsToContract, useRemoveProjectFromContract } from '@/hooks/useContracts';
import { toast } from 'sonner';

interface ContractProjectsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contract: any;
}

export function ContractProjectsModal({ open, onOpenChange, contract }: ContractProjectsModalProps) {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const addProjectsMutation = useAddProjectsToContract();
  const removeProjectMutation = useRemoveProjectFromContract();
  const [selectedProjects, setSelectedProjects] = useState<string[]>(
    contract?.projectIds || []
  );

  const handleProjectToggle = (projectId: string, checked: boolean) => {
    if (checked) {
      // Добавить проект
      const newProjectIds = [...selectedProjects, projectId];
      addProjectsMutation.mutate(
        { contractId: contract.contractId, projectIds: [projectId] },
        {
          onSuccess: () => {
            setSelectedProjects(newProjectIds);
            toast.success('Проект добавлен в договор');
          },
          onError: (error: any) => {
            toast.error(`Ошибка добавления проекта: ${error.message}`);
          },
        }
      );
    } else {
      // Удалить проект
      const newProjectIds = selectedProjects.filter(id => id !== projectId);
      removeProjectMutation.mutate(
        { contractId: contract.contractId, projectId },
        {
          onSuccess: () => {
            setSelectedProjects(newProjectIds);
            toast.success('Проект удален из договора');
          },
          onError: (error: any) => {
            toast.error(`Ошибка удаления проекта: ${error.message}`);
          },
        }
      );
    }
  };

  if (projectsLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Управление проектами в договоре</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">Загрузка проектов...</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Управление проектами в договоре "{contract?.name}"</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Выберите проекты, которые должны быть включены в данный договор:
          </p>
          
          {projects && projects.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {projects.map((project: any) => {
                const isSelected = selectedProjects.includes(project.id);
                return (
                  <div
                    key={project.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <Checkbox
                      id={`project-${project.id}`}
                      checked={isSelected}
                      onCheckedChange={(checked) => 
                        handleProjectToggle(project.id, checked as boolean)
                      }
                      disabled={addProjectsMutation.isPending || removeProjectMutation.isPending}
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`project-${project.id}`}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {project.name}
                      </label>
                      {project.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {project.description}
                        </p>
                      )}
                      <div className="flex gap-4 text-xs text-gray-400 mt-1">
                        <span>Статус: {project.status}</span>
                        {project.cost && (
                          <span>Бюджет: {Number(project.cost).toLocaleString()} ₽</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Нет доступных проектов
            </div>
          )}
          
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-sm text-gray-600">
              Выбрано проектов: {selectedProjects.length}
            </span>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

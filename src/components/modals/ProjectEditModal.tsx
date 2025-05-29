
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ProjectForm } from '@/components/forms/ProjectForm';
import { useUpdateProject } from '@/hooks/useProjects';
import { ProjectDTO } from '@/types/projectApi';

interface ProjectEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectDTO;
}

export function ProjectEditModal({ open, onOpenChange, project }: ProjectEditModalProps) {
  const updateMutation = useUpdateProject();

  const handleSubmit = (data: any) => {
    updateMutation.mutate(
      { id: project.id, data },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать проект</DialogTitle>
        </DialogHeader>
        <ProjectForm
          project={project}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

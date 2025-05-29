
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { ProgressControl } from '@/components/ProgressControl';
import { useUpdateProjectProgress } from '@/hooks/useProjects';
import { ProjectDTO } from '@/types/projectApi';

interface ProjectProgressControlsProps {
  project: ProjectDTO;
}

export function ProjectProgressControls({ project }: ProjectProgressControlsProps) {
  const updateProgressMutation = useUpdateProjectProgress();

  const handleInternalProgressChange = (newValue: number) => {
    updateProgressMutation.mutate({
      projectId: project.id,
      progress: newValue
    });
  };

  const getProgressColor = (value: number) => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-blue-500';
    if (value >= 40) return 'bg-yellow-500';
    if (value >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Общий прогресс проекта
          </label>
          <span className="text-sm font-medium text-gray-900">
            {project.totalProgress || 0}%
          </span>
        </div>
        <div className="w-full">
          <Progress 
            value={project.totalProgress || 0} 
            className="w-full h-3"
          />
        </div>
      </div>

      <ProgressControl
        value={project.internalProgress || 0}
        onValueChange={handleInternalProgressChange}
        label="Внутренний прогресс проекта"
        disabled={updateProgressMutation.isPending}
        min={0}
        max={100}
      />
    </div>
  );
}

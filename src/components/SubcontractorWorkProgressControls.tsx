
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { ProgressControl } from '@/components/ProgressControl';
import { useUpdateSubcontractorWorkProgress, useSubcontractorWorks } from '@/hooks/useSubcontractorWorks';
import { SubcontractorWorkDTO } from '@/types/projectApi';

interface SubcontractorWorkProgressControlsProps {
  work: SubcontractorWorkDTO;
}

export function SubcontractorWorkProgressControls({ work: initialWork }: SubcontractorWorkProgressControlsProps) {
  const updateProgressMutation = useUpdateSubcontractorWorkProgress();
  const { data: subcontractorWorks } = useSubcontractorWorks();

  // Ищем актуальные данные в кэше или используем начальные данные
  const work = subcontractorWorks?.find(w => w.id === initialWork.id) || initialWork;

  const handleProgressChange = (newValue: number) => {
    console.log('Updating progress for work:', work.id, 'to value:', newValue);
    updateProgressMutation.mutate({
      workId: work.id,
      progress: newValue
    });
  };

  console.log('Rendering SubcontractorWorkProgressControls with work:', work);

  const getProjectStatusLabel = (status: string) => {
    const statusLabels: Record<string, string> = {
      'PLANNING': 'Планирование',
      'IN_PROGRESS': 'В работе',
      'COMPLETED': 'Завершен',
      'CANCELLED': 'Отменен',
    };
    return statusLabels[status] || status;
  };

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Общий прогресс проекта
          </label>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-900">
              {work.project.totalProgress || 0}%
            </span>
            <p className="text-xs text-gray-600">
              Статус: {getProjectStatusLabel(work.project.status)}
            </p>
          </div>
        </div>
        <div className="w-full">
          <Progress 
            value={work.project.totalProgress || 0} 
            className="w-full h-3"
          />
        </div>
      </div>

      <ProgressControl
        value={work.progress || 0}
        onValueChange={handleProgressChange}
        label="Прогресс субподрядной работы"
        disabled={updateProgressMutation.isPending}
        min={0}
        max={100}
      />

      {work.project.status === 'COMPLETED' && (
        <div className="p-3 bg-green-100 border border-green-300 rounded-md">
          <p className="text-green-800 text-sm font-medium">
            ✅ Проект завершен
          </p>
          <p className="text-green-700 text-xs mt-1">
            Прогресс можно изменять для корректировки данных
          </p>
        </div>
      )}

      <div className="text-sm text-gray-600">
        <p>Объем работ: {work.workPercentage}% от общего проекта</p>
        <p>Стоимость: {work.cost ? `${Number(work.cost).toLocaleString()} ₽` : 'Не указана'}</p>
        <p>Проект: {work.project.name}</p>
        <p>Субподрядчик: {work.subcontractor.companyName}</p>
      </div>
    </div>
  );
}

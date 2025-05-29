
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { SubcontractorWorkProgressControls } from '@/components/SubcontractorWorkProgressControls';

interface SubcontractorWorkDetailProps {
  work: any;
  onBack: () => void;
}

const statusLabels: Record<string, string> = {
  'PLANNING': 'Планирование',
  'IN_PROGRESS': 'В работе',
  'COMPLETED': 'Завершен',
  'CANCELLED': 'Отменен',
};

export function SubcontractorWorkDetail({ work, onBack }: SubcontractorWorkDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Работа для проекта "{work.project?.name || 'Неизвестный проект'}"
        </h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Информация о работе</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Процент от общих работ:</span> {work.workPercentage}%</p>
                <p><span className="font-medium">Прогресс выполнения:</span> {work.progress}%</p>
                <p><span className="font-medium">Стоимость:</span> {work.cost ? `${Number(work.cost).toLocaleString()} ₽` : 'Не указана'}</p>
                <p><span className="font-medium">Субподрядчик:</span> {work.subcontractor?.companyName || 'Не указан'}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Информация о проекте</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Название проекта:</span> {work.project?.name || 'Не указано'}</p>
                <p><span className="font-medium">Статус проекта:</span> {work.project?.status ? statusLabels[work.project.status] || work.project.status : 'Не указан'}</p>
                <p><span className="font-medium">Общий прогресс проекта:</span> {work.project?.totalProgress || 0}%</p>
                <p><span className="font-medium">Внутренний прогресс:</span> {work.project?.internalProgress || 0}%</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t">
            <h3 className="font-semibold text-gray-900 mb-4">Управление прогрессом</h3>
            <SubcontractorWorkProgressControls work={work} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

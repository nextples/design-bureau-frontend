
import React, { useState } from 'react';
import { Edit, Trash, Users, Wrench, UserCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectEditModal } from '@/components/modals/ProjectEditModal';
import { ProjectProgressControls } from '@/components/ProjectProgressControls';
import { ProjectEquipmentModal } from '@/components/modals/ProjectEquipmentModal';
import { ProjectEmployeesModal } from '@/components/modals/ProjectEmployeesModal';
import { AssignSubcontractorWorkModal } from '@/components/modals/AssignSubcontractorWorkModal';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';
import { useDeleteProject, useProjectById } from '@/hooks/useProjects';

interface ProjectDetailProps {
  project: any;
  onBack: () => void;
}

const statusLabels: Record<string, string> = {
  'PLANNING': 'Планирование',
  'IN_PROGRESS': 'В работе',
  'COMPLETED': 'Завершен',
  'CANCELLED': 'Отменен',
};

export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [equipmentModalOpen, setEquipmentModalOpen] = useState(false);
  const [employeesModalOpen, setEmployeesModalOpen] = useState(false);
  const [assignSubcontractorModalOpen, setAssignSubcontractorModalOpen] = useState(false);

  const deleteProjectMutation = useDeleteProject();
  const { data: projectDetails } = useProjectById(project.id);

  const currentProject = projectDetails || project;

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteProjectMutation.mutate(project.id, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        onBack();
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{currentProject.name}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleEdit}
            className="flex items-center gap-2"
          >
            <Edit size={16} />
            Редактировать
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <Trash size={16} />
            Удалить
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <ProjectProgressControls project={currentProject} />
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Основная информация</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Название:</span> {currentProject.name}</p>
                <p><span className="font-medium">Описание:</span> {currentProject.description || 'Не указано'}</p>
                <p><span className="font-medium">Статус:</span> {statusLabels[currentProject.status] || currentProject.status}</p>
                <p><span className="font-medium">Бюджет:</span> {currentProject.cost ? `${Number(currentProject.cost).toLocaleString()} ₽` : 'Не указан'}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Прогресс</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Внутренний прогресс:</span> {currentProject.internalProgress}%</p>
                <p><span className="font-medium">Общий прогресс:</span> {currentProject.totalProgress}%</p>
                <p><span className="font-medium">Дата начала:</span> {currentProject.startDate ? new Date(currentProject.startDate).toLocaleDateString() : 'Не указана'}</p>
                <p><span className="font-medium">Дата окончания:</span> {currentProject.endDate ? new Date(currentProject.endDate).toLocaleDateString() : 'Не указана'}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Button
              onClick={() => setEmployeesModalOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Users size={16} />
              Управление сотрудниками
            </Button>
            <Button
              onClick={() => setEquipmentModalOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Wrench size={16} />
              Управление оборудованием
            </Button>
            <Button
              onClick={() => setAssignSubcontractorModalOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <UserCheck size={16} />
              Передать работу
            </Button>
          </div>

          {currentProject.subcontractorWorks && currentProject.subcontractorWorks.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Субподрядные работы</h3>
              <div className="space-y-3">
                {currentProject.subcontractorWorks.map((work: any) => (
                  <div key={work.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{work.subcontractor?.companyName}</p>
                        <p className="text-sm text-gray-600">Процент работ: {work.workPercentage}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Прогресс: {work.progress}%</p>
                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${work.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ProjectEditModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        project={project}
      />

      <ProjectEmployeesModal
        open={employeesModalOpen}
        onOpenChange={setEmployeesModalOpen}
        project={currentProject}
      />

      <ProjectEquipmentModal
        open={equipmentModalOpen}
        onOpenChange={setEquipmentModalOpen}
        project={currentProject}
      />

      <AssignSubcontractorWorkModal
        open={assignSubcontractorModalOpen}
        onOpenChange={setAssignSubcontractorModalOpen}
        project={currentProject}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        title="Удалить проект"
        description={`Вы уверены, что хотите удалить проект "${currentProject.name}"? Это действие нельзя отменить.`}
        isLoading={deleteProjectMutation.isPending}
      />
    </div>
  );
}


import React, {useEffect, useState} from 'react';
import {Edit, Trash, History} from 'lucide-react';
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {EquipmentEditModal} from '@/components/modals/EquipmentEditModal';
import {DeleteConfirmModal} from '@/components/modals/DeleteConfirmModal';
import {AssignmentHistoryModal} from '@/components/modals/AssignmentHistoryModal';
import {useDeleteEquipment, useEquipmentById} from '@/hooks/useEquipment';
import {employeeApi} from "@/services/employeeApi.ts";
import {ProjectDTO} from "@/types/projectApi.ts";
import {DepartmentDTO} from "@/types/employeeApi.ts";
import {projectApi} from "@/services/projectApi.ts";

interface EquipmentDetailProps {
  equipment: any;
  onBack: () => void;
}

export function EquipmentDetail({equipment, onBack}: EquipmentDetailProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  const deleteEquipmentMutation = useDeleteEquipment();
  const { data: detailedEquipment, isLoading } = useEquipmentById(equipment.id);

  const currentEquipment = detailedEquipment || equipment;

  const [department, setDepartment] = useState<DepartmentDTO | null>(null);
  const [project, setProject] = useState<ProjectDTO | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentEquipment.currentDepartmentId) {
          const dep = await employeeApi.getDepartmentById(currentEquipment.currentDepartmentId);
          setDepartment(dep);
        }
        if (currentEquipment.currentProjectId) {
          const proj = await projectApi.getProjectById(currentEquipment.currentProjectId);
          setProject(proj);
        }
      } catch (error) {
        console.error("Ошибка при загрузке отдела или проекта:", error);
      }
    };

    fetchData();
  }, [currentEquipment.currentDepartmentId, currentEquipment.currentProjectId]);

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteEquipmentMutation.mutate(equipment.id, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        onBack();
      },
    });
  };

  const handleShowHistory = () => {
    setHistoryModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{currentEquipment.name}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleShowHistory}
            className="flex items-center gap-2"
          >
            <History size={16}/>
            История назначений
          </Button>
          <Button
            variant="outline"
            onClick={handleEdit}
            className="flex items-center gap-2"
          >
            <Edit size={16}/>
            Редактировать
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <Trash size={16}/>
            Удалить
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Основная информация</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Название:</span> {currentEquipment.name}</p>
            <p><span className="font-medium">Серийный номер:</span> {currentEquipment.serialNumber || 'Не указан'}</p>
            <p><span className="font-medium">Тип оборудования:</span> {currentEquipment.equipmentType?.name || 'Не указан'}</p>
            <p><span className="font-medium">Дата покупки:</span> {currentEquipment.purchaseDate ? new Date(currentEquipment.purchaseDate).toLocaleDateString() : 'Не указана'}</p>
            <p>
              <span className="font-medium">Текущий статус:</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                currentEquipment.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {currentEquipment.isAvailable ? 'Доступно' : 'Занято'}
              </span>
            </p>
            <p>
              <span className="font-medium">Текущий отдел:</span>{' '}
              {department?.name || 'Не назначен'}
            </p>
            <p>
              <span className="font-medium">Текущий проект:</span>{' '}
              {project?.name || 'Не назначен'}
            </p>
            {currentEquipment.isShared !== undefined && (
              <p><span className="font-medium">Общее для организации:</span> {currentEquipment.isShared ? 'Да' : 'Нет'}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <EquipmentEditModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        equipment={currentEquipment}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        title="Удалить оборудование"
        description={`Вы уверены, что хотите удалить оборудование "${currentEquipment.name}"? Это действие нельзя отменить.`}
        isLoading={deleteEquipmentMutation.isPending}
      />

      <AssignmentHistoryModal
        open={historyModalOpen}
        onOpenChange={setHistoryModalOpen}
        equipmentId={currentEquipment.id}
        equipmentName={currentEquipment.name}
      />
    </div>
  );
}

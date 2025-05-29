
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AssignmentHistoryModal } from './AssignmentHistoryModal';
import { useEquipmentById } from '@/hooks/useEquipment';
import { useProjects } from '@/hooks/useProjects';
import { useDepartments } from '@/hooks/useDepartments';
import { Loader2 } from 'lucide-react';

interface EquipmentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string;
}

export function EquipmentDetailModal({ open, onOpenChange, equipmentId }: EquipmentDetailModalProps) {
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  
  const { data: equipment, isLoading, error } = useEquipmentById(equipmentId);
  const { data: projects } = useProjects();
  const { data: departments } = useDepartments();

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px]">
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Загрузка...</span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !equipment) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px]">
          <div className="text-center py-8 text-red-500">
            Ошибка загрузки данных оборудования
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Find current project and department names
  const currentProject = projects?.find(p => p.id === equipment.currentProjectId);
  const currentDepartment = departments?.find(d => d.id === equipment.currentDepartmentId);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Оборудование: {equipment.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Основная информация</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Название:</span> {equipment.name}</p>
                  <p><span className="font-medium">Тип оборудования:</span> {equipment.equipmentType?.name || 'Не указан'}</p>
                  <p><span className="font-medium">Категория:</span> {equipment.equipmentType?.category || 'Не указана'}</p>
                  <p><span className="font-medium">Серийный номер:</span> {equipment.serialNumber || 'Не указан'}</p>
                  <p><span className="font-medium">Дата покупки:</span> {equipment.purchaseDate ? new Date(equipment.purchaseDate).toLocaleDateString() : 'Не указана'}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Текущий статус</h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Доступность:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      equipment.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {equipment.isAvailable ? 'Доступно' : 'Занято'}
                    </span>
                  </p>
                  <p><span className="font-medium">Текущий отдел:</span> {currentDepartment?.name || 'Не назначен'}</p>
                  <p><span className="font-medium">Текущий проект:</span> {currentProject?.name || 'Не назначен'}</p>
                  <p><span className="font-medium">Общее для организации:</span> {equipment.isShared ? 'Да' : 'Нет'}</p>
                  {equipment.cost && (
                    <p><span className="font-medium">Стоимость:</span> {Number(equipment.cost).toLocaleString()} ₽</p>
                  )}
                  {equipment.location && (
                    <p><span className="font-medium">Местоположение:</span> {equipment.location}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <Button 
                onClick={() => setHistoryModalOpen(true)}
                variant="outline"
                className="w-full"
              >
                Просмотреть историю назначений
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AssignmentHistoryModal
        open={historyModalOpen}
        onOpenChange={setHistoryModalOpen}
        equipmentId={equipment.id}
        equipmentName={equipment.name}
      />
    </>
  );
}

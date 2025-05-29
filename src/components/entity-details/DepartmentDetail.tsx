
import React, { useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DepartmentEditModal } from '@/components/modals/DepartmentEditModal';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';
import { useDeleteDepartment, useDepartment } from '@/hooks/useDepartments';

interface DepartmentDetailProps {
  department: any;
  onBack: () => void;
}

export function DepartmentDetail({ department, onBack }: DepartmentDetailProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const deleteDepartmentMutation = useDeleteDepartment();
  const { data: detailedDepartment, isLoading } = useDepartment(department.id);

  const currentDepartment = detailedDepartment || department;

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteDepartmentMutation.mutate(department.id, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        onBack();
      },
    });
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
        <h1 className="text-2xl font-bold text-gray-900">{currentDepartment.name}</h1>
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
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Основная информация</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Название:</span> {currentDepartment.name}</p>
                <p><span className="font-medium">Руководитель:</span> {
                  currentDepartment.head 
                    ? `${currentDepartment.head.firstName} ${currentDepartment.head.lastName}` 
                    : 'Не назначен'
                }</p>
                <p><span className="font-medium">Количество сотрудников:</span> {
                  currentDepartment.employees?.length || 0
                }</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Сотрудники отдела</h3>
              <div className="space-y-2">
                {currentDepartment.employees && currentDepartment.employees.length > 0 ? (
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {currentDepartment.employees.map((employee: any) => (
                      <div key={employee.id} className="p-3 bg-gray-50 rounded border">
                        <p className="font-medium text-sm">
                          {employee.firstName} {employee.lastName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {employee.position?.name || 'Должность не указана'}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Сотрудники не назначены</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DepartmentEditModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        department={currentDepartment}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        title="Удалить отдел"
        description={`Вы уверены, что хотите удалить отдел "${currentDepartment.name}"? Это действие нельзя отменить.`}
        isLoading={deleteDepartmentMutation.isPending}
      />
    </div>
  );
}

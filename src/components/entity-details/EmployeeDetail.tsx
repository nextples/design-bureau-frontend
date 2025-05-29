
import React, { useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmployeeEditModal } from '@/components/modals/EmployeeEditModal';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';
import { useDeleteEmployee, useEmployee } from '@/hooks/useEmployees';

interface EmployeeDetailProps {
  employee: any;
  onBack: () => void;
}

const employeeTypeLabels: Record<string, string> = {
  'ENGINEER': 'Инженер',
  'DESIGNER': 'Конструктор',
  'TECHNICIAN': 'Техник',
  'LAB_ASSISTANT': 'Лаборант',
};

export function EmployeeDetail({ employee, onBack }: EmployeeDetailProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const deleteEmployeeMutation = useDeleteEmployee();
  const { data: detailedEmployee, isLoading } = useEmployee(employee.id);

  const currentEmployee = detailedEmployee || employee;

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteEmployeeMutation.mutate(employee.id, {
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
        <h1 className="text-2xl font-bold text-gray-900">
          {currentEmployee.firstName} {currentEmployee.lastName}
        </h1>
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
                <p><span className="font-medium">Имя:</span> {currentEmployee.firstName}</p>
                <p><span className="font-medium">Фамилия:</span> {currentEmployee.lastName}</p>
                <p><span className="font-medium">Возраст:</span> {currentEmployee.age || 'Не указан'}</p>
                <p><span className="font-medium">Должность:</span> {currentEmployee.position?.name || 'Не указана'}</p>
                <p><span className="font-medium">Тип сотрудника:</span> {employeeTypeLabels[currentEmployee.employeeType] || currentEmployee.employeeType}</p>
                <p><span className="font-medium">Отдел:</span> {currentEmployee.department?.name || 'Не указан'}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Специализированная информация</h3>
              <div className="space-y-2">
                {currentEmployee.employeeType?.toUpperCase() === 'ENGINEER' && (
                  <div>
                    <p className="font-medium">Специализации:</p>
                    {currentEmployee.specializations && currentEmployee.specializations.length > 0 ? (
                      <ul className="ml-4 mt-1">
                        {currentEmployee.specializations.map((spec: any, index: number) => (
                          <li key={index} className="text-sm text-gray-600">• {spec.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 ml-4">Специализации не указаны</p>
                    )}
                  </div>
                )}

                {currentEmployee.employeeType?.toUpperCase() === 'LAB_ASSISTANT' && (
                  <div>
                    <p className="font-medium">Лаборатория:</p>
                    <p className="text-sm text-gray-600 ml-4">
                      {currentEmployee.laboratory?.name || 'Не указана'}
                    </p>
                  </div>
                )}
                
                {currentEmployee.employeeType?.toUpperCase() === 'DESIGNER' && (
                  <div>
                    <p className="font-medium">Количество патентов:</p>
                    <p className="text-sm text-gray-600 ml-4">
                      {currentEmployee.patentsCount !== undefined ? currentEmployee.patentsCount : 'Не указано'}
                    </p>
                  </div>
                )}
                
                {currentEmployee.employeeType?.toUpperCase() === 'TECHNICIAN' && (
                  <div>
                    <p className="font-medium">Обслуживаемое оборудование:</p>
                    {currentEmployee.assignedEquipment && currentEmployee.assignedEquipment.length > 0 ? (
                      <ul className="ml-4 mt-1">
                        {currentEmployee.assignedEquipment.map((equipment: any, index: number) => (
                          <li key={index} className="text-sm text-gray-600">• {equipment.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500 ml-4">Оборудование не назначено</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EmployeeEditModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        employee={currentEmployee}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        title="Удалить сотрудника"
        description={`Вы уверены, что хотите удалить сотрудника ${currentEmployee.firstName} ${currentEmployee.lastName}? Это действие нельзя отменить.`}
        isLoading={deleteEmployeeMutation.isPending}
      />
    </div>
  );
}

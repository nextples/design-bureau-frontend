
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useEmployee } from '@/hooks/useEmployees';
import { Loader2 } from 'lucide-react';

interface EmployeeDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeId: string;
}

const employeeTypeLabels: Record<string, string> = {
  'ENGINEER': 'Инженер',
  'DESIGNER': 'Конструктор', 
  'TECHNICIAN': 'Техник',
  'LAB_ASSISTANT': 'Лаборант',
};

export function EmployeeDetailModal({ open, onOpenChange, employeeId }: EmployeeDetailModalProps) {
  const { data: employee, isLoading, error } = useEmployee(employeeId);

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Загрузка...</span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error || !employee) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="text-center py-8 text-red-500">
            Ошибка загрузки данных сотрудника
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Сотрудник: {employee.firstName} {employee.lastName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Основная информация</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Имя:</span> {employee.firstName}</p>
                <p><span className="font-medium">Фамилия:</span> {employee.lastName}</p>
                <p><span className="font-medium">Отчество:</span> {employee.middleName || 'Не указано'}</p>
                <p><span className="font-medium">Возраст:</span> {employee.age || 'Не указан'}</p>
                <p><span className="font-medium">Тип сотрудника:</span> {employeeTypeLabels[employee.employeeType] || employee.employeeType}</p>
                <p><span className="font-medium">Должность:</span> {employee.position?.name || 'Не указана'}</p>
                <p><span className="font-medium">Отдел:</span> {employee.department?.name || 'Не указан'}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Дополнительная информация</h3>
              <div className="space-y-2">
                {employee.patentsCount !== undefined && (
                  <p><span className="font-medium">Количество патентов:</span> {employee.patentsCount}</p>
                )}
                {employee.specializations && employee.specializations.length > 0 && (
                  <div>
                    <span className="font-medium">Специализации:</span>
                    <ul className="ml-4 mt-1">
                      {employee.specializations.map((spec, index) => (
                        <li key={index} className="text-sm text-gray-600">• {spec.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {employee.laboratory && (
                  <p><span className="font-medium">Лаборатория:</span> {employee.laboratory.name}</p>
                )}
                {employee.managedDepartment && (
                  <p><span className="font-medium">Руководит отделом:</span> {employee.managedDepartment.name}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

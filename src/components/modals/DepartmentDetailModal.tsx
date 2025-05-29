
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDepartment } from '@/hooks/useDepartments';
import { Loader2 } from 'lucide-react';

interface DepartmentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId: string;
}

export function DepartmentDetailModal({ open, onOpenChange, departmentId }: DepartmentDetailModalProps) {
  const { data: department, isLoading, error } = useDepartment(departmentId);

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

  if (error || !department) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="text-center py-8 text-red-500">
            Ошибка загрузки данных отдела
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Отдел: {department.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Основная информация</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Название:</span> {department.name}</p>
                <p><span className="font-medium">Описание:</span> {department.description || 'Не указано'}</p>
                <p><span className="font-medium">Руководитель:</span> {department.head ? `${department.head.firstName} ${department.head.lastName}` : 'Не назначен'}</p>
                <p><span className="font-medium">Количество сотрудников:</span> {department.totalEmployees || 0}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Дополнительная информация</h3>
              <div className="space-y-2">
                {department.createdDate && (
                  <p><span className="font-medium">Дата создания:</span> {new Date(department.createdDate).toLocaleDateString()}</p>
                )}
                {department.location && (
                  <p><span className="font-medium">Расположение:</span> {department.location}</p>
                )}
                {department.budget && (
                  <p><span className="font-medium">Бюджет:</span> {Number(department.budget).toLocaleString()} ₽</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

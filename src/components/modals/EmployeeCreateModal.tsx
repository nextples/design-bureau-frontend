
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EmployeeForm } from '@/components/forms/EmployeeForm';
import { useCreateEmployee } from '@/hooks/useEmployees';
import { EmployeeCreateDTO } from '@/types/employeeApi';

interface EmployeeCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EmployeeCreateModal({ open, onOpenChange }: EmployeeCreateModalProps) {
  const createEmployeeMutation = useCreateEmployee();

  const handleSubmit = (data: EmployeeCreateDTO) => {
    createEmployeeMutation.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Создать нового сотрудника</DialogTitle>
        </DialogHeader>
        <EmployeeForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={createEmployeeMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

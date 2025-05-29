
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EmployeeForm } from '@/components/forms/EmployeeForm';
import { useUpdateEmployee } from '@/hooks/useEmployees';
import { EmployeeUpdateDTO } from '@/types/employeeApi';

interface EmployeeEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee: any;
}

export function EmployeeEditModal({ open, onOpenChange, employee }: EmployeeEditModalProps) {
  const updateEmployeeMutation = useUpdateEmployee();

  const handleSubmit = (data: EmployeeUpdateDTO) => {
    updateEmployeeMutation.mutate(
      { id: employee.id, data },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Редактировать сотрудника</DialogTitle>
        </DialogHeader>
        <EmployeeForm
          employee={employee}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={updateEmployeeMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

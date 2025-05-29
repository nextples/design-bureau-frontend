
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DepartmentForm } from '@/components/forms/DepartmentForm';
import { useUpdateDepartment } from '@/hooks/useDepartments';
import { DepartmentUpdateDTO } from '@/types/employeeApi';

interface DepartmentEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: any;
}

export function DepartmentEditModal({ open, onOpenChange, department }: DepartmentEditModalProps) {
  const updateDepartmentMutation = useUpdateDepartment();

  const handleSubmit = (data: DepartmentUpdateDTO) => {
    updateDepartmentMutation.mutate(
      { id: department.id, data },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать отдел</DialogTitle>
        </DialogHeader>
        <DepartmentForm
          department={department}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={updateDepartmentMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

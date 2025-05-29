
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DepartmentForm } from '@/components/forms/DepartmentForm';
import { useCreateDepartment } from '@/hooks/useDepartments';
import { DepartmentCreateDTO } from '@/types/equipmentApi';

interface DepartmentCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DepartmentCreateModal({ open, onOpenChange }: DepartmentCreateModalProps) {
  const createDepartmentMutation = useCreateDepartment();

  const handleSubmit = (data: DepartmentCreateDTO) => {
    createDepartmentMutation.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создать новый отдел</DialogTitle>
        </DialogHeader>
        <DepartmentForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={createDepartmentMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}


import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SubcontractorForm } from '@/components/forms/SubcontractorForm';
import { useCreateSubcontractor } from '@/hooks/useSubcontractors';

interface SubcontractorCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubcontractorCreateModal({ open, onOpenChange }: SubcontractorCreateModalProps) {
  const createMutation = useCreateSubcontractor();

  const handleSubmit = (data: any) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создать субподрядчика</DialogTitle>
        </DialogHeader>
        <SubcontractorForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={createMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

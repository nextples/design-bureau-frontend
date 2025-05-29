
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SubcontractorForm } from '@/components/forms/SubcontractorForm';
import { useUpdateSubcontractor } from '@/hooks/useSubcontractors';
import { SubcontractorDTO } from '@/types/projectApi';

interface SubcontractorEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subcontractor: SubcontractorDTO;
}

export function SubcontractorEditModal({ open, onOpenChange, subcontractor }: SubcontractorEditModalProps) {
  const updateMutation = useUpdateSubcontractor();

  const handleSubmit = (data: any) => {
    updateMutation.mutate(
      { id: subcontractor.id, data },
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
          <DialogTitle>Редактировать субподрядчика</DialogTitle>
        </DialogHeader>
        <SubcontractorForm
          subcontractor={subcontractor}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={updateMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}


import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EquipmentForm } from '@/components/forms/EquipmentForm';
import { useCreateEquipment } from '@/hooks/useEquipment';
import { EquipmentCreateDTO } from '@/types/equipmentApi';

interface EquipmentCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EquipmentCreateModal({ open, onOpenChange }: EquipmentCreateModalProps) {
  const createEquipmentMutation = useCreateEquipment();

  const handleSubmit = (data: EquipmentCreateDTO) => {
    createEquipmentMutation.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Создать оборудование</DialogTitle>
        </DialogHeader>
        <EquipmentForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={createEquipmentMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

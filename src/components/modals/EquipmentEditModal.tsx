
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { EquipmentForm } from '@/components/forms/EquipmentForm';
import { useUpdateEquipment } from '@/hooks/useEquipment';
import { EquipmentDTO, EquipmentUpdateDTO } from '@/types/equipmentApi';

interface EquipmentEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment: EquipmentDTO;
}

export function EquipmentEditModal({ open, onOpenChange, equipment }: EquipmentEditModalProps) {
  const updateEquipmentMutation = useUpdateEquipment();

  const handleSubmit = (data: EquipmentUpdateDTO) => {
    updateEquipmentMutation.mutate(
      { id: equipment.id, data },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Редактировать оборудование</DialogTitle>
        </DialogHeader>
        <EquipmentForm
          equipment={equipment}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isLoading={updateEquipmentMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

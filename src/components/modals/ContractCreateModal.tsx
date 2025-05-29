
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ContractForm } from '@/components/forms/ContractForm';
import { useCreateContract } from '@/hooks/useContracts';

interface ContractCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContractCreateModal({ open, onOpenChange }: ContractCreateModalProps) {
  const createContractMutation = useCreateContract();

  const handleSubmit = (data: any) => {
    createContractMutation.mutate(data, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Создать договор</DialogTitle>
        </DialogHeader>
        <ContractForm
          onSubmit={handleSubmit}
          isLoading={createContractMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}


import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ContractForm } from '@/components/forms/ContractForm';
import { useUpdateContract } from '@/hooks/useContracts';

interface ContractEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contract: any;
}

export function ContractEditModal({ open, onOpenChange, contract }: ContractEditModalProps) {
  const updateContractMutation = useUpdateContract();

  const handleSubmit = (data: any) => {
    updateContractMutation.mutate(
      { id: contract.contractId, data },
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
          <DialogTitle>Редактировать договор</DialogTitle>
        </DialogHeader>
        <ContractForm
          initialData={{
            name: contract?.name,
            managerId: contract?.managerId,
          }}
          onSubmit={handleSubmit}
          isLoading={updateContractMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}

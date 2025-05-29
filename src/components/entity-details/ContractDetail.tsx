
import React, { useState } from 'react';
import { Edit, Trash, FolderOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ContractEditModal } from '@/components/modals/ContractEditModal';
import { ContractProjectsModal } from '@/components/modals/ContractProjectsModal';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';
import { useDeleteContract, useContract } from '@/hooks/useContracts';

interface ContractDetailProps {
  contract: any;
  onBack: () => void;
}

export function ContractDetail({ contract, onBack }: ContractDetailProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [contractProjectsModalOpen, setContractProjectsModalOpen] = useState(false);

  const deleteContractMutation = useDeleteContract();
  const { data: detailedContract, isLoading } = useContract(contract.contractId);

  const currentContract = detailedContract || contract;

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteContractMutation.mutate(contract.contractId, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        onBack();
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{currentContract.name}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleEdit}
            className="flex items-center gap-2"
          >
            <Edit size={16} />
            Редактировать
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <Trash size={16} />
            Удалить
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Основная информация</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Название:</span> {currentContract.name}</p>
                <p><span className="font-medium">Дата начала:</span> {
                  currentContract.startDate 
                    ? new Date(currentContract.startDate).toLocaleDateString() 
                    : 'Не указана'
                }</p>
                <p><span className="font-medium">Дата окончания:</span> {
                  currentContract.endDate 
                    ? new Date(currentContract.endDate).toLocaleDateString() 
                    : 'Не указана'
                }</p>
                <p>
                  <span className="font-medium">Руководитель договора:</span>{' '}
                  {currentContract.manager 
                    ? `${currentContract.manager.firstName} ${currentContract.manager.lastName}` 
                    : 'Не назначен'}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Проекты в договоре</h3>
              <div className="space-y-2">
                {currentContract.projects && currentContract.projects.length > 0 ? (
                  <div className="space-y-2">
                    <p><span className="font-medium">Количество проектов:</span> {currentContract.projects.length}</p>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {currentContract.projects.map((project: any) => (
                        <div key={project.id} className="p-3 bg-gray-50 rounded border">
                          <p className="font-medium text-sm">{project.name}</p>
                          {project.description && (
                            <p className="text-xs text-gray-600 mt-1">{project.description}</p>
                          )}
                          <div className="flex gap-4 text-xs text-gray-500 mt-1">
                            <span>Статус: {project.status}</span>
                            {project.cost && (
                              <span>Бюджет: {Number(project.cost).toLocaleString()} ₽</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">Проекты не назначены</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t mt-6">
            <Button
              onClick={() => setContractProjectsModalOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FolderOpen size={16} />
              Управление проектами
            </Button>
          </div>
        </CardContent>
      </Card>

      <ContractEditModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        contract={currentContract}
      />

      <ContractProjectsModal
        open={contractProjectsModalOpen}
        onOpenChange={setContractProjectsModalOpen}
        contract={currentContract}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        title="Удалить договор"
        description={`Вы уверены, что хотите удалить договор "${currentContract.name}"? Это действие нельзя отменить.`}
        isLoading={deleteContractMutation.isPending}
      />
    </div>
  );
}

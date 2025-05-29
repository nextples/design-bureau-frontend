
import React from 'react';
import { EntityType } from '@/pages/Index';
import { DepartmentCreateModal } from '@/components/modals/DepartmentCreateModal';
import { DepartmentEditModal } from '@/components/modals/DepartmentEditModal';
import { EmployeeCreateModal } from '@/components/modals/EmployeeCreateModal';
import { EmployeeEditModal } from '@/components/modals/EmployeeEditModal';
import { EquipmentCreateModal } from '@/components/modals/EquipmentCreateModal';
import { EquipmentEditModal } from '@/components/modals/EquipmentEditModal';
import { ProjectCreateModal } from '@/components/modals/ProjectCreateModal';
import { ProjectEditModal } from '@/components/modals/ProjectEditModal';
import { SubcontractorCreateModal } from '@/components/modals/SubcontractorCreateModal';
import { SubcontractorEditModal } from '@/components/modals/SubcontractorEditModal';
import { ContractCreateModal } from '@/components/modals/ContractCreateModal';
import { ContractEditModal } from '@/components/modals/ContractEditModal';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';

interface EntityModalsProps {
  entity: EntityType;
  createModalOpen: boolean;
  setCreateModalOpen: (open: boolean) => void;
  editModalOpen: boolean;
  setEditModalOpen: (open: boolean) => void;
  deleteModalOpen: boolean;
  setDeleteModalOpen: (open: boolean) => void;
  selectedItem: any;
  onDeleteConfirm: () => void;
  isDeleting: boolean;
}

export function EntityModals({
  entity,
  createModalOpen,
  setCreateModalOpen,
  editModalOpen,
  setEditModalOpen,
  deleteModalOpen,
  setDeleteModalOpen,
  selectedItem,
  onDeleteConfirm,
  isDeleting,
}: EntityModalsProps) {
  const renderCreateModal = () => {
    switch (entity) {
      case 'employees':
        return (
          <EmployeeCreateModal
            open={createModalOpen}
            onOpenChange={setCreateModalOpen}
          />
        );
      case 'departments':
        return (
          <DepartmentCreateModal
            open={createModalOpen}
            onOpenChange={setCreateModalOpen}
          />
        );
      case 'equipment':
        return (
          <EquipmentCreateModal
            open={createModalOpen}
            onOpenChange={setCreateModalOpen}
          />
        );
      case 'projects':
        return (
          <ProjectCreateModal
            open={createModalOpen}
            onOpenChange={setCreateModalOpen}
          />
        );
      case 'subcontractors':
        return (
          <SubcontractorCreateModal
            open={createModalOpen}
            onOpenChange={setCreateModalOpen}
          />
        );
      case 'contracts':
        return (
          <ContractCreateModal
            open={createModalOpen}
            onOpenChange={setCreateModalOpen}
          />
        );
      default:
        return null;
    }
  };

  const renderEditModal = () => {
    if (!selectedItem) return null;

    switch (entity) {
      case 'employees':
        return (
          <EmployeeEditModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            employee={selectedItem}
          />
        );
      case 'departments':
        return (
          <DepartmentEditModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            department={selectedItem}
          />
        );
      case 'equipment':
        return (
          <EquipmentEditModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            equipment={selectedItem}
          />
        );
      case 'projects':
        return (
          <ProjectEditModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            project={selectedItem}
          />
        );
      case 'subcontractors':
        return (
          <SubcontractorEditModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            subcontractor={selectedItem}
          />
        );
      case 'contracts':
        return (
          <ContractEditModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            contract={selectedItem}
          />
        );
      default:
        return null;
    }
  };

  const getDeleteTitle = () => {
    switch (entity) {
      case 'employees':
        return 'Удалить сотрудника';
      case 'departments':
        return 'Удалить отдел';
      case 'equipment':
        return 'Удалить оборудование';
      case 'projects':
        return 'Удалить проект';
      case 'subcontractors':
        return 'Удалить субподрядчика';
      case 'contracts':
        return 'Удалить договор';
      default:
        return 'Удалить';
    }
  };

  const getItemName = () => {
    if (!selectedItem) return '';
    return selectedItem.name || selectedItem.firstName + ' ' + selectedItem.lastName || selectedItem.companyName || '';
  };

  return (
    <>
      {renderCreateModal()}
      {renderEditModal()}
      
      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={onDeleteConfirm}
        title={getDeleteTitle()}
        description={`Вы уверены, что хотите удалить ${getItemName()}? Это действие нельзя отменить.`}
        isLoading={isDeleting}
      />
    </>
  );
}

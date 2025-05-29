import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody
} from "@/components/ui/table";
import { EntityType } from "@/pages/Index";
import { entityTitles } from './entity-list/constants';
import { EntityTableHeaders } from './entity-list/EntityTableHeaders';
import { EntityTableRow } from './entity-list/EntityTableRow';
import { EntityModals } from './entity-list/EntityModals';
import { useEntityData } from './entity-list/useEntityData';
import { EmployeeDetailModal } from './modals/EmployeeDetailModal';
import { DepartmentDetailModal } from './modals/DepartmentDetailModal';
import { EquipmentDetailModal } from './modals/EquipmentDetailModal';

// Фильтры
import { EmployeeFilters } from './filters/EmployeeFilters';
import { DepartmentFilters } from './filters/DepartmentFilters';
import { EquipmentFilters } from './filters/EquipmentFilters';
import { ContractFilters } from './filters/ContractFilters';
import { ProjectFilters } from './filters/ProjectFilters';
import { SubcontractorFilters } from './filters/SubcontractorFilters';
import { SubcontractorWorkFilters } from './filters/SubcontractorWorkFilters';

interface EntityListProps {
  entity: EntityType;
  onItemSelect: (item: any) => void;
}

export function EntityList({ entity, onItemSelect }: EntityListProps) {
  const [page, setPage] = useState(0);
  const size = 10;

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Filter states for employees
  const [employeeFirstName, setEmployeeFirstName] = useState('');
  const [employeeLastName, setEmployeeLastName] = useState('');
  const [employeePositionId, setEmployeePositionId] = useState('all');

  // Applied filters for employees
  const [appliedEmployeeFirstName, setAppliedEmployeeFirstName] = useState('');
  const [appliedEmployeeLastName, setAppliedEmployeeLastName] = useState('');
  const [appliedEmployeePositionId, setAppliedEmployeePositionId] = useState('all');

  // Filter states for departments
  const [departmentName, setDepartmentName] = useState('');
  const [appliedDepartmentName, setAppliedDepartmentName] = useState('');

  // Filter states for equipment
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [equipmentAvailable, setEquipmentAvailable] = useState('');

  // Applied filters for equipment
  const [appliedEquipmentName, setAppliedEquipmentName] = useState('');
  const [appliedEquipmentType, setAppliedEquipmentType] = useState('');
  const [appliedEquipmentAvailable, setAppliedEquipmentAvailable] = useState('');

  // Filter states for contracts
  const [contractName, setContractName] = useState('');
  const [appliedContractName, setAppliedContractName] = useState('');

  // Filter states for projects (убрали сортировку)
  const [projectName, setProjectName] = useState('');
  const [projectStatus, setProjectStatus] = useState('');

  // Applied filters for projects (убрали сортировку)
  const [appliedProjectName, setAppliedProjectName] = useState('');
  const [appliedProjectStatus, setAppliedProjectStatus] = useState('');

  // Filter states for subcontractors
  const [subcontractorName, setSubcontractorName] = useState('');
  const [appliedSubcontractorName, setAppliedSubcontractorName] = useState('');

  // Filter states for subcontractor works (убираем все фильтры, оставляем пустые переменные для совместимости)
  const [workSortBy, setWorkSortBy] = useState('');
  const [workSortOrder, setWorkSortOrder] = useState('asc');
  const [appliedWorkSortBy, setAppliedWorkSortBy] = useState('');
  const [appliedWorkSortOrder, setAppliedWorkSortOrder] = useState('asc');

  // Prepare filters based on entity type using applied filters
  const getFilters = () => {
    switch (entity) {
      case 'employees':
        return {
          firstName: appliedEmployeeFirstName || undefined,
          lastName: appliedEmployeeLastName || undefined,
          positionId: appliedEmployeePositionId === 'all' ? undefined : appliedEmployeePositionId || undefined,
          page,
          size,
        };
      case 'departments':
        return {
          name: appliedDepartmentName || undefined,
        };
      case 'equipment':
        return {
          name: appliedEquipmentName || undefined,
          typeId: appliedEquipmentType || undefined,
          available: appliedEquipmentAvailable ? appliedEquipmentAvailable === 'true' : undefined,
          page,
          size,
        };
      case 'contracts':
        return {
          name: appliedContractName || undefined,
        };
      case 'projects':
        return {
          name: appliedProjectName || undefined,
          status: appliedProjectStatus || undefined,
        };
      case 'subcontractors':
        return {
          name: appliedSubcontractorName || undefined,
        };
      case 'subcontractor-works':
        return {}; // Убираем все фильтры
      default:
        return {};
    }
  };

  const { items, isLoading, error, handleDelete, isDeleting } = useEntityData({ 
    entity, 
    page, 
    size, 
    filters: getFilters() 
  });

  // Apply filters functions
  const applyEmployeeFilters = () => {
    setAppliedEmployeeFirstName(employeeFirstName);
    setAppliedEmployeeLastName(employeeLastName);
    setAppliedEmployeePositionId(employeePositionId);
  };

  const applyDepartmentFilters = () => {
    setAppliedDepartmentName(departmentName);
  };

  const applyEquipmentFilters = () => {
    setAppliedEquipmentName(equipmentName);
    setAppliedEquipmentType(equipmentType);
    setAppliedEquipmentAvailable(equipmentAvailable);
  };

  const applyContractFilters = () => {
    setAppliedContractName(contractName);
  };

  const applyProjectFilters = () => {
    setAppliedProjectName(projectName);
    setAppliedProjectStatus(projectStatus);
  };

  const applySubcontractorFilters = () => {
    setAppliedSubcontractorName(subcontractorName);
  };

  const applyWorkFilters = () => {
    // Пустая функция, так как фильтры убраны
  };

  // Clear filters functions
  const clearEmployeeFilters = () => {
    setEmployeeFirstName('');
    setEmployeeLastName('');
    setEmployeePositionId('all');
    setAppliedEmployeeFirstName('');
    setAppliedEmployeeLastName('');
    setAppliedEmployeePositionId('all');
  };

  const clearDepartmentFilters = () => {
    setDepartmentName('');
    setAppliedDepartmentName('');
  };

  const clearEquipmentFilters = () => {
    setEquipmentName('');
    setEquipmentType('');
    setEquipmentAvailable('');
    setAppliedEquipmentName('');
    setAppliedEquipmentType('');
    setAppliedEquipmentAvailable('');
  };

  const clearContractFilters = () => {
    setContractName('');
    setAppliedContractName('');
  };

  const clearProjectFilters = () => {
    setProjectName('');
    setProjectStatus('');
    setAppliedProjectName('');
    setAppliedProjectStatus('');
  };

  const clearSubcontractorFilters = () => {
    setSubcontractorName('');
    setAppliedSubcontractorName('');
  };

  const clearWorkFilters = () => {
    // Пустая функция, так как фильтры убраны
  };

  // ... keep existing code (handleEdit, handleDeleteClick, handleItemSelect, handleDeleteConfirm functions)

  const handleEdit = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (item: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
    onItemSelect(item);
  };

  const handleDeleteConfirm = () => {
    if (!selectedItem) return;
    
    handleDelete(selectedItem.id);
    setDeleteModalOpen(false);
    setSelectedItem(null);
  };

  console.log('EntityList render:', { entity, items, isLoading, error });

  if (isLoading) {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Загрузка...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-red-500 text-lg">Ошибка загрузки данных</p>
            <p className="text-gray-500 mt-2">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const renderFilters = () => {
    switch (entity) {
      case 'employees':
        return (
          <EmployeeFilters
            firstName={employeeFirstName}
            setFirstName={setEmployeeFirstName}
            lastName={employeeLastName}
            setLastName={setEmployeeLastName}
            positionId={employeePositionId}
            setPositionId={setEmployeePositionId}
            onClear={clearEmployeeFilters}
            onApply={applyEmployeeFilters}
          />
        );
      case 'departments':
        return (
          <DepartmentFilters
            name={departmentName}
            setName={setDepartmentName}
            onClear={clearDepartmentFilters}
            onApply={applyDepartmentFilters}
          />
        );
      case 'equipment':
        return (
          <EquipmentFilters
            name={equipmentName}
            setName={setEquipmentName}
            type={equipmentType}
            setType={setEquipmentType}
            available={equipmentAvailable}
            setAvailable={setEquipmentAvailable}
            onClear={clearEquipmentFilters}
            onApply={applyEquipmentFilters}
          />
        );
      case 'contracts':
        return (
          <ContractFilters
            name={contractName}
            setName={setContractName}
            onClear={clearContractFilters}
            onApply={applyContractFilters}
          />
        );
      case 'projects':
        return (
          <ProjectFilters
            name={projectName}
            setName={setProjectName}
            status={projectStatus}
            setStatus={setProjectStatus}
            sortBy=""
            setSortBy={() => {}}
            sortOrder=""
            setSortOrder={() => {}}
            onClear={clearProjectFilters}
            onApply={applyProjectFilters}
          />
        );
      case 'subcontractors':
        return (
          <SubcontractorFilters
            name={subcontractorName}
            setName={setSubcontractorName}
            onClear={clearSubcontractorFilters}
            onApply={applySubcontractorFilters}
          />
        );
      case 'subcontractor-works':
        return null; // Убираем фильтры полностью
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{entityTitles[entity]}</h1>
            <p className="text-gray-600">Управление {entityTitles[entity].toLowerCase()}</p>
          </div>
          {entity !== 'subcontractor-works' && (
            <Button 
              onClick={() => setCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus size={20} className="mr-2" />
              Создать
            </Button>
          )}
        </div>

        {renderFilters()}

        {items && items.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <Table>
              <EntityTableHeaders entity={entity} />
              <TableBody>
                {items.map((item) => (
                  <EntityTableRow
                    key={item.id}
                    entity={entity}
                    item={item}
                    onItemSelect={handleItemSelect}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 text-lg">Нет данных для отображения</p>
            {entity !== 'subcontractor-works' && (
              <Button 
                onClick={() => setCreateModalOpen(true)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus size={20} className="mr-2" />
                Создать первую запись
              </Button>
            )}
          </div>
        )}

        <EntityModals
          entity={entity}
          createModalOpen={createModalOpen}
          setCreateModalOpen={setCreateModalOpen}
          editModalOpen={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          selectedItem={selectedItem}
          onDeleteConfirm={handleDeleteConfirm}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
}

import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';
import { EntityType } from '@/pages/Index';
import { EquipmentTableRow } from './EquipmentTableRow';
import { useEmployees } from '@/hooks/useEmployees';

interface EntityTableRowProps {
  entity: EntityType;
  item: any;
  onItemSelect: (item: any) => void;
  onEdit: (item: any, e: React.MouseEvent) => void;
  onDelete: (item: any, e: React.MouseEvent) => void;
}

const statusLabels: Record<string, string> = {
  'ACTIVE': 'Активно',
  'MAINTENANCE': 'На обслуживании',
  'BROKEN': 'Неисправно',
  'DECOMMISSIONED': 'Списано',
  'PLANNING': 'Планирование',
  'IN_PROGRESS': 'В работе',
  'COMPLETED': 'Завершен',
  'CANCELLED': 'Отменен',
};

export function EntityTableRow({ entity, item, onItemSelect, onEdit, onDelete }: EntityTableRowProps) {
  const { data: employeesData } = useEmployees({ page: 0, size: 1000 });
  const employees = employeesData?.content || [];

  if (entity === 'equipment') {
    return (
      <EquipmentTableRow 
        item={item}
        onItemSelect={onItemSelect}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  }

  const handleRowClick = () => {
    onItemSelect(item);
  };

  const getManagerName = (managerId: string) => {
    const manager = employees.find(emp => emp.id === managerId);
    return manager ? `${manager.firstName} ${manager.lastName}` : 'Не найден';
  };

  const renderCells = () => {
    switch (entity) {
      case 'employees':
        return (
          <>
            <TableCell>{item.firstName}</TableCell>
            <TableCell>{item.lastName}</TableCell>
            <TableCell>{item.position?.name || 'Не указана'}</TableCell>
          </>
        );

      case 'departments':
        return (
          <>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              {item.head ? `${item.head.firstName} ${item.head.lastName}` : 'Не назначен'}
            </TableCell>
            <TableCell>{item.totalEmployees || 0}</TableCell>
          </>
        );

      case 'projects':
        return (
          <>
            <TableCell>{item.name}</TableCell>
            <TableCell>{statusLabels[item.status] || item.status}</TableCell>
            <TableCell>{item.totalProgress}%</TableCell>
            <TableCell>{item.cost ? `${Number(item.cost).toLocaleString()} ₽` : 'Не указан'}</TableCell>
          </>
        );

      case 'contracts':
        return (
          <>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.startDate ? new Date(item.startDate).toLocaleDateString() : 'Не указана'}</TableCell>
            <TableCell>{item.endDate ? new Date(item.endDate).toLocaleDateString() : 'Не указана'}</TableCell>
            <TableCell>{item.managerId ? getManagerName(item.managerId) : 'Не назначен'}</TableCell>
          </>
        );

      case 'subcontractors':
        return (
          <>
            <TableCell>{item.companyName}</TableCell>
            <TableCell>{item.email || 'Не указан'}</TableCell>
            <TableCell>{item.phoneNumber || 'Не указан'}</TableCell>
          </>
        );

      case 'subcontractor-works':
        return (
          <>
            <TableCell>{item.project?.name || 'Не указан'}</TableCell>
            <TableCell>{item.subcontractor?.companyName || 'Не указан'}</TableCell>
            <TableCell>{item.workPercentage}%</TableCell>
            <TableCell>{item.progress}%</TableCell>
            <TableCell>{item.cost ? `${Number(item.cost).toLocaleString()} ₽` : 'Не указана'}</TableCell>
          </>
        );

      default:
        return (
          <TableCell>{item.name || item.title || 'Без названия'}</TableCell>
        );
    }
  };

  return (
    <TableRow 
      onClick={handleRowClick}
      className="cursor-pointer hover:bg-gray-50"
    >
      {renderCells()}
      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => onEdit(item, e)}
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => onDelete(item, e)}
          >
            <Trash size={16} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

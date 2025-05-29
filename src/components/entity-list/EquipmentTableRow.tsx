
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash } from 'lucide-react';

interface EquipmentTableRowProps {
  item: any;
  onItemSelect: (item: any) => void;
  onEdit: (item: any, e: React.MouseEvent) => void;
  onDelete: (item: any, e: React.MouseEvent) => void;
}

export function EquipmentTableRow({ item, onItemSelect, onEdit, onDelete }: EquipmentTableRowProps) {
  const getStatusLabel = (isAvailable: boolean) => {
    return isAvailable ? 'Доступно' : 'Занято';
  };

  const getStatusColor = (isAvailable: boolean) => {
    return isAvailable 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <TableRow
      className="cursor-pointer hover:bg-gray-50"
      onClick={() => onItemSelect(item)}
    >
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell>{item.equipmentType?.name || 'Не указан'}</TableCell>
      <TableCell>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.isAvailable)}`}>
          {getStatusLabel(item.isAvailable)}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => onEdit(item, e)}
            className="h-8 w-8 p-0"
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => onDelete(item, e)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
          >
            <Trash size={16} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

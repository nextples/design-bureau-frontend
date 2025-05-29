
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function EquipmentTableHeaders() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Название</TableHead>
        <TableHead>Тип оборудования</TableHead>
        <TableHead>Статус</TableHead>
        <TableHead className="w-24">Действия</TableHead>
      </TableRow>
    </TableHeader>
  );
}

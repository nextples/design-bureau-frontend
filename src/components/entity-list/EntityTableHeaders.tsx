import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EntityType } from '@/pages/Index';
import { EquipmentTableHeaders } from './EquipmentTableHeaders';

interface EntityTableHeadersProps {
  entity: EntityType;
}

export function EntityTableHeaders({ entity }: EntityTableHeadersProps) {
  if (entity === 'equipment') {
    return <EquipmentTableHeaders />;
  }

  switch (entity) {
    case 'employees':
      return (
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Фамилия</TableHead>
            <TableHead>Должность</TableHead>
            <TableHead className="w-24">Действия</TableHead>
          </TableRow>
        </TableHeader>
      );

    case 'departments':
      return (
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Руководитель</TableHead>
            <TableHead>Количество сотрудников</TableHead>
            <TableHead className="w-24">Действия</TableHead>
          </TableRow>
        </TableHeader>
      );

    case 'projects':
      return (
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Прогресс</TableHead>
            <TableHead>Бюджет</TableHead>
            <TableHead className="w-24">Действия</TableHead>
          </TableRow>
        </TableHeader>
      );

    case 'contracts':
      return (
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Дата начала</TableHead>
            <TableHead>Дата окончания</TableHead>
            <TableHead>Ответственный менеджер</TableHead>
            <TableHead className="w-24">Действия</TableHead>
          </TableRow>
        </TableHeader>
      );

    case 'subcontractors':
      return (
        <TableHeader>
          <TableRow>
            <TableHead>Компания</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead className="w-24">Действия</TableHead>
          </TableRow>
        </TableHeader>
      );

    case 'subcontractor-works':
      return (
        <TableHeader>
          <TableRow>
            <TableHead>Проект</TableHead>
            <TableHead>Субподрядчик</TableHead>
            <TableHead>Процент работ</TableHead>
            <TableHead>Прогресс</TableHead>
            <TableHead>Стоимость</TableHead>
            <TableHead className="w-24">Действия</TableHead>
          </TableRow>
        </TableHeader>
      );

    default:
      return (
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead className="w-24">Действия</TableHead>
          </TableRow>
        </TableHeader>
      );
  }
}


import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from '@tanstack/react-query';
import { employeeApi } from '@/services/employeeApi';

interface EmployeeFiltersProps {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  positionId: string;
  setPositionId: (value: string) => void;
  onClear: () => void;
  onApply: () => void;
}

export function EmployeeFilters({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  positionId,
  setPositionId,
  onClear,
  onApply,
}: EmployeeFiltersProps) {
  // Загружаем список должностей
  const { data: positionsData } = useQuery({
    queryKey: ['positions'],
    queryFn: () => employeeApi.getPositions({ size: 100 }),
  });

  const positions = positionsData?.content || [];

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="firstName">Имя</Label>
          <Input
            id="firstName"
            placeholder="Введите имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Фамилия</Label>
          <Input
            id="lastName"
            placeholder="Введите фамилию"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="position">Должность</Label>
          <Select value={positionId} onValueChange={setPositionId}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите должность" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все должности</SelectItem>
              {positions.map((position) => (
                <SelectItem key={position.id} value={position.id}>
                  {position.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end gap-2">
          <Button onClick={onApply} className="bg-blue-600 hover:bg-blue-700">
            Применить
          </Button>
          <Button variant="outline" onClick={onClear}>
            Очистить
          </Button>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEquipmentTypes } from '@/hooks/useEquipment';

interface EquipmentFiltersProps {
  name: string;
  setName: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  available: string;
  setAvailable: (value: string) => void;
  onClear: () => void;
  onApply: () => void;
}

export function EquipmentFilters({
  name,
  setName,
  type,
  setType,
  available,
  setAvailable,
  onClear,
  onApply,
}: EquipmentFiltersProps) {
  const { data: equipmentTypesData } = useEquipmentTypes();
  const equipmentTypes = equipmentTypesData?.content || [];

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <Label htmlFor="equipmentName">Название</Label>
          <Input
            id="equipmentName"
            placeholder="Введите название"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="equipmentType">Тип</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              {equipmentTypes.map((equipmentType) => (
                <SelectItem key={equipmentType.id} value={equipmentType.id}>
                  {equipmentType.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="equipmentStatus">Статус</Label>
          <Select value={available} onValueChange={setAvailable}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="true">Доступно</SelectItem>
              <SelectItem value="false">Недоступно</SelectItem>
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

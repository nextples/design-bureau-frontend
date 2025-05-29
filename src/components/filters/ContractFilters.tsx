
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ContractFiltersProps {
  name: string;
  setName: (value: string) => void;
  onClear: () => void;
  onApply: () => void;
}

export function ContractFilters({ name, setName, onClear, onApply }: ContractFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="contractName">Название договора</Label>
          <Input
            id="contractName"
            placeholder="Введите название договора"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-end gap-2">
          <Button onClick={onApply} className="bg-blue-600 hover:bg-blue-700">
            Применить
          </Button>
          <Button variant="outline" onClick={onClear}>
            Очистить фильтры
          </Button>
        </div>
      </div>
    </div>
  );
}

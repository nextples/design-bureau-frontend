
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectFiltersProps {
  name: string;
  setName: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  onClear: () => void;
  onApply: () => void;
}

export function ProjectFilters({
  name,
  setName,
  status,
  setStatus,
  onClear,
  onApply,
}: ProjectFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="projectName">Название проекта</Label>
          <Input
            id="projectName"
            placeholder="Введите название проекта"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="projectStatus">Статус</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="IN_PROGRESS">В работе</SelectItem>
              <SelectItem value="COMPLETED">Завершен</SelectItem>
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


import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAssignmentHistory } from '@/hooks/useEquipment';
import { employeeApi } from '@/services/employeeApi';
import { projectApi } from '@/services/projectApi';
import { Loader2 } from 'lucide-react';

interface AssignmentHistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string;
  equipmentName: string;
}

interface AssignmentWithNames {
  id: string;
  projectId: string;
  departmentId: string;
  startDate: string;
  endDate?: string;
  hoursUsed?: number;
  purpose: string;
  projectName?: string;
  departmentName?: string;
}

export function AssignmentHistoryModal({ open, onOpenChange, equipmentId, equipmentName }: AssignmentHistoryModalProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(0);
  const [assignmentsWithNames, setAssignmentsWithNames] = useState<AssignmentWithNames[]>([]);
  const [loadingNames, setLoadingNames] = useState(false);
  const size = 10;

  const { data: historyData, isLoading, error } = useAssignmentHistory(equipmentId, {
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    page,
    size,
  });

  const assignments = historyData?.content || [];

  React.useEffect(() => {
    const fetchNames = async () => {
      if (assignments.length === 0) {
        setAssignmentsWithNames([]);
        return;
      }

      setLoadingNames(true);
      try {
        const assignmentsWithNames = await Promise.all(
          assignments.map(async (assignment) => {
            const [projectName, departmentName] = await Promise.all([
              assignment.projectId 
                ? projectApi.getProjectById(assignment.projectId).then(p => p.name).catch(() => 'Неизвестный проект')
                : Promise.resolve('Не назначен'),
              assignment.departmentId
                ? employeeApi.getDepartmentById(assignment.departmentId).then(d => d.name).catch(() => 'Неизвестный отдел')
                : Promise.resolve('Не назначен')
            ]);

            return {
              ...assignment,
              projectName,
              departmentName,
            };
          })
        );
        setAssignmentsWithNames(assignmentsWithNames);
      } catch (error) {
        console.error('Ошибка при загрузке названий:', error);
        setAssignmentsWithNames(assignments.map(assignment => ({
          ...assignment,
          projectName: 'Ошибка загрузки',
          departmentName: 'Ошибка загрузки',
        })));
      } finally {
        setLoadingNames(false);
      }
    };

    fetchNames();
  }, [assignments]);

  const handleFilter = () => {
    setPage(0); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setPage(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>История назначений - {equipmentName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 flex-1 min-h-0">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="startDate">Дата начала</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="endDate">Дата окончания</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button onClick={handleFilter}>Применить фильтр</Button>
            <Button variant="outline" onClick={clearFilters}>Очистить</Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Загрузка истории...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              Ошибка загрузки истории назначений
            </div>
          ) : assignmentsWithNames.length > 0 ? (
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[100px]">ID назначения</TableHead>
                      <TableHead className="min-w-[150px]">Проект</TableHead>
                      <TableHead className="min-w-[150px]">Отдел</TableHead>
                      <TableHead className="min-w-[120px]">Дата начала</TableHead>
                      <TableHead className="min-w-[120px]">Дата окончания</TableHead>
                      <TableHead className="min-w-[100px]">Часы использования</TableHead>
                      <TableHead className="min-w-[200px]">Цель</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignmentsWithNames.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">{assignment.id}</TableCell>
                        <TableCell>
                          {loadingNames ? (
                            <div className="flex items-center">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Загрузка...
                            </div>
                          ) : (
                            assignment.projectName || 'Не назначен'
                          )}
                        </TableCell>
                        <TableCell>
                          {loadingNames ? (
                            <div className="flex items-center">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Загрузка...
                            </div>
                          ) : (
                            assignment.departmentName || 'Не назначен'
                          )}
                        </TableCell>
                        <TableCell>{assignment.startDate}</TableCell>
                        <TableCell>{assignment.endDate || 'Активно'}</TableCell>
                        <TableCell>{assignment.hoursUsed || 'Не указано'}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={assignment.purpose}>
                            {assignment.purpose}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              История назначений пуста
            </div>
          )}

          {historyData && historyData.totalPages > 1 && (
            <div className="flex justify-center gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
              >
                Предыдущая
              </Button>
              <span className="flex items-center px-3">
                Страница {page + 1} из {historyData.totalPages}
              </span>
              <Button 
                variant="outline" 
                onClick={() => setPage(Math.min(historyData.totalPages - 1, page + 1))}
                disabled={page >= historyData.totalPages - 1}
              >
                Следующая
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

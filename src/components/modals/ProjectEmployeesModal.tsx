
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { useEmployees } from '@/hooks/useEmployees';
import { useProjectById } from '@/hooks/useProjects';
import { useAddEmployeesToProject, useRemoveEmployeeFromProject } from '@/hooks/useProjectManagement';
import { Loader2, Plus, Minus } from 'lucide-react';
import { ProjectDTO } from '@/types/projectApi';
import { EmployeeDetailModal } from './EmployeeDetailModal';

interface ProjectEmployeesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectDTO;
}

const employeeTypeLabels: Record<string, string> = {
  'ENGINEER': 'Инженер',
  'DESIGNER': 'Конструктор', 
  'TECHNICIAN': 'Техник',
  'LAB_ASSISTANT': 'Лаборант',
};

export function ProjectEmployeesModal({ open, onOpenChange, project }: ProjectEmployeesModalProps) {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  
  const { data: allEmployees, isLoading: employeesLoading } = useEmployees();
  const { data: projectDetails } = useProjectById(project.id);
  const addEmployeesMutation = useAddEmployeesToProject();
  const removeEmployeeMutation = useRemoveEmployeeFromProject();

  // Get current project employees
  const projectEmployeeIds = projectDetails?.employeeIds || [];
  const projectEmployees = allEmployees?.content?.filter(employee => 
    projectEmployeeIds.includes(employee.id)
  ) || [];

  // Get available employees (not in this project)
  const availableEmployees = allEmployees?.content?.filter(employee => 
    !projectEmployeeIds.includes(employee.id)
  ) || [];

  const handleAddEmployee = (employeeId: string) => {
    addEmployeesMutation.mutate({
      projectId: project.id,
      employeeIds: [employeeId]
    });
  };

  const handleRemoveEmployee = (employeeId: string) => {
    removeEmployeeMutation.mutate({
      projectId: project.id,
      employeeId
    });
  };

  const handleShowDetails = (employee: any) => {
    setSelectedEmployee(employee);
    setDetailModalOpen(true);
  };

  if (employeesLoading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px]">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Загрузка...</span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] max-h-[600px]">
          <DialogHeader>
            <DialogTitle>Управление сотрудниками проекта</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Участники проекта ({projectEmployees.length})</TabsTrigger>
              <TabsTrigger value="available">Доступные сотрудники ({availableEmployees.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="space-y-4 max-h-[400px] overflow-y-auto">
              {projectEmployees.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Нет назначенных сотрудников</p>
              ) : (
                <div className="grid gap-4">
                  {projectEmployees.map((employee) => (
                    <Card key={employee.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{employee.firstName} {employee.lastName}</h4>
                          <p className="text-sm text-gray-600">Тип: {employeeTypeLabels[employee.employeeType] || employee.employeeType}</p>
                          <p className="text-sm text-gray-600">Должность: {employee.position?.name || 'Не указана'}</p>
                          <p className="text-sm text-gray-600">Отдел: {employee.department?.name || 'Не указан'}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShowDetails(employee)}
                          >
                            Подробнее
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRemoveEmployee(employee.id)}
                            disabled={removeEmployeeMutation.isPending}
                          >
                            <Minus size={16} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="available" className="space-y-4 max-h-[400px] overflow-y-auto">
              {availableEmployees.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Нет доступных сотрудников</p>
              ) : (
                <div className="grid gap-4">
                  {availableEmployees.map((employee) => (
                    <Card key={employee.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{employee.firstName} {employee.lastName}</h4>
                          <p className="text-sm text-gray-600">Тип: {employeeTypeLabels[employee.employeeType] || employee.employeeType}</p>
                          <p className="text-sm text-gray-600">Должность: {employee.position?.name || 'Не указана'}</p>
                          <p className="text-sm text-gray-600">Отдел: {employee.department?.name || 'Не указан'}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShowDetails(employee)}
                          >
                            Подробнее
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleAddEmployee(employee.id)}
                            disabled={addEmployeesMutation.isPending}
                          >
                            <Plus size={16} />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {selectedEmployee && (
        <EmployeeDetailModal
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          employee={selectedEmployee}
        />
      )}
    </>
  );
}

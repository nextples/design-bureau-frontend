
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
import { useEquipment } from '@/hooks/useEquipment';
import { useProjectById } from '@/hooks/useProjects';
import { useAddEquipmentToProject, useRemoveEquipmentFromProject } from '@/hooks/useProjectManagement';
import { Loader2, Plus, Minus } from 'lucide-react';
import { ProjectDTO } from '@/types/projectApi';
import { EquipmentDetailModal } from './EquipmentDetailModal';

interface ProjectEquipmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectDTO;
}

export function ProjectEquipmentModal({ open, onOpenChange, project }: ProjectEquipmentModalProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  
  const { data: availableEquipment, isLoading: equipmentLoading } = useEquipment();
  const { data: projectDetails } = useProjectById(project.id);
  const addEquipmentMutation = useAddEquipmentToProject();
  const removeEquipmentMutation = useRemoveEquipmentFromProject();

  // Filter available equipment (only available equipment without project assignment)
  const filteredEquipment = availableEquipment?.content?.filter(equipment => 
    equipment.isAvailable && 
    !equipment.currentProjectId
  ) || [];

  // Get current project equipment
  const projectEquipment = availableEquipment?.content?.filter(equipment => 
    equipment.currentProjectId === project.id
  ) || [];

  const handleAddEquipment = (equipmentId: string) => {
    addEquipmentMutation.mutate({
      projectId: project.id,
      data: {
        equipmentIds: [equipmentId],
        purpose: "Назначение оборудования на проект"
      }
    });
  };

  const handleRemoveEquipment = (equipmentId: string) => {
    removeEquipmentMutation.mutate({
      projectId: project.id,
      equipmentId
    });
  };

  const handleShowDetails = (equipment: any) => {
    setSelectedEquipment(equipment);
    setDetailModalOpen(true);
  };

  if (equipmentLoading) {
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
            <DialogTitle>Управление оборудованием проекта</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Текущее оборудование ({projectEquipment.length})</TabsTrigger>
              <TabsTrigger value="available">Доступное оборудование ({filteredEquipment.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="space-y-4 max-h-[400px] overflow-y-auto">
              {projectEquipment.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Нет назначенного оборудования</p>
              ) : (
                <div className="grid gap-4">
                  {projectEquipment.map((equipment) => (
                    <Card key={equipment.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{equipment.name}</h4>
                          <p className="text-sm text-gray-600">Тип: {equipment.equipmentType?.name || 'Не указан'}</p>
                          <p className="text-sm text-gray-600">Серийный номер: {equipment.serialNumber || 'Не указан'}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShowDetails(equipment)}
                          >
                            Подробнее
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRemoveEquipment(equipment.id)}
                            disabled={removeEquipmentMutation.isPending}
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
              {filteredEquipment.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Нет доступного оборудования</p>
              ) : (
                <div className="grid gap-4">
                  {filteredEquipment.map((equipment) => (
                    <Card key={equipment.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{equipment.name}</h4>
                          <p className="text-sm text-gray-600">Тип: {equipment.equipmentType?.name || 'Не указан'}</p>
                          <p className="text-sm text-gray-600">Серийный номер: {equipment.serialNumber || 'Не указан'}</p>
                          <p className="text-sm text-green-600">✓ Доступно</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShowDetails(equipment)}
                          >
                            Подробнее
                          </Button>
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => handleAddEquipment(equipment.id)}
                            disabled={addEquipmentMutation.isPending}
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

      {selectedEquipment && (
        <EquipmentDetailModal
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          equipment={selectedEquipment}
        />
      )}
    </>
  );
}

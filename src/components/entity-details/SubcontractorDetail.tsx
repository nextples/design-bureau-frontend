
import React, { useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SubcontractorEditModal } from '@/components/modals/SubcontractorEditModal';
import { DeleteConfirmModal } from '@/components/modals/DeleteConfirmModal';
import { useDeleteSubcontractor, useSubcontractorById } from '@/hooks/useSubcontractors';

interface SubcontractorDetailProps {
  subcontractor: any;
  onBack: () => void;
}

export function SubcontractorDetail({ subcontractor, onBack }: SubcontractorDetailProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const deleteSubcontractorMutation = useDeleteSubcontractor();
  const { data: detailedSubcontractor } = useSubcontractorById(subcontractor.id);

  const currentSubcontractor = detailedSubcontractor || subcontractor;

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    deleteSubcontractorMutation.mutate(subcontractor.id, {
      onSuccess: () => {
        setDeleteModalOpen(false);
        onBack();
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{currentSubcontractor.companyName}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleEdit}
            className="flex items-center gap-2"
          >
            <Edit size={16} />
            Редактировать
          </Button>
          <Button
            variant="outline"
            onClick={handleDelete}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <Trash size={16} />
            Удалить
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Основная информация</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Компания:</span> {currentSubcontractor.companyName}</p>
                <p><span className="font-medium">Email:</span> {currentSubcontractor.email || 'Не указан'}</p>
                <p><span className="font-medium">Телефон:</span> {currentSubcontractor.phoneNumber || 'Не указан'}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Субподрядные работы</h3>
              <div className="space-y-2">
                {currentSubcontractor.works && currentSubcontractor.works.length > 0 ? (
                  <div className="max-h-48 overflow-y-auto">
                    {currentSubcontractor.works.map((work: any) => (
                      <div key={work.id} className="p-2 bg-gray-50 rounded border mb-2">
                        <p className="font-medium text-sm">{work.project?.name || 'Проект не указан'}</p>
                        <div className="text-xs text-gray-600 space-y-1">
                          <p>Процент работ: {work.workPercentage}%</p>
                          <p>Прогресс: {work.progress}%</p>
                          <p>Стоимость: {work.cost ? `${Number(work.cost).toLocaleString()} ₽` : 'Не указана'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Работы не назначены</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <SubcontractorEditModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        subcontractor={currentSubcontractor}
      />

      <DeleteConfirmModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={handleDeleteConfirm}
        title="Удалить субподрядчика"
        description={`Вы уверены, что хотите удалить субподрядчика "${currentSubcontractor.companyName}"? Это действие нельзя отменить.`}
        isLoading={deleteSubcontractorMutation.isPending}
      />
    </div>
  );
}

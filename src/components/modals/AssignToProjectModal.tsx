
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAssignToProject } from '@/hooks/useEquipment';
import { useDepartments } from '@/hooks/useDepartments';
import { AssignmentRequestDTO } from '@/types/equipmentApi';

const assignmentSchema = z.object({
  projectId: z.string().min(1, 'ID проекта обязателен'),
  responsibleDepartmentId: z.string().min(1, 'Ответственный отдел обязателен'),
  purpose: z.string().min(1, 'Цель назначения обязательна').max(500, 'Цель назначения должна содержать не больше 500 символов'),
});

interface AssignToProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipmentId: string;
}

export function AssignToProjectModal({ open, onOpenChange, equipmentId }: AssignToProjectModalProps) {
  const assignToProjectMutation = useAssignToProject();
  const { data: departments } = useDepartments();

  const form = useForm({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      projectId: '',
      responsibleDepartmentId: '',
      purpose: '',
    },
  });

  const handleSubmit = (data: AssignmentRequestDTO) => {
    assignToProjectMutation.mutate(
      { equipmentId, data },
      {
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Назначить оборудование на проект</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID проекта</FormLabel>
                  <FormControl>
                    <Input placeholder="Введите ID проекта" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibleDepartmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ответственный отдел</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите отдел" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments?.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цель назначения</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Опишите цель назначения оборудования на проект"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Отмена
              </Button>
              <Button type="submit" disabled={assignToProjectMutation.isPending}>
                {assignToProjectMutation.isPending ? 'Назначение...' : 'Назначить'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

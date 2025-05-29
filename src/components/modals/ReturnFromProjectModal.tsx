
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useReturnFromProject } from '@/hooks/useEquipment';
import { ReturnRequestDTO } from '@/types/equipmentApi';

const returnSchema = z.object({
  hoursUsed: z.string().min(1, 'Количество часов обязательно').transform((val) => parseInt(val, 10)).refine((val) => val >= 0, 'Минимальное количество часов: 0'),
});

interface ReturnFromProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignmentId: string;
  equipmentName: string;
}

export function ReturnFromProjectModal({ open, onOpenChange, assignmentId, equipmentName }: ReturnFromProjectModalProps) {
  const returnFromProjectMutation = useReturnFromProject();

  const form = useForm({
    resolver: zodResolver(returnSchema),
    defaultValues: {
      hoursUsed: '',
    },
  });

  const handleSubmit = (data: { hoursUsed: number }) => {
    returnFromProjectMutation.mutate(
      { assignmentId, data },
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
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Вернуть оборудование с проекта</DialogTitle>
          <DialogDescription>
            Возврат оборудования "{equipmentName}" с проекта
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="hoursUsed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Количество часов использования</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      placeholder="Введите количество часов" 
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
              <Button type="submit" variant="destructive" disabled={returnFromProjectMutation.isPending}>
                {returnFromProjectMutation.isPending ? 'Возврат...' : 'Вернуть'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

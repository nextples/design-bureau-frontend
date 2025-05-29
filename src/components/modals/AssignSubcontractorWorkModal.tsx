
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
import { Slider } from '@/components/ui/slider';
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
import { useSubcontractors } from '@/hooks/useSubcontractors';
import { useAssignWorkToSubcontractor } from '@/hooks/useSubcontractorWorks';
import { ProjectDTO } from '@/types/projectApi';

interface AssignSubcontractorWorkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectDTO;
}

export function AssignSubcontractorWorkModal({ 
  open, 
  onOpenChange, 
  project 
}: AssignSubcontractorWorkModalProps) {
  const { data: subcontractors } = useSubcontractors();
  const assignWorkMutation = useAssignWorkToSubcontractor();

  // Calculate maximum percentage available for assignment
  const maxPercentage = Math.max(1, 100 - (project.totalProgress || 0));

  const assignWorkSchema = z.object({
    subcontractorId: z.string().min(1, 'Выберите субподрядчика'),
    percentage: z.number()
      .min(1, 'Минимальный процент: 1%')
      .max(maxPercentage, `Максимальный процент: ${maxPercentage}%`),
  });

  const form = useForm({
    resolver: zodResolver(assignWorkSchema),
    defaultValues: {
      subcontractorId: '',
      percentage: Math.min(50, maxPercentage),
    },
  });

  const watchedPercentage = form.watch('percentage');

  const handleSubmit = (data: any) => {
    assignWorkMutation.mutate({
      projectId: project.id,
      subcontractorId: data.subcontractorId,
      percentage: data.percentage
    }, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Передать работу субподрядчику</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Проект:</span> {project.name}
              </p>
              <p className="text-sm text-blue-800">
                <span className="font-medium">Общий прогресс:</span> {project.totalProgress || 0}%
              </p>
              <p className="text-sm text-blue-800">
                <span className="font-medium">Доступно для передачи:</span> {maxPercentage}%
              </p>
            </div>

            <FormField
              control={form.control}
              name="subcontractorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Субподрядчик</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите субподрядчика" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subcontractors?.map((subcontractor) => (
                        <SelectItem key={subcontractor.id} value={subcontractor.id}>
                          {subcontractor.companyName}
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
              name="percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Процент работ: {watchedPercentage}%</FormLabel>
                  <FormControl>
                    <div className="px-2">
                      <Slider
                        min={1}
                        max={maxPercentage}
                        step={1}
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                        className="w-full"
                      />
                    </div>
                  </FormControl>
                  <div className="flex justify-between text-xs text-gray-500 px-2">
                    <span>1%</span>
                    <span>{maxPercentage}%</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Отмена
              </Button>
              <Button type="submit" disabled={assignWorkMutation.isPending}>
                {assignWorkMutation.isPending ? 'Передача...' : 'Передать работу'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

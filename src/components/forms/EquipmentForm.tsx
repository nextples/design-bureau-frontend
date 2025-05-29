
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EquipmentDTO } from '@/types/employeeApi';
import { useEquipmentTypes } from '@/hooks/useEquipment';
import { useDepartments } from '@/hooks/useDepartments';

const equipmentSchema = z.object({
  name: z.string().min(2, 'Название должно содержать минимум 2 символа').max(100, 'Название должно содержать максимум 100 символов'),
  serialNumber: z.string().regex(/^EQ-[A-Z]{3}\d{4}$/, 'Серийный номер должен быть в формате EQ-AAA0000').optional().or(z.literal('')),
  equipmentTypeId: z.string().min(1, 'Тип оборудования обязателен'),
  purchaseDate: z.string().optional(),
  ownerDepartmentId: z.string().optional(),
});

interface EquipmentFormProps {
  equipment?: EquipmentDTO;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function EquipmentForm({ equipment, onSubmit, onCancel, isLoading }: EquipmentFormProps) {
  const { data: equipmentTypesData } = useEquipmentTypes();
  const { data: departments } = useDepartments();

  const equipmentTypes = equipmentTypesData?.content || [];

  const form = useForm({
    resolver: zodResolver(equipmentSchema),
    defaultValues: {
      name: equipment?.name || '',
      serialNumber: equipment?.serialNumber || '',
      equipmentTypeId: equipment?.equipmentType?.id || '',
      purchaseDate: equipment?.purchaseDate || '',
      ownerDepartmentId: equipment?.currentDepartmentId || '',
    },
  });

  const handleSubmit = (data: any) => {
    const submitData = {
      ...data,
      serialNumber: data.serialNumber || undefined,
      purchaseDate: data.purchaseDate || undefined,
      ownerDepartmentId: data.ownerDepartmentId === 'none' ? undefined : data.ownerDepartmentId,
    };
    onSubmit(submitData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input placeholder="Введите название оборудования" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Серийный номер</FormLabel>
              <FormControl>
                <Input placeholder="EQ-ABC1234" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="equipmentTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип оборудования</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип оборудования" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {equipmentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
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
          name="purchaseDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Дата покупки</FormLabel>
              <FormControl>
                <Input 
                  type="date" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ownerDepartmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Отдел-владелец</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || 'none'}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите отдел" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">Не указан</SelectItem>
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

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

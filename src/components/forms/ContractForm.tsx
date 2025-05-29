
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEmployees } from '@/hooks/useEmployees';

const contractSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  managerId: z.string().min(1, 'Менеджер обязателен'),
});

type ContractFormData = z.infer<typeof contractSchema>;

interface ContractFormProps {
  initialData?: Partial<ContractFormData>;
  onSubmit: (data: ContractFormData) => void;
  isLoading?: boolean;
}

export function ContractForm({ initialData, onSubmit, isLoading }: ContractFormProps) {
  const { data: employeesData } = useEmployees({ page: 0, size: 1000 });
  const employees = employeesData?.content || [];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: initialData,
  });

  const managerId = watch('managerId');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Название договора</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Введите название договора"
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="managerId">Менеджер договора</Label>
        <Select value={managerId} onValueChange={(value) => setValue('managerId', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите менеджера" />
          </SelectTrigger>
          <SelectContent>
            {employees.map((employee) => (
              <SelectItem key={employee.id} value={employee.id}>
                {employee.firstName} {employee.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.managerId && (
          <p className="text-sm text-red-500">{errors.managerId.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </form>
  );
}

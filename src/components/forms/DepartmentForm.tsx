
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DepartmentCreateDTO, DepartmentUpdateDTO } from '@/types/employeeApi';
import { useEmployees } from '@/hooks/useEmployees';

interface DepartmentFormProps {
  department?: any;
  onSubmit: (data: DepartmentCreateDTO | DepartmentUpdateDTO) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DepartmentForm({ department, onSubmit, onCancel, isLoading }: DepartmentFormProps) {
  const { data: employeesData } = useEmployees({ size: 100 });
  const employees = employeesData?.content || [];

  const form = useForm({
    defaultValues: {
      name: department?.name || '',
      headId: department?.head?.id || 'none',
    },
  });

  const handleSubmit = (data: any) => {
    const submitData = {
      ...data,
      headId: data.headId === 'none' ? undefined : data.headId,
    };
    onSubmit(submitData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: "Название отдела обязательно" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название отдела</FormLabel>
              <FormControl>
                <Input placeholder="Введите название отдела" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="headId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Руководитель</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите руководителя" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">Без руководителя</SelectItem>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.firstName} {employee.lastName} - {employee.position?.name}
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
            {isLoading ? 'Сохранение...' : (department ? 'Обновить' : 'Создать')}
          </Button>
        </div>
      </form>
    </Form>
  );
}

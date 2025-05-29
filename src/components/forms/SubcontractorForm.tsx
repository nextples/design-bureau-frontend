
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
import { SubcontractorDTO } from '@/types/projectApi';

const subcontractorSchema = z.object({
  companyName: z.string().min(1, 'Название компании обязательно').max(100, 'Название должно содержать максимум 100 символов'),
  email: z.string().email('Неверный формат email').optional().or(z.literal('')),
  phoneNumber: z.string().regex(/^\+?[1-9][0-9]{7,14}$/, 'Телефонный номер должен начинаться с + и содержать 7-14 цифр').optional().or(z.literal('')),
});

interface SubcontractorFormProps {
  subcontractor?: SubcontractorDTO;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function SubcontractorForm({ subcontractor, onSubmit, onCancel, isLoading }: SubcontractorFormProps) {
  const form = useForm({
    resolver: zodResolver(subcontractorSchema),
    defaultValues: {
      companyName: subcontractor?.companyName || '',
      email: subcontractor?.email || '',
      phoneNumber: subcontractor?.phoneNumber || '',
    },
  });

  const handleSubmit = (data: any) => {
    const submitData = {
      ...data,
      email: data.email || undefined,
      phoneNumber: data.phoneNumber || undefined,
    };
    onSubmit(submitData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название компании</FormLabel>
              <FormControl>
                <Input placeholder="Введите название компании" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="Введите email" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl>
                <Input 
                  placeholder="+7 (xxx) xxx-xx-xx" 
                  {...field} 
                />
              </FormControl>
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


import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { EmployeeCreateDTO, EmployeeUpdateDTO, EmployeeType } from '@/types/employeeApi';
import { useDepartments } from '@/hooks/useDepartments';
import { useQuery } from '@tanstack/react-query';
import { employeeApi } from '@/services/employeeApi';
import { useEquipment } from '@/hooks/useEquipment';
import {useLaboratories} from "@/hooks/useEmployees.ts";
import {equipmentApi} from "@/services/equipmentApi.ts";

interface EmployeeFormProps {
  employee?: any;
  onSubmit: (data: EmployeeCreateDTO | EmployeeUpdateDTO) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const employeeTypes: { value: EmployeeType; label: string }[] = [
  { value: 'ENGINEER', label: 'Инженер' },
  { value: 'DESIGNER', label: 'Конструктор' },
  { value: 'TECHNICIAN', label: 'Техник' },
  { value: 'LAB_ASSISTANT', label: 'Лаборант' },
];

export function EmployeeForm({ employee, onSubmit, onCancel, isLoading }: EmployeeFormProps) {
  const { data: departments } = useDepartments();
  const [selectedEmployeeType, setSelectedEmployeeType] = useState<EmployeeType>(employee?.employeeType || 'ENGINEER');
  
  // Получаем должности только для выбранного типа сотрудника
  const { data: positionsData } = useQuery({
    queryKey: ['positions', selectedEmployeeType],
    queryFn: () => employeeApi.getPositions({ type: selectedEmployeeType, size: 100 }),
    enabled: !!selectedEmployeeType,
  });

  const { data: specializationsData } = useQuery({
    queryKey: ['specializations'],
    queryFn: () => employeeApi.getSpecializations({ size: 100 }),
    enabled: !!selectedEmployeeType && selectedEmployeeType === 'ENGINEER',
  });

  const { data: laboratoriesData } = useQuery({
    queryKey: ['laboratories'],
    queryFn: () => employeeApi.getLaboratories({ size: 100 }),
    enabled: selectedEmployeeType === 'LAB_ASSISTANT',
  });

  const { data: equipmentData } = useQuery({
    queryKey: ['equipments'],
    queryFn: () => equipmentApi.getEquipment({ size: 100 }),
    enabled: selectedEmployeeType === 'TECHNICIAN',
  });

  const positions = positionsData?.content || [];
  const specializations = specializationsData?.content || [];
  const laboratories = laboratoriesData?.content || [];
  const equipment = equipmentData?.content || [];

  const form = useForm({
    defaultValues: {
      firstName: employee?.firstName || '',
      lastName: employee?.lastName || '',
      age: employee?.age?.toString() || '',
      employeeType: employee?.employeeType || '',
      positionId: employee?.position?.id || '',
      departmentId: employee?.department?.id || '',
      patentsCount: employee?.patentsCount?.toString() || '',
      laboratoryId: employee?.laboratory?.id || '',
      specializationIds: employee?.specializations?.map((s: any) => s.id) || [],
      equipmentIds: employee?.assignedEquipment?.map((e: any) => e.id) || [],
    },
  });

  const watchedEmployeeType = form.watch('employeeType');

  useEffect(() => {
    if (watchedEmployeeType) {
      setSelectedEmployeeType(watchedEmployeeType as EmployeeType);
      // При изменении типа сотрудника сбрасываем должность только если это новый сотрудник
      if (!employee && form.getValues('positionId')) {
        form.setValue('positionId', '');
      }
    }
  }, [watchedEmployeeType, form, employee]);

  // Устанавливаем правильное значение должности когда загружаются позиции
  useEffect(() => {
    if (employee && positions.length > 0 && employee.position?.id) {
      const currentPosition = positions.find(p => p.id === employee.position.id);
      if (currentPosition) {
        form.setValue('positionId', employee.position.id);
      }
    }
  }, [positions, employee, form]);

  const handleSubmit = (data: any) => {
    const submitData = {
      ...data,
      age: parseInt(data.age),
      patentsCount: data.patentsCount ? parseInt(data.patentsCount) : undefined,
      specializationIds: data.specializationIds?.length > 0 ? data.specializationIds : undefined,
      equipmentIds: data.equipmentIds?.length > 0 ? data.equipmentIds : undefined,
      laboratoryId: data.laboratoryId || undefined,
    };
    
    // Очищаем поля, которые не нужны для данного типа сотрудника
    if (selectedEmployeeType !== 'DESIGNER') {
      delete submitData.patentsCount;
    }
    if (selectedEmployeeType !== 'LAB_ASSISTANT') {
      delete submitData.laboratoryId;
    }
    if (selectedEmployeeType !== 'ENGINEER') {
      delete submitData.specializationIds;
    }
    if (selectedEmployeeType !== 'TECHNICIAN') {
      delete submitData.equipmentIds;
    }
    
    onSubmit(submitData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            rules={{ required: "Имя обязательно" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="Введите имя" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            rules={{ required: "Фамилия обязательна" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Фамилия</FormLabel>
                <FormControl>
                  <Input placeholder="Введите фамилию" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="age"
            rules={{ required: "Возраст обязателен" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Возраст</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Введите возраст" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="employeeType"
            rules={{ required: "Тип сотрудника обязателен" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тип сотрудника</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employeeTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="positionId"
          rules={{ required: "Должность обязательна" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Должность</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите должность" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position.id} value={position.id}>
                      {position.name}
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
          name="departmentId"
          rules={{ required: "Отдел обязателен" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Отдел</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите отдел" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departments?.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Поле для конструктора - количество патентов */}
        {selectedEmployeeType === 'DESIGNER' && (
          <FormField
            control={form.control}
            name="patentsCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Количество патентов</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Введите количество патентов" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Поле для лаборанта - выбор лаборатории */}
        {selectedEmployeeType === 'LAB_ASSISTANT' && (
          <FormField
            control={form.control}
            name="laboratoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Лаборатория</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите лабораторию" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {laboratories.map((lab) => (
                      <SelectItem key={lab.id} value={lab.id}>
                        {lab.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Поле для инженера - специализации */}
        {selectedEmployeeType === 'ENGINEER' && (
          <FormField
            control={form.control}
            name="specializationIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Специализации</FormLabel>
                <div className="space-y-2">
                  {specializations.map((spec) => (
                    <div key={spec.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={spec.id}
                        checked={field.value?.includes(spec.id)}
                        onCheckedChange={(checked) => {
                          const currentIds = field.value || [];
                          if (checked) {
                            field.onChange([...currentIds, spec.id]);
                          } else {
                            field.onChange(currentIds.filter((id: string) => id !== spec.id));
                          }
                        }}
                      />
                      <label htmlFor={spec.id} className="text-sm font-medium leading-none cursor-pointer">
                        {spec.name}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Поле для техника - оборудование */}
        {selectedEmployeeType === 'TECHNICIAN' && (
          <FormField
            control={form.control}
            name="equipmentIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Обслуживаемое оборудование</FormLabel>
                <div className="space-y-2">
                  {equipment.map((equip) => (
                    <div key={equip.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={equip.id}
                        checked={field.value?.includes(equip.id)}
                        onCheckedChange={(checked) => {
                          const currentIds = field.value || [];
                          if (checked) {
                            field.onChange([...currentIds, equip.id]);
                          } else {
                            field.onChange(currentIds.filter((id: string) => id !== equip.id));
                          }
                        }}
                      />
                      <label htmlFor={equip.id} className="text-sm font-medium leading-none cursor-pointer">
                        {equip.name} ({equip.equipmentType?.name || 'Тип не указан'})
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : (employee ? 'Обновить' : 'Создать')}
          </Button>
        </div>
      </form>
    </Form>
  );
}


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EntityType } from '@/pages/Index';
import { useEmployees, useDeleteEmployee } from '@/hooks/useEmployees';
import { useDepartments, useDeleteDepartment } from '@/hooks/useDepartments';
import { useEquipment, useDeleteEquipment } from '@/hooks/useEquipment';
import { useProjects, useDeleteProject } from '@/hooks/useProjects';
import { useSubcontractors, useDeleteSubcontractor } from '@/hooks/useSubcontractors';
import { useSubcontractorWorks, useDeleteSubcontractorWork } from '@/hooks/useSubcontractorWorks';
import { useContracts, useDeleteContract } from '@/hooks/useContracts';

interface UseEntityDataProps {
  entity: EntityType;
  page: number;
  size: number;
  filters?: any;
}

export function useEntityData({ entity, page, size, filters }: UseEntityDataProps) {
  // Queries for different entities with filters
  const employeesQuery = useEmployees(entity === 'employees' ? filters : { page, size });
  const departmentsQuery = useDepartments(entity === 'departments' ? filters : undefined);
  const equipmentQuery = useEquipment(entity === 'equipment' ? filters : { page, size });
  const projectsQuery = useProjects(entity === 'projects' ? filters : undefined);
  const subcontractorsQuery = useSubcontractors(entity === 'subcontractors' ? filters : undefined);
  const subcontractorWorksQuery = useSubcontractorWorks(entity === 'subcontractor-works' ? filters : undefined);
  const contractsQuery = useContracts(entity === 'contracts' ? filters : undefined);

  // Delete mutations
  const deleteEmployeeMutation = useDeleteEmployee();
  const deleteDepartmentMutation = useDeleteDepartment();
  const deleteEquipmentMutation = useDeleteEquipment();
  const deleteProjectMutation = useDeleteProject();
  const deleteSubcontractorMutation = useDeleteSubcontractor();
  const deleteSubcontractorWorkMutation = useDeleteSubcontractorWork();
  const deleteContractMutation = useDeleteContract();

  // Get the appropriate query and delete mutation based on entity type
  const getEntityData = () => {
    switch (entity) {
      case 'employees':
        return {
          query: employeesQuery,
          items: employeesQuery.data?.content || [],
          deleteMutation: deleteEmployeeMutation,
        };
      case 'departments':
        return {
          query: departmentsQuery,
          items: departmentsQuery.data || [],
          deleteMutation: deleteDepartmentMutation,
        };
      case 'equipment':
        return {
          query: equipmentQuery,
          items: equipmentQuery.data?.content || [],
          deleteMutation: deleteEquipmentMutation,
        };
      case 'projects':
        return {
          query: projectsQuery,
          items: projectsQuery.data || [],
          deleteMutation: deleteProjectMutation,
        };
      case 'subcontractors':
        return {
          query: subcontractorsQuery,
          items: subcontractorsQuery.data || [],
          deleteMutation: deleteSubcontractorMutation,
        };
      case 'subcontractor-works':
        return {
          query: subcontractorWorksQuery,
          items: subcontractorWorksQuery.data || [],
          deleteMutation: deleteSubcontractorWorkMutation,
        };
      case 'contracts':
        return {
          query: contractsQuery,
          items: contractsQuery.data || [],
          deleteMutation: deleteContractMutation,
        };
      default:
        return {
          query: { isLoading: false, error: null, data: [] },
          items: [],
          deleteMutation: { mutate: () => {}, isPending: false },
        };
    }
  };

  const { query, items, deleteMutation } = getEntityData();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  console.log(`${entity} data:`, { items, isLoading: query.isLoading, error: query.error });

  return {
    items,
    isLoading: query.isLoading,
    error: query.error,
    handleDelete,
    isDeleting: deleteMutation.isPending,
  };
}


import React from 'react';

interface SubcontractorWorkFiltersProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
  onClear: () => void;
  onApply: () => void;
}

export function SubcontractorWorkFilters({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  onClear,
  onApply,
}: SubcontractorWorkFiltersProps) {
  // Возвращаем пустой div, так как фильтры убраны
  return null;
}

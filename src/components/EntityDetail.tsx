
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { EntityType } from "@/pages/Index";
import { ContractDetail } from "./entity-details/ContractDetail";
import { ProjectDetail } from "./entity-details/ProjectDetail";
import { EmployeeDetail } from "./entity-details/EmployeeDetail";
import { DepartmentDetail } from "./entity-details/DepartmentDetail";
import { EquipmentDetail } from "./entity-details/EquipmentDetail";
import { SubcontractorDetail } from "./entity-details/SubcontractorDetail";
import { SubcontractorWorkDetail } from "./entity-details/SubcontractorWorkDetail";

interface EntityDetailProps {
  entity: EntityType;
  item: any;
  onBack: () => void;
}

export function EntityDetail({ entity, item, onBack }: EntityDetailProps) {
  if (!item) {
    return <div>Данные не найдены</div>;
  }

  const renderDetailComponent = () => {
    switch (entity) {
      case 'contracts':
        return <ContractDetail contract={item} onBack={onBack} />;
      case 'projects':
        return <ProjectDetail project={item} onBack={onBack} />;
      case 'employees':
        return <EmployeeDetail employee={item} onBack={onBack} />;
      case 'departments':
        return <DepartmentDetail department={item} onBack={onBack} />;
      case 'equipment':
        return <EquipmentDetail equipment={item} onBack={onBack} />;
      case 'subcontractors':
        return <SubcontractorDetail subcontractor={item} onBack={onBack} />;
      case 'subcontractor-works':
        return <SubcontractorWorkDetail work={item} onBack={onBack} />;
      default:
        return <div>Информация недоступна</div>;
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Назад
          </Button>
        </div>

        {renderDetailComponent()}
      </div>
    </div>
  );
}

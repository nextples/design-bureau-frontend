
import React from 'react';
import { EntityType } from "@/pages/Index";
import { EntityList } from "@/components/EntityList";
import { EntityDetail } from "@/components/EntityDetail";
import { EfficiencyReports } from "@/components/EfficiencyReports";

interface MainContentProps {
  selectedEntity: EntityType;
  selectedItem: any;
  onItemSelect: (item: any) => void;
  onBackToList: () => void;
}

export function MainContent({ 
  selectedEntity, 
  selectedItem, 
  onItemSelect, 
  onBackToList 
}: MainContentProps) {
  if (selectedEntity === 'efficiency-reports') {
    return (
      <div className="flex-1 flex flex-col">
        <div className="p-6">
          <EfficiencyReports />
        </div>
      </div>
    );
  }

  if (selectedItem) {
    return (
      <EntityDetail
        entity={selectedEntity}
        item={selectedItem}
        onBack={onBackToList}
      />
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <EntityList
        entity={selectedEntity}
        onItemSelect={onItemSelect}
      />
    </div>
  );
}


import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MainContent } from "@/components/MainContent";

export type EntityType = 'employees' | 'departments' | 'equipment' | 'contracts' | 'projects' | 'subcontractors' | 'subcontractor-works' | 'efficiency-reports';

const Index = () => {
  const [selectedEntity, setSelectedEntity] = useState<EntityType>('employees');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleEntitySelect = (entity: EntityType) => {
    setSelectedEntity(entity);
    setSelectedItem(null); // Сбрасываем выбранный элемент при смене раздела
  };

  const handleLogoClick = () => {
    setSelectedEntity('employees'); // Можно установить любой дефолтный раздел
    setSelectedItem(null);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar 
          selectedEntity={selectedEntity} 
          onEntitySelect={handleEntitySelect}
          onLogoClick={handleLogoClick}
        />
        <main className="flex-1">
          <MainContent
            selectedEntity={selectedEntity}
            selectedItem={selectedItem}
            onItemSelect={setSelectedItem}
            onBackToList={() => setSelectedItem(null)}
          />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;

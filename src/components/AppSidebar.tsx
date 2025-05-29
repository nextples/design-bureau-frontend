
import { 
  Users, 
  Building, 
  Wrench, 
  FileText, 
  FolderOpen, 
  Building2,
  Briefcase,
  BarChart3
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { EntityType } from "@/pages/Index";

interface AppSidebarProps {
  selectedEntity: EntityType;
  onEntitySelect: (entity: EntityType) => void;
  onLogoClick: () => void;
}

const menuItems = [
  {
    id: 'employees' as EntityType,
    title: "Сотрудники",
    icon: Users,
  },
  {
    id: 'departments' as EntityType,
    title: "Отделы", 
    icon: Building,
  },
  {
    id: 'equipment' as EntityType,
    title: "Оборудование",
    icon: Wrench,
  },
  {
    id: 'contracts' as EntityType,
    title: "Договоры",
    icon: FileText,
  },
  {
    id: 'projects' as EntityType,
    title: "Проекты",
    icon: FolderOpen,
  },
  {
    id: 'subcontractors' as EntityType,
    title: "Субподрядчики",
    icon: Building2,
  },
  {
    id: 'subcontractor-works' as EntityType,
    title: "Субподрядные работы",
    icon: Briefcase,
  },
  {
    id: 'efficiency-reports' as EntityType,
    title: "Отчеты по эффективности",
    icon: BarChart3,
  },
];

export function AppSidebar({ selectedEntity, onEntitySelect, onLogoClick }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-6">
        <button 
          onClick={onLogoClick}
          className="text-left hover:opacity-70 transition-opacity"
        >
          <h1 className="text-xl font-bold text-gray-900">Проектная организация</h1>
          <p className="text-sm text-gray-500">Система управления</p>
        </button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3">
            Основные разделы
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onEntitySelect(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      selectedEntity === item.id
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon 
                      size={20} 
                      className={selectedEntity === item.id ? "text-blue-600" : "text-gray-400"}
                    />
                    <span className="font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

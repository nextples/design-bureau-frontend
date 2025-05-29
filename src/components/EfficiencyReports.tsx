
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useProjectsEfficiency, useContractsEfficiency } from '@/hooks/useEfficiency';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Target } from 'lucide-react';

export function EfficiencyReports() {
  const { data: projectsData, isLoading: projectsLoading } = useProjectsEfficiency();
  const { data: contractsData, isLoading: contractsLoading } = useContractsEfficiency();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PAUSED':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'В процессе';
      case 'COMPLETED':
        return 'Завершен';
      case 'PAUSED':
        return 'Приостановлен';
      default:
        return status;
    }
  };

  if (projectsLoading || contractsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Загрузка отчетов...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Отчеты по эффективности</h1>
        <p className="text-gray-600">Анализ эффективности проектов и договоров по стоимости в день</p>
      </div>

      {/* Проекты */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Эффективность проектов
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projectsData?.map((item) => (
            <Card key={item.project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                    {item.project.name}
                  </CardTitle>
                  <Badge className={getStatusColor(item.project.status)}>
                    {getStatusText(item.project.status)}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{item.project.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Стоимость в день */}
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 font-medium">Стоимость в день</span>
                  </div>
                  <span className="text-lg font-bold text-green-800">
                    {formatCurrency(item.costPerDay)}
                  </span>
                </div>

                {/* Общая стоимость */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Общая стоимость:</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(item.project.cost)}
                  </span>
                </div>

                {/* Прогресс */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Общий прогресс:</span>
                    <span className="text-sm font-medium">{item.project.totalProgress}%</span>
                  </div>
                  <Progress value={item.project.totalProgress} className="h-2" />
                </div>

                {/* Внутренний прогресс */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Внутренний прогресс:</span>
                    <span className="text-sm font-medium">{item.project.internalProgress}%</span>
                  </div>
                  <Progress value={item.project.internalProgress} className="h-2" />
                </div>

                {/* Даты */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Начат: {formatDate(item.project.startDate)}</span>
                </div>
                {item.project.endDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Завершен: {formatDate(item.project.endDate)}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Договоры */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          Эффективность договоров
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contractsData?.map((item) => (
            <Card key={item.contract.contractId} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {item.contract.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Стоимость в день */}
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700 font-medium">Стоимость в день</span>
                  </div>
                  <span className="text-lg font-bold text-purple-800">
                    {formatCurrency(item.costPerDay)}
                  </span>
                </div>

                {/* Даты */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Начат: {formatDate(item.contract.startDate)}</span>
                  </div>
                  {item.contract.endDate && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Завершен: {formatDate(item.contract.endDate)}</span>
                    </div>
                  )}
                  {!item.contract.endDate && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>В процессе</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

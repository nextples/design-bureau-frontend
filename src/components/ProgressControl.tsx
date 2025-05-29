
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Minus, Plus } from 'lucide-react';

interface ProgressControlProps {
  value: number;
  onValueChange: (value: number) => void;
  label: string;
  disabled?: boolean;
  min?: number;
  max?: number;
}

export function ProgressControl({ 
  value, 
  onValueChange, 
  label, 
  disabled = false,
  min = 0,
  max = 100 
}: ProgressControlProps) {
  const handleDecrease = () => {
    const newValue = Math.max(min, value - 5);
    onValueChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = Math.min(max, value + 5);
    onValueChange(newValue);
  };

  const getProgressColor = () => {
    if (value >= 80) return 'bg-green-500';
    if (value >= 60) return 'bg-blue-500';
    if (value >= 40) return 'bg-yellow-500';
    if (value >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
        <span className="text-sm font-medium text-gray-900">
          {value}%
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDecrease}
          disabled={disabled || value <= min}
          className="h-8 w-8 p-0"
        >
          <Minus size={16} />
        </Button>
        <div className="flex-1">
          <div className="relative w-full bg-secondary rounded-full h-4 overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${getProgressColor()}`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleIncrease}
          disabled={disabled || value >= max}
          className="h-8 w-8 p-0"
        >
          <Plus size={16} />
        </Button>
      </div>
    </div>
  );
}

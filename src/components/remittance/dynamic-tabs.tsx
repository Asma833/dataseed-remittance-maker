import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabItem {
  value: string;
  label: string;
  content?: React.ReactNode;
}

interface DynamicTabsProps {
  tabs: TabItem[];
  defaultValue?: string;
  onTabChange?: (value: string) => void;
  children?: React.ReactNode;
}

const DynamicTabs: React.FC<DynamicTabsProps> = ({ tabs, defaultValue = 'card', onTabChange, children }) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange?.(tab.value)}
            className={`flex-1 w-36 px-4 py-2 cursor-pointer rounded-md text-sm font-medium transition-colors text-white ${
              defaultValue === tab.value
                ? 'bg-gradient-to-r from-[#85308E] to-[#D62058]'
                : 'bg-[#787878] hover:bg-[#888888]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
};

export default DynamicTabs;
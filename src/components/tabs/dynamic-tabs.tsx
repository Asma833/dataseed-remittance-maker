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
  activeTab?: string;
  onTabChange?: (value: string) => void;
  children?: React.ReactNode;
}

const DynamicTabs: React.FC<DynamicTabsProps> = ({ tabs, defaultValue = 'card', activeTab, onTabChange, children }) => {
  const currentActiveTab = activeTab || defaultValue;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange?.(tab.value)}
            className={`min-w-0 px-2 py-2 cursor-pointer rounded text-xs font-medium transition-colors text-white whitespace-nowrap ${
              currentActiveTab === tab.value
                ? 'bg-gradient-to-r from-[#85308E] to-[#D62058]'
                : 'bg-[#787878] hover:bg-[#888888]'
            }`}
          >
            {tab.label.toUpperCase()}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
};

export default DynamicTabs;

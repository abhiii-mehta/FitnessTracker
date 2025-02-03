import React from 'react';
import { Dumbbell, Utensils, Calculator, Trophy } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
      active
        ? 'bg-blue-500 text-white'
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="flex flex-col space-y-2 w-64 p-4 bg-white border-r border-gray-200">
      <NavItem
        icon={<Dumbbell className="w-5 h-5" />}
        label="Workouts"
        active={activeTab === 'workouts'}
        onClick={() => onTabChange('workouts')}
      />
      <NavItem
        icon={<Utensils className="w-5 h-5" />}
        label="Calories"
        active={activeTab === 'calories'}
        onClick={() => onTabChange('calories')}
      />
      <NavItem
        icon={<Calculator className="w-5 h-5" />}
        label="Calorie Advice"
        active={activeTab === 'advice'}
        onClick={() => onTabChange('advice')}
      />
      <NavItem
        icon={<Trophy className="w-5 h-5" />}
        label="Streaks"
        active={activeTab === 'streaks'}
        onClick={() => onTabChange('streaks')}
      />
    </nav>
  );
}
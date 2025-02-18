import React from 'react';
import { Dumbbell, Utensils, Calculator, Trophy, Menu, X } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors w-full ${
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
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleNav}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Sidebar */}
      <nav className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-200 ease-in-out
        flex flex-col w-64 p-4 bg-white border-r border-gray-200
        lg:transform-none
      `}>
        <div className="space-y-2">
          <NavItem
            icon={<Dumbbell className="w-5 h-5" />}
            label="Workouts"
            active={activeTab === 'workouts'}
            onClick={() => {
              onTabChange('workouts');
              setIsOpen(false);
            }}
          />
          <NavItem
            icon={<Utensils className="w-5 h-5" />}
            label="Calories"
            active={activeTab === 'calories'}
            onClick={() => {
              onTabChange('calories');
              setIsOpen(false);
            }}
          />
          <NavItem
            icon={<Calculator className="w-5 h-5" />}
            label="Calorie Calculator"
            active={activeTab === 'calculator'}
            onClick={() => {
              onTabChange('calculator');
              setIsOpen(false);
            }}
          />
          <NavItem
            icon={<Trophy className="w-5 h-5" />}
            label="Streaks"
            active={activeTab === 'streaks'}
            onClick={() => {
              onTabChange('streaks');
              setIsOpen(false);
            }}
          />
        </div>
      </nav>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
import React from 'react';
import { Check } from 'lucide-react';
import { Theme } from '../../types';
import { Card, CardContent } from '../ui/Card';

interface ThemeCardProps {
  theme: Theme;
  isSelected: boolean;
  onSelect: (themeId: string) => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, isSelected, onSelect }) => {
  return (
    <Card 
      className={`border-2 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? `border-burgundy-600 ring-2 ring-burgundy-200` 
          : `border-transparent hover:border-gray-300`
      }`}
      onClick={() => onSelect(theme.id)}
    >
      <div className="relative">
        <img 
          src={theme.preview} 
          alt={theme.name} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-burgundy-600 rounded-full p-1 text-white">
            <Check className="h-4 w-4" />
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-lg text-gray-900">{theme.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
        
        <div className="mt-4 flex items-center space-x-3">
          <div 
            className="h-6 w-6 rounded-full border border-gray-200" 
            style={{ backgroundColor: theme.primaryColor }}
            title="Primary Color"
          />
          <div 
            className="h-6 w-6 rounded-full border border-gray-200" 
            style={{ backgroundColor: theme.secondaryColor }}
            title="Secondary Color"
          />
          <div className="text-sm text-gray-500">
            {theme.fontFamily.split(',')[0]}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeCard;
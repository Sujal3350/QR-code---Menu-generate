import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { MenuCategory } from '../../types';
import Button from '../ui/Button';

interface MenuCategoryProps {
  category: MenuCategory;
  onEdit: (category: MenuCategory) => void;
  onDelete: (categoryId: string) => void;
}

const MenuCategoryItem: React.FC<MenuCategoryProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md mb-4">
      <div>
        <h3 className="font-medium text-gray-900">{category.name}</h3>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(category)}
          aria-label={`Edit ${category.name}`}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(category.id)}
          aria-label={`Delete ${category.name}`}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default MenuCategoryItem;
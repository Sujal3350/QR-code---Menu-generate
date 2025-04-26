import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { MenuItem as MenuItemType } from '../../types';
import { formatCurrency } from '../../lib/utils';
import Button from '../ui/Button';
import { Card, CardContent } from '../ui/Card';

interface MenuItemProps {
  item: MenuItemType;
  onEdit: (item: MenuItemType) => void;
  onDelete: (itemId: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onEdit, onDelete }) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <p className="ml-2 text-lg font-semibold text-burgundy-600">
                {formatCurrency(item.price)}
              </p>
            </div>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{item.description}</p>
          </div>
          {item.image && (
            <div className="ml-4 flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-md object-cover"
              />
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(item)}
            aria-label={`Edit ${item.name}`}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(item.id)}
            aria-label={`Delete ${item.name}`}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItem;
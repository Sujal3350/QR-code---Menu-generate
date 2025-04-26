import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import { MenuItem, MenuCategory } from '../../types';
import { generateUniqueId } from '../../lib/utils';

interface MenuItemFormProps {
  item?: MenuItem;
  categories: MenuCategory[];
  onSubmit: (item: MenuItem) => void;
  onCancel: () => void;
}

interface MenuItemFormData {
  name: string;
  description: string;
  price: string;
  categoryId: string;
  image?: string;
}

const MenuItemForm: React.FC<MenuItemFormProps> = ({
  item,
  categories,
  onSubmit,
  onCancel,
}) => {
  const isEditing = !!item;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuItemFormData>({
    defaultValues: {
      name: item?.name || '',
      description: item?.description || '',
      price: item?.price ? item.price.toString() : '',
      categoryId: item?.categoryId || (categories[0]?.id || ''),
      image: item?.image || '',
    },
  });

  const handleFormSubmit = (data: MenuItemFormData) => {
    onSubmit({
      id: item?.id || generateUniqueId(),
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      categoryId: data.categoryId,
      image: data.image,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">
        {isEditing ? 'Edit Menu Item' : 'Add Menu Item'}
      </h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Item Name"
          error={errors.name?.message}
          {...register('name', {
            required: 'Item name is required',
          })}
        />
        <TextArea
          label="Description"
          error={errors.description?.message}
          {...register('description', {
            required: 'Description is required',
          })}
        />
        <Input
          label="Price"
          type="number"
          step="0.01"
          error={errors.price?.message}
          {...register('price', {
            required: 'Price is required',
            min: {
              value: 0,
              message: 'Price must be greater than or equal to 0',
            },
          })}
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
            {...register('categoryId', {
              required: 'Category is required',
            })}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-sm text-red-500">{errors.categoryId.message}</p>
          )}
        </div>
        <Input
          label="Image URL (optional)"
          error={errors.image?.message}
          {...register('image')}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update' : 'Add'} Item
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MenuItemForm;
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { MenuCategory } from '../../types';
import { generateUniqueId } from '../../lib/utils';

interface CategoryFormProps {
  category?: MenuCategory;
  onSubmit: (category: MenuCategory) => void;
  onCancel: () => void;
}

interface CategoryFormData {
  name: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSubmit,
  onCancel,
}) => {
  const isEditing = !!category;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: category?.name || '',
    },
  });

  const handleFormSubmit = (data: CategoryFormData) => {
    onSubmit({
      id: category?.id || generateUniqueId(),
      name: data.name,
      order: category?.order || 0,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">
        {isEditing ? 'Edit Category' : 'Add Category'}
      </h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Category Name"
          error={errors.name?.message}
          {...register('name', {
            required: 'Category name is required',
          })}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? 'Update' : 'Add'} Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
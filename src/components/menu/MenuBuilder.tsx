import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { MenuCategory as MenuCategoryType, MenuItem as MenuItemType } from '../../types';
import Button from '../ui/Button';
import MenuCategoryItem from './MenuCategory';
import MenuItem from './MenuItem';
import CategoryForm from './CategoryForm';
import MenuItemForm from './MenuItemForm';

const MenuBuilder: React.FC = () => {
  const { menu, addCategory, updateCategory, deleteCategory, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();
  
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<MenuCategoryType | null>(null);
  
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemType | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  if (!menu) {
    return (
      <div className="p-6 bg-white rounded-lg shadow text-center">
        <p className="text-gray-600 mb-4">No menu found. Create a new menu to get started.</p>
      </div>
    );
  }

  const handleAddCategory = (category: MenuCategoryType) => {
    addCategory(category);
    setIsAddingCategory(false);
  };

  const handleUpdateCategory = (category: MenuCategoryType) => {
    updateCategory(category);
    setEditingCategory(null);
  };

  const handleEditCategory = (category: MenuCategoryType) => {
    setEditingCategory(category);
    setIsAddingCategory(false);
  };

  const handleAddItem = (item: MenuItemType) => {
    addMenuItem(item);
    setIsAddingItem(false);
  };

  const handleUpdateItem = (item: MenuItemType) => {
    updateMenuItem(item);
    setEditingItem(null);
  };

  const handleEditItem = (item: MenuItemType) => {
    setEditingItem(item);
    setIsAddingItem(false);
  };

  // Filter items by selected category
  const itemsToShow = selectedCategoryId
    ? menu.items.filter(item => item.categoryId === selectedCategoryId)
    : menu.items;

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
          <Button 
            onClick={() => {
              setIsAddingCategory(true);
              setEditingCategory(null);
            }}
            size="sm"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
        
        {isAddingCategory && (
          <div className="mb-6 animate-fade-in">
            <CategoryForm
              onSubmit={handleAddCategory}
              onCancel={() => setIsAddingCategory(false)}
            />
          </div>
        )}
        
        {editingCategory && (
          <div className="mb-6 animate-fade-in">
            <CategoryForm
              category={editingCategory}
              onSubmit={handleUpdateCategory}
              onCancel={() => setEditingCategory(null)}
            />
          </div>
        )}
        
        {menu.categories.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No categories yet. Create your first category to get started.
          </p>
        ) : (
          <div className="space-y-2">
            {menu.categories.map((category) => (
              <MenuCategoryItem
                key={category.id}
                category={category}
                onEdit={handleEditCategory}
                onDelete={deleteCategory}
              />
            ))}
          </div>
        )}
      </div>

      {/* Menu Items Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Menu Items</h2>
          <Button 
            onClick={() => {
              setIsAddingItem(true);
              setEditingItem(null);
            }}
            size="sm"
            disabled={menu.categories.length === 0}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        {menu.categories.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            Please create at least one category before adding menu items.
          </p>
        ) : (
          <>
            {/* Category filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Category
              </label>
              <select
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
                value={selectedCategoryId || ''}
                onChange={(e) => setSelectedCategoryId(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {menu.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {isAddingItem && (
              <div className="mb-6 animate-fade-in">
                <MenuItemForm
                  categories={menu.categories}
                  onSubmit={handleAddItem}
                  onCancel={() => setIsAddingItem(false)}
                />
              </div>
            )}
            
            {editingItem && (
              <div className="mb-6 animate-fade-in">
                <MenuItemForm
                  item={editingItem}
                  categories={menu.categories}
                  onSubmit={handleUpdateItem}
                  onCancel={() => setEditingItem(null)}
                />
              </div>
            )}
            
            {itemsToShow.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No items yet. Add your first menu item to get started.
              </p>
            ) : (
              <div className="space-y-4">
                {itemsToShow.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    onEdit={handleEditItem}
                    onDelete={deleteMenuItem}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MenuBuilder;
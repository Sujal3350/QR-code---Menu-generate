import React, { createContext, useContext, useState } from 'react';
import { Menu, MenuCategory, MenuItem, MenuContextType } from '../types';
import { generateUniqueId } from '../lib/utils';

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenuState] = useState<Menu | null>(null);

  const setMenu = (newMenu: Menu) => {
    setMenuState(newMenu);
  };

  const addCategory = (category: MenuCategory) => {
    if (!menu) return;
    
    const newCategory = {
      ...category,
      id: category.id || generateUniqueId(),
    };
    
    setMenuState({
      ...menu,
      categories: [...menu.categories, newCategory],
    });
  };

  const updateCategory = (category: MenuCategory) => {
    if (!menu) return;
    
    setMenuState({
      ...menu,
      categories: menu.categories.map((c) => 
        c.id === category.id ? category : c
      ),
    });
  };

  const deleteCategory = (categoryId: string) => {
    if (!menu) return;
    
    setMenuState({
      ...menu,
      categories: menu.categories.filter((c) => c.id !== categoryId),
      // Remove items that belong to the deleted category
      items: menu.items.filter((item) => item.categoryId !== categoryId),
    });
  };

  const addMenuItem = (item: MenuItem) => {
    if (!menu) return;
    
    const newItem = {
      ...item,
      id: item.id || generateUniqueId(),
    };
    
    setMenuState({
      ...menu,
      items: [...menu.items, newItem],
    });
  };

  const updateMenuItem = (item: MenuItem) => {
    if (!menu) return;
    
    setMenuState({
      ...menu,
      items: menu.items.map((i) => 
        i.id === item.id ? item : i
      ),
    });
  };

  const deleteMenuItem = (itemId: string) => {
    if (!menu) return;
    
    setMenuState({
      ...menu,
      items: menu.items.filter((i) => i.id !== itemId),
    });
  };

  const setTheme = (themeId: string) => {
    if (!menu) return;
    
    setMenuState({
      ...menu,
      themeId,
    });
  };

  const publishMenu = () => {
    if (!menu) return;

    const updatedMenu = {
      ...menu,
      published: true,
    };

    setMenuState(updatedMenu);

    // Save the published menu to localStorage
    localStorage.setItem(`menu_${menu.id}`, JSON.stringify(updatedMenu));
  };

  return (
    <MenuContext.Provider
      value={{
        menu,
        setMenu,
        addCategory,
        updateCategory,
        deleteCategory,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        setTheme,
        publishMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
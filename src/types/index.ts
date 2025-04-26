export interface User {
  id: string;
  email: string;
  businessName: string;
  logo?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  categoryId: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  order: number;
}

export interface Menu {
  id: string;
  businessName: string;
  logo?: string;
  categories: MenuCategory[];
  items: MenuItem[];
  themeId: string;
  published: boolean;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  preview: string;
}

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, businessName: string) => Promise<void>;
  logout: () => void;
};

export type MenuContextType = {
  menu: Menu | null;
  setMenu: (menu: Menu) => void;
  addCategory: (category: MenuCategory) => void;
  updateCategory: (category: MenuCategory) => void;
  deleteCategory: (categoryId: string) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (itemId: string) => void;
  setTheme: (themeId: string) => void;
  publishMenu: () => void;
};
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMenu } from '../../context/MenuContext';
import PageContainer from '../../components/layout/PageContainer';
import CreateMenuCard from '../../components/dashboard/CreateMenuCard';
import MenuCard from '../../components/dashboard/MenuCard';
import { Menu } from '../../types';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { menu } = useMenu();
  const [userMenus, setUserMenus] = useState<Menu[]>([]);

  useEffect(() => {
    // In a real app, this would fetch menus from a database
    // For now, just use the current menu from context if it exists
    if (menu) {
      setUserMenus([menu]);
    } else {
      // Check if there's a menu in localStorage as a simple persistence mechanism
      const storedMenu = localStorage.getItem('userMenu');
      if (storedMenu) {
        setUserMenus([JSON.parse(storedMenu)]);
      }
    }
  }, [menu]);

  // Save menu to localStorage when it changes
  useEffect(() => {
    if (menu) {
      localStorage.setItem('userMenu', JSON.stringify(menu));
    }
  }, [menu]);

  return (
    <PageContainer 
      title="Dashboard" 
      subtitle={`Welcome back, ${user?.businessName || 'vendor'}!`}
    >
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Menus</p>
            <p className="text-2xl font-bold text-burgundy-600">{userMenus.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Published Menus</p>
            <p className="text-2xl font-bold text-burgundy-600">
              {userMenus.filter(m => m.published).length}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Items</p>
            <p className="text-2xl font-bold text-burgundy-600">
              {userMenus.reduce((total, current) => total + current.items.length, 0)}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-medium text-gray-900 mb-4">Your Menus</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userMenus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
        
        {/* Only show create card if there are no menus or fewer than 5 (arbitrary limit) */}
        {userMenus.length === 0 || userMenus.length < 5 ? (
          <CreateMenuCard />
        ) : null}
      </div>

      {userMenus.length === 0 && (
        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Get Started</h3>
          <p className="text-gray-600 mb-4">
            Create your first digital menu to generate a QR code for your customers.
          </p>
        </div>
      )}
    </PageContainer>
  );
};

export default DashboardPage;
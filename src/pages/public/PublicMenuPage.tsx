import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Menu } from '../../types';
import PublicMenuView from '../../components/public/PublicMenuView';

const PublicMenuPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulating API fetch with a timeout
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        const storedMenu = localStorage.getItem(`menu_${id}`);
        
        if (storedMenu) {
          const parsedMenu = JSON.parse(storedMenu);
          setMenu(parsedMenu);
        } else {
          setError('Menu not found');
        }
      } catch (err) {
        setError('Error loading menu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-burgundy-600 rounded-full border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error || !menu) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Menu Not Found</h2>
          <p className="text-gray-600 mb-8">
            The menu you're looking for doesn't exist or has been removed.
          </p>
          <img 
            src="https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Menu not found" 
            className="rounded-lg shadow-md max-w-full"
          />
        </div>
      </div>
    );
  }

  return <PublicMenuView menu={menu} />;
};

export default PublicMenuPage;
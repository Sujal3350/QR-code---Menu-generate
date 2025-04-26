import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../../context/MenuContext';
import PageContainer from '../../components/layout/PageContainer';
import MenuBuilder from '../../components/menu/MenuBuilder';
import Button from '../../components/ui/Button';
import { Save } from 'lucide-react';

const MenuEditorPage: React.FC = () => {
  const { menu, publishMenu } = useMenu();
  const navigate = useNavigate();

  const handlePublish = () => {
    publishMenu();
    // In a real app, you would save to the database here
    alert('Menu published successfully!');
  };

  const handleNext = () => {
    navigate('/theme-select');
  };

  return (
    <PageContainer
      title="Menu Editor"
      subtitle="Add categories and items to your menu"
    >
      {!menu ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">No menu found. Create a new menu to get started.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      ) : (
        <>
          <MenuBuilder />
          
          <div className="mt-8 flex justify-end space-x-4">
            <Button 
              variant="outline" 
              onClick={handlePublish}
              disabled={!menu || menu.categories.length === 0 || menu.items.length === 0}
              className="flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Publish Menu
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!menu || menu.categories.length === 0 || menu.items.length === 0}
              className="flex items-center"
            >
              Next: Select Theme
            </Button>
          </div>

          <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Editor Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
              <li>Start by creating categories for your menu (e.g., Appetizers, Main Courses, Desserts)</li>
              <li>Add items to each category with names, descriptions, and prices</li>
              <li>You can add optional images to items by providing image URLs</li>
              <li>Edit or delete categories and items as needed</li>
              <li>After adding your menu items, select a theme and generate your QR code</li>
            </ul>
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default MenuEditorPage;
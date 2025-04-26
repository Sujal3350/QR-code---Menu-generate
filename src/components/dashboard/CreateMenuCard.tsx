import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../../context/MenuContext';
import { useAuth } from '../../context/AuthContext';
import { generateUniqueId } from '../../lib/utils';

const CreateMenuCard: React.FC = () => {
  const navigate = useNavigate();
  const { setMenu } = useMenu();
  const { user } = useAuth();

  const handleCreateMenu = () => {
    if (!user) return;

    // Create an empty menu with default values
    const newMenu = {
      id: generateUniqueId(),
      businessName: user.businessName,
      logo: user.logo,
      categories: [],
      items: [],
      themeId: 'elegant', // Default theme
      published: false,
    };

    setMenu(newMenu);
    navigate('/menu-editor');
  };

  return (
    <Card className="h-full flex items-center justify-center animate-fade-in">
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-gray-100 p-4">
            <PlusCircle className="h-10 w-10 text-burgundy-600" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">Create a New Menu</h3>
        <p className="text-gray-600 mb-6">
          Start building your digital menu with categories and items
        </p>

        <Button onClick={handleCreateMenu} className="w-full">
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Menu
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreateMenuCard;
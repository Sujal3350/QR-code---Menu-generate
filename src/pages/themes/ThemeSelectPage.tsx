import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../../context/MenuContext';
import PageContainer from '../../components/layout/PageContainer';
import ThemeCard from '../../components/theme/ThemeCard';
import Button from '../../components/ui/Button';
import { themes } from '../../data/themes';
import { QrCode, ArrowLeft } from 'lucide-react';

const ThemeSelectPage: React.FC = () => {
  const { menu, setTheme } = useMenu();
  const navigate = useNavigate();

  if (!menu) {
    return (
      <PageContainer title="Select Theme">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">No menu found. Create a new menu to get started.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </PageContainer>
    );
  }

  const handleThemeSelect = (themeId: string) => {
    setTheme(themeId);
  };

  const handleBack = () => {
    navigate('/menu-editor');
  };

  const handleNext = () => {
    navigate('/qr-code');
  };

  return (
    <PageContainer
      title="Select Menu Theme"
      subtitle="Choose a visual style for your digital menu"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            isSelected={menu.themeId === theme.id}
            onSelect={handleThemeSelect}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={handleBack} className="flex items-center">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Editor
        </Button>
        <Button onClick={handleNext} className="flex items-center">
          <QrCode className="h-4 w-4 mr-2" />
          Generate QR Code
        </Button>
      </div>
    </PageContainer>
  );
};

export default ThemeSelectPage;
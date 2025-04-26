import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../../context/MenuContext';
import PageContainer from '../../components/layout/PageContainer';
import QRCodeGenerator from '../../components/qrcode/QRCodeGenerator';
import Button from '../../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const QRCodePage: React.FC = () => {
  const { menu } = useMenu();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/theme-select');
  };

  if (!menu) {
    return (
      <PageContainer title="QR Code Generator">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">No menu found. Create a new menu to get started.</p>
          <Button onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="QR Code Generator"
      subtitle="Generate and download a QR code for your digital menu"
    >
      <div className="max-w-2xl mx-auto">
        <QRCodeGenerator menu={menu} />
        
        <div className="mt-8 flex justify-start">
          <Button variant="outline" onClick={handleBack} className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Themes
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default QRCodePage;
import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';
import { Menu } from '../../types';

interface QRCodeGeneratorProps {
  menu: Menu;
  baseUrl?: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  menu, 
  baseUrl = window.location.origin 
}) => {
  const [qrSize, setQrSize] = useState<number>(256);
  const menuUrl = `${baseUrl}/menu/${menu.id}`;

  const handleDownload = () => {
    const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `${menu.businessName.replace(/\s+/g, '-')}-qr-menu.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Your QR Code Menu</h3>
        <p className="text-gray-600 text-sm">Scan the QR code below or share the URL with your customers</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-100 inline-block mb-6">
        <QRCodeSVG 
          id="qr-code-svg"
          value={menuUrl}
          size={qrSize}
          level="H"
          includeMargin={true}
          imageSettings={{
            src: menu.logo || '',
            excavate: true,
            height: menu.logo ? 24 : 0,
            width: menu.logo ? 24 : 0,
          }}
        />
        <canvas 
          id="qr-code-canvas" 
          style={{ display: 'none' }}
          width={qrSize}
          height={qrSize}
        />
      </div>

      <div className="mb-6">
        <div className="text-gray-600 mb-2 text-sm break-all">
          <span className="font-medium">Menu URL:</span> <a href={menuUrl} target="_blank" rel="noopener noreferrer" className="text-burgundy-600 hover:underline">{menuUrl}</a>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <div className="flex items-center space-x-2">
          <label htmlFor="qr-size" className="text-sm font-medium text-gray-700">Size:</label>
          <select
            id="qr-size"
            value={qrSize}
            onChange={(e) => setQrSize(Number(e.target.value))}
            className="rounded-md border border-gray-300 py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-burgundy-500 focus:border-transparent"
          >
            <option value="128">Small (128px)</option>
            <option value="256">Medium (256px)</option>
            <option value="512">Large (512px)</option>
            <option value="1024">X-Large (1024px)</option>
          </select>
        </div>
        <Button onClick={handleDownload} className="flex items-center justify-center">
          <Download className="h-4 w-4 mr-2" />
          Download QR Code
        </Button>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p className="mb-2">Instructions:</p>
        <ol className="text-left space-y-1 list-decimal list-inside">
          <li>Download the QR code image</li>
          <li>Print it on your marketing materials or table tents</li>
          <li>Customers can scan it with their smartphone camera</li>
          <li>They'll be taken directly to your digital menu</li>
        </ol>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
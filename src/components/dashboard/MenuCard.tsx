import React from 'react';
import { Menu, Theme } from '../../types';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import { FileEdit, Eye, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getThemeById } from '../../data/themes';

interface MenuCardProps {
  menu: Menu;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu }) => {
  const theme = getThemeById(menu.themeId);
  
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-0 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{menu.businessName}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {menu.categories.length} {menu.categories.length === 1 ? 'category' : 'categories'} • 
            {menu.items.length} {menu.items.length === 1 ? 'item' : 'items'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div 
            className="h-6 w-6 rounded-full shadow-sm"
            style={{ backgroundColor: theme.primaryColor }}
            title={`${theme.name} theme`}
          />
          <span className="text-sm text-gray-600">{theme.name}</span>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-2 mt-2">
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-sm font-medium text-gray-700">Status</span>
            <span 
              className={`px-2 py-1 text-xs rounded-full ${
                menu.published 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {menu.published ? 'Published' : 'Draft'}
            </span>
          </div>
          <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
            <span className="text-sm font-medium text-gray-700">Last Updated</span>
            <span className="text-sm text-gray-600">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 justify-center sm:justify-end">
        <Link to={`/menu/${menu.id}`} target="_blank">
          <Button variant="outline" size="sm" className="flex items-center">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </Link>
        <Link to="/menu-editor">
          <Button variant="outline" size="sm" className="flex items-center">
            <FileEdit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </Link>
        <Link to="/qr-code">
          <Button size="sm" className="flex items-center">
            <QrCode className="h-4 w-4 mr-2" />
            QR Code
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default MenuCard;
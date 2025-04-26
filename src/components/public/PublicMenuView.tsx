import React from 'react';
import { Menu, MenuItem } from '../../types';
import { getThemeById } from '../../data/themes';
import { formatCurrency } from '../../lib/utils';

interface PublicMenuViewProps {
  menu: Menu;
}

const PublicMenuView: React.FC<PublicMenuViewProps> = ({ menu }) => {
  const theme = getThemeById(menu.themeId);
  
  // Group items by category
  const itemsByCategory = menu.categories.map(category => {
    const items = menu.items.filter(item => item.categoryId === category.id);
    return { category, items };
  }).filter(group => group.items.length > 0);

  // Style based on selected theme
  const styles = {
    container: {
      backgroundColor: theme.secondaryColor,
      fontFamily: theme.fontFamily,
    },
    header: {
      backgroundColor: theme.primaryColor,
    },
    headingText: {
      color: theme.id === 'vibrant' ? '#333' : 'white',
    },
    categoryHeading: {
      color: theme.primaryColor,
    },
    priceColor: {
      color: theme.primaryColor,
    }
  };

  return (
    <div style={styles.container} className="min-h-screen pb-12">
      {/* Header */}
      <div style={styles.header} className="py-6 px-4 text-center shadow-md">
        <div className="max-w-4xl mx-auto">
          {menu.logo && (
            <img 
              src={menu.logo} 
              alt={menu.businessName} 
              className="mx-auto h-20 w-auto rounded-full mb-4 border-4 border-white shadow-sm"
            />
          )}
          <h1 
            style={styles.headingText} 
            className={`text-3xl font-bold ${theme.id.includes('elegant') ? 'font-serif' : ''}`}
          >
            {menu.businessName}
          </h1>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {itemsByCategory.map(({ category, items }) => (
          <div key={category.id} className="mb-12">
            <h2 
              style={styles.categoryHeading} 
              className={`text-2xl font-bold mb-6 pb-2 border-b-2 ${
                theme.id.includes('elegant') ? 'font-serif' : ''
              }`}
            >
              {category.name}
            </h2>
            
            <div className={`space-y-6 ${theme.id === 'modern' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : ''}`}>
              {items.map((item) => (
                <MenuItemCard key={item.id} item={item} theme={theme} />
              ))}
            </div>
          </div>
        ))}

        {itemsByCategory.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No menu items available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

interface MenuItemCardProps {
  item: MenuItem;
  theme: any;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, theme }) => {
  const priceStyle = {
    color: theme.primaryColor,
  };

  return (
    <div className={`
      ${theme.id === 'elegant' ? 'flex justify-between items-start' : ''}
      ${theme.id === 'modern' ? 'bg-white p-4 rounded-lg shadow-sm flex flex-col' : ''}
      ${theme.id === 'rustic' ? 'border-b border-gray-300 pb-4 mb-4 last:border-0 flex justify-between' : ''}
      ${theme.id === 'vibrant' ? 'bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow' : ''}
    `}>
      <div className={`${item.image && theme.id !== 'elegant' ? 'flex' : ''}`}>
        {item.image && ['modern', 'vibrant'].includes(theme.id) && (
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-20 h-20 object-cover rounded-md mr-4 flex-shrink-0"
          />
        )}
        <div>
          <h3 className={`font-bold text-lg ${theme.id === 'elegant' ? 'font-serif' : ''}`}>
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
        </div>
      </div>
      <div className={`font-bold text-lg ${theme.id === 'modern' ? 'mt-2' : ''}`} style={priceStyle}>
        {formatCurrency(item.price)}
      </div>
    </div>
  );
};

export default PublicMenuView;
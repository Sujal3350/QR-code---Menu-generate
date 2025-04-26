import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Home, FileEdit, Palette, QrCode } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="h-5 w-5 mr-2" /> },
    { name: 'Menu Editor', path: '/menu-editor', icon: <FileEdit className="h-5 w-5 mr-2" /> },
    { name: 'Theme', path: '/theme-select', icon: <Palette className="h-5 w-5 mr-2" /> },
    { name: 'QR Code', path: '/qr-code', icon: <QrCode className="h-5 w-5 mr-2" /> },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link 
                to="/dashboard" 
                className="flex items-center text-burgundy-600 font-serif text-xl font-bold"
              >
                <QrCode className="h-6 w-6 mr-2" />
                QR Menu Creator
              </Link>
            </div>
          </div>

          {user && (
            <>
              {/* Desktop nav */}
              <nav className="hidden md:ml-6 md:flex md:space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-600 hover:text-burgundy-600 hover:border-burgundy-300 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              {/* User menu */}
              <div className="hidden md:ml-6 md:flex md:items-center">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">
                    {user.businessName}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-burgundy-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-burgundy-500"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && user && (
        <div className="md:hidden bg-white animate-fade-in">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center px-4 py-2 text-base font-medium text-gray-600 hover:text-burgundy-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4 flex items-center">
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user.businessName}</div>
                <div className="text-sm font-medium text-gray-500">{user.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-base font-medium text-gray-600 hover:text-burgundy-600 hover:bg-gray-50"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
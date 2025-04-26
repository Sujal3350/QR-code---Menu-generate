import React from 'react';
import Header from './Header';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {(title || subtitle) && (
            <div className="pb-6 border-b border-gray-200 mb-8">
              {title && (
                <h1 className="text-3xl font-serif font-bold text-gray-900">{title}</h1>
              )}
              {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} QR Menu Creator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PageContainer;
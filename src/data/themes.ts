import { Theme } from '../types';

export const themes: Theme[] = [
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'A sophisticated theme with serif fonts and a clean layout',
    primaryColor: '#8B0000', // Burgundy
    secondaryColor: '#F8F5F0', // Off-white
    fontFamily: 'Merriweather, serif',
    preview: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'A contemporary theme with bold colors and clean typography',
    primaryColor: '#1D3557', // Dark blue
    secondaryColor: '#F1FAEE', // Light cream
    fontFamily: 'Poppins, sans-serif',
    preview: 'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'rustic',
    name: 'Rustic',
    description: 'A warm, earthy theme inspired by farmhouse restaurants',
    primaryColor: '#5E503F', // Brown
    secondaryColor: '#EAE0D5', // Beige
    fontFamily: 'Cabin, sans-serif',
    preview: 'https://images.pexels.com/photos/5491011/pexels-photo-5491011.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    description: 'A colorful, energetic theme perfect for cafes and casual dining',
    primaryColor: '#FF6B6B', // Coral
    secondaryColor: '#F9F7F7', // Light gray
    fontFamily: 'Montserrat, sans-serif',
    preview: 'https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export const getThemeById = (id: string): Theme => {
  const theme = themes.find((t) => t.id === id);
  if (!theme) {
    return themes[0]; // Default to first theme if not found
  }
  return theme;
};
// File: src/components/Navbar.jsx
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import ProviderAdminNavbar from './AdminDashboardNavbar';
import UserNavbar from './UserDashboardNavbar';
import PublicNavbar from './PublicNavbar';

const Navbar = () => {
  const { user } = useAuth(); // Get user info from context

  // Render the correct navbar based on authentication state
  if (!user) {
    return <PublicNavbar />; // Render PublicNavbar for unauthenticated users
  }

  return user.role === 'Admin' ? <ProviderAdminNavbar /> : <UserNavbar />;
};

export default Navbar;
 

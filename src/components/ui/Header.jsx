import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: 'LayoutDashboard' 
    },
    { 
      label: 'Jobs', 
      path: '/job-management', 
      icon: 'Briefcase' 
    },
    { 
      label: 'Candidates', 
      path: '/resume-upload-processing', 
      icon: 'Users',
      subItems: [
        { label: 'Upload & Process', path: '/resume-upload-processing' },
        { label: 'Rankings', path: '/candidate-ranking-results' },
        { label: 'Profiles', path: '/candidate-profile-detail' }
      ]
    },
    { 
      label: 'Search', 
      path: '/search-advanced-filtering', 
      icon: 'Search' 
    }
  ];

  const isActiveRoute = (path) => {
    if (path === '/resume-upload-processing') {
      return ['/resume-upload-processing', '/candidate-ranking-results', '/candidate-profile-detail'].includes(location.pathname);
    }
    return location.pathname === path;
  };

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
        <Icon name="FileText" size={20} color="white" strokeWidth={2.5} />
      </div>
      <span className="text-xl font-semibold text-foreground">ResumeIQ</span>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-1000">
      <div className="h-full max-w-full mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Logo />

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${isActiveRoute(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User Profile & Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
          </Button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden lg:block text-sm font-medium">Sarah Chen</span>
              <Icon name="ChevronDown" size={14} />
            </Button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-md shadow-lg z-1010 animate-fade-in">
                <div className="p-3 border-b border-border">
                  <p className="text-sm font-medium">Sarah Chen</p>
                  <p className="text-xs text-muted-foreground">Senior Recruiter</p>
                  <p className="text-xs text-muted-foreground">sarah.chen@company.com</p>
                </div>
                <div className="py-2">
                  <a href="#" className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-muted">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-muted">
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </a>
                  <a href="#" className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-muted">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </a>
                  <div className="border-t border-border mt-2 pt-2">
                    <a href="#" className="flex items-center space-x-2 px-3 py-2 text-sm text-error hover:bg-muted">
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Menu" size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-card">
        <nav className="flex overflow-x-auto px-4 py-2 space-x-1">
          {navigationItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-200
                ${isActiveRoute(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
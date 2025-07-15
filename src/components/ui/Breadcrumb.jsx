import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();

  const breadcrumbMap = {
    '/dashboard': [
      { label: 'Dashboard', path: '/dashboard' }
    ],
    '/job-management': [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Jobs', path: '/job-management' }
    ],
    '/resume-upload-processing': [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Candidates', path: '/resume-upload-processing' },
      { label: 'Upload & Process', path: '/resume-upload-processing' }
    ],
    '/candidate-ranking-results': [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Candidates', path: '/resume-upload-processing' },
      { label: 'Rankings', path: '/candidate-ranking-results' }
    ],
    '/candidate-profile-detail': [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Candidates', path: '/resume-upload-processing' },
      { label: 'Rankings', path: '/candidate-ranking-results' },
      { label: 'Profile Detail', path: '/candidate-profile-detail' }
    ],
    '/search-advanced-filtering': [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Search', path: '/search-advanced-filtering' }
    ]
  };

  const breadcrumbs = breadcrumbMap[location.pathname] || [
    { label: 'Dashboard', path: '/dashboard' }
  ];

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-border" />
          )}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium" aria-current="page">
              {crumb.label}
            </span>
          ) : (
            <a
              href={crumb.path}
              className="hover:text-foreground transition-colors duration-200"
            >
              {crumb.label}
            </a>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
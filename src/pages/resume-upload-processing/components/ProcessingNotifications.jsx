import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingNotifications = ({ notifications, onDismiss, onDismissAll }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications);
  }, [notifications]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'error':
        return { name: 'XCircle', color: 'text-error' };
      case 'warning':
        return { name: 'AlertTriangle', color: 'text-warning' };
      case 'info':
        return { name: 'Info', color: 'text-primary' };
      default:
        return { name: 'Bell', color: 'text-muted-foreground' };
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/20';
      case 'error':
        return 'bg-error/10 border-error/20';
      case 'warning':
        return 'bg-warning/10 border-warning/20';
      case 'info':
        return 'bg-primary/10 border-primary/20';
      default:
        return 'bg-muted border-border';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (visibleNotifications.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Processing Updates
        </h3>
        {visibleNotifications.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismissAll}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {visibleNotifications.map((notification) => {
          const icon = getNotificationIcon(notification.type);
          const bgClass = getNotificationBg(notification.type);

          return (
            <div
              key={notification.id}
              className={`
                p-4 rounded-lg border transition-all duration-300 animate-fade-in
                ${bgClass}
              `}
            >
              <div className="flex items-start space-x-3">
                <Icon name={icon.name} size={20} className={icon.color} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-foreground">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  
                  {notification.details && (
                    <div className="text-xs text-muted-foreground space-y-1">
                      {notification.details.map((detail, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {notification.action && (
                    <div className="mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={notification.action.onClick}
                        iconName={notification.action.icon}
                        iconPosition="left"
                      >
                        {notification.action.label}
                      </Button>
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismiss(notification.id)}
                  iconName="X"
                  iconSize={14}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingNotifications;
import React, { useState, useEffect } from 'react';
import Checkbox from '../../../components/ui/Checkbox'; // Assuming Checkbox is a styled switch/checkbox
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

// Mock current user notification settings
const mockNotificationSettings = {
  email: {
    bookingUpdates: true,
    rentReminders: true,
    promotionalMessages: false,
    securityAlerts: true,
  },
  sms: {
    bookingUpdates: false,
    rentReminders: true,
    securityAlerts: true,
  },
  inApp: {
    bookingUpdates: true,
    rentReminders: true,
    promotionalMessages: true,
    securityAlerts: true,
  }
};

const notificationTypes = [
  { id: 'bookingUpdates', label: 'Booking Updates', description: 'Get notified about confirmations, changes, or cancellations related to your bookings.' },
  { id: 'rentReminders', label: 'Rent Reminders', description: 'Receive reminders for upcoming rent payments or lease renewals.' },
  { id: 'promotionalMessages', label: 'Deals & Promotions', description: 'Stay updated on special offers, new listings, and platform news.' },
  { id: 'securityAlerts', label: 'Security Alerts', description: 'Receive important notifications about your account security.' },
];

const channels = [
  { id: 'email', label: 'Email Notifications' },
  { id: 'sms', label: 'SMS Notifications' },
  { id: 'inApp', label: 'In-App Notifications' },
];

const NotificationSettings = () => {
  const [settings, setSettings] = useState(mockNotificationSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSettingChange = (channel, typeId) => {
    setSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [typeId]: !prev[channel][typeId],
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    console.log('Saving notification settings:', settings);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Update mock settings (in a real app, this would be a backend call)
    Object.assign(mockNotificationSettings, settings);
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  // Helper to create a Switch/Checkbox component.
  // The actual Checkbox component from ui/Checkbox.jsx might need specific props.
  // For now, this is a conceptual representation.
  const ToggleSwitch = ({ id, checked, onChange, label, description }) => (
    <div className="flex items-start justify-between py-3">
      <div className="mr-4">
        <label htmlFor={id} className="block text-sm font-medium text-foreground">{label}</label>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange} // Assuming Checkbox uses onCheckedChange like Radix UI
        aria-label={label}
      />
    </div>
  );


  return (
    <div className="p-6 md:p-8 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold font-heading mb-6 text-foreground">Notification Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {channels.map(channel => (
          <div key={channel.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
            <h3 className="text-lg font-medium text-foreground mb-2">{channel.label}</h3>
            <div className="space-y-2">
              {notificationTypes.map(type => {
                // Some channels might not support all types, e.g. SMS for promotions might be off by default or not available
                if (channel.id === 'sms' && type.id === 'promotionalMessages') return null;

                return (
                  <ToggleSwitch
                    key={`${channel.id}-${type.id}`}
                    id={`${channel.id}-${type.id}`}
                    label={type.label}
                    description={channel.id === 'email' ? type.description : undefined} // Show full desc only for email for brevity
                    checked={settings[channel.id]?.[type.id] || false}
                    onChange={() => handleSettingChange(channel.id, type.id)}
                  />
                );
              })}
            </div>
          </div>
        ))}

        <div className="flex items-center space-x-4 pt-4">
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Icon name="LoaderCircle" size={18} className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Icon name="Save" size={18} className="mr-2" />
                Save Preferences
              </>
            )}
          </Button>
          {isSuccess && (
            <div className="flex items-center text-success">
              <Icon name="CheckCircle" size={20} className="mr-2" />
              <span>Settings saved successfully!</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default NotificationSettings;

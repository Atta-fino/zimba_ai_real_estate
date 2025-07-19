import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AccountSecurity = () => {
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(''); // Clear error on new input
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSuccess(false);

    if (passwordFormData.newPassword !== passwordFormData.confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (passwordFormData.newPassword.length < 8) { // Basic validation
      setError('New password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    console.log('Submitting password change data:', {
      currentPassword: passwordFormData.currentPassword, // In a real app, send this securely
      newPassword: passwordFormData.newPassword,
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Mock success/failure
    if (passwordFormData.currentPassword === "password123") { // Mock current password check
      setIsSuccess(true);
      setPasswordFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' }); // Reset form
      setTimeout(() => setIsSuccess(false), 3000);
    } else {
      setError('Incorrect current password. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="p-6 md:p-8 bg-card rounded-lg shadow-lg space-y-8">
      <div>
        <h2 className="text-2xl font-semibold font-heading mb-6 text-foreground">Account Security</h2>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordSubmit} className="space-y-6 border-b border-border pb-8">
          <h3 className="text-lg font-medium text-foreground">Change Password</h3>
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-muted-foreground mb-1">Current Password</label>
            <Input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordFormData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter your current password"
              className="w-full md:max-w-md"
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-muted-foreground mb-1">New Password</label>
            <Input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordFormData.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password (min. 8 characters)"
              className="w-full md:max-w-md"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-muted-foreground mb-1">Confirm New Password</label>
            <Input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={passwordFormData.confirmNewPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm your new password"
              className="w-full md:max-w-md"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 flex items-center">
              <Icon name="AlertCircle" size={16} className="mr-2" />
              {error}
            </div>
          )}
          {isSuccess && (
            <div className="text-sm text-success flex items-center">
              <Icon name="CheckCircle" size={16} className="mr-2" />
              Password updated successfully!
            </div>
          )}

          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Icon name="LoaderCircle" size={18} className="animate-spin mr-2" />
                Updating...
              </>
            ) : (
              <>
                <Icon name="KeyRound" size={18} className="mr-2" />
                Update Password
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Two-Factor Authentication Placeholder */}
      <div className="pt-8">
        <h3 className="text-lg font-medium text-foreground mb-3">Two-Factor Authentication (2FA)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Add an extra layer of security to your account by enabling two-factor authentication.
        </p>
        <div className="p-4 bg-muted/30 border border-dashed border-border rounded-lg flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">Status: Not Configured</p>
            <p className="text-xs text-muted-foreground">You haven't set up 2FA yet.</p>
          </div>
          <Button variant="outline" disabled> {/* Button is disabled as it's a placeholder */}
            <Icon name="ShieldCheck" size={16} className="mr-2" />
            Configure 2FA
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          This feature is coming soon. When available, you'll be able to set it up here.
        </p>
      </div>
    </div>
  );
};

export default AccountSecurity;

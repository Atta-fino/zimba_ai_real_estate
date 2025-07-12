import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import AppImage from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

// Mock current user data - this would typically come from a context, Redux store, or API call
const mockCurrentUser = {
  name: 'Aisha Bello',
  email: 'aisha.bello@example.com',
  phoneNumber: '+234 801 234 5678',
  avatarUrl: '/assets/images/stock/agent_female_1.jpg', // Placeholder avatar
};

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    avatarFile: null,
  });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Load current user data into form
    setFormData({
      name: mockCurrentUser.name,
      email: mockCurrentUser.email,
      phoneNumber: mockCurrentUser.phoneNumber,
      avatarFile: null, // Reset file input
    });
    setAvatarPreview(mockCurrentUser.avatarUrl);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatarFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    console.log('Submitting profile data:', {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      avatarFileName: formData.avatarFile ? formData.avatarFile.name : 'No new avatar',
    });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Update mockCurrentUser or send to backend
    mockCurrentUser.name = formData.name;
    mockCurrentUser.phoneNumber = formData.phoneNumber;
    if (avatarPreview && formData.avatarFile) { // only update if new file was chosen and preview exists
        mockCurrentUser.avatarUrl = avatarPreview;
    }

    setIsLoading(false);
    setIsSuccess(true);
    // Reset success message after a few seconds
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="p-6 md:p-8 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold font-heading mb-6 text-foreground">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center space-x-6">
          <AppImage
            src={avatarPreview || '/assets/images/no_image.png'}
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-primary"
            fallbackSrc="/assets/images/no_image.png"
          />
          <div>
            <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('avatarUpload').click()}>
              <Icon name="UploadCloud" size={16} className="mr-2" />
              Change Avatar
            </Button>
            <input
              type="file"
              id="avatarUpload"
              name="avatar"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <p className="text-xs text-muted-foreground mt-2">PNG, JPG, GIF up to 5MB.</p>
          </div>
        </div>

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full"
            required
          />
        </div>

        {/* Email Field (Read-only) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email Address</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder="your.email@example.com"
            className="w-full bg-muted/50 cursor-not-allowed"
            readOnly
            disabled
          />
           <p className="text-xs text-muted-foreground mt-1">Email cannot be changed here. Contact support for assistance.</p>
        </div>

        {/* Phone Number Field */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-muted-foreground mb-1">Phone Number</label>
          <Input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+234 000 000 0000"
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center space-x-4 pt-2">
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Icon name="LoaderCircle" size={18} className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Icon name="Save" size={18} className="mr-2" />
                Save Changes
              </>
            )}
          </Button>
          {isSuccess && (
            <div className="flex items-center text-success">
              <Icon name="CheckCircle" size={20} className="mr-2" />
              <span>Profile updated successfully!</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditProfile;

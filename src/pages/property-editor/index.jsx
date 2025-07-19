import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select'; // Assuming a Select component
import Checkbox from '../../components/ui/Checkbox'; // Assuming a Checkbox component
import Icon from '../../components/AppIcon';
import AppImage from '../../components/AppImage';
import { PropertyType, Feature, getPropertyTypeDisplay, getFeatureDisplay } from '../../utils/enums';

// Mock function to fetch property data for editing
// In a real app, this would be an API call
const fetchPropertyForEdit = async (propertyId) => {
  console.log("Fetching property for edit:", propertyId);
  // Simulate finding a property from a mock list
  const mockExistingProperties = [
    {
      id: 'prop1',
      title: 'Spacious 3-Bedroom Apartment in Lekki',
      description: 'A lovely 3-bedroom apartment with modern amenities and a great view in Lekki Phase 1. Perfect for families or professionals.',
      location: 'Lekki Phase 1, Lagos',
      price: 5000000,
      currency: 'NGN',
      propertyType: 'apartment',
      features: ['air_conditioner', 'parking_spot', 'ensuite_bathroom'],
      images: ['/assets/images/stock/apartment_1_a.jpg', '/assets/images/stock/apartment_1_b.jpg'], // URLs or paths
      bedrooms: 3,
      bathrooms: 2,
      area: 150, // sqm
    }
  ];
  return mockExistingProperties.find(p => p.id === propertyId) || null;
};


const PropertyEditorPage = () => {
  const { propertyId } = useParams(); // For editing existing property
  const navigate = useNavigate();
  const isEditMode = Boolean(propertyId);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    currency: 'NGN', // Default currency
    propertyType: Object.keys(PropertyType)[0] || '', // Default to first property type
    features: [],
    images: [], // Store File objects for new uploads, or URLs for existing
    imagePreviews: [], // For displaying previews
    bedrooms: '',
    bathrooms: '',
    area: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // For loading existing data in edit mode
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode && propertyId) {
      const loadPropertyData = async () => {
        setIsFetching(true);
        try {
          const propertyData = await fetchPropertyForEdit(propertyId);
          if (propertyData) {
            setFormData({
              title: propertyData.title || '',
              description: propertyData.description || '',
              location: propertyData.location || '',
              price: propertyData.price?.toString() || '',
              currency: propertyData.currency || 'NGN',
              propertyType: propertyData.propertyType || '',
              features: propertyData.features || [],
              images: propertyData.images || [], // These are URLs for existing images
              imagePreviews: propertyData.images || [], // Initialize previews with existing image URLs
              bedrooms: propertyData.bedrooms?.toString() || '',
              bathrooms: propertyData.bathrooms?.toString() || '',
              area: propertyData.area?.toString() || '',
            });
          } else {
            setError('Property not found for editing.');
            // Optionally navigate back or show a more prominent error
          }
        } catch (err) {
          setError('Failed to load property data.');
          console.error(err);
        } finally {
          setIsFetching(false);
        }
      };
      loadPropertyData();
    }
  }, [propertyId, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "features") {
      setFormData(prev => ({
        ...prev,
        features: checked ? [...prev.features, value] : prev.features.filter(f => f !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Store new File objects and generate previews
    // For simplicity, this example will just take the first new one for now if mixing with existing
    // A more robust solution would handle appending new files and managing existing URLS vs new File objects.

    if (files.length > 0) {
        const newImageFiles = files; // Keep as File objects for upload
        const newImagePreviews = files.map(file => URL.createObjectURL(file));

        // Replace all images/previews with new ones for simplicity in this mock
        setFormData(prev => ({
            ...prev,
            images: newImageFiles, // Store File objects
        }));
        setAvatarPreview(newImagePreviews); // Set previews for display

        // If you want to append to existing images:
        // setFormData(prev => ({
        //     ...prev,
        //     images: [...prev.images.filter(img => typeof img === 'string'), ...newImageFiles], // mix of URLs and Files
        // }));
        // setAvatarPreview(prev => [...prev.filter(p => p.startsWith('http') || p.startsWith('/')), ...newImagePreviews]);
    }
  };
  // A simplified image preview state for this example, assuming we clear old ones on new selection for now.
  const [avatarPreview, setAvatarPreview] = useState([]);
   useEffect(() => {
    if (isEditMode && formData.images.length > 0 && formData.images.every(img => typeof img === 'string')) {
      setAvatarPreview(formData.images);
    }
  }, [isEditMode, formData.images]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    console.log('Submitting property data:', formData);
    // In a real app:
    // 1. If there are new image files in formData.images, upload them first. Get back URLs.
    // 2. Combine new image URLs with any existing image URLs (if edit mode and some old images were kept).
    // 3. Send all text data and final image URLs to backend.

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log(isEditMode ? 'Property updated successfully!' : 'Property added successfully!');
      navigate('/landlord-dashboard?tab=my-properties'); // Redirect to property list
    } catch (err) {
      setError('Failed to save property. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Icon name="LoaderCircle" size={32} className="animate-spin text-primary" />
        <p className="ml-3 text-lg">Loading property data...</p>
      </div>
    );
  }


  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link to="/landlord-dashboard?tab=my-properties" className="text-primary hover:text-primary/80 flex items-center text-sm">
              <Icon name="ArrowLeft" size={16} className="mr-1.5" />
              Back to My Properties
            </Link>
          </div>
          <h1 className="text-3xl font-bold font-heading mb-2">
            {isEditMode ? 'Edit Property' : 'Add New Property'}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isEditMode ? 'Update the details of your property.' : 'Fill in the details to list a new property on Zimba.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-8 p-6 md:p-8 bg-card rounded-xl shadow-xl">
            {/* Basic Information */}
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-1">Property Title</label>
                  <Input name="title" id="title" value={formData.title} onChange={handleChange} placeholder="e.g., Luxurious 2-Bedroom Flat with Ocean View" required />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1">Description</label>
                  <textarea name="description" id="description" value={formData.description} onChange={handleChange} placeholder="Detailed description of your property..." rows="4" className="w-full p-2 border border-border rounded-md bg-input text-foreground focus:ring-primary focus:border-primary"></textarea>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-muted-foreground mb-1">Location / Address</label>
                  <Input name="location" id="location" value={formData.location} onChange={handleChange} placeholder="e.g., 123 Freedom Way, Lekki Phase 1, Lagos" required />
                </div>
              </div>
            </section>

            {/* Pricing & Type */}
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Pricing & Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-muted-foreground mb-1">Price</label>
                  <Input type="number" name="price" id="price" value={formData.price} onChange={handleChange} placeholder="e.g., 2500000" required />
                </div>
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-muted-foreground mb-1">Currency</label>
                  <Select name="currency" id="currency" value={formData.currency} onValueChange={(val) => setFormData(p => ({...p, currency: val}))} >
                    <option value="NGN">NGN (Nigerian Naira)</option>
                    <option value="GHS">GHS (Ghanaian Cedi)</option>
                    <option value="KES">KES (Kenyan Shilling)</option>
                    {/* Add other relevant currencies */}
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="propertyType" className="block text-sm font-medium text-muted-foreground mb-1">Property Type</label>
                  <Select name="propertyType" id="propertyType" value={formData.propertyType} onValueChange={(val) => setFormData(p => ({...p, propertyType: val}))} required>
                    <option value="" disabled>Select property type</option>
                    {Object.entries(PropertyType).map(([key, displayName]) => (
                      <option key={key} value={key}>{displayName}</option>
                    ))}
                  </Select>
                </div>
              </div>
            </section>

            {/* Specifications */}
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-muted-foreground mb-1">Bedrooms</label>
                  <Input type="number" name="bedrooms" id="bedrooms" value={formData.bedrooms} onChange={handleChange} placeholder="e.g., 3" />
                </div>
                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-muted-foreground mb-1">Bathrooms</label>
                  <Input type="number" name="bathrooms" id="bathrooms" value={formData.bathrooms} onChange={handleChange} placeholder="e.g., 2" />
                </div>
                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-muted-foreground mb-1">Area (sqm)</label>
                  <Input type="number" name="area" id="area" value={formData.area} onChange={handleChange} placeholder="e.g., 120" />
                </div>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Features & Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                {Object.entries(Feature).map(([key, displayName]) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer">
                    <Checkbox
                      id={`feature-${key}`}
                      name="features"
                      value={key}
                      checked={formData.features.includes(key)}
                      onCheckedChange={(checked) => { // Assuming Checkbox onCheckedChange passes boolean
                        const event = { target: { name: "features", value: key, checked: checked, type: "checkbox" } };
                        handleChange(event);
                      }}
                    />
                    <span className="text-sm text-foreground">{displayName}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* Image Upload */}
            <section>
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">Property Images</h2>
              <div>
                <label htmlFor="images" className="block text-sm font-medium text-muted-foreground mb-1">Upload Images (Max 5)</label>
                <Input type="file" name="images" id="images" onChange={handleImageChange} multiple accept="image/png, image/jpeg" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                <p className="text-xs text-muted-foreground mt-1">First image will be the main display image.</p>
              </div>
              {avatarPreview.length > 0 && (
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {avatarPreview.map((previewUrl, index) => (
                     <div key={index} className="relative aspect-square">
                        <AppImage src={previewUrl} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-md border border-border" fallbackSrc="/assets/images/no_image.png"/>
                        {/* TODO: Add a way to remove individual images */}
                     </div>
                  ))}
                </div>
              )}
            </section>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="pt-6 border-t border-border flex justify-end items-center space-x-3">
              <Button type="button" variant="outline" onClick={() => navigate('/landlord-dashboard?tab=my-properties')}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || isFetching} size="lg">
                {isLoading ? (
                  <>
                    <Icon name="LoaderCircle" size={18} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <Icon name={isEditMode ? "Save" : "PlusCircle"} size={18} className="mr-2" />
                )}
                {isEditMode ? 'Save Changes' : 'Add Property'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyEditorPage;

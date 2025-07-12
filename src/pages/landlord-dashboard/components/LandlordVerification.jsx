import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import AppImage from '../../../components/AppImage'; // For image previews
import Input from '../../../components/ui/Input'; // For file input styling if needed

// Mock verification data - this would come from an API based on landlord_verifications table
const mockVerificationData = {
  status: 'pending_human_review', // 'not_verified', 'pending_ai_review', 'pending_human_review', 'ai_verified', 'human_verified', 'superhost', 'rejected'
  idImage: '/assets/images/stock/sample_id.png', // URL of already uploaded ID, null if not uploaded
  biometricSubmitted: false, // boolean
  aiScore: 75, // null or number
  riskResult: 'low', // null, 'low', 'medium', 'high'
  humanReviewNotes: 'AI score seems reasonable, pending final check of document clarity.',
  badges: [], // e.g., ['ai_verified'] or ['human_verified', 'superhost']
  rejectionReason: null, // string if status is 'rejected'
};

const VerificationStatusDisplay = ({ status, rejectionReason }) => {
  let statusText = "Unknown";
  let statusColor = "text-gray-500";
  let iconName = "HelpCircle";

  switch (status) {
    case 'not_verified':
      statusText = "Not Verified";
      statusColor = "text-red-500";
      iconName = "XCircle";
      break;
    case 'pending_ai_review':
      statusText = "Pending AI Review";
      statusColor = "text-yellow-500";
      iconName = "LoaderCircle"; // Or 'Clock'
      break;
    case 'pending_human_review':
      statusText = "Pending Human Review";
      statusColor = "text-blue-500";
      iconName = "Users";
      break;
    case 'ai_verified':
      statusText = "AI Verified";
      statusColor = "text-green-500";
      iconName = "ShieldCheck";
      break;
    case 'human_verified':
      statusText = "Human Verified";
      statusColor = "text-green-700"; // Darker green
      iconName = "BadgeCheck";
      break;
    case 'superhost': // Superhost implies human verified
      statusText = "SuperHost (Human Verified)";
      statusColor = "text-purple-600";
      iconName = "Award";
      break;
    case 'rejected':
      statusText = "Verification Rejected";
      statusColor = "text-red-700";
      iconName = "ShieldAlert";
      break;
    default:
      statusText = status;
  }

  return (
    <div className={`p-4 rounded-lg shadow ${statusColor.replace('text-', 'bg-').replace('-500', '-100').replace('-600', '-100').replace('-700','-100')} border ${statusColor.replace('text-', 'border-')}`}>
      <div className="flex items-center">
        <Icon name={iconName} size={24} className={`mr-3 ${statusColor} ${status.includes('pending') ? 'animate-spin' : ''}`} />
        <div>
          <p className={`text-lg font-semibold ${statusColor}`}>{statusText}</p>
          {status === 'rejected' && rejectionReason && (
            <p className="text-sm text-red-600 mt-1">Reason: {rejectionReason}</p>
          )}
           {status === 'pending_human_review' && mockVerificationData.humanReviewNotes && (
            <p className="text-xs text-blue-600 mt-1">Note: {mockVerificationData.humanReviewNotes}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const LandlordVerification = () => {
  const [verificationData, setVerificationData] = useState(mockVerificationData);
  const [idImageFile, setIdImageFile] = useState(null);
  const [idImagePreview, setIdImagePreview] = useState(verificationData.idImage || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleIdImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitId = async () => {
    if (!idImageFile) return;
    setIsUploading(true);
    console.log("Submitting ID image:", idImageFile.name);
    // Simulate API call for ID upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    setVerificationData(prev => ({
      ...prev,
      status: 'pending_ai_review',
      idImage: idImagePreview // In real app, this would be the URL from backend
    }));
    setIsUploading(false);
    setIdImageFile(null); // Clear file input after mock upload
    alert("ID Image submitted for AI review!");
  };

  const handleSubmitBiometrics = async () => {
    setIsUploading(true);
    console.log("Initiating biometric submission process...");
    // Simulate API call or navigation to a biometric capture flow
    await new Promise(resolve => setTimeout(resolve, 1500));
    setVerificationData(prev => ({ ...prev, biometricSubmitted: true, status: 'pending_human_review' })); // Example status update
    setIsUploading(false);
    alert("Biometric data submitted (simulated). Now pending human review.");
  };

  const canSubmitId = verificationData.status === 'not_verified' || verificationData.status === 'rejected';
  const canSubmitBiometrics = (verificationData.status === 'ai_verified' || verificationData.idImage) && !verificationData.biometricSubmitted;


  return (
    <div className="p-1 md:p-0">
      <h2 className="text-2xl font-semibold font-heading text-foreground mb-6 px-1 md:px-0">Landlord Verification</h2>

      <div className="space-y-8">
        {/* Current Status */}
        <section className="bg-card p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-foreground mb-3">Your Verification Status</h3>
          <VerificationStatusDisplay status={verificationData.status} rejectionReason={verificationData.rejectionReason} />
           {verificationData.badges.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground mb-1">Your Badges:</p>
              <div className="flex space-x-2">
                {verificationData.badges.map(badge => (
                  <span key={badge} className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">{badge.replace('_', ' ').toUpperCase()}</span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Step 1: ID Document Upload */}
        {(canSubmitId || verificationData.idImage) && (
          <section className="bg-card p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-foreground mb-1">Step 1: Identity Document</h3>
            <p className="text-sm text-muted-foreground mb-4">Upload a clear image of your government-issued ID (e.g., National ID, Passport, Driver's License).</p>

            {idImagePreview && (
              <div className="mb-4">
                <p className="text-sm font-medium text-muted-foreground mb-1">ID Preview:</p>
                <AppImage src={idImagePreview} alt="ID Preview" className="max-w-xs h-auto rounded-md border border-border" />
              </div>
            )}

            {canSubmitId && (
              <>
                <div className="mb-4">
                  <label htmlFor="idUpload" className="block text-sm font-medium text-muted-foreground mb-1">Choose ID image file:</label>
                  <Input
                    type="file"
                    id="idUpload"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleIdImageChange}
                    className="block w-full max-w-md text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                </div>
                <Button onClick={handleSubmitId} disabled={!idImageFile || isUploading} size="lg">
                  {isUploading && idImageFile ? <Icon name="LoaderCircle" className="animate-spin mr-2"/> : <Icon name="UploadCloud" className="mr-2"/>}
                  Submit ID Document
                </Button>
              </>
            )}
            {!canSubmitId && verificationData.idImage && (
                <p className="text-sm text-green-600 flex items-center"><Icon name="CheckCircle" className="mr-2"/> ID Document Submitted.</p>
            )}
          </section>
        )}

        {/* Step 2: Biometric Verification (Placeholder) */}
        {(canSubmitBiometrics || verificationData.biometricSubmitted) && (
           <section className="bg-card p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-foreground mb-1">Step 2: Biometric Verification</h3>
             <p className="text-sm text-muted-foreground mb-4">
              To ensure maximum security, we require a quick biometric check. This typically involves a liveness check via your device camera.
            </p>
            {canSubmitBiometrics && (
                 <Button onClick={handleSubmitBiometrics} disabled={isUploading} size="lg" variant="default">
                    {isUploading && !idImageFile ? <Icon name="LoaderCircle" className="animate-spin mr-2"/> : <Icon name="Camera" className="mr-2"/>}
                    Start Biometric Check (Simulated)
                </Button>
            )}
            {verificationData.biometricSubmitted && (
                 <p className="text-sm text-green-600 flex items-center"><Icon name="CheckCircle" className="mr-2"/> Biometric Data Submitted.</p>
            )}
            <p className="text-xs text-muted-foreground mt-3">
              This step will be guided by our AI verification system. Ensure you are in a well-lit environment.
            </p>
          </section>
        )}

        {verificationData.status === 'human_verified' || verificationData.status === 'superhost' && (
            <section className="bg-green-50 p-6 rounded-xl shadow-lg border border-green-200 text-center">
                <Icon name="PartyPopper" size={48} className="mx-auto text-green-600 mb-3" />
                <h3 className="text-xl font-semibold text-green-700">Congratulations! You are Fully Verified!</h3>
                <p className="text-green-600 mt-1">Your TrustScore has been updated. Enjoy the benefits of being a verified Zimba landlord.</p>
            </section>
        )}

      </div>
    </div>
  );
};

export default LandlordVerification;

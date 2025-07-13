import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import AppImage from '../../../components/AppImage';

// Mock data for landlord verification queue
const mockVerificationQueue = [
  {
    id: 'verif_1',
    user_id: 'landlord_A',
    user_name: 'Aisha Bello',
    submitted_at: '2024-07-30T10:00:00Z',
    id_image_url: '/assets/images/stock/sample_id.png',
    biometric_file_url: null, // Placeholder
    ai_score: 82,
    risk_result: 'low',
    status: 'pending_human_review',
  },
  {
    id: 'verif_2',
    user_id: 'landlord_B',
    user_name: 'Babatunde Adebayo',
    submitted_at: '2024-07-29T15:30:00Z',
    id_image_url: '/assets/images/stock/sample_id_2.png',
    biometric_file_url: null,
    ai_score: 65,
    risk_result: 'medium',
    status: 'pending_human_review',
  },
   {
    id: 'verif_3',
    user_id: 'landlord_C',
    user_name: 'Chinedu Okoro',
    submitted_at: '2024-07-28T09:00:00Z',
    id_image_url: null, // Example where ID hasn't been submitted yet
    biometric_file_url: null,
    ai_score: null,
    risk_result: null,
    status: 'pending_submission',
  },
];

const VerificationQueue = () => {
  const [queue, setQueue] = useState(mockVerificationQueue);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [rejectionNotes, setRejectionNotes] = useState('');

  const handleSelectVerification = (verification) => {
    setSelectedVerification(verification);
    setRejectionNotes(''); // Reset notes when opening a new item
  };

  const handleApprove = (verificationId) => {
    console.log(`Approving verification ${verificationId}`);
    // Simulate API call
    alert(`Verification for ${selectedVerification.user_name} approved!`);
    setQueue(prev => prev.filter(v => v.id !== verificationId));
    setSelectedVerification(null);
  };

  const handleReject = (verificationId) => {
    if (!rejectionNotes.trim()) {
      alert("Please provide rejection notes before rejecting.");
      return;
    }
    console.log(`Rejecting verification ${verificationId} with notes: ${rejectionNotes}`);
    // Simulate API call
    alert(`Verification for ${selectedVerification.user_name} rejected.`);
    setQueue(prev => prev.filter(v => v.id !== verificationId));
    setSelectedVerification(null);
  };

  const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleString('en-GB') : 'N/A';

  const RiskBadge = ({ risk }) => {
    let colorClasses = 'bg-gray-200 text-gray-800';
    if (risk === 'low') colorClasses = 'bg-green-200 text-green-800';
    if (risk === 'medium') colorClasses = 'bg-yellow-200 text-yellow-800';
    if (risk === 'high') colorClasses = 'bg-red-200 text-red-800';
    return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${colorClasses}`}>{risk || 'N/A'}</span>;
  };


  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Verification Queue</h1>
        <p className="text-muted-foreground">Review and process pending landlord verifications to maintain platform trust.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Verification List */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl shadow-lg">
             <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold">Pending Submissions ({queue.length})</h3>
             </div>
             <ul className="divide-y divide-border">
                {queue.map(item => (
                    <li key={item.id} onClick={() => handleSelectVerification(item)}
                        className={`p-4 cursor-pointer transition-colors ${selectedVerification?.id === item.id ? 'bg-primary/10' : 'hover:bg-muted/50'}`}>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-foreground">{item.user_name}</p>
                                <p className="text-xs text-muted-foreground">Submitted: {formatDate(item.submitted_at)}</p>
                            </div>
                            <div className="text-right">
                                {item.risk_result && <RiskBadge risk={item.risk_result} />}
                                <p className="text-xs text-muted-foreground mt-1">AI Score: {item.ai_score || 'N/A'}</p>
                            </div>
                        </div>
                    </li>
                ))}
                {queue.length === 0 && <li className="p-8 text-center text-muted-foreground">The verification queue is empty. Great job!</li>}
             </ul>
          </div>
        </div>

        {/* Detail View */}
        <div className="lg:col-span-1">
            <div className="bg-card rounded-xl shadow-lg sticky top-24">
                <div className="p-4 border-b border-border">
                    <h3 className="text-lg font-semibold">Review Details</h3>
                </div>
                {selectedVerification ? (
                    <div className="p-6 space-y-6">
                        <div>
                            <h4 className="font-semibold text-foreground">{selectedVerification.user_name}</h4>
                            <p className="text-sm text-muted-foreground">User ID: {selectedVerification.user_id}</p>
                        </div>
                        <div className="border-t border-border pt-4">
                            <h5 className="text-md font-semibold mb-2">Submitted ID Document</h5>
                            {selectedVerification.id_image_url ? (
                                <AppImage src={selectedVerification.id_image_url} alt="ID Document" className="rounded-lg border border-border max-w-full h-auto"/>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">No ID document submitted yet.</p>
                            )}
                        </div>
                         <div className="border-t border-border pt-4">
                            <h5 className="text-md font-semibold mb-2">Biometric Data</h5>
                            <p className="text-sm text-muted-foreground italic">Biometric check placeholder - result would be displayed here.</p>
                        </div>

                        {/* Admin Actions */}
                        <div className="border-t border-border pt-4 space-y-4">
                             <h5 className="text-md font-semibold">Admin Actions</h5>
                             <div>
                                <label htmlFor="rejectionNotes" className="text-xs text-muted-foreground">Rejection Notes (if applicable)</label>
                                <textarea id="rejectionNotes" value={rejectionNotes} onChange={(e) => setRejectionNotes(e.target.value)}
                                    className="w-full mt-1 p-2 border border-border rounded-md bg-input text-foreground focus:ring-primary focus:border-primary"
                                    rows="3" placeholder="e.g., Document is blurry, name does not match profile..."></textarea>
                             </div>
                             <div className="flex gap-3">
                                <Button onClick={() => handleReject(selectedVerification.id)} variant="destructive" className="flex-1" disabled={!rejectionNotes.trim()}>
                                    <Icon name="X" size={16} className="mr-2"/> Reject
                                </Button>
                                <Button onClick={() => handleApprove(selectedVerification.id)} variant="default" className="flex-1 bg-green-600 hover:bg-green-700">
                                    <Icon name="Check" size={16} className="mr-2"/> Approve
                                </Button>
                             </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-12 text-center text-muted-foreground">
                        <Icon name="MousePointerSquare" size={40} className="mx-auto mb-3 opacity-50"/>
                        <p>Select a verification request from the queue to review its details.</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationQueue;

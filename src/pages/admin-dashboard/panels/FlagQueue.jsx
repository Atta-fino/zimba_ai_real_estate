import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Link } from 'react-router-dom';
import { updatePropertyStatus } from '../../../data/mockProperties'; // Import the update function

// Mock data for flagged items
const mockFlagQueue = [
  {
    id: 'flag1',
    type: 'property', // 'property', 'user', 'review'
    item_id: 'prop_flagged_123',
    item_name: '"Luxury" Apartment with No Running Water', // Title of property, or name of user
    reason: 'Misleading Information',
    submitted_by_id: 'user_renter_456',
    submitted_by_name: 'Amina Diallo',
    submitted_at: '2024-07-30T14:00:00Z',
    is_hidden: false,
    notes: 'User claims property images show a modern apartment, but the actual unit has significant plumbing issues.',
  },
  {
    id: 'flag2',
    type: 'user',
    item_id: 'user_landlord_789',
    item_name: 'Landlord "Mr. Ghost"',
    reason: 'Unresponsive Landlord',
    submitted_by_id: 'user_renter_789',
    submitted_by_name: 'Babatunde Adebayo',
    submitted_at: '2024-07-29T11:20:00Z',
    is_hidden: false,
    notes: 'Multiple users have reported that this landlord does not respond to messages or calls after booking.',
  },
  {
    id: 'flag3',
    type: 'property',
    item_id: 'prop_scam_456',
    item_name: 'Too Good To Be True Deal',
    reason: 'Potential Scam',
    submitted_by_id: 'user_prospect_111',
    submitted_by_name: 'Femi Adekunle',
    submitted_at: '2024-07-28T18:00:00Z',
    is_hidden: true, // Already hidden by an automated agent
    notes: 'User was asked to pay a deposit outside of the Zimba platform via WhatsApp. Listing was auto-hidden by Fraud Detection Agent.',
  },
];

const FlagTypeBadge = ({ type }) => {
  let colorClasses = 'bg-gray-200 text-gray-800';
  if (type === 'property') colorClasses = 'bg-blue-200 text-blue-800';
  if (type === 'user') colorClasses = 'bg-orange-200 text-orange-800';
  if (type === 'review') colorClasses = 'bg-purple-200 text-purple-800';
  return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${colorClasses}`}>{type}</span>;
};

const FlagQueue = () => {
  const [queue, setQueue] = useState(mockFlagQueue);
  const [isProcessing, setIsProcessing] = useState(null); // Store ID of item being processed

  const handleDismissFlag = async (flagId) => {
    setIsProcessing(flagId);
    console.log(`Dismissing flag ${flagId} as resolved.`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    setQueue(prev => prev.filter(f => f.id !== flagId));
    setIsProcessing(null);
  };

  const handleTakeAction = async (flagId, action, itemId) => {
    setIsProcessing(flagId);
    console.log(`Performing action '${action}' for flag ${flagId} on item ${itemId}.`);

    if (action === 'hide_listing') {
        updatePropertyStatus(itemId, 'hidden');
    }
    // Add other actions like 'suspend_user' here if needed, calling updateUserStatus

    await new Promise(resolve => setTimeout(resolve, 500));
    // Remove the flag from the queue after handling
    setQueue(prev => prev.filter(f => f.id !== flagId));
    setIsProcessing(null);
    alert(`Action '${action}' completed for item ${itemId}.`);
  };

  const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleString('en-GB') : 'N/A';


  return (
     <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Flag Queue</h1>
        <p className="text-muted-foreground">Review and act on user-submitted flags to ensure platform safety and quality.</p>
      </header>

      <div className="bg-card rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold">Reported Items ({queue.length})</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-muted/50">
                    <tr>
                        <th className="p-3 text-left font-semibold text-muted-foreground">Reported Item</th>
                        <th className="p-3 text-left font-semibold text-muted-foreground">Reason</th>
                        <th className="p-3 text-left font-semibold text-muted-foreground">Submitted By</th>
                        <th className="p-3 text-left font-semibold text-muted-foreground">Status</th>
                        <th className="p-3 text-left font-semibold text-muted-foreground">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {queue.map(flag => (
                        <tr key={flag.id} className="border-b border-border last:border-b-0">
                            <td className="p-3">
                                <div className="flex items-center gap-2">
                                    <FlagTypeBadge type={flag.type} />
                                    <div>
                                        <p className="font-semibold text-foreground">{flag.item_name}</p>
                                        <p className="text-xs text-muted-foreground">ID: {flag.item_id}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="p-3">
                                <p className="font-medium text-foreground">{flag.reason}</p>
                                <p className="text-xs text-muted-foreground truncate max-w-xs" title={flag.notes}>{flag.notes}</p>
                            </td>
                            <td className="p-3">
                                <p className="text-foreground">{flag.submitted_by_name}</p>
                                <p className="text-xs text-muted-foreground">{formatDate(flag.submitted_at)}</p>
                            </td>
                            <td className="p-3">
                                {flag.is_hidden ? (
                                    <span className="flex items-center text-yellow-600 text-xs font-semibold">
                                        <Icon name="EyeOff" size={14} className="mr-1.5"/> Auto-Hidden
                                    </span>
                                ) : (
                                     <span className="flex items-center text-green-600 text-xs font-semibold">
                                        <Icon name="Eye" size={14} className="mr-1.5"/> Visible
                                    </span>
                                )}
                            </td>
                            <td className="p-3">
                                <div className="flex gap-2">
                                    <Button onClick={() => handleDismissFlag(flag.id)} variant="outline" size="sm" disabled={isProcessing === flag.id}>
                                        <Icon name="Check" size={14} className="mr-1.5"/> Dismiss
                                    </Button>
                                    <Button onClick={() => handleTakeAction(flag.id, 'hide_listing', flag.item_id)} variant="destructive_outline" size="sm" disabled={isProcessing === flag.id}>
                                        <Icon name="AlertTriangle" size={14} className="mr-1.5"/> Action
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {queue.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center p-8 text-muted-foreground">
                                <Icon name="ThumbsUp" size={32} className="mx-auto mb-2 opacity-50"/>
                                The flag queue is clear. Well done!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default FlagQueue;

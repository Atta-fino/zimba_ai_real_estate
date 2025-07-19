import React, { useState, useMemo } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

// Using the same mockCommissions from Landlord's CommissionTracker for consistency in this example
// In a real app, this would be fetched with admin privileges, potentially with more data.
const mockAdminCommissions = [
  {
    id: 'comm1',
    agent_id: null,
    booking_id: 'booking1',
    property_name: 'Spacious 3-Bedroom Apartment in Lekki',
    property_location_city: 'Lagos', // Added for filtering
    amount: 250000,
    type: 'rent',
    currency_code: 'NGN',
    timestamp: '2024-07-16T10:30:00Z',
    landlord_id: 'landlord_A',
  },
  {
    id: 'comm2',
    agent_id: 'agent_user_123',
    booking_id: 'booking_agent_abc',
    property_name: 'Luxury Villa Sale in Banana Island',
    property_location_city: 'Lagos',
    amount: 1500000,
    type: 'sale',
    currency_code: 'NGN',
    timestamp: '2024-06-20T15:00:00Z',
    landlord_id: 'landlord_B',
  },
  {
    id: 'comm3',
    agent_id: null,
    booking_id: 'booking3',
    property_name: 'Modern Office Space in Ikeja',
    property_location_city: 'Lagos',
    amount: 125000,
    type: 'rent',
    currency_code: 'NGN',
    timestamp: '2024-06-11T09:00:00Z',
    landlord_id: 'landlord_C',
  },
  {
    id: 'comm4',
    agent_id: 'agent_user_456',
    booking_id: 'booking_agent_def',
    property_name: 'Commercial Warehouse in Apapa',
    property_location_city: 'Lagos',
    amount: 750000,
    type: 'rent', // Assume long-term commercial rent
    currency_code: 'NGN',
    timestamp: '2024-05-05T12:00:00Z',
    landlord_id: 'landlord_D',
  }
];


const CommissionsOverview = () => {
  const [commissions, setCommissions] = useState(mockAdminCommissions);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' }, // Store as ISO strings or Date objects
    type: 'all', // 'all', 'rent', 'sale'
    city: '',
    propertyId: '',
    agentId: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (dateField, value) => {
     setFilters(prev => ({ ...prev, dateRange: {...prev.dateRange, [dateField]: value }}));
  };

  // Basic filtering logic (can be expanded)
  const filteredCommissions = useMemo(() => {
    return commissions.filter(comm => {
      if (filters.type !== 'all' && comm.type !== filters.type) return false;
      if (filters.city && !comm.property_location_city?.toLowerCase().includes(filters.city.toLowerCase())) return false;
      if (filters.agentId && comm.agent_id !== filters.agentId) return false;
      // Date range filtering would require parsing dates and comparing
      // For now, it's just UI
      return true;
    });
  }, [commissions, filters]);

  const formatPrice = (price, currency) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: currency || 'NGN', minimumFractionDigits: 2 }).format(price);
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

  const totalCommissionsDisplay = filteredCommissions.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="p-4 md:p-6 bg-background min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Commissions Overview</h1>
        <p className="text-muted-foreground">Monitor platform and agent earnings, manage payouts, and export reports.</p>
      </header>

      {/* Summary Stats */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-card rounded-lg shadow">
          <h3 className="text-sm font-medium text-muted-foreground">Total Commissions (Filtered)</h3>
          <p className="text-2xl font-bold text-primary">{formatPrice(totalCommissionsDisplay, 'NGN')}</p>
        </div>
         <div className="p-4 bg-card rounded-lg shadow">
          <h3 className="text-sm font-medium text-muted-foreground">Platform Share (Filtered)</h3>
          <p className="text-2xl font-bold">{formatPrice(filteredCommissions.filter(c=>!c.agent_id).reduce((s,c)=>s+c.amount,0), 'NGN')}</p>
        </div>
        <div className="p-4 bg-card rounded-lg shadow">
          <h3 className="text-sm font-medium text-muted-foreground">Agent Earnings (Filtered)</h3>
          <p className="text-2xl font-bold">{formatPrice(filteredCommissions.filter(c=>c.agent_id).reduce((s,c)=>s+c.amount,0), 'NGN')}</p>
        </div>
         <div className="p-4 bg-card rounded-lg shadow">
          <h3 className="text-sm font-medium text-muted-foreground">Total Records (Filtered)</h3>
          <p className="text-2xl font-bold">{filteredCommissions.length}</p>
        </div>
      </div>


      {/* Filters Section */}
      <div className="p-4 bg-card rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold mb-3 text-foreground">Filter Commissions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label htmlFor="startDate" className="text-xs text-muted-foreground">Start Date</label>
            <Input type="date" name="startDate" id="startDate" value={filters.dateRange.start} onChange={(e) => handleDateChange('start', e.target.value)} />
          </div>
          <div>
            <label htmlFor="endDate" className="text-xs text-muted-foreground">End Date</label>
            <Input type="date" name="endDate" id="endDate" value={filters.dateRange.end} onChange={(e) => handleDateChange('end', e.target.value)} />
          </div>
          <div>
            <label htmlFor="type" className="text-xs text-muted-foreground">Type</label>
            <Select name="type" id="type" value={filters.type} onValueChange={(val) => setFilters(p => ({...p, type: val}))}>
              <option value="all">All Types</option>
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </Select>
          </div>
          <div>
            <label htmlFor="city" className="text-xs text-muted-foreground">City</label>
            <Input name="city" id="city" value={filters.city} onChange={handleFilterChange} placeholder="e.g., Lagos" />
          </div>
          <div>
            <label htmlFor="agentId" className="text-xs text-muted-foreground">Agent ID</label>
            <Input name="agentId" id="agentId" value={filters.agentId} onChange={handleFilterChange} placeholder="Enter Agent ID" />
          </div>
          {/* <Button onClick={() => console.log("Apply filters", filters)} className="sm:col-span-2 md:col-span-1">Apply Filters</Button> */}
        </div>
      </div>

      {/* Actions Bar */}
      <div className="mb-4 flex justify-end space-x-2">
        <Button variant="outline" disabled>
            <Icon name="DownloadCloud" className="mr-2" size={16}/> Export as CSV (Coming Soon)
        </Button>
        <Button variant="outline" disabled>
            <Icon name="Banknote" className="mr-2" size={16}/> Manage Agent Payouts (Coming Soon)
        </Button>
      </div>


      {/* Commissions Table */}
      <div className="bg-card rounded-xl shadow-lg overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="p-3 text-left font-semibold text-muted-foreground">Timestamp</th>
                  <th className="p-3 text-left font-semibold text-muted-foreground">Booking ID</th>
                  <th className="p-3 text-left font-semibold text-muted-foreground">Property</th>
                  <th className="p-3 text-left font-semibold text-muted-foreground">Type</th>
                  <th className="p-3 text-right font-semibold text-muted-foreground">Amount</th>
                  <th className="p-3 text-left font-semibold text-muted-foreground">Agent ID</th>
                  <th className="p-3 text-left font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommissions.map(comm => (
                  <tr key={comm.id} className="border-b border-border last:border-b-0 hover:bg-muted/30">
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{formatDate(comm.timestamp)}</td>
                    <td className="p-3 text-primary hover:underline whitespace-nowrap">{comm.booking_id}</td>
                    <td className="p-3 text-foreground truncate max-w-xs" title={comm.property_name}>{comm.property_name}</td>
                    <td className="p-3 capitalize">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${comm.type === 'rent' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                            {comm.type}
                        </span>
                    </td>
                    <td className="p-3 text-right font-semibold text-foreground whitespace-nowrap">{formatPrice(comm.amount, comm.currency_code)}</td>
                    <td className="p-3 text-muted-foreground whitespace-nowrap">{comm.agent_id || 'N/A (Platform)'}</td>
                    <td className="p-3 whitespace-nowrap">
                        <Button variant="ghost" size="icon_sm" disabled className="text-muted-foreground hover:text-primary">
                            <Icon name="MoreHorizontal" size={16}/>
                        </Button>
                    </td>
                  </tr>
                ))}
                 {filteredCommissions.length === 0 && (
                    <tr>
                        <td colSpan="7" className="text-center p-8 text-muted-foreground">
                            <Icon name="SearchX" size={32} className="mx-auto mb-2 opacity-50"/>
                            No commissions match current filters.
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

export default CommissionsOverview;

import React, { useState, useMemo } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Link } from 'react-router-dom';
import { mockPropertiesData } from '../../../data/mockProperties';

const PropertyStatusBadge = ({ status }) => {
  let colorClasses = 'bg-gray-200 text-gray-800';
  if (status === 'active') colorClasses = 'bg-green-200 text-green-800';
  if (status === 'inactive') colorClasses = 'bg-gray-200 text-gray-800';
  if (status === 'pending_approval') colorClasses = 'bg-yellow-200 text-yellow-800';
  if (status === 'hidden') colorClasses = 'bg-red-200 text-red-800';
  return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${colorClasses}`}>{status.replace('_', ' ')}</span>;
};

const PropertyManagement = () => {
  const [properties, setProperties] = useState(mockPropertiesData);
  const [filters, setFilters] = useState({ status: 'all', search: '' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      const matchesStatus = filters.status === 'all' || prop.status === filters.status;
      const matchesSearch = !filters.search ||
        prop.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        prop.id.toLowerCase().includes(filters.search.toLowerCase()) ||
        prop.landlord_name.toLowerCase().includes(filters.search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [properties, filters]);

  const handleAction = (action, propId) => {
    alert(`Action: '${action}' triggered for Property ID: ${propId} (Simulation)`);
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Property Management</h1>
        <p className="text-muted-foreground">Oversee and manage all property listings on the platform.</p>
      </header>

      {/* Filters */}
      <div className="p-4 bg-card rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4">
        <Input
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search by Title, ID, or Landlord..."
          className="w-full sm:w-72"
        />
        <Select
          name="status"
          value={filters.status}
          onValueChange={(val) => setFilters(p => ({...p, status: val}))}
          className="w-full sm:w-48"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending_approval">Pending Approval</option>
          <option value="hidden">Hidden</option>
        </Select>
      </div>

      {/* Properties Table */}
      <div className="bg-card rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-3 text-left font-semibold text-muted-foreground">Property Title / ID</th>
                <th className="p-3 text-left font-semibold text-muted-foreground">Landlord</th>
                <th className="p-3 text-left font-semibold text-muted-foreground">Location</th>
                <th className="p-3 text-left font-semibold text-muted-foreground">Status</th>
                <th className="p-3 text-left font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map(prop => (
                <tr key={prop.id} className="border-b border-border last:border-b-0 hover:bg-muted/30">
                  <td className="p-3">
                    <Link to={`/property-detail-view/${prop.id}`} className="font-semibold text-primary hover:underline">{prop.title}</Link>
                    <p className="text-xs text-muted-foreground">{prop.id}</p>
                  </td>
                  <td className="p-3">
                    <p className="text-foreground">{prop.landlord_name}</p>
                    <p className="text-xs text-muted-foreground">{prop.landlord_id}</p>
                  </td>
                  <td className="p-3 text-muted-foreground">{prop.location}</td>
                  <td className="p-3"><PropertyStatusBadge status={prop.status} /></td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon_sm" onClick={() => handleAction('hide', prop.id)} title="Hide/Unhide Listing">
                        <Icon name="EyeOff" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon_sm" onClick={() => handleAction('view_owner', prop.id)} title="View Owner">
                        <Icon name="User" size={16} />
                      </Button>
                       <Link to={`/property-detail-view/${prop.id}`}>
                          <Button variant="ghost" size="icon_sm" title="View Listing">
                            <Icon name="ExternalLink" size={16} />
                          </Button>
                       </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PropertyManagement;

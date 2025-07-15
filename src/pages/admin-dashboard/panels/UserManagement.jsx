import React, { useState, useMemo } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

// Mock data for users
const mockUsers = [
  { id: 'landlord_A', name: 'Aisha Bello', email: 'aisha.bello@example.com', role: 'landlord', country: 'NG', status: 'active', is_verified: true },
  { id: 'landlord_B', name: 'Babatunde Adebayo', email: 'babatunde.a@example.com', role: 'landlord', country: 'NG', status: 'active', is_verified: false },
  { id: 'renter_1', name: 'Chidinma Okoro', email: 'chidinma.o@example.com', role: 'renter', country: 'KE', status: 'active', is_verified: true },
  { id: 'diaspora_1', name: 'David Chen', email: 'david.chen@example.com', role: 'diaspora', country: 'US', status: 'active', is_verified: true },
  { id: 'admin_1', name: 'Admin User', email: 'admin@zimba.com', role: 'admin', country: 'GH', status: 'active', is_verified: true },
  { id: 'renter_2', name: 'Femi Adekunle', email: 'femi.a@example.com', role: 'renter', country: 'NG', status: 'suspended', is_verified: true },
];

const RoleBadge = ({ role }) => {
  let colorClasses = 'bg-gray-200 text-gray-800';
  if (role === 'landlord') colorClasses = 'bg-blue-200 text-blue-800';
  if (role === 'renter') colorClasses = 'bg-green-200 text-green-800';
  if (role === 'diaspora') colorClasses = 'bg-purple-200 text-purple-800';
  if (role === 'admin') colorClasses = 'bg-red-200 text-red-800';
  return <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${colorClasses}`}>{role}</span>;
};

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [filters, setFilters] = useState({ role: 'all', search: '' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesRole = filters.role === 'all' || user.role === filters.role;
      const matchesSearch = !filters.search ||
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase());
      return matchesRole && matchesSearch;
    });
  }, [users, filters]);

  const handleAction = (action, userId) => {
    alert(`Action: '${action}' triggered for User ID: ${userId} (Simulation)`);
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">User Management</h1>
        <p className="text-muted-foreground">Oversee and manage all users on the Zimba platform.</p>
      </header>

      {/* Filters and Actions */}
      <div className="p-4 bg-card rounded-lg shadow mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4">
          <Input
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search by name or email..."
            className="w-full sm:w-64"
          />
          <Select
            name="role"
            value={filters.role}
            onValueChange={(val) => setFilters(p => ({...p, role: val}))}
            className="w-full sm:w-48"
            >
            <option value="all">All Roles</option>
            <option value="renter">Renter</option>
            <option value="landlord">Landlord</option>
            <option value="diaspora">Diaspora</option>
            <option value="admin">Admin</option>
          </Select>
        </div>
        <Button>
          <Icon name="UserPlus" size={16} className="mr-2"/>
          Add New User
        </Button>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-3 text-left font-semibold text-muted-foreground">User</th>
                <th className="p-3 text-left font-semibold text-muted-foreground">Role</th>
                <th className="p-3 text-left font-semibold text-muted-foreground">Country</th>
                <th className="p-3 text-left font-semibold text-muted-foreground">Status</th>
                <th className="p-3 text-left font-semibold text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-border last:border-b-0 hover:bg-muted/30">
                  <td className="p-3">
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </td>
                  <td className="p-3"><RoleBadge role={user.role} /></td>
                  <td className="p-3 text-muted-foreground">{user.country}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon_sm" onClick={() => handleAction('view_details', user.id)} title="View Details">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon_sm" onClick={() => handleAction('suspend', user.id)} title="Suspend User">
                        <Icon name="Ban" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon_sm" onClick={() => handleAction('change_role', user.id)} title="Change Role">
                        <Icon name="Users" size={16} />
                      </Button>
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

export default UserManagement;

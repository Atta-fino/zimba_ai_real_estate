import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Checkbox from '../../../components/ui/Checkbox'; // Assuming a switch-like component

const AppSettings = () => {
  // Mock current settings
  const [settings, setSettings] = useState({
    rent_commission_rate: '0.05',
    sale_commission_rate: '0.03',
    diaspora_escrow_fee_rate: '0.02',
    is_live: true, // Maintenance mode toggle
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    console.log("Saving new application settings:", settings);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Settings updated successfully! (Simulation)");
    setIsLoading(false);
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-foreground">Application Settings</h1>
        <p className="text-muted-foreground">Manage global platform settings, commission rates, and maintenance mode.</p>
      </header>

      <div className="space-y-8 max-w-2xl">
        {/* Commission Settings */}
        <section className="p-6 bg-card rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-foreground mb-4">Commission & Fee Rates</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="rent_commission_rate" className="block text-sm font-medium text-muted-foreground">Rent Commission Rate</label>
              <p className="text-xs text-muted-foreground mb-1">e.g., 0.05 for 5%</p>
              <Input
                id="rent_commission_rate"
                name="rent_commission_rate"
                type="number"
                step="0.01"
                value={settings.rent_commission_rate}
                onChange={handleChange}
                placeholder="0.05"
              />
            </div>
             <div>
              <label htmlFor="sale_commission_rate" className="block text-sm font-medium text-muted-foreground">Property Sale Commission Rate</label>
               <p className="text-xs text-muted-foreground mb-1">e.g., 0.03 for 3%</p>
              <Input
                id="sale_commission_rate"
                name="sale_commission_rate"
                type="number"
                step="0.01"
                value={settings.sale_commission_rate}
                onChange={handleChange}
                placeholder="0.03"
              />
            </div>
             <div>
              <label htmlFor="diaspora_escrow_fee_rate" className="block text-sm font-medium text-muted-foreground">Diaspora Escrow Fee Rate</label>
               <p className="text-xs text-muted-foreground mb-1">e.g., 0.02 for 2%</p>
              <Input
                id="diaspora_escrow_fee_rate"
                name="diaspora_escrow_fee_rate"
                type="number"
                step="0.005"
                value={settings.diaspora_escrow_fee_rate}
                onChange={handleChange}
                placeholder="0.02"
              />
            </div>
          </div>
        </section>

        {/* Maintenance Mode */}
        <section className="p-6 bg-card rounded-xl shadow-lg">
           <h3 className="text-xl font-semibold text-foreground mb-2">Maintenance Mode</h3>
           <div className="flex items-center justify-between bg-red-50 p-4 rounded-md border border-red-200">
                <div>
                    <label htmlFor="is_live" className="font-semibold text-red-800">Zimba Is Live</label>
                    <p className="text-xs text-red-700">Toggling this OFF will put the entire site into maintenance mode.</p>
                </div>
                <Checkbox
                    id="is_live"
                    name="is_live"
                    checked={settings.is_live}
                    onCheckedChange={(checked) => setSettings(prev => ({...prev, is_live: checked}))}
                />
           </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-border">
            <Button onClick={handleSaveChanges} disabled={isLoading} size="lg">
                 {isLoading ? <Icon name="LoaderCircle" className="animate-spin mr-2"/> : <Icon name="Save" className="mr-2"/>}
                Save All Settings
            </Button>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const SettingsManagement = () => {
  const [settings, setSettings] = useState([]);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('*');

      if (error) {
        console.error('Error fetching settings:', error);
      } else {
        setSettings(data);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    const { error } = await supabase
        .from('settings')
        .update({ value: { value } })
        .eq('key', key)

    if(error) {
        console.error('Error saving settings:', error);
    }
  }

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold mb-2">Settings Management</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Key</th>
            <th className="text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {settings.map((setting) => (
            <tr key={setting.key}>
              <td>{setting.key}</td>
              <td><input type="text" defaultValue={setting.value.value} onChange={e => {
                  setKey(setting.key)
                  setValue(e.target.value)
              }}/></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Save
      </button>
    </div>
  );
};

export default SettingsManagement;

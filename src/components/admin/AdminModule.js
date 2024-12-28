import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import CompanyManagement from './CompanyManagement';
import CommunicationMethodManagement from './CommunicationMethodManagement';

const AdminModule = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
    
      <Tabs value={activeTab} onChange={handleChange} centered>
        <Tab label="Company Management" />
        <Tab label="Communication Method Management" />
      </Tabs>
      {activeTab === 0 && <CompanyManagement />}
      {activeTab === 1 && <CommunicationMethodManagement />}
    </Box>
  );
};

export default AdminModule;

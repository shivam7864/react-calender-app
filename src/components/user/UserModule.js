import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import Dashboard from './Dashboard';
import Notifications from './Notifications';
import CalendarView from './CalendarView';

const UserModule = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box sx={{ p: 3 }}>

            <Tabs value={activeTab} onChange={handleChange} centered>
                <Tab label="Dashboard" />
                <Tab label="Notifications" />
                <Tab label="Calendar" />
            </Tabs>
            {activeTab === 0 && <Dashboard />}
            {activeTab === 1 && <Notifications />}
            {activeTab === 2 && <CalendarView />}
        </Box>
    );
};

export default UserModule;

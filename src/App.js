import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import AdminModule from './components/admin/AdminModule';
import CompanyManagement from './components/admin/CompanyManagement';
import CommunicationMethodManagement from './components/admin/CommunicationMethodManagement';
import Navbar from './components/common/Navbar';
import SignInPage from './components/SignInPage';
import Dashboard from './components/user/Dashboard';
import Notifications from './components/user/Notifications';
import CalendarView from './components/user/CalendarView';
import UserModule from './components/user/UserModule';
import { useAppContext } from './AppContext';


const App = () => {

  const { role } = useAppContext();
  return (
    <Router>
      <CssBaseline />
      <Box>
        {role && <Navbar />}
        <Box sx={{ mt: 8, p: 3 }}>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/admin" element={<AdminModule />} />
            <Route path="/admin/companies" element={<CompanyManagement />} />
            <Route path="/admin/communication-methods" element={<CommunicationMethodManagement />} />
            <Route exact path="/user" element={<UserModule />} />
            <Route exact path="/user/notifications" element={<Notifications />} />
            <Route exact path="/user/calendar" element={<CalendarView />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;

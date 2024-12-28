import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Badge, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Notifications = () => {
    const [overdue, setOverdue] = useState([]);
    const [dueToday, setDueToday] = useState([]);
    const [overdueCount, setOverdueCount] = useState(0);
    const [dueTodayCount, setDueTodayCount] = useState(0);

    useEffect(() => {
        const userCompanies = JSON.parse(localStorage.getItem('userCompanies')) || [];
        const overdueCompanies = userCompanies.filter(company => company.overdue === true);
        const dueTodayCompanies = userCompanies.filter(company => company.dueToday === true);

        setOverdue(overdueCompanies);
        setDueToday(dueTodayCompanies);

        setOverdueCount(overdueCompanies.length);
        setDueTodayCount(dueTodayCompanies.length);
    }, []);

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Notifications</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <IconButton>
                    <Badge badgeContent={overdueCount + dueTodayCount} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Typography variant="body1" sx={{ ml: 1 }}>
                    {overdueCount + dueTodayCount} Notifications
                </Typography>
            </Box>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Overdue Communications</Typography>
                        {overdue.length ? (
                            overdue.map((company, index) => (
                                <Box key={index} sx={{ mt: 2 }}>
                                    <Typography variant="body2">
                                        {company.name}: {company.nextScheduledCommunication.type} on {company.nextScheduledCommunication.date}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2">No overdue communications.</Typography>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Today’s Communications</Typography>
                        {dueToday.length ? (
                            dueToday.map((company, index) => (
                                <Box key={index} sx={{ mt: 2 }}>
                                    <Typography variant="body2">
                                        {company.name}: {company.nextScheduledCommunication.type} on {company.nextScheduledCommunication.date}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2">No communications due today.</Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Notifications;

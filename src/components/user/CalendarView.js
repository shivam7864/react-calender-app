import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const CalendarView = () => {
    const [communications, setCommunications] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [dailyCommunications, setDailyCommunications] = useState([]);

    useEffect(() => {
        const storedUserCompanies = JSON.parse(localStorage.getItem('userCompanies')) || [];

        const allCommunications = storedUserCompanies.flatMap((company) => {
            const pastCommunications = company.lastFiveCommunications.map((comm) => ({
                ...comm,
                companyName: company.name,
                type: 'past',
            }));

            const futureCommunication = company.nextScheduledCommunication.date
                ? [
                    {
                        ...company.nextScheduledCommunication,
                        companyName: company.name,
                        type: 'upcoming',
                    },
                ]
                : [];

            return [...pastCommunications, ...futureCommunication];
        });

        setCommunications(allCommunications);
    }, []);

    useEffect(() => {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const filtered = communications.filter((comm) => comm.date === formattedDate);
        setDailyCommunications(filtered);
    }, [selectedDate, communications]);

    return (
        <Box sx={{ p: 3 }}>


            <Typography variant="h6"> Calendar View</Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
                <Paper sx={{ p: 2, flex: 1 }}>
                    <Calendar onChange={setSelectedDate} value={selectedDate} />
                </Paper>

                <Paper sx={{ p: 2, flex: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Communications for {selectedDate.toDateString()}
                    </Typography>

                    {dailyCommunications.length ? (
                        <List>
                            {dailyCommunications.map((comm, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={`${comm.companyName}: ${comm.type === 'upcoming' ? 'Upcoming' : 'Past'} Communication`}
                                        secondary={`Type: ${comm.type}, Notes: ${comm.notes || 'N/A'}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography>No communications on this date.</Typography>
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default CalendarView;

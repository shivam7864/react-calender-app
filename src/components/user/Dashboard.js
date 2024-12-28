import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, Tooltip } from '@mui/material';
import CommunicationActionModal from './CommunicationActionModal';

const Dashboard = () => {
    const [companies, setCompanies] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        const storedUserCompanies = JSON.parse(localStorage.getItem('userCompanies')) || [];
        const storedCompanies = JSON.parse(localStorage.getItem('companies')) || [];
    
        const updatedUserCompanies = storedCompanies.map((company) => {
            const existingUserCompany = storedUserCompanies.find((uc) => uc.id === company.id);
            
            if (existingUserCompany) {
                return {
                    ...existingUserCompany,
                    ...company,
                };
            } else {
                const recentCommunications = company.recentCommunications || [];
                const nextCommunication = company.nextCommunication || {};
                const nextCommunicationType = nextCommunication.type || "Unknown";
                const nextCommunicationDate = nextCommunication.date || "";
    
                return {
                    ...company,
                    lastFiveCommunications: recentCommunications.slice(0, 5),
                    nextScheduledCommunication: {
                        type: nextCommunicationType,
                        date: nextCommunicationDate,
                    },
                    overdue: nextCommunicationDate < new Date().toISOString().split('T')[0],
                    dueToday: nextCommunicationDate === new Date().toISOString().split('T')[0],
                };
            }
        });
    
        const filteredUserCompanies = updatedUserCompanies.filter((uc) =>
            storedCompanies.some((sc) => sc.id === uc.id)
        );
    
        setCompanies(filteredUserCompanies);
        localStorage.setItem('userCompanies', JSON.stringify(filteredUserCompanies));
    }, []);

    const handleCommunicationPerformed = (company) => {
        setSelectedCompany(company);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedCompany(null);
    };

    const handleSaveCommunication = (type, date, notes) => {
        const updatedCompanies = companies.map((company) => {
            if (company.name === selectedCompany.name) {
                const updatedCompany = {
                    ...company,
                    lastFiveCommunications: [
                        ...company.lastFiveCommunications,
                        { type, date, notes },
                    ],
                    nextScheduledCommunication: { type, date },
                    overdue: false,
                    dueToday: false,
                };
                return updatedCompany;
            }
            return company;
        });

        setCompanies(updatedCompanies);
        localStorage.setItem('userCompanies', JSON.stringify(updatedCompanies));
        handleCloseModal();
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6">User Dashboard</Typography>

            <Grid container spacing={3} sx={{ mt: 3 }}>
                {companies.map((company, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: 2,
                                border: '1px solid #ddd',
                                backgroundColor: company.dueToday ? 'yellow' : company.overdue ? 'red' : 'white',
                            }}
                        >
                            <Typography variant="h6">{company.name}</Typography>
                            <Typography variant="body2">
                                Next: {company.nextScheduledCommunication.type} on {company.nextScheduledCommunication.date}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>Last Communications:</Typography>
                            {company.lastFiveCommunications.map((comm, i) => (
                                <Tooltip title={comm.notes} key={i}>
                                    <Typography variant="body2" sx={{ cursor: 'pointer' }}>
                                        {comm.type} - {comm.date}
                                    </Typography>
                                </Tooltip>
                            ))}
                            <Button
                                variant="outlined"
                                onClick={() => handleCommunicationPerformed(company)}
                                sx={{ mt: 2 }}
                            >
                                Communication Performed
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <CommunicationActionModal
                open={openModal}
                onClose={handleCloseModal}
                onSave={handleSaveCommunication}
                company={selectedCompany}
            />
        </Box>
    );
};

export default Dashboard;

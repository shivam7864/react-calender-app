import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const CommunicationActionModal = ({ open, onClose, onSave, company }) => {
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [communicationMethods, setCommunicationMethods] = useState([]);

    useEffect(() => {
        const methods = JSON.parse(localStorage.getItem('communicationMethods')) || [];
        setCommunicationMethods(methods);
    }, []);

    const handleSubmit = () => {
        onSave(type, date, notes);
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ p: 3, width: 400, backgroundColor: 'white', borderRadius: 2, margin: 'auto', mt: 5 }}>
                <Typography variant="h6">Log Communication for {company?.name}</Typography>

                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Type of Communication</InputLabel>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        label="Type of Communication"
                    >
                        {communicationMethods.map((method) => (
                            <MenuItem key={method.id} value={method.name}>
                                {method.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Date"
                    type="date"
                    fullWidth
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    sx={{ mt: 2 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    label="Notes"
                    fullWidth
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    sx={{ mt: 2 }}
                />

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CommunicationActionModal;

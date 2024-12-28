import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import CommunicationFormModal from '../../wrappers/CommunicationFormModal';

const defaultMethods = [
    { id: 1, name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
    { id: 2, name: 'LinkedIn Message', description: 'Send a LinkedIn message', sequence: 2, mandatory: true },
    { id: 3, name: 'Email', description: 'Send an email', sequence: 3, mandatory: true },
    { id: 4, name: 'Phone Call', description: 'Make a phone call', sequence: 4, mandatory: false },
    { id: 5, name: 'Other', description: 'Any other communication method', sequence: 5, mandatory: false },
];

const CommunicationMethodManagement = () => {
    const [methods, setMethods] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentMethod, setCurrentMethod] = useState(null);

    useEffect(() => {
        const storedMethods = localStorage.getItem('communicationMethods');
        if (storedMethods) {
            setMethods(JSON.parse(storedMethods));
        } else {
            setMethods(defaultMethods);
        }
    }, []);

    useEffect(() => {
        if (methods.length !== 0)
            localStorage.setItem('communicationMethods', JSON.stringify(methods));
    }, [methods]);

    const handleOpenModal = (method = null) => {
        setCurrentMethod(method);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setCurrentMethod(null);
        setModalOpen(false);
    };

    const handleSaveMethod = (methodData) => {
        const updatedMethod = {
            id: currentMethod ? currentMethod.id : Date.now(),
            ...methodData,
        };

        if (currentMethod) {
            const updatedMethods = methods.map((method) =>
                method.id === currentMethod.id ? updatedMethod : method
            );
            setMethods(updatedMethods);
        } else {
            setMethods((prevMethods) => [...prevMethods, updatedMethod]);
        }

        handleCloseModal();
    };

    const handleDeleteMethod = (id) => {
        const updatedMethods = methods.filter((method) => method.id !== id);
        setMethods(updatedMethods);
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
                Add New Method
            </Button>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Sequence</TableCell>
                            <TableCell>Mandatory</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {methods.map((method) => (
                            <TableRow key={method.id}>
                                <TableCell>{method.name}</TableCell>
                                <TableCell>{method.description}</TableCell>
                                <TableCell>{method.sequence}</TableCell>
                                <TableCell>{method.mandatory ? 'Yes' : 'No'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleOpenModal(method)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDeleteMethod(method.id)}
                                        sx={{ ml: 1 }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CommunicationFormModal
                open={modalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveMethod}
                defaultValues={
                    currentMethod
                        ? {
                            name: currentMethod.name,
                            description: currentMethod.description,
                            sequence: currentMethod.sequence,
                            mandatory: currentMethod.mandatory,
                        }
                        : {
                            name: '',
                            description: '',
                            sequence: '',
                            mandatory: false,
                        }
                }
            />
        </Box>
    );
};

export default CommunicationMethodManagement;

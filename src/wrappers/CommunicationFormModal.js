import React, { useEffect } from 'react';
import { Modal, Box, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const CommunicationFormModal = ({ open, onClose, onSave, defaultValues }) => {
    const { control, handleSubmit, reset } = useForm({
        defaultValues,
    });

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const handleClose = () => {
        reset(defaultValues); 
        onClose();
    };

    const onSubmit = (data) => {
        onSave({
            ...data,
            sequence: Number(data.sequence), 
        });
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 24,
                }}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Name"
                                fullWidth
                                margin="normal"
                                required
                            />
                        )}
                    />
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                fullWidth
                                margin="normal"
                                required
                            />
                        )}
                    />
                    <Controller
                        name="sequence"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Sequence"
                                type="number"
                                fullWidth
                                margin="normal"
                                required
                                inputProps={{ min: 1 }}
                            />
                        )}
                    />
                    <Controller
                        name="mandatory"
                        control={control}
                        render={({ field }) => (
                            <FormControlLabel
                                control={<Checkbox {...field} checked={field.value} />}
                                label="Mandatory"
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default CommunicationFormModal;

import React, { useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';

const FormModal = ({ open, onClose, onSave, defaultValues }) => {
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
    onSave(data); 
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
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <TextField {...field} label="Name" fullWidth margin="normal" />}
          />
          <Controller
            name="location"
            control={control}
            render={({ field }) => <TextField {...field} label="Location" fullWidth margin="normal" />}
          />
          <Controller
            name="linkedin"
            control={control}
            render={({ field }) => <TextField {...field} label="LinkedIn Profile" fullWidth margin="normal" />}
          />
          <Controller
            name="emails"
            control={control}
            render={({ field }) => <TextField {...field} label="Emails" fullWidth margin="normal" />}
          />
          <Controller
            name="phones"
            control={control}
            render={({ field }) => <TextField {...field} label="Phone Numbers" fullWidth margin="normal" />}
          />
          <Controller
            name="comments"
            control={control}
            render={({ field }) => <TextField {...field} label="Comments" fullWidth margin="normal" />}
          />
          <Controller
            name="communicationPeriodicity"
            control={control}
            render={({ field }) => <TextField {...field} label="Communication Periodicity" fullWidth margin="normal" />}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default FormModal;

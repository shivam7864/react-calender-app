import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import FormModal from '../../wrappers/FormModal';

const CompanyManagement = () => {
  const [companies, setCompanies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);

  useEffect(() => {
    const loadCompanies = async () => {
      const storedCompanies = localStorage.getItem('companies');
      if (storedCompanies && storedCompanies.length !== 0) {
        setCompanies(JSON.parse(storedCompanies));
      } else {
        try {
          const response = await fetch('/companies.json');
          const data = await response.json();
          setCompanies(data);
        } catch (error) {
          console.error('Error loading JSON data:', error);
        }
      }
    };

    loadCompanies();
  }, []);

  useEffect(() => {
    if (companies.length !== 0) localStorage.setItem('companies', JSON.stringify(companies));
  }, [companies]);

  const handleOpenModal = (company = null) => {
    setCurrentCompany(company);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentCompany(null);
    setModalOpen(false);
  };

  const handleSaveCompany = (companyData) => {
    const updatedCompany = {
      id: currentCompany ? currentCompany.id : Date.now(),
      ...companyData,
      emails: companyData.emails.split(',').map((email) => email.trim()),
      phones: companyData.phones.split(',').map((phone) => phone.trim()),
    };

    if (currentCompany) {
      const updatedCompanies = companies.map((company) =>
        company.id === currentCompany.id ? updatedCompany : company
      );
      setCompanies(updatedCompanies);
    } else {
      setCompanies((prevCompanies) => [...prevCompanies, updatedCompany]);
    }

    handleCloseModal();
  };

  const handleDeleteCompany = (id) => {
    const updatedCompanies = companies.filter((company) => company.id !== id);
    setCompanies(updatedCompanies);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
        Add New Company
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>LinkedIn</TableCell>
              <TableCell>Emails</TableCell>
              <TableCell>Phone Numbers</TableCell>
              <TableCell>Periodicity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>{company.linkedin}</TableCell>
                <TableCell>{company.emails.join(', ')}</TableCell>
                <TableCell>{company.phones.join(', ')}</TableCell>
                <TableCell>{company.communicationPeriodicity}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleOpenModal(company)}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDeleteCompany(company.id)} sx={{ marginLeft: 1 }}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <FormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveCompany}
        defaultValues={
          currentCompany
            ? {
                name: currentCompany.name,
                location: currentCompany.location,
                linkedin: currentCompany.linkedin,
                emails: currentCompany.emails.join(', '),
                phones: currentCompany.phones.join(', '),
                comments: currentCompany.comments,
                communicationPeriodicity: currentCompany.communicationPeriodicity,
              }
            : {
                name: '',
                location: '',
                linkedin: '',
                emails: '',
                phones: '',
                comments: '',
                communicationPeriodicity: '',
              }
        }
      />
    </div>
  );
};

export default CompanyManagement;

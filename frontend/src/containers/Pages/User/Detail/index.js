import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import api from '../../../../apis';
import { ROUTES } from '../../../../constants';

import { UserForm } from '../Form';
import { ConfirmModal } from '../../../Components';

export const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [visibleUserForm, setVisibleUserForm] = useState(false);
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);

  const fetchData = () => {
    api.user
      .get(id)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenUserForm = () => {
    setVisibleUserForm(true);
  };

  const handleCloseUserForm = () => {
    fetchData();
    setVisibleUserForm(false);
  };

  const handleConfirmDelete = () => {
    api.user
      .delete(id)
      .then(() => {
        navigate(ROUTES.USER.LIST);
        enqueueSnackbar('User is deleted successfully!', {
          variant: 'success'
        });
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };

  const handleOpenConfirmModal = () => {
    setVisibleConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setVisibleConfirmModal(false);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Button
              variant="text"
              startIcon={<ArrowBack />}
              onClick={handleBack}
            >
              Back
            </Button>
          }
          action={
            <Stack direction="row" spacing={10}>
              <Button color="error" onClick={handleOpenConfirmModal}>
                Delete
              </Button>
              <Button onClick={handleOpenUserForm}>Edit</Button>
            </Stack>
          }
        />
        <CardContent>
          <Typography variant="sutTitle1">User Details</Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>{data.firstName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Last Name</TableCell>
                <TableCell>{data.lastName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{data.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phone Number</TableCell>
                <TableCell>{data.phoneNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>{data.role}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {data.logs?.length > 0 && (
            <Box mt={20}>
              <Typography variant="sutTitle1">Logs</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>IP Address</TableCell>
                    <TableCell>Browser Agent</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.logs.map(({ ipAddress, browserAgent }, index) => (
                    <TableRow key={index}>
                      <TableCell>{ipAddress}</TableCell>
                      <TableCell>{browserAgent}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </CardContent>
      </Card>
      <UserForm
        userId={+id}
        open={visibleUserForm}
        onClose={handleCloseUserForm}
      />
      <ConfirmModal
        open={visibleConfirmModal}
        title="Delete User"
        confirmMessage="If you click OK, you will lose the user data!"
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

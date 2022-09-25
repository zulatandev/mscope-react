import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import api from '../../../../apis';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required Field!'),
  lastName: Yup.string().required('Required Field!'),
  email: Yup.string()
    .email('Invalid Field!')
    .required('Required Field!')
});

const initialUser = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  role: ''
};

export const UserForm = ({ open, onClose, userId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState(initialUser);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (values, { setSubmitting }) => {
    if (userId) {
      api.user
        .put(userId, values)
        .then(() => {
          onClose();
          enqueueSnackbar('User is updated successfully!', {
            variant: 'success'
          });
        })
        .catch(err => {
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => setSubmitting(false));
    } else {
      api.user
        .post(values)
        .then(() => {
          onClose();
          enqueueSnackbar('User is created successfully!', {
            variant: 'success'
          });
        })
        .catch(err => {
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => setSubmitting(false));
    }
  };

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      api.user
        .get(userId)
        .then(res => {
          setUser({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber,
            role: res.data.role
          });
        })
        .catch(err => {
          onClose();
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => setIsLoading(false));
    } else {
      setUser(initialUser);
      setIsLoading(false);
    }
  }, [userId, open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{userId ? 'Edit' : 'New'} User</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={user}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
            }) => (
              <Form onSubmit={handleSubmit}>
                <Stack py={10} width={320} spacing={20}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    disabled={isSubmitting}
                    value={values.firstName}
                    error={Boolean(errors?.firstName && touched.firstName)}
                    helperText={
                      Boolean(errors?.firstName && touched.firstName) &&
                      errors?.firstName
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    disabled={isSubmitting}
                    value={values.lastName}
                    error={Boolean(errors?.lastName && touched.lastName)}
                    helperText={
                      Boolean(errors?.lastName && touched.lastName) &&
                      errors?.lastName
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    disabled={isSubmitting}
                    type="email"
                    value={values.email}
                    error={Boolean(errors?.email && touched.email)}
                    helperText={
                      Boolean(errors?.email && touched.email) && errors?.email
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    disabled={isSubmitting}
                    value={values.phoneNumber}
                    error={Boolean(errors?.phoneNumber && touched.phoneNumber)}
                    helperText={
                      Boolean(errors?.phoneNumber && touched.phoneNumber) &&
                      errors?.phoneNumber
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextField
                    select
                    fullWidth
                    label="Role"
                    name="role"
                    disabled={isSubmitting}
                    value={values.role}
                    error={Boolean(errors?.role && touched.role)}
                    helperText={
                      Boolean(errors?.role && touched.role) && errors?.role
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </TextField>
                  <Button
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                    startIcon={
                      isSubmitting && (
                        <CircularProgress size={20} color="info" />
                      )
                    }
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  );
};

UserForm.propTypes = {
  userId: PropTypes.number,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

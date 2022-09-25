import React, { FC } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import api from '../../../../apis';
import { ROUTES } from '../../../../constants';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: ''
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required Field!'),
  lastName: Yup.string().required('Required Field!'),
  email: Yup.string()
    .email('Invalid Field!')
    .required('Required Field!'),
  password: Yup.string()
    .required('Required Field!')
    .matches(/[a-zA-Z]/, 'Required at least one alphabet.')
    .matches(/\d/, 'Required at least one number.')
    .min(8, 'Required at least 8 characters.'),
  confirmPassword: Yup.string()
    .required('Required Field!')
    .when('password', {
      is: value => value && value.length > 0,
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Password does not match!'
      )
    })
});

export const Register: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = (values, { setSubmitting }) => {
    api.auth
      .register(values)
      .then(res => {
        navigate(ROUTES.AUTH.LOGIN);
        enqueueSnackbar(res.message, { variant: 'success' });
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => setSubmitting(false));
  };

  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <Card>
      <CardHeader title="Register" />
      <CardContent>
        <Stack width={400} spacing={20} alignItems="center">
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
              Boolean(errors?.lastName && touched.lastName) && errors?.lastName
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
            fullWidth
            label="Password"
            name="password"
            type="password"
            disabled={isSubmitting}
            value={values.password}
            error={Boolean(errors?.password && touched.password)}
            helperText={
              Boolean(errors?.password && touched.password) && errors?.password
            }
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            disabled={isSubmitting}
            value={values.confirmPassword}
            error={Boolean(errors?.confirmPassword && touched.confirmPassword)}
            helperText={
              Boolean(errors?.confirmPassword && touched.confirmPassword) &&
              errors?.confirmPassword
            }
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="outlined"
            onClick={handleSubmit}
            disabled={isSubmitting}
            startIcon={isSubmitting && <CircularProgress size={20} />}
          >
            Register
          </Button>
          <Typography variant="caption" component={Link} to={ROUTES.AUTH.LOGIN}>
            Already have an account?
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

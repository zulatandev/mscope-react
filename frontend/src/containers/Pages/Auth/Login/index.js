import React, { FC } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import api from '../../../../apis';
import { useAppContext } from '../../../../context';
import { StorageService } from '../../../../service';
import { ACCESS_TOKEN_KEY, ROUTES } from '../../../../constants';

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Field!')
    .required('Required Field!'),
  password: Yup.string()
    .required('Required Field!')
    .matches(/[a-zA-Z]/, 'Required at least one alphabet.')
    .matches(/\d/, 'Required at least one number.')
    .min(8, 'Required at least 8 characters.')
});

export const Login: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { setAccount } = useAppContext();

  const onSubmit = (values, { setSubmitting }) => {
    api.auth
      .login(values)
      .then(res => {
        setAccount(res.data.user);
        StorageService.setItem(ACCESS_TOKEN_KEY, res.data.tokens.accessToken);
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
      <CardHeader title="Login" />
      <CardContent>
        <Stack width={400} spacing={20} alignItems="center">
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
          <Button onClick={handleSubmit} fullWidth>
            Login
          </Button>
          <Typography
            variant="caption"
            component={Link}
            to={ROUTES.AUTH.REGISTER}
          >
            Create an account
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

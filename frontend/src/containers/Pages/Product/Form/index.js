import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

import api from '../../../../apis';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Required Field!'),
  price: Yup.number().required('Required Field!'),
  total: Yup.number().required('Required Field!')
});

const initialProduct = {
  name: '',
  price: '',
  total: ''
};

export const ProductForm = ({ open, onClose, productId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [product, setProduct] = useState(initialProduct);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (values, { setSubmitting }) => {
    if (productId) {
      api.product
        .put(productId, values)
        .then(() => {
          onClose();
          enqueueSnackbar('Product is updated successfully!', {
            variant: 'success'
          });
        })
        .catch(err => {
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => setSubmitting(false));
    } else {
      api.product
        .post(values)
        .then(() => {
          onClose();
          enqueueSnackbar('Product is created successfully!', {
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
    if (productId) {
      setIsLoading(true);
      api.product
        .get(productId)
        .then(res => {
          setProduct({
            name: res.data.name,
            price: res.data.price,
            total: res.data.total
          });
        })
        .catch(err => {
          onClose();
          enqueueSnackbar(err.message, { variant: 'error' });
        })
        .finally(() => setIsLoading(false));
    } else {
      setProduct(initialProduct);
      setIsLoading(false);
    }
  }, [productId, open]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{productId ? 'Edit' : 'New'} Product</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={product}
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
                    label="Product Name"
                    name="name"
                    disabled={isSubmitting}
                    value={values.name}
                    error={Boolean(errors.name && touched.name)}
                    helperText={
                      Boolean(errors.name && touched.name) && errors.name
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    disabled={isSubmitting}
                    value={values.price}
                    error={Boolean(errors.price && touched.price)}
                    helperText={
                      Boolean(errors.price && touched.price) && errors.price
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Total"
                    name="total"
                    type="number"
                    disabled={isSubmitting}
                    value={values.total}
                    error={Boolean(errors.total && touched.total)}
                    helperText={
                      Boolean(errors.total && touched.total) && errors.total
                    }
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Stack>
                <Button
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                  startIcon={
                    isSubmitting && <CircularProgress size={20} color="info" />
                  }
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  );
};

ProductForm.propTypes = {
  productId: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

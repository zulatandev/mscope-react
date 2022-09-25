import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import moment from 'moment';

import api from '../../../../apis';
import { ROUTES } from '../../../../constants';

import { ProductForm } from '../Form';
import { ConfirmModal } from '../../../Components';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [visibleProductForm, setVisibleProductForm] = useState(false);
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);

  const fetchData = () => {
    api.product
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

  const handleOpenProductForm = () => {
    setVisibleProductForm(true);
  };

  const handleCloseProductForm = () => {
    fetchData();
    setVisibleProductForm(false);
  };

  const handleConfirmDelete = () => {
    api.product
      .delete(id)
      .then(() => {
        navigate(ROUTES.PRODUCT.LIST);
        enqueueSnackbar('Product is deleted successfully!', {
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
              <Button onClick={handleOpenProductForm}>Edit</Button>
            </Stack>
          }
        />
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>{data.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell>{data.price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>{data.total}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Created Date</TableCell>
                <TableCell>{moment(data.createdAt).calendar()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Updated Date</TableCell>
                <TableCell>{moment(data.updatedAt).calendar()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ProductForm
        productId={id}
        open={visibleProductForm}
        onClose={handleCloseProductForm}
      />
      <ConfirmModal
        open={visibleConfirmModal}
        title="Delete Product"
        confirmMessage="If you click OK, you will lose the product data!"
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

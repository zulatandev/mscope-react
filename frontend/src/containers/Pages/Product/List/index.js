import React, { useEffect, useState } from 'react';
import { Chip } from '@mui/material';
import { useSnackbar } from 'notistack';
import * as moment from 'moment';
import { useNavigate } from 'react-router';

import { ConfirmModal, DataTable } from '../../../Components';
import { ProductForm } from '../Form';

import { ROUTES } from '../../../../constants';
import api from '../../../../apis';

const columns = [
  {
    field: 'name',
    label: 'Product Name'
  },
  {
    field: 'price',
    label: 'Price'
  },
  {
    field: 'total',
    label: 'Total'
  },
  {
    label: 'Created At',
    render: row => <>{moment(row.createdAt).calendar()}</>
  },
  {
    label: 'Updated At',
    render: row => <>{moment(row.updatedAt).calendar()}</>
  }
];

export const ProductList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [visibleProductForm, setVisibleProductForm] = useState(false);
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [productId, setProductId] = useState();

  const navigate = useNavigate();

  const fetchData = () => {
    api.product
      .getList({
        page,
        limit: rowsPerPage
      })
      .then(res => {
        setData(res.data.listData);
        setTotalPage(res.data.totalCount);
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };

  const handlePageChange = value => {
    setPage(value);
  };

  const handleRowsPerPageChange = value => {
    setRowsPerPage(value);
  };

  const handleNew = () => {
    setVisibleProductForm(true);
  };

  const handleEdit = id => {
    setProductId(id);
    setVisibleProductForm(true);
  };

  const handleCloseCardForm = () => {
    setVisibleProductForm(false);
    fetchData();
    setProductId();
  };

  const handleDelete = id => {
    setProductId(id);
    handleOpenConfirmModal();
  };

  const handleDetail = id => {
    navigate(ROUTES.PRODUCT.DETAIL.replace(':id', id));
  };

  const handleOpenConfirmModal = () => {
    setVisibleConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setVisibleConfirmModal(false);
    setProductId();
  };

  const handleConfirmDelete = () => {
    api.product
      .delete(productId)
      .then(() => {
        fetchData();
        handleCloseConfirmModal();
        enqueueSnackbar('Card is deleted successfully!', {
          variant: 'success'
        });
      })
      .catch(err => {
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, visibleProductForm]);

  return (
    <>
      <DataTable
        title="Products"
        data={data}
        columns={columns}
        page={page}
        totalPage={totalPage}
        rowsPerPage={rowsPerPage}
        onNew={handleNew}
        onEdit={handleEdit}
        onDetail={handleDetail}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <ProductForm
        productId={productId}
        open={visibleProductForm}
        onClose={handleCloseCardForm}
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

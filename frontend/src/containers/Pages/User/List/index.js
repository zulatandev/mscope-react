import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';

import { ConfirmModal, DataTable } from '../../../Components';
import { UserForm } from '../Form';

import { ROLE, ROUTES } from '../../../../constants';
import api from '../../../../apis';
import { Chip } from '@mui/material';

const columns = [
  {
    label: 'Name',
    render: row => row.lastName + ' ' + row.firstName
  },
  {
    field: 'email',
    label: 'Email'
  },
  {
    field: 'phoneNumber',
    label: 'Phone Number'
  },
  {
    label: 'Role',
    render: row => (
      <Chip
        color={row.role === ROLE.ADMIN ? 'success' : 'primary'}
        label={row.role}
      />
    )
  }
];

export const UserList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [visibleUserForm, setVisibleUserForm] = useState(false);
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [userId, setUserId] = useState();

  const navigate = useNavigate();

  const fetchData = () => {
    api.user
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

  const handleEdit = id => {
    setUserId(id);
    setVisibleUserForm(true);
  };

  const handleCloseUserForm = () => {
    setVisibleUserForm(false);
    fetchData();
    setUserId();
  };

  const handleDelete = id => {
    setUserId(id);
    handleOpenConfirmModal();
  };

  const handleDetail = id => {
    navigate(ROUTES.USER.DETAIL.replace(':id', id));
  };

  const handleOpenConfirmModal = () => {
    setVisibleConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setVisibleConfirmModal(false);
    setUserId();
  };

  const handleConfirmDelete = () => {
    api.user
      .delete(userId)
      .then(() => {
        fetchData();
        handleCloseConfirmModal();
        enqueueSnackbar('User is deleted successfully!', {
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
  }, [page, rowsPerPage]);

  return (
    <>
      <DataTable
        title="Users"
        data={data}
        columns={columns}
        page={page}
        totalPage={totalPage}
        rowsPerPage={rowsPerPage}
        onEdit={handleEdit}
        onDetail={handleDetail}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <UserForm
        userId={userId}
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

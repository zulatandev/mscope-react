import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment,
  InputBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import PropTypes from 'prop-types';
import {
  DeleteOutlined,
  DescriptionOutlined,
  EditOutlined,
  MoreHoriz,
  Search
} from '@mui/icons-material';

import styles from './styles';

export const DataTable = ({
  data,
  title,
  columns,
  page,
  totalPage,
  rowsPerPage,
  onNew,
  onEdit,
  onDetail,
  onDelete,
  onPageChange,
  onRowsPerPageChange
}) => {
  const [activeId, setActiveId] = useState();
  const [actionMenuEl, setActionMenuEl] = useState(null);

  const handleOpenActionMenu = (e, id) => {
    setActiveId(id);
    setActionMenuEl(e.currentTarget);
  };

  const handleCloseActionMenu = () => {
    setActionMenuEl(null);
  };

  const handlePageChange = (_, value) => {
    onPageChange(value);
  };

  const handleRowsPerPageChange = e => {
    onRowsPerPageChange(e.target.value);
  };

  const handleEdit = () => {
    onEdit(activeId);
    handleCloseActionMenu();
  };

  const handleDelete = () => {
    onDelete(activeId);
    handleCloseActionMenu();
  };

  const handleDetail = () => {
    onDetail(activeId);
    handleCloseActionMenu();
  };

  return (
    <Card>
      <CardHeader
        title={title}
        action={
          <Stack direction="row" spacing={10}>
            <InputBase
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
              sx={styles.searchInput}
            />
            {onNew && <Button onClick={onNew}>New</Button>}
          </Stack>
        }
      />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(({ label }, index) => (
                  <TableCell key={index} variant="head">
                    {label}
                  </TableCell>
                ))}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rIndex) => (
                <TableRow key={rIndex} hover>
                  {columns.map(({ field, render }, cIndex) => (
                    <TableCell key={cIndex}>
                      {render ? render(row) : row[field]}
                    </TableCell>
                  ))}
                  <TableCell align="right">
                    <IconButton onClick={e => handleOpenActionMenu(e, row.id)}>
                      <MoreHoriz />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            page={page}
            count={totalPage}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </TableContainer>
      </CardContent>
      <Menu
        anchorEl={actionMenuEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(actionMenuEl)}
        onClose={handleCloseActionMenu}
      >
        <MenuItem onClick={handleDetail}>
          <ListItemIcon>
            <DescriptionOutlined />
          </ListItemIcon>
          <ListItemText>Detail</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditOutlined />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteOutlined />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Card>
  );
};

DataTable.propTypes = {
  title: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      label: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
      render: PropTypes.func
    })
  ).isRequired,
  onNew: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
  onDetail: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired
};

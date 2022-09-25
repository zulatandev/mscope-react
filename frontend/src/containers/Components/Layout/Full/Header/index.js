import * as React from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import { AccountCircle, Logout, Search } from '@mui/icons-material';

import { useAppContext } from '../../../../../context';
import { StorageService } from '../../../../../service';
import { ACCESS_TOKEN_KEY } from '../../../../../constants';

import styles from './styles';

export const Header = () => {
  const { setAccount } = useAppContext();

  const handleLogout = () => {
    setAccount(null);
    StorageService.removeItem(ACCESS_TOKEN_KEY);
  };

  return (
    <Box sx={styles.header}>
      <InputBase
        sx={styles.searchInput}
        startAdornment={
          <InputAdornment position="start">
            <Search sx={styles.searchIcon} />
          </InputAdornment>
        }
        placeholder="Search..."
      />
      <Tooltip title="Logout">
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleLogout}
        >
          <Logout sx={styles.accountIcon} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

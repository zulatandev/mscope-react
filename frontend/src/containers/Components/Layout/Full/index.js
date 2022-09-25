import React from 'react';
import { Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';

import { Sidebar } from './Sidebar';
import { Header } from './Header';

import styles from './styles';

export const FullLayout = ({ children }) => (
  <Stack direction="row">
    <Sidebar />
    <Box sx={styles.aside}>
      <Header />
      <Box sx={styles.main}>{children}</Box>
    </Box>
  </Stack>
);

FullLayout.propTypes = {
  children: PropTypes.any
};

import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import styles from './styles';

export const AuthLayout = ({ children }) => (
  <Box sx={styles.layout}>{children}</Box>
);

AuthLayout.propTypes = {
  children: PropTypes.any
};

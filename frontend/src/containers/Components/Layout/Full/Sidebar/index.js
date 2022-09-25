import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Drawer,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList
} from '@mui/material';
import { CreditCard, PersonOutlined } from '@mui/icons-material';

import { ROLE, ROUTES } from '../../../../../constants';
import { useAppContext } from '../../../../../context';

import styles from './styles';

const NAV_LINKS = [
  {
    icon: <CreditCard />,
    label: 'Products',
    path: ROUTES.PRODUCT.LIST
  },
  {
    icon: <PersonOutlined />,
    label: 'Users',
    path: ROUTES.USER.LIST
  }
];

export const Sidebar = () => {
  const { account } = useAppContext();

  return (
    <Drawer variant="permanent" sx={styles.drawer}>
      <MenuItem component={Link} to={ROUTES.DASHBOARD} sx={styles.brand}>
        MSCOPE
      </MenuItem>
      <MenuList sx={styles.menuList}>
        <MenuItem
          component={NavLink}
          to={ROUTES.PRODUCT.LIST}
          sx={styles.menuItem}
        >
          <ListItemIcon>
            <CreditCard />
          </ListItemIcon>
          <ListItemText>Products</ListItemText>
        </MenuItem>
        {account.role === ROLE.ADMIN && (
          <MenuItem
            component={NavLink}
            to={ROUTES.USER.LIST}
            sx={styles.menuItem}
          >
            <ListItemIcon>
              <PersonOutlined />
            </ListItemIcon>
            <ListItemText>Users</ListItemText>
          </MenuItem>
        )}
      </MenuList>
    </Drawer>
  );
};

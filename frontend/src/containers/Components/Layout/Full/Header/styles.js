import { alpha } from '@mui/material';

const styles = {
  header: theme => ({
    backgroundColor: theme.palette.warning.light,
    padding: theme.spacing(8, 20),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: theme.shadows,
    height: 72
  }),
  searchIcon: theme => ({
    color: theme.palette.common.white
  }),
  accountIcon: theme => ({
    width: 28,
    height: 28,
    color: theme.palette.common.white
  }),
  searchInput: theme => ({
    borderRadius: 1,
    padding: theme.spacing(2, 10),
    color: theme.palette.common.white,
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  })
};

export default styles;

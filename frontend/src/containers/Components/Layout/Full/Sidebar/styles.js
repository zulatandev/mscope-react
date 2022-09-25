const styles = {
  drawer: theme => ({
    width: 260
  }),
  brand: theme => ({
    fontSize: 30,
    fontWeight: 'bold',
    height: 68,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    color: theme.palette.warning.dark
  }),
  menuList: theme => ({
    outline: '!important',
    width: 260,
    padding: theme.spacing(20, 10)
  }),
  menuItem: theme => ({
    mb: 10,
    borderRadius: 2,
    padding: theme.spacing(12, 16),
    '&.active': {
      backgroundColor: theme.palette.warning.main,
      '.MuiTypography-root': {
        fontWeight: 500,
        color: theme.palette.common.white
      },
      '.MuiListItemIcon-root': {
        color: theme.palette.common.white
      }
    },
    '.MuiTypography-root': {
      fontWeight: 500,
      color: theme.palette.warning.main
    },
    '.MuiListItemIcon-root': {
      color: theme.palette.warning.main
    }
  })
};

export default styles;

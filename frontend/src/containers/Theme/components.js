const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        margin: 0,
        padding: 0
      }
    }
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        padding: '10px 20px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }
  },
  MuiTextField: {
    defaultProps: {
      size: 'small'
    }
  },
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      disableElevation: true
    }
  },
  MuiCardHeader: {
    styleOverrides: {
      action: {
        margin: 0
      }
    }
  }
};

export default components;

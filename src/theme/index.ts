import { createTheme } from '@material-ui/core';

import palette from './palette';
import bbTypography from './bbTypography';

const theme = createTheme({
  palette,
  typography: bbTypography,
  overrides: {
    MuiDataGrid: {
      root: {
        border: 'none',
        '& .MuiDataGrid-main': {
          '& .MuiDataGrid-columnsContainer': {
            borderBottom: '1px solid #E0E0E0;',
            backgroundColor: '#F4F4F8',
            '& .MuiDataGrid-columnHeaderTitle': {
              color: 'black',
            },
            '& .MuiDataGrid-columnSeparator': {
              display: 'none',
            },
          },
          '& .MuiDataGrid-cell': {
            borderColor: '#E0E0E0;',
          },
        },
      },
    },
  },
});

export default theme;

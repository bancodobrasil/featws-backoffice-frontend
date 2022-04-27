import { createTheme } from '@material-ui/core';

import palette from './palette';
import bbTypography from './bbTypography';

const theme = createTheme({
  palette,
  typography: bbTypography,
  overrides: {
    MuiDataGrid: {
      root: {
        borderColor: palette.primary.dark,
        '& .MuiDataGrid-main': {
          '& .MuiDataGrid-columnsContainer': {
            borderColor: palette.primary.dark,
            '& .MuiDataGrid-columnSeparator': {
              color: palette.primary.dark,
            },
          },
          '& .MuiDataGrid-cell': {
            borderColor: palette.primary.dark,
            cursor: 'pointer',
          },
        },
      },
    },
  },
});

export default theme;

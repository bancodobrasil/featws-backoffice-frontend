import { createTheme } from '@material-ui/core';
import { ptBR as dataGridPtBR } from '@mui/x-data-grid';
import { ptBR } from '@material-ui/core/locale';

import palette from './palette';
import bbTypography from './bbTypography';

const theme = createTheme({
  palette,
  typography: bbTypography,
  overrides: {
    MuiButton: {
      root: {
        padding: '12px 27.5px',
      },
      label: {
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '16px',
        letterSpacing: '1.25px',
      },
    },
    MuiDataGrid: {
      root: {
        border: 'none',
        '& .MuiDataGrid-main': {
          '& .MuiDataGrid-columnsContainer': {
            backgroundColor: 'rgba(0, 0, 0, 0.01)',
            boxShadow: 'inset 0px -1px 0px #E0E0E0',
            '& .MuiDataGrid-columnHeader': {
              padding: '0 8px',
              '& .MuiDataGrid-columnHeaderTitleContainer': {
                padding: 0,
                '& .MuiDataGrid-columnHeaderTitle': {
                  color: 'rgba(0, 0, 0, 0.6);',
                  fontWeight: 700,
                  fontSize: '15px',
                  lineHeight: '24px',
                },
                '& .MuiDataGrid-columnSeparator': {
                  display: 'none',
                },
              },
            },
          },
          '& .MuiDataGrid-cell': {
            borderColor: '#E0E0E0;',
            color: 'black',
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.5px',
            padding: '0 8px',
          },
        },
      },
    },
  },
}, dataGridPtBR, ptBR);

export default theme;

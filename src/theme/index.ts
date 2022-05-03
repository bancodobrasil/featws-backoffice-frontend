import { createTheme, LabelDisplayedRowsArgs } from '@material-ui/core';
import { GridOptions, ptBR as ptBRDataGrid } from '@mui/x-data-grid';
import { ptBR } from '@material-ui/core/locale';

import palette from './palette';
import bbTypography from './bbTypography';

const ptBRMuiTablePaginationOverride = {
  ...ptBR.props.MuiTablePagination,
  labelRowsPerPage: 'Itens por página',
  labelDisplayedRows: ({ count, page, from, to }: LabelDisplayedRowsArgs) =>
    `Mostrando ${from}-${to} itens de ${count} itens`,
};

const ptBRMuiDataGridOverride = {
  localeText: {
    ...(ptBRDataGrid as { props: { MuiDataGrid: Pick<GridOptions, 'localeText'> } }).props
      .MuiDataGrid.localeText,
    MuiTablePagination: ptBRMuiTablePaginationOverride,
    footerRowSelected: (count: number) => {
      if (count === 1) {
        return '1 item selecionado';
      } else if (count > 1) {
        return `${count} itens selecionados`;
      }
    },
  },
};

const theme = createTheme(
  {
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
                padding: '0 10px 0 8px',
                '&:focus': {
                  outline: 'none',
                },
                '&:focus-within': {
                  outline: 'none',
                },
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
  },
  ptBR,
  {
    props: {
      MuiTablePagination: ptBRMuiTablePaginationOverride,
    },
  },
  {
    props: {
      MuiDataGrid: ptBRMuiDataGridOverride,
    },
  },
);

export default theme;

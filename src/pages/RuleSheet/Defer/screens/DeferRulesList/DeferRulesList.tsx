import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import React from 'react';
import { FilterSelect } from '../../../../../components/FilterSelect';
import StatusBullet from '../../../../../components/StatusBullet';
import { IRule, IRuleSheet } from '../../../../../interfaces';
import { EnumDeferRulesScreens } from '../../Defer';

const columns: GridColDef[] = [
  {
    field: 'title',
    headerName: 'Título',
    minWidth: 200,
  },
  {
    field: 'date',
    headerName: 'Data',
    minWidth: 150,
    type: 'date',
  },
  {
    field: 'author',
    headerName: 'Autor',
    minWidth: 250,
    sortable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 230,
    sortable: false,
    renderCell: params => (
      <Chip
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0.25px',
          '& .MuiChip-label': {
            paddingLeft: '4px',
          },
        }}
        avatar={<StatusBullet status={params.value as string} />}
        label={params.value}
      />
    ),
  },
];

export interface IDeferRulesListProps {
  record: IRuleSheet;
  pageSize: number;
  listSelectionId: string[];
  code: string;
  author: string;
  rules: IRule[];
  isFiltering: boolean;
  setPageSize: (pageSize: number) => void;
  setListSelectionId: (listSelectionId: string[]) => void;
  setCode: (code: string) => void;
  setAuthor: (author: string) => void;
  setRules: (rules: IRule[]) => void;
  setIsFiltering: (isFiltering: boolean) => void;
  onBackClickHandler: (action?: () => void) => void;
  setCurrentScreen: (currentScreen: EnumDeferRulesScreens) => void;
}

export const DeferRulesList = ({
  record,
  pageSize,
  listSelectionId,
  code,
  author,
  rules,
  isFiltering,
  setPageSize,
  setListSelectionId,
  setCode,
  setAuthor,
  setRules,
  setIsFiltering,
  onBackClickHandler,
  setCurrentScreen,
}: IDeferRulesListProps) => {
  const onBackClickHandlerOverride = () => {
    onBackClickHandler();
  };

  const onAdvanceClickHandler = () => {
    setCurrentScreen(EnumDeferRulesScreens.CONFIRMATION);
  };

  const onPageSizeChangeHandler = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  const onSelectionModelChangeHandler = (selectionModel: GridSelectionModel, details: unknown) => {
    setListSelectionId(selectionModel as string[]);
  };

  const onAuthorChangeHandler = event => {
    setAuthor(event.target.value);
  };

  const onSearchClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (!record) {
      return;
    }
    let filtering = false;
    let listRule = record.rules;
    if (code) {
      listRule = listRule.filter(rule => rule.id === code);
      filtering = true;
    }
    if (author) {
      listRule = listRule.filter(rule => rule.author === author);
      filtering = true;
    }
    setIsFiltering(filtering);
    setRules(listRule);
  };

  const onCodeChangeHandler = event => {
    setCode(event.target.value);
  };

  const renderFilterSearch = () => {
    if (!isFiltering && rules.length <= 10) {
      return;
    }
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FilterSelect
          id="filter-code-select"
          label="Filtrar por código"
          value={code}
          onChange={onCodeChangeHandler}
        >
          <MenuItem value="">Todos</MenuItem>
          {[...new Set(record?.rules.map(rule => rule.id))].map((id, index) => (
            <MenuItem key={index} value={id}>
              {id}
            </MenuItem>
          ))}
        </FilterSelect>
        <FilterSelect
          id="filter-author-select"
          label="Filtrar por autor"
          value={author}
          onChange={onAuthorChangeHandler}
        >
          <MenuItem value="">Todos</MenuItem>
          {[...new Set(record?.rules.map(rule => rule.author))].map((ruleAuthor, index) => (
            <MenuItem key={index} value={ruleAuthor}>
              {ruleAuthor}
            </MenuItem>
          ))}
        </FilterSelect>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: 169,
          }}
          onClick={onSearchClickHandler}
        >
          Buscar
        </Button>
      </Box>
    );
  };

  return (
    <div>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          paddingTop: '11px',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: '24px',
            lineHeight: '24px',
            letterSpacing: '0.18px',
            margin: 0,
          }}
        >
          Quais regras você quer deferir?
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: '26px',
        }}
      >
        {renderFilterSearch()}
        <DataGrid
          sx={{
            marginTop: '16px',
            '& .MuiDataGrid-main': {
              '& .MuiDataGrid-columnsContainer .MuiDataGrid-columnHeader:last-child': {
                '& .MuiDataGrid-columnSeparator': {
                  display: 'none',
                },
              },
              '&  .MuiDataGrid-cell:focus-within': {
                outline: 'none',
              },
            },
          }}
          rows={rules}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          onPageSizeChange={onPageSizeChangeHandler}
          autoHeight
          checkboxSelection
          disableSelectionOnClick
          selectionModel={listSelectionId}
          onSelectionModelChange={onSelectionModelChangeHandler}
        />
        <Divider
          sx={{
            marginTop: '19px',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '16px',
          }}
        >
          <Button variant="contained" color="secondary" onClick={onBackClickHandlerOverride}>
            Voltar
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginLeft: '16px',
            }}
            disabled={listSelectionId?.length <= 0}
            onClick={onAdvanceClickHandler}
          >
            Avançar
          </Button>
        </Box>
      </Box>
    </div>
  );
};

import {
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@material-ui/core';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import React, { useEffect, useRef, useState } from 'react';
import StatusBullet from '../../../../../components/StatusBullet';
import { IRule, IRuleSheet } from '../../../../../interfaces';
import { EnumDeferRulesScreens } from '../../Defer';
import Style from './Style';

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
    renderCell: params => {
      const classes = Style();

      return (
        <Chip
          className={classes.chipStatus}
          avatar={<StatusBullet status={params.value as string} />}
          label={params.value}
        />
      );
    },
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
  const codeInputLabel = useRef<HTMLLabelElement>();
  const authorInputLabel = useRef<HTMLLabelElement>();
  const [codeLabelWidth, setCodeLabelWidth] = useState<number>(0);
  const [authorLabelWidth, setAuthorLabelWidth] = useState<number>(0);

  const classes = Style();

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

  useEffect(() => {
    if (codeInputLabel.current) {
      setCodeLabelWidth(codeInputLabel.current.offsetWidth);
    }
    if (authorInputLabel.current) {
      setAuthorLabelWidth(authorInputLabel.current.offsetWidth);
    }
  }, [codeInputLabel, authorInputLabel]);

  const onCodeChangeHandler = event => {
    setCode(event.target.value);
  };

  const renderFilterSearch = () => {
    if (!isFiltering && rules.length <= 10) {
      return;
    }
    return (
      <div>
        <FormControl variant="outlined" className={classes.filterSelect}>
          <InputLabel ref={codeInputLabel} id="filter-code-select-input-label">
            Filtrar por código
          </InputLabel>
          <Select
            labelId="filter-code-select-label"
            id="filter-code-select"
            value={code}
            onChange={onCodeChangeHandler}
            label="Código"
            input={
              <OutlinedInput labelWidth={codeLabelWidth} name="code-input" id="outlined-code" />
            }
          >
            <MenuItem value="">Todos</MenuItem>
            {[...new Set(record?.rules.map(rule => rule.id))].map((id, index) => (
              <MenuItem key={index} value={id}>
                {id}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.filterSelect}>
          <InputLabel ref={authorInputLabel} id="filter-author-select-input-label">
            Filtrar por autor
          </InputLabel>
          <Select
            labelId="filter-author-select-label"
            id="filter-author-select"
            onChange={onAuthorChangeHandler}
            value={author}
            label="Autor"
            input={
              <OutlinedInput
                labelWidth={authorLabelWidth}
                name="author-input"
                id="outlined-author"
              />
            }
          >
            <MenuItem value="">Todos</MenuItem>
            {[...new Set(record?.rules.map(rule => rule.author))].map((ruleAuthor, index) => (
              <MenuItem key={index} value={ruleAuthor}>
                {ruleAuthor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          className={classes.buttonSearch}
          onClick={onSearchClickHandler}
        >
          Buscar
        </Button>
      </div>
    );
  };

  return (
    <div>
      <div className={classes.headingContainer}>
        <h1 className={classes.h1}>Quais regras você quer deferir?</h1>
      </div>
      <div className={classes.mainContainer}>
        {renderFilterSearch()}
        <DataGrid
          className={classes.dataGrid}
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
        <Divider className={classes.divider} />
        <div className={classes.containerActionButtons}>
          <Button variant="contained" color="secondary" onClick={onBackClickHandlerOverride}>
            Voltar
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonAdvance}
            disabled={listSelectionId?.length <= 0}
            onClick={onAdvanceClickHandler}
          >
            Avançar
          </Button>
        </div>
      </div>
    </div>
  );
};

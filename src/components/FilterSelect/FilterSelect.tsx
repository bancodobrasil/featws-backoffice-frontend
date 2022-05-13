import { FormControl, InputLabel, Select, SelectChangeEvent, styled } from '@mui/material';
import React from 'react';

export interface FilterSelectProps {
  id: string;
  label: string;
  value: unknown;
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
  children: React.ReactNode;
}

const FilterFormControl = styled(FormControl)({
  minWidth: 320,
  marginRight: '38px',
  '& .MuiFormLabel-root': {
    fontWeight: '600',
    fontSize: '16px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.38)',
    top: '-9px',
  },
  '& .MuiInputLabel-shrink': {
    color: 'black',
    top: '0',
  },
  '& .MuiSelect-outlined': {
    padding: '10px 32px 10px 14px',
  },
  '& .MuiOutlinedInput-root': {
    height: '40px',
  },
});

export const FilterSelect = ({
  id,
  label,
  value,
  onChange,
  children,
}: FilterSelectProps): JSX.Element => (
  <FilterFormControl variant="outlined">
    <InputLabel sx={{ backgroundColor: '#FFF', px: '4px' }} id={`${id}-label`}>
      {label}
    </InputLabel>
    <Select labelId={`${id}-label`} id={id} value={value} onChange={onChange} label={label}>
      {children}
    </Select>
  </FilterFormControl>
);

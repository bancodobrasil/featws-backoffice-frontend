import React from 'react';
import { Button, ButtonProps } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import { useNavigate } from 'react-router-dom';

export interface ListButtonProps extends Omit<ButtonProps, 'children'> {
  label: string;
}

const ListButton = ({ variant = 'contained', onClick, ...rest }: ListButtonProps) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('../');
  };

  return (
    <Button {...rest} variant={variant} onClick={onClick || handleOnClick}>
      <ListIcon />
      <span style={{ marginLeft: 4 }}>Rule Sheets</span>
    </Button>
  );
};

export default ListButton;

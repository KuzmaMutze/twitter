import { IconButton } from '@material-ui/core';
import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';

type PropsType = {};
export const BackBtn: React.FC<PropsType> = (props) => {
  let history = useHistory();

  let handleClickToBack = () => {
    history.goBack();
  };
  return (
    <IconButton onClick={handleClickToBack} style={{ marginRight: 15 }} color="primary">
      <ArrowBackIcon />
    </IconButton>
  );
};

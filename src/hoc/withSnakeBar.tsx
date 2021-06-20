import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert, { Color } from '@material-ui/lab/Alert';

type PropsType = {
  children: (callback: (text: string, type: Color) => void) => React.ReactElement;
};
export const Notification: React.FC<PropsType> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [notfObj, setNotfObj] = React.useState<{ text: string; type: Color }>();

  const handleClick = (text: string, type: Color) => {
    setNotfObj({ text, type });
    setOpen(true);
  };

  return (
    <>
      {children(handleClick)}
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert severity={notfObj?.type}>{notfObj?.text}</Alert>
      </Snackbar>
    </>
  );
};

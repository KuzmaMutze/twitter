import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

type ModalProps = {
  title: string;
  children: React.ReactNode;
  visible?: boolean;
  onClose: () => void;
};

// const useStyles = makeStyles((theme) => ({
//   dialogActions: {
//     padding: theme.spacing(3),
//   },
// }));

export const ModalBlock: React.FC<ModalProps> = ({
  title,
  children,
  visible = false,
  onClose,
}: ModalProps): React.ReactElement | null => {
  if (!visible) return null;

  return (
    <Dialog open={visible} onClose={onClose} fullWidth>
      <DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon style={{ fontSize: 26 }} />
        </IconButton>
        {title}
      </DialogTitle>

      <DialogContent>{children}</DialogContent>
      {/* 
      <DialogActions className={classes.dialogActions}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Sign in
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default ModalBlock;

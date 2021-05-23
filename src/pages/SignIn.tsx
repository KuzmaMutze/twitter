import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import { FormControl, FormGroup, TextField } from '@material-ui/core';
import ModalUI from '../components/SignIn/Modal';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    height: 'calc(100vh - 84px)',
  },
  blueBlock: {
    position: 'relative',
    backgroundColor: '#71c9f8',
    flex: '0 0 50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  blueBlockIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 1300,
  },
  blueBlockListInfo: {
    position: 'relative',
    listStyle: 'none',
    padding: '0',
    margin: '0',
    width: 380,
    '& h6': {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      fontSize: 20,
      fontWeight: '700',
    },
  },
  blueBlockListInfoIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  blueBlockListInfoItem: {
    margin: '30px 0',
  },
  loginBlock: {
    flex: '0 0 50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBlockWrapper: {
    width: '380px',
  },
  loginBlockTwitterItem: {
    fontSize: 45,
    color: '',
  },
  loginSideTitle: {
    fontWeight: 700,
    marginTop: '20px',
    marginBottom: '45px',
  },
}));

// type PropsType = {};
export const SignIn: React.FC = (props) => {
  const classes = useStyles();

  const [visibleModal, setVisibleModal] = React.useState<'signIn' | 'signUp'>();
  const signInOpen = (): void => setVisibleModal('signIn');
  const signUpOpen = (): void => setVisibleModal('signUp');
  const handleCloseModal = (): void => setVisibleModal(undefined);

  return (
    <div className={classes.wrapper}>
      <div className={classes.blueBlock}>
        <TwitterIcon color="primary" className={classes.blueBlockIcon} />
        <ul className={classes.blueBlockListInfo}>
          <li className={classes.blueBlockListInfoItem}>
            <Typography variant="h6">
              <SearchIcon className={classes.blueBlockListInfoIcon} />
              Читайте о том, что вам интересно.
            </Typography>
          </li>
          <li className={classes.blueBlockListInfoItem}>
            <Typography variant="h6">
              <PeopleOutlineIcon className={classes.blueBlockListInfoIcon} />
              Узнайте, о чем говорят в мире.
            </Typography>
          </li>
          <li className={classes.blueBlockListInfoItem}>
            <Typography variant="h6">
              <ChatBubbleOutlineIcon className={classes.blueBlockListInfoIcon} />
              Присоединяйтесь к общению.
            </Typography>
          </li>
        </ul>
      </div>
      <div className={classes.loginBlock}>
        <div className={classes.loginBlockWrapper}>
          <TwitterIcon color="primary" className={classes.loginBlockTwitterItem} />
          <Typography className={classes.loginSideTitle} variant="h4">
            Узнайте, что происходит в мире прямо сейчас
          </Typography>
          <Typography style={{ marginBottom: 20 }}>
            <b>Присоединяйтесь к Твиттеру прямо сейчас!</b>
          </Typography>
          <Button
            onClick={signUpOpen}
            style={{ marginBottom: 20 }}
            variant="contained"
            color="primary"
            fullWidth>
            Зарегестрироватся
          </Button>
          <Button onClick={signInOpen} variant="outlined" color="primary" fullWidth>
            Войти
          </Button>
        </div>
      </div>
      <ModalUI
        title="Войти в Twitter"
        visible={visibleModal === 'signIn'}
        onClose={handleCloseModal}>
        <FormControl fullWidth>
          <FormGroup row>
            <TextField
              id="email"
              type="text"
              label="E-Mail"
              margin="normal"
              variant="filled"
              autoFocus
              fullWidth
            />

            <TextField
              id="password"
              type="password"
              label="Password"
              margin="normal"
              variant="filled"
              autoFocus
              fullWidth
            />
          </FormGroup>
        </FormControl>
      </ModalUI>

      <ModalUI
        title="Создайте учетуню записать"
        visible={visibleModal === 'signUp'}
        onClose={handleCloseModal}>
        <FormControl fullWidth>
          <FormGroup row>
            <TextField
              id="name"
              type="text"
              label="Name"
              margin="normal"
              variant="filled"
              autoFocus
              fullWidth
            />

            <TextField
              id="email"
              type="text"
              label="E-Mail"
              margin="normal"
              variant="filled"
              autoFocus
              fullWidth
            />

            <TextField
              id="password"
              type="password"
              label="Password"
              margin="normal"
              variant="filled"
              autoFocus
              fullWidth
            />
          </FormGroup>
        </FormControl>
      </ModalUI>
    </div>
  );
};

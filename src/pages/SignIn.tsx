import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import { ModalSignIn } from '../components/SignIn/ModalSignIn';
import { ModalSignUp } from '../components/SignIn/ModalSignUp';

export const useStyles = makeStyles((theme) => ({
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
  footer: {
    height: '84px',
    display: 'flex',
    alignItems: 'center',
    '& ul': {
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      '& li': {
        fontSize: 13,
        margin: '0 10px',
        '& a': {
          textDecoration: 'none',
          color: 'black',
          '&:hover': {
            textDecoration: 'underline  ',
          },
        },
      },
    },
  },
  dialogActions: {
    padding: theme.spacing(3),
  },
}));

export const SignIn: React.FC = (props) => {
  const classes = useStyles();

  const [visibleModal, setVisibleModal] = React.useState<'signIn' | 'signUp'>();
  const signInOpen = (): void => setVisibleModal('signIn');
  const signUpOpen = (): void => setVisibleModal('signUp');
  const handleCloseModal = (): void => setVisibleModal(undefined);

  return (
    <>
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
        <ModalSignIn
          open={visibleModal === 'signIn'}
          handleCloseModal={handleCloseModal}
          classes={classes}
        />
        <ModalSignUp
          open={visibleModal === 'signUp'}
          handleCloseModal={handleCloseModal}
          classes={classes}
        />
      </div>
      <footer className={classes.footer}>
        <ul>
          <li>
            <a href="https://kmudze.netlify.app/">О нас</a>
          </li>
          <li>
            <a href="https://help.twitter.com/en">Справочный центр</a>
          </li>
          <li>
            <a href="https://twitter.com/en/tos">Условия предоставления услуг</a>
          </li>
          <li>
            <a href="https://twitter.com/en/privacy">Политика конфиденциальности</a>
          </li>
          <li>
            <a href="https://help.twitter.com/en/rules-and-policies/twitter-cookies">
              Политика в отношении файлов cookie
            </a>
          </li>
          <li>
            <a href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html">
              Информация о рекламе
            </a>
          </li>
          <li>
            <a href="https://blog.twitter.com/">Блог</a>
          </li>
          <li>
            <a href="https://status.twitterstat.us/">Статус</a>
          </li>
          <li>
            <a href="https://careers.twitter.com/">Работа</a>
          </li>
          <li>
            <a href="https://about.twitter.com/press/brand-assets">Ресурсы бренда</a>
          </li>
          <li>
            <a href="https://ads.twitter.com/login?ref=gl-tw-tw-twitter-advertise">Реклама</a>
          </li>
          <li>
            <a href="https://marketing.twitter.com/en">Маркетинг</a>
          </li>
          <li>
            <a href="https://business.twitter.com/en/g-2.html">Твиттер для бизнеса</a>
          </li>
          <li>
            <a href="https://developer.twitter.com/en">Разработчикам</a>
          </li>
          <li>
            <a href="https://twitter.com/i/directory/profiles">Каталог</a>
          </li>
          <li>
            <a href="https://twitter.com/settings/account/personalization">Настройки</a>
          </li>
          <li>© Twitter, Inc., 2021.</li>
        </ul>
      </footer>
    </>
  );
};

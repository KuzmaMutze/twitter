import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';

import { grey } from '@material-ui/core/colors';

import { Container, InputAdornment, InputBase, Typography, withStyles } from '@material-ui/core';
import { Tweet } from '../components/Home/Tweet';
import { SideBar } from '../components/Home/SideBar';

const SearchTextField = withStyles(() =>
  createStyles({
    input: {
      borderRadius: 30,
      backgroundColor: '#e6ecf0',
      height: 45,
      padding: 0,
    },
  }),
)(InputBase);

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      height: '100vh',
    },
    logo: {
      margin: '15px 0',
    },
    logoIcon: {
      fontSize: '36px',
    },
    navBar: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    navBarListItem: {
      display: 'flex',
      alignItems: 'center',

      '& div': {
        marginBottom: '10px',
        display: 'inline-flex',
        alignItems: 'center',
        padding: '1px 25px 1px 20px',
        height: 50,
        borderRadius: 30,
        cursor: 'pointer',
        transition: 'background 0.1s ease-in-out',
      },
      '&:hover': {
        '& div': {
          color: theme.palette.primary.main,
          backgroundColor: 'rgba(29, 161, 242, 0.1)',
        },
      },
    },
    navBarTitleItem: {
      fontWeight: 700,
      fontSize: 20,
      marginLeft: 15,
    },
    navBarIconItem: {
      fontSize: 28,
    },
    sideBarTweetBtn: {
      marginTop: 30,
      padding: theme.spacing(3),
      width: 230,
    },
    // tweets
    tweetsWrppaer: {
      height: '100%',
      borderRadius: 0,
      borderTop: 0,
      borderBottom: 0,
    },
    tweetsHeader: {
      borderRadius: 0,
      borderLeft: 0,
      borderRight: 0,
      padding: '10px 15px',
      '& h6': {
        fontWeight: 800,
      },
    },

    tweet: {
      borderRadius: 0,
      borderTop: 0,
      borderLeft: 0,
      borderRight: 0,
      padding: '10px 15px',
      '&:hover': {
        backgroundColor: 'rgb(245, 248, 250)',
      },
      '& h6': {
        fontWeight: 800,
      },
      cursor: 'pointer',
    },
    tweetAvatar: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    tweetsUserName: {
      color: grey[500],
    },
    tweetsGroupBtn: {
      marginTop: '7px ',
      width: 450,
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);

// TODO:
// 1. сделать форму отправки твита
// 2. Сделать правую часть твитера
// 3.

type PropsType = {};
export const Home: React.FC<PropsType> = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.wrapper} maxWidth="lg">
      <Grid container spacing={2}>
        {/* side bar */}
        <Grid item xs={3}>
          <SideBar classes={classes} />
        </Grid>
        {/* tweets */}
        <Grid item xs={6}>
          <Paper className={classes.tweetsWrppaer} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
              <Typography variant="h6">Главная</Typography>
            </Paper>

            <Tweet
              text={'Hello everyone'}
              classes={classes}
              user={{
                fullname: 'Glafira Magt',
                username: 'GlafiraMAGT',
                avatarUrl:
                  'https://sun7-7.userapi.com/impg/c855520/v855520088/1cef49/IAgC3bnT_1A.jpg?size=50x0&quality=96&crop=55,55,284,284&sign=26d83f468cea1be127f2283953e2fb3b&ava=1',
              }}
            />
            <Tweet
              text={'Hello everyone'}
              classes={classes}
              user={{
                fullname: 'Old Fag',
                username: 'Renat',
                avatarUrl:
                  'https://sun7-9.userapi.com/s/v1/ig1/jxtQ-cqQZz62XNS8mSlvyUaVKtvZ7Ul4kzcWc0fBArvBIKmn3etioggIKq21FtaD6Ubujmuk.jpg?size=50x0&quality=96&crop=168,6,432,432&ava=1',
              }}
            />
            <Tweet
              text={'Hello everyone'}
              classes={classes}
              user={{
                fullname: 'Glafira Magt',
                username: 'GlafiraMAGT',
                avatarUrl: 'GlafiraMAGT',
              }}
            />
            <Tweet
              text={'Hello everyone'}
              classes={classes}
              user={{
                fullname: 'Glafira Magt',
                username: 'GlafiraMAGT',
                avatarUrl:
                  'https://sun7-7.userapi.com/impg/c855520/v855520088/1cef49/IAgC3bnT_1A.jpg?size=50x0&quality=96&crop=55,55,284,284&sign=26d83f468cea1be127f2283953e2fb3b&ava=1',
              }}
            />
            <Tweet
              text={'Hello everyone'}
              classes={classes}
              user={{
                fullname: 'Old Fag',
                username: 'Renat',
                avatarUrl:
                  'https://sun7-9.userapi.com/s/v1/ig1/jxtQ-cqQZz62XNS8mSlvyUaVKtvZ7Ul4kzcWc0fBArvBIKmn3etioggIKq21FtaD6Ubujmuk.jpg?size=50x0&quality=96&crop=168,6,432,432&ava=1',
              }}
            />
            <Tweet
              text={'Hello everyone'}
              classes={classes}
              user={{
                fullname: 'Glafira Magt',
                username: 'GlafiraMAGT',
                avatarUrl: 'GlafiraMAGT',
              }}
            />
          </Paper>
        </Grid>
        {/* right side bar */}
        <Grid item xs={3}>
          <SearchTextField
            fullWidth
            placeholder="Поиск по Твиттеру"
            inputProps={{
              startAdorment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

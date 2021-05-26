import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { grey } from '@material-ui/core/colors';
import {
  Container,
  InputAdornment,
  TextareaAutosize,
  CircularProgress,
  Typography,
  withStyles,
  Avatar,
  Button,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { Tweet } from '../components/Home/Tweet';
import { SideBar } from '../components/Home/SideBar';
import CropOriginalOutlinedIcon from '@material-ui/icons/CropOriginalOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

const SearchTextField = withStyles((theme) =>
  createStyles({
    root: {
      border: 'none',
      '& input ': {
        padding: '14.5px 5px 16.5px',
        border: 'none',
      },
      '& .MuiOutlinedInput-root': {
        border: 'none',
        borderRadius: 30,
        backgroundColor: '#E6ECF0',
        padding: 0,
        paddingLeft: 15,
        '&.Mui-focused': {
          border: 'none',
          backgroundColor: '#fff',
          '& fieldset': { borderWidth: 1, borderColor: theme.palette.primary.main },
          '& svg path': { fill: theme.palette.primary.main },
        },
        '& input ': {
          padding: '14.5px 5px 16.5px',
          border: 'none',
        },
      },
    },
  }),
)(TextField);

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
      position: 'sticky',
      top: 0,
    },
    navBarListItem: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      '& div': {
        marginBottom: '10px',
        display: 'inline-flex',
        alignItems: 'center',
        padding: '1px 25px 1px 20px',
        height: 50,
        borderRadius: 30,
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
    // textArea
    writeTweet: {
      height: '110px',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      border: '13px solid #ECECEF',
      borderRadius: 0,
      display: 'flex',
      padding: '20px 15px 15px',
    },
    textAreaWrapper: {
      width: '100%',
      height: '50%',
      '& textarea': {
        width: '99.5%!important',
        height: '100%!important',
        fontSize: 22,
        border: 'none',
        resize: 'none',
        outline: 'none',
        fontFamily: 'Segoe UI',
        '& :placeholder': {
          color: grey[500],
        },
      },
    },
    writeTweetTextArea: {
      fontSize: 18,
    },
    writeTweetIcons: {
      marginLeft: -10,
    },
    writeTweetBtn: {
      display: 'flex',
      alignItems: 'center',
    },
    textAreaFooter: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    circularProgress: {
      position: 'relative',
      width: 20,
      height: 20,
      margin: '0 10px',
      '& div': {
        position: 'absolute',
      },
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
      display: 'flex',
      '&:hover': {
        backgroundColor: 'rgb(245, 248, 250)',
      },
      '& h6': {
        fontWeight: 800,
      },
      cursor: 'pointer',
    },
    tweetAvatar: {
      marginRight: 20,
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    tweetsUserName: {
      color: grey[500],
    },
    msgNameBtnWrapper: {
      width: 450,
    },
    tweetsGroupBtn: {
      marginTop: '7px ',
      marginLeft: '-10px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    // rightNavBar
    rightNavBar: {
      position: 'sticky',
      paddingTop: '15px',
    },
    relevantTheme: {
      marginTop: '20px',
      borderRadius: 10,
      backgroundColor: '#F6F7FA',
      // '& h6': {

      // },
    },
    title: {
      fontWeight: 800,
      paddingBottom: 10,
    },
    relevantThemeItem: {
      '& span:first-child': {
        fontWeight: 700,
      },
      '& span:last-child': {
        color: grey[400],
      },
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
        <Grid item lg={3} xs={1}>
          <SideBar classes={classes} />
        </Grid>
        {/* tweets */}
        <Grid item xs={7} lg={6}>
          <Paper className={classes.tweetsWrppaer} variant="outlined">
            <Paper className={classes.tweetsHeader} variant="outlined">
              <Typography variant="h6">Главная</Typography>
            </Paper>
            <Paper className={classes.writeTweet} variant="outlined">
              <Avatar
                className={classes.tweetAvatar}
                alt="Ваш аватар"
                src={`https://sun9-48.userapi.com/impg/3LXTx8zqXFNlg5Fz02tVhP1ykCYDPfF9ITj6sw/L2YxVSVONJY.jpg?size=1280x960&quality=96&sign=7634b299dd308712ff600a4bf2ad7271&type=album`}
              />
              <div className={classes.textAreaWrapper}>
                <TextareaAutosize
                  placeholder="Что происходит?"
                  className={classes.writeTweetTextArea}
                />
                <div className={classes.textAreaFooter}>
                  <div className={classes.writeTweetIcons}>
                    <IconButton>
                      <CropOriginalOutlinedIcon color="primary" />
                    </IconButton>
                    <IconButton>
                      <SentimentSatisfiedOutlinedIcon color="primary" />
                    </IconButton>
                  </div>
                  <div className={classes.writeTweetBtn}>
                    <Typography>280</Typography>
                    <div className={classes.circularProgress}>
                      <CircularProgress variant="static" size={20} value={20} color="primary" />
                      <CircularProgress
                        variant="static"
                        size={20}
                        thickness={4}
                        value={100}
                        style={{ color: 'rgba(0,0,0,0.1)' }}
                      />
                    </div>
                    <Button color="primary" variant="contained">
                      Твитнуть
                    </Button>
                  </div>
                </div>
              </div>
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
          </Paper>
        </Grid>
        {/* right side bar */}
        <Grid item xs={4} lg={3}>
          <div className={classes.rightNavBar}>
            <SearchTextField
              variant="outlined"
              placeholder="Поиск по Твиттеру"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {/* <IconButton> */}
                    <SearchIcon />
                    {/* </IconButton> */}
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <List className={classes.relevantTheme}>
              <ListItem>
                <Typography className={classes.title} variant="h6">
                  Актуальные темы
                </Typography>
              </ListItem>

              <Divider component="li" />

              <ListItem className={classes.relevantThemeItem}>
                <ListItemText
                  primary="Санкт-Питербург"
                  secondary={
                    <Typography variant="body2" component="span">
                      Твитов: 3 132
                    </Typography>
                  }
                />
              </ListItem>

              <Divider component="li" />

              <ListItem className={classes.relevantThemeItem}>
                <ListItemText
                  primary="Санкт-Питербург"
                  secondary={
                    <Typography variant="body2" component="span">
                      Твитов: 3 132
                    </Typography>
                  }
                />
              </ListItem>

              <Divider component="li" />
            </List>

            <List className={classes.relevantTheme}>
              <ListItem>
                <Typography className={classes.title} variant="h6">
                  Кого читать
                </Typography>
              </ListItem>

              <Divider component="li" />

              <ListItem className={classes.relevantThemeItem}>
                <ListItemAvatar>
                  <Avatar
                    alt={`Аватарка пользователя ${'name'}`}
                    src={`https://yt3.ggpht.com/ytc/AAUvwnizbI8uvSXJvnD1M9K1mTFgc9qUPmrjK4mScXUWZQ=s88-c-k-c0x00ffffff-no-rj`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Dock Of Shame"
                  secondary={
                    <Typography variant="body2" component="span">
                      @FavDockOfShame
                    </Typography>
                  }
                />
                <IconButton>
                  <PersonAddOutlinedIcon color="primary" />
                </IconButton>
              </ListItem>

              <Divider component="li" />
            </List>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

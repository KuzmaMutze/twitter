import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { grey } from '@material-ui/core/colors';
import {
  Container,
  InputAdornment,
  Typography,
  withStyles,
  Avatar,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@material-ui/core';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Tweet } from '../components/Home/Tweet';
import { SideBar } from '../components/Home/SideBar';
import { WriteTweetForm } from '../components/Home/WriteTweetForm';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/reducers/tweetsReducer';
import {
  selectIsLoading,
  selectIsTweetsIsLoaded,
  selectIsTweetsIsLoading,
  selectTweets,
} from '../redux/selectors/tweets-selector';

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
      height: '100%',
      border: 'none',
      borderRadius: 0,
      display: 'flex',
      // padding: '20px 15px 15px',
    },
    textAreaWrapper: {
      width: '100%',
      height: '100%',
      '& textarea': {
        fontSize: 22,
        border: 'none',
        resize: 'none',
        outline: 'none',
        fontFamily: 'Segoe UI',
        '& :placeholder': {
          color: grey[500],
        },
      },
      '& textarea:first-child': {
        width: '100%!important',
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
    borderunderAddTweetForm: {
      margin: 0,
      backgroundColor: '#ECECEF',
      border: 'none',
      height: 13,
    },
    loadingTweetsCenter: {
      marginTop: 150,
      textAlign: 'center',
    },
  }),
);

type PropsType = {};
export const Home: React.FC<PropsType> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tweets = useSelector(selectTweets);
  const isLoading = useSelector(selectIsTweetsIsLoading);

  useEffect(() => {
    dispatch(actions.setFetchTweetsAC());
  }, []);
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
            <div style={{ padding: '20px 15px 15px' }}>
              <WriteTweetForm classes={classes} />
            </div>
            <hr className={classes.borderunderAddTweetForm} />
            {!isLoading ? (
              tweets.map((tweet) => (
                <Tweet key={tweet._id} text={tweet.text} classes={classes} user={tweet.user} />
              ))
            ) : (
              <div className={classes.loadingTweetsCenter}>
                <CircularProgress />
              </div>
            )}
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

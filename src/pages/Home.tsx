import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { grey } from '@material-ui/core/colors';
import { Container, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Tweet } from '../components/Home/Tweet';
import { SideBar } from '../components/Home/SideBar';
import { WriteTweetForm } from '../components/Home/WriteTweetForm';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../redux/reducers/tweetsReducer';
import { selectIsTweetsIsLoading, selectTweets } from '../redux/selectors/tweets-selector';
import { RightSideBar } from '../components/RightSideBar/RightSideBar';
import { Route } from 'react-router';
import { BackBtn } from '../components/commons/BackBtn';
import { FullTweet } from '../components/FullTweet/FullTweet';
import { Profile } from './Profile';

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

      top: 0,
    },
    sideBarWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      position: 'fixed',
    },
    navBarListItem: {
      color: 'black',
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
      marginTop: 4,
      display: 'flex',
      alignItems: 'flex-start',
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
      display: 'flex',
      alignItems: 'center',

      '& h6': {
        fontWeight: 800,
      },
    },

    tweetWrapper: {
      color: 'inherit',
      textDecoration: 'none',
    },
    tweet: {
      position: 'relative',
      borderRadius: 0,
      borderTop: 0,
      borderLeft: 0,
      borderRight: 0,
      padding: '20px 15px 10px 15px',
      display: 'flex',
      '&:hover': {
        backgroundColor: 'rgb(245, 248, 250)',
      },
      '& h6': {
        fontWeight: 800,
      },
      cursor: 'pointer',
    },
    tweetHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    tweetContent: {
      flex: 1,
    },
    tweetPopupMenu: {
      position: 'absolute',
      right: 10,
      top: 10,
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
      top: 0,
      paddingTop: '15px',
    },
    relevantTheme: {
      marginTop: '20px',
      borderRadius: 10,
      backgroundColor: '#F6F7FA',
      '& a': {
        color: 'inherit',
        textDecoration: 'none',
      },
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
    fullTweetWrapper: {
      padding: 20,
    },
    fullTweetHeader: {
      display: 'flex',
    },
    fullTweetHeaderName: {
      display: 'flex',
      flexDirection: 'column',
    },
    fullTweetText: {
      fontSize: 24,
      marginTop: 20,
      lineHeight: 1.4125,
      wordBreak: 'break-word',
    },
    fullTweetStat: {
      borderRadius: 0,
      borderBottom: 0,
      borderLeft: 0,
      borderRight: 0,
      padding: '16px 20px',
    },
    fullTweetStatCount: {
      marginRight: 15,
    },
    fullTweetGroupBtn: {
      padding: '0px 20px',

      borderRadius: 0,
      borderLeft: 0,
      borderRight: 0,
      '& div': {
        marginTop: 3,
        marginBottom: 3,
        justifyContent: 'space-around',
      },
    },
    userInfo: {
      padding: '5px 5px 10px 5px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: 50,
      cursor: 'pointer',
      borderRadius: 40,
      '&:hover': {
        backgroundColor: 'rgba(29, 161, 242, 0.1)',
      },
    },
    listImg: {
      display: 'flex',
      flexWrap: 'wrap',
      marginRight: '20px',
      marginTop: '10px',
    },
    listImgItem: {
      marginBottom: 5,
      width: 60,
      height: 60,
      marginLeft: 10,
      borderRadius: 10,
    },
    removeImg: {
      position: 'relative',
      top: '-7px',
      left: 46,
      padding: 2,
      backgroundColor: '#ff4b4b!important',
      '& svg path': {
        fill: '#fff',
      },
    },
    userInfoDropDown: {
      boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.1) ',
      border: '1px solid rgba(0,0,0, 0.1)',
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
  }, [dispatch]);
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
              <Route path={`/home`} exact>
                <Typography variant="h6">Твиты</Typography>
              </Route>

              <Route path={['/home/tweet', '/home/search']}>
                <BackBtn />
                <Typography variant="h6">Твитнуть</Typography>
              </Route>
            </Paper>

            <Route path={['/home', '/home/search']} exact>
              <div style={{ padding: '20px 15px 15px' }}>
                <WriteTweetForm classes={classes} />
              </div>
              <hr className={classes.borderunderAddTweetForm} />
            </Route>

            <Route path="/home" exact>
              {!isLoading ? (
                tweets.map((tweet) => (
                  <Tweet
                    key={tweet._id}
                    _id={tweet._id}
                    text={tweet.text}
                    images={tweet.images}
                    user={tweet.user}
                    createdAt={tweet.createdAt}
                  />
                ))
              ) : (
                <div className={classes.loadingTweetsCenter}>
                  <CircularProgress />
                </div>
              )}
            </Route>

            <Route exact path={`/home/tweet/:id`} component={FullTweet}></Route>

            <Route path="/profile/:name" component={Profile} />
          </Paper>
        </Grid>
        {/* right side bar */}
        <Grid item xs={4} lg={3}>
          <RightSideBar classes={classes} />
        </Grid>
      </Grid>
    </Container>
  );
};

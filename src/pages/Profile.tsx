import { Avatar, Paper, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { grey } from '@material-ui/core/colors';
import { Tweet } from '../components/Home/Tweet';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsTweetsIsLoading, selectTweets } from '../redux/selectors/tweets-selector';
import { actions } from '../redux/reducers/tweetsReducer';
import CircularProgress from '@material-ui/core/CircularProgress';
import { selectUserData } from '../redux/selectors/auth-selector';

type PropsType = {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    user: {
      // position: 'relative',
      // top: -100,
      marginTop: '-100px',
      padding: 15,
    },
    header: {
      height: 200,
      backgroundColor: '#c4cfd6',
    },
    avatar: {
      width: 140,
      height: 140,
      border: '4px solid white',
    },
    fullname: {
      fontWeight: 900,
    },
    username: {
      color: grey[500],
    },
    info: {},
    list: {
      marginTop: 10,
      display: 'flex',
      flexWrap: 'wrap',
      margin: 0,
      padding: 0,
      listStyle: 'none',
      color: grey[600],

      '& li': {
        marginRight: 25,
        // fontSize: 14,
      },
    },
    status: {
      marginTop: 5,
    },
    tabs: {
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    },
    tabSize: {
      minWidth: 151.5,
      textTransform: 'none',
      padding: '15px 12px',
      fontSize: 15,
    },
    myTweet: {
      // marginTop: 15,
    },
    loadingTweetsCenter: {
      marginTop: 150,
      textAlign: 'center',
    },
  }),
);

export const Profile: React.FC<PropsType> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tweets = useSelector(selectTweets);
  const userData = useSelector(selectUserData);
  const isLoading = useSelector(selectIsTweetsIsLoading);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(actions.fetchUserTweetsAC());
  }, []);
  return (
    <>
      <Paper>
        <div className={classes.header}></div>
        <div className={classes.user}>
          <Avatar className={classes.avatar} />
          <Typography className={classes.fullname} variant="h6">
            {userData?.fullname}
          </Typography>
          <Typography className={classes.username} variant="subtitle1">
            @{userData?.username}
          </Typography>
          <Typography className={classes.info} variant="h4"></Typography>
          <div className={classes.status}>
            React / UI designer / Javasscript Красное сердце Redux @ React Native, NODE JS
          </div>
          <ul className={classes.list}>
            <li>Russia, Pribalt</li>
            <li>
              <a className="link" href="">
                tweet.com
              </a>
            </li>
            <li>Дата рождения: 21 октрябя 2012</li>
            <li>Регистрация: ноября 2061 г.</li>
          </ul>
        </div>
        <Tabs
          classes={{
            root: classes.tabs,
          }}
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered>
          <Tab
            classes={{
              root: classes.tabSize,
            }}
            label="Твиты"
          />
          <Tab
            classes={{
              root: classes.tabSize,
            }}
            label="Твиты и ответы"
          />
          <Tab
            classes={{
              root: classes.tabSize,
            }}
            label="Медиа"
          />
          <Tab
            classes={{
              root: classes.tabSize,
            }}
            label="Нравится"
          />
        </Tabs>
        <div className={classes.myTweet}>
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
        </div>
      </Paper>
    </>
  );
};

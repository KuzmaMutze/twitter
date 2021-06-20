import Avatar from '@material-ui/core/Avatar/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import IconButton from '@material-ui/core/IconButton/IconButton';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectIsLoadedTweet, selectTweet } from '../../redux/selectors/tweets-selector';
import format from 'date-fns/format';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepostIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import ruLang from 'date-fns/locale/ru';

import { actions } from '../../redux/reducers/tweetReducer';
import { useStyles } from '../../pages/Home';

type PropsType = {};
export const FullTweet: React.FC<PropsType> = (props) => {
  let classes = useStyles();
  let params: { id?: string } = useParams();
  let tweet = useSelector(selectTweet);
  let isLoading = useSelector(selectIsLoadedTweet);
  let id = params.id;

  let dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(actions.setFetchTweetAC(id));
    }
    return () => {
      dispatch(actions.setTweetAC(null));
    };
  }, [dispatch, id]);

  if (!tweet || null) {
    return (
      <div className={classes.loadingTweetsCenter}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      {isLoading ? (
        <>
          <Paper className={classes.fullTweetWrapper}>
            <div className={classes.fullTweetHeader}>
              <Avatar
                className={classes.tweetAvatar}
                alt={`Аватарка пользователя ${tweet.user.username}`}
                src={tweet.user.avatarUrl}
              />
              <Typography className={classes.fullTweetHeaderName}>
                <b>{tweet.user.fullname}</b>
                <span className={classes.tweetsUserName}>@{tweet.user.username}</span>
              </Typography>
            </div>
            <Typography className={classes.fullTweetText}>{tweet.text}</Typography>
            {tweet.images.map((img) => (
              <img style={{ width: '100%', height: '100%', margin: '15px 0 5px' }} src={img}></img>
            ))}
            <Typography
              style={{ fontSize: 15, paddingTop: '15px' }}
              className={classes.tweetsUserName}>
              {format(new Date(tweet.createdAt), 'H:mm', { locale: ruLang })} ·{' '}
              {format(new Date(tweet.createdAt), 'dd MMM yyyy г.', { locale: ruLang })} · Twitter
              Web App
            </Typography>
          </Paper>
          <Paper className={classes.fullTweetStat} variant="outlined">
            <span className={classes.fullTweetStatCount}>
              <b>132</b> ретвита
            </span>
            <span className={classes.fullTweetStatCount}>
              <b>6</b> твитов с цитатами
            </span>
            <span className={classes.fullTweetStatCount}>
              <b>1 159</b> отметок «Нравится»
            </span>
          </Paper>
          <Paper className={classes.fullTweetGroupBtn} variant="outlined">
            <div className={classes.tweetsGroupBtn}>
              <div>
                <IconButton>
                  <ChatBubbleOutlineIcon style={{ fontSize: '20px' }} />
                </IconButton>
                <span>1</span>
              </div>
              <div>
                <IconButton>
                  <RepostIcon style={{ fontSize: '20px' }} />
                </IconButton>
              </div>
              <div>
                <IconButton>
                  <FavoriteBorderIcon style={{ fontSize: '20px' }} />
                </IconButton>
              </div>
              <div>
                <IconButton>
                  <ReplyOutlinedIcon style={{ fontSize: '20px' }} />
                </IconButton>
              </div>
            </div>
          </Paper>
        </>
      ) : (
        <div className={classes.loadingTweetsCenter}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

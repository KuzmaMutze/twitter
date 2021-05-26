import { Paper, Grid, Avatar, Typography, IconButton } from '@material-ui/core';
import classNames from 'classnames';
import React from 'react';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepostIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import { useStyles } from '../../pages/Home';

type PropsType = {
  text: string;
  classes: ReturnType<typeof useStyles>;
  user: {
    fullname: string;
    username: string;
    avatarUrl: string;
  };
};
export const Tweet: React.FC<PropsType> = ({ classes, user, text }) => {
  return (
    <div>
      <Paper className={classes.tweet} variant="outlined">
        <Avatar
          className={classes.tweetAvatar}
          alt={`Аватарка пользователя ${user.username}`}
          src={user.avatarUrl}
        />
        <div className={classes.msgNameBtnWrapper}>
          <div>
            <Typography>
              <b>{user.fullname}</b>{' '}
              <span className={classes.tweetsUserName}>@{user.username}</span>
              <span className={classes.tweetsUserName}>{' · '}1 ч</span>
            </Typography>
            <Typography>{text}</Typography>
          </div>
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
        </div>
      </Paper>
    </div>
  );
};

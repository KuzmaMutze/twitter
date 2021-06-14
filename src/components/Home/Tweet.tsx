import { Paper, Avatar, Typography, IconButton, MenuItem, Menu } from '@material-ui/core';
import React from 'react';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepostIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ReplyOutlinedIcon from '@material-ui/icons/ReplyOutlined';
import { useStyles } from '../../pages/Home';
import { useHistory } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import MoreVertIcon from '@material-ui/icons/MoreVert';

type PropsType = {
  _id: string;
  text: string;
  classes: ReturnType<typeof useStyles>;
  user: {
    fullname: string;
    username: string;
    avatarUrl: string;
  };
  createdAt: string;
};

export const Tweet: React.FC<PropsType> = ({ classes, user, text, _id, createdAt }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleClickTweet = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    history.push(`/home/tweet/${_id}`);
  };
  // TODO: CREATE MENU, FIX HEIGHT, FIX PREVENTDEFAULT
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <a onClick={handleClickTweet} className={classes.tweetWrapper}>
      <Paper className={classes.tweet} variant="outlined">
        <Avatar
          className={classes.tweetAvatar}
          alt={`Аватарка пользователя ${user.username}`}
          src={user.avatarUrl}
        />
        <div className={classes.msgNameBtnWrapper}>
          <div className={classes.tweetContent}>
            <Typography className={classes.tweetHeader}>
              <div>
                <b>{user.fullname}</b>{' '}
                <span className={classes.tweetsUserName}>@{user.username}</span>
                <span className={classes.tweetsUserName}>
                  {' · '}
                  {formatDate(new Date(createdAt))}
                </span>
              </div>
              <div className={classes.tweetPopupMenu}>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}>
                  <MenuItem onClick={handleClose}>Удалить твит</MenuItem>
                  <MenuItem onClick={handleClose}>Редактировать</MenuItem>
                </Menu>
              </div>
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
    </a>
  );
};

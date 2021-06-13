import { Avatar, Button, Hidden, IconButton, Typography } from '@material-ui/core';
import { Twitter } from '@material-ui/icons';
import React, { useState } from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from '../../pages/Home';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import CreateIcon from '@material-ui/icons/Create';
import Modal from '../SignIn/Modal';
import { WriteTweetForm } from './WriteTweetForm';
import { Link } from 'react-router-dom';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

type PropsType = {
  classes: ReturnType<typeof useStyles>;
};
export const SideBar: React.FC<PropsType> = ({ classes }) => {
  const [visibleAddTweet, setVisibleAddTweet] = useState<boolean>(false);
  const onCloseAddTweet = () => {
    setVisibleAddTweet(!visibleAddTweet);
  };
  // const onCloseAddTweet = () => {
  //   setVisibleAddTweet(!visibleAddTweet);
  // };
  return (
    <>
      <ul className={classes.navBar}>
        <li>
          <Link to="/home">
            <IconButton className={classes.logo}>
              <Twitter className={classes.logoIcon} color="primary"></Twitter>
            </IconButton>
          </Link>
        </li>
        <li className={classes.navBarListItem}>
          <div>
            <SearchIcon className={classes.navBarIconItem}></SearchIcon>

            <Hidden mdDown>
              <Typography className={classes.navBarTitleItem} variant="h6">
                Поиск
              </Typography>
            </Hidden>
          </div>
        </li>
        <li className={classes.navBarListItem}>
          <div>
            <NotificationsNoneIcon className={classes.navBarIconItem}></NotificationsNoneIcon>

            <Hidden mdDown>
              <Typography className={classes.navBarTitleItem} variant="h6">
                Уведомления
              </Typography>
            </Hidden>
          </div>
        </li>
        <li className={classes.navBarListItem}>
          <div>
            <MailOutlineIcon className={classes.navBarIconItem}></MailOutlineIcon>

            <Hidden mdDown>
              <Typography className={classes.navBarTitleItem} variant="h6">
                Сообщения
              </Typography>
            </Hidden>
          </div>
        </li>
        <li className={classes.navBarListItem}>
          <div>
            <BookmarkBorderIcon className={classes.navBarIconItem}></BookmarkBorderIcon>

            <Hidden mdDown>
              <Typography className={classes.navBarTitleItem} variant="h6">
                Закладки
              </Typography>
            </Hidden>
          </div>
        </li>
        <li className={classes.navBarListItem}>
          <div>
            <ListAltIcon className={classes.navBarIconItem}></ListAltIcon>

            <Hidden mdDown>
              <Typography className={classes.navBarTitleItem} variant="h6">
                Список
              </Typography>
            </Hidden>
          </div>
        </li>
        <li className={classes.navBarListItem}>
          <div>
            <PermIdentityIcon className={classes.navBarIconItem}></PermIdentityIcon>

            <Hidden mdDown>
              <Typography className={classes.navBarTitleItem} variant="h6">
                Профиль
              </Typography>
            </Hidden>
          </div>
        </li>
        <li className={classes.navBarListItem}>
          <Button
            onClick={onCloseAddTweet}
            className={classes.sideBarTweetBtn}
            color="primary"
            variant="contained"
            fullWidth>
            <Hidden mdDown>Твитнуть</Hidden>
            <Hidden lgUp>
              <CreateIcon />
            </Hidden>
          </Button>
          <div>
            <Modal onClose={onCloseAddTweet} visible={visibleAddTweet} title="">
              <WriteTweetForm maxRows={15} classes={classes} />
            </Modal>
          </div>
        </li>
      </ul>
      <div className={classes.userInfo}>
        <Avatar
          // className={classes.tweetAvatar}
          alt="Ваш аватар"
          src={`https://sun9-48.userapi.com/impg/3LXTx8zqXFNlg5Fz02tVhP1ykCYDPfF9ITj6sw/L2YxVSVONJY.jpg?size=1280x960&quality=96&sign=7634b299dd308712ff600a4bf2ad7271&type=album`}
        />
        <div>
          <Typography variant="h6">Kuzma Mudze</Typography>
          <div>@kzmmdz</div>
        </div>
        <IconButton>
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
    </>
  );
};

import { Avatar, Button, Hidden, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
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
import { Link, NavLink, useHistory } from 'react-router-dom';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../../redux/selectors/auth-selector';
import { actions } from '../../redux/reducers/authReducer';

type PropsType = {
  classes: ReturnType<typeof useStyles>;
};
export const SideBar: React.FC<PropsType> = ({ classes }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUserData);
  const history = useHistory();

  const [visibleAddTweet, setVisibleAddTweet] = useState<boolean>(false);
  const onCloseAddTweet = () => {
    setVisibleAddTweet(!visibleAddTweet);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSignOut = () => {
    handleClose();
    dispatch(actions.signOutAC());
  };

  const handleClickProfile = () => {
    handleClose();
    history.push(`/profile/${userData?._id}`);
  };

  return (
    <div className={classes.sideBarWrapper}>
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
        <NavLink to={`/profile/${userData?._id}`} className={classes.navBarListItem}>
          <div>
            <PermIdentityIcon className={classes.navBarIconItem}></PermIdentityIcon>

            <Hidden mdDown>
              <Typography className={classes.navBarTitleItem} variant="h6">
                Профиль
              </Typography>
            </Hidden>
          </div>
        </NavLink>
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
      <Hidden mdDown>
        <div className={classes.userInfo}>
          <Avatar
            // className={classes.tweetAvatar}
            alt="Ваш аватар"
            // src={userData?.img || "!23"}
          />
          {/* <Hidden mdDown> */}
          <div>
            <Typography variant="h6">{userData?.fullname}</Typography>
            <div>{userData?.username}</div>
          </div>

          <div>
            <IconButton onClick={handleClick}>
              <KeyboardArrowDownIcon />
            </IconButton>
            <Menu
              classes={{
                paper: classes.userInfoDropDown,
              }}
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}>
              <MenuItem onClick={handleClickProfile}>Мой профиль</MenuItem>
              <MenuItem onClick={handleClickSignOut}>Выйти</MenuItem>
            </Menu>
          </div>
          {/* </Hidden> */}
        </div>
      </Hidden>
    </div>
  );
};

import { Button, IconButton, Typography } from '@material-ui/core';
import { Twitter } from '@material-ui/icons';
import React from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from '../../pages/Home';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

type PropsType = {
  classes: ReturnType<typeof useStyles>;
};
export const SideBar: React.FC<PropsType> = ({ classes }) => {
  return (
    <ul className={classes.navBar}>
      <li>
        <IconButton className={classes.logo}>
          <Twitter className={classes.logoIcon} color="primary"></Twitter>
        </IconButton>
      </li>
      <li className={classes.navBarListItem}>
        <div>
          <SearchIcon className={classes.navBarIconItem}></SearchIcon>

          <Typography className={classes.navBarTitleItem} variant="h6">
            Поиск
          </Typography>
        </div>
      </li>
      <li className={classes.navBarListItem}>
        <div>
          <NotificationsNoneIcon className={classes.navBarIconItem}></NotificationsNoneIcon>

          <Typography className={classes.navBarTitleItem} variant="h6">
            Уведомления
          </Typography>
        </div>
      </li>
      <li className={classes.navBarListItem}>
        <div>
          <MailOutlineIcon className={classes.navBarIconItem}></MailOutlineIcon>

          <Typography className={classes.navBarTitleItem} variant="h6">
            Сообщения
          </Typography>
        </div>
      </li>
      <li className={classes.navBarListItem}>
        <div>
          <BookmarkBorderIcon className={classes.navBarIconItem}></BookmarkBorderIcon>

          <Typography className={classes.navBarTitleItem} variant="h6">
            Закладки
          </Typography>
        </div>
      </li>
      <li className={classes.navBarListItem}>
        <div>
          <ListAltIcon className={classes.navBarIconItem}></ListAltIcon>

          <Typography className={classes.navBarTitleItem} variant="h6">
            Список
          </Typography>
        </div>
      </li>
      <li className={classes.navBarListItem}>
        <div>
          <PermIdentityIcon className={classes.navBarIconItem}></PermIdentityIcon>

          <Typography className={classes.navBarTitleItem} variant="h6">
            Профиль
          </Typography>
        </div>
      </li>
      <li className={classes.navBarListItem}>
        <Button className={classes.sideBarTweetBtn} color="primary" variant="contained" fullWidth>
          Твитнуть
        </Button>
      </li>
    </ul>
  );
};

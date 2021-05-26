import { Button, Hidden, IconButton, Typography } from '@material-ui/core';
import { Twitter } from '@material-ui/icons';
import React from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from '../../pages/Home';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import CreateIcon from '@material-ui/icons/Create';

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
        <Button className={classes.sideBarTweetBtn} color="primary" variant="contained" fullWidth>
          <Hidden mdDown>Твитнуть</Hidden>
          <Hidden lgUp>
            <CreateIcon />
          </Hidden>
        </Button>
      </li>
    </ul>
  );
};

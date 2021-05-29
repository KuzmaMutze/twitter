import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useStyles } from '../../pages/Home';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/reducers/tagsReducer';
import { selectLoaded, selectTags } from '../../redux/selectors/tags-selector';
import { Tag } from './Tag';
import { Link } from 'react-router-dom';

type PropsType = {
  classes: ReturnType<typeof useStyles>;
};

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

export const RightSideBar: React.FC<PropsType> = ({ classes }) => {
  let dispatch = useDispatch();
  let tags = useSelector(selectTags);
  // let users = useSelector();
  let isLoadedTags = useSelector(selectLoaded);

  useEffect(() => {
    dispatch(actions.setFetchTagsAC());
  }, [dispatch]);

  return (
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
      {isLoadedTags ? (
        <List className={classes.relevantTheme}>
          <ListItem>
            <Typography className={classes.title} variant="h6">
              Актуальные темы
            </Typography>
          </ListItem>

          <Divider component="li" />
          {tags.map((tag) => (
            <Link key={tag._id} to={`/home/search?q=${tag.name}`}>
              <Tag classes={classes} tag={tag} />
            </Link>
          ))}
        </List>
      ) : (
        <div></div>
      )}

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
  );
};

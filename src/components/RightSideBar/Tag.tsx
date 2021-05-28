import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';
import { useStyles } from '../../pages/Home';
import { tags } from '../../types';

type PropsType = {
  classes: ReturnType<typeof useStyles>;
  tag: tags;
};
export const Tag: React.FC<PropsType> = ({ classes, tag }) => {
  return (
    <>
      <ListItem className={classes.relevantThemeItem}>
        <ListItemText
          primary={tag.name}
          secondary={
            <Typography variant="body2" component="span">
              Твитов: {tag.count}
            </Typography>
          }
        />
      </ListItem>

      <Divider component="li" />
    </>
  );
};

import { Paper, Avatar, TextareaAutosize, IconButton, Typography, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import CropOriginalOutlinedIcon from '@material-ui/icons/CropOriginalOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import { useStyles } from '../../pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/reducers/tweetsReducer';
import { selectIsLoadedAddForm } from '../../redux/selectors/tweets-selector';
import { LoadingState } from '../../types';

type PropsType = {
  classes: ReturnType<typeof useStyles>;
  maxRows?: number;
};

export const WriteTweetForm: React.FC<PropsType> = ({ maxRows, classes }) => {
  let dispatch = useDispatch();

  // text area
  let [text, setText] = useState<string>('');
  let textLimitPercent = Math.round((text.length / 280) * 100);
  let maxLenght = 280 - text.length;
  let onChangeTextArea = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
  };
  let handleOnClickAddTweet = () => {
    dispatch(actions.fetchAddTweetAC(text));
    setText('');
  };

  // result add tweet
  let isLoadedAddForm = useSelector(selectIsLoadedAddForm);

  return (
    <div>
      <Paper className={classes.writeTweet} variant="outlined">
        <Avatar
          className={classes.tweetAvatar}
          alt="Ваш аватар"
          src={`https://sun9-48.userapi.com/impg/3LXTx8zqXFNlg5Fz02tVhP1ykCYDPfF9ITj6sw/L2YxVSVONJY.jpg?size=1280x960&quality=96&sign=7634b299dd308712ff600a4bf2ad7271&type=album`}
        />
        <div className={classes.textAreaWrapper}>
          <TextareaAutosize
            onChange={onChangeTextArea}
            value={text}
            rows={1.5}
            rowsMax={maxRows}
            // cols={45}
            placeholder="Что происходит?"
            className={classes.writeTweetTextArea}
          />
          <div className={classes.textAreaFooter}>
            <div className={classes.writeTweetIcons}>
              <IconButton>
                <CropOriginalOutlinedIcon color="primary" />
              </IconButton>
              <IconButton>
                <SentimentSatisfiedOutlinedIcon color="primary" />
              </IconButton>
            </div>
            <div className={classes.writeTweetBtn}>
              {text && (
                <>
                  <Typography>{maxLenght}</Typography>
                  <div className={classes.circularProgress}>
                    <CircularProgress
                      variant="static"
                      size={20}
                      value={textLimitPercent > 100 ? 100 : textLimitPercent}
                      style={textLimitPercent > 100 ? { color: 'red' } : undefined}
                    />
                    <CircularProgress
                      variant="static"
                      size={20}
                      thickness={4}
                      value={100}
                      style={{ color: 'rgba(0,0,0,0.1)' }}
                    />
                  </div>
                </>
              )}
              <Button
                onClick={() => handleOnClickAddTweet()}
                disabled={isLoadedAddForm === LoadingState.LOADING || !text || text.length > 280}
                color="primary"
                variant="contained">
                {isLoadedAddForm === LoadingState.LOADING ? (
                  <CircularProgress color="secondary" size={18} />
                ) : (
                  'Твитнуть'
                )}
              </Button>
            </div>
          </div>
        </div>
      </Paper>
      {isLoadedAddForm === LoadingState.ERROR && (
        <Alert style={{ marginTop: 10 }} severity="error">
          Ошибка при добавление твита{' '}
          <span aria-label="emoji-plak" role="img">
            🙁
          </span>
        </Alert>
      )}
    </div>
  );
};

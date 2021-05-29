import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useStyles } from '../../pages/Home';
import { actions } from '../../redux/reducers/tweetReducer';
import { selectIsLoadedTweet, selectTweet } from '../../redux/selectors/tweets-selector';
import { Tweet } from '../Home/Tweet';

type PropsType = {};
export const FullTweet: React.FC<PropsType> = (props) => {
  let classes = useStyles();
  let params: { id?: string } = useParams();
  let tweet = useSelector(selectTweet);
  let isLoading = useSelector(selectIsLoadedTweet);
  let id = params.id;
  console.log(isLoading);

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
        <Tweet {...tweet} classes={classes} />
      ) : (
        <div className={classes.loadingTweetsCenter}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

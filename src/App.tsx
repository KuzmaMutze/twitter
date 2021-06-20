import { Switch } from 'react-router';
import React, { useEffect } from 'react';
import { Route } from 'react-router';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './redux/reducers/authReducer';
import { useHistory } from 'react-router-dom';
import { selectIsAuth, selectLoadedUserAuth } from './redux/selectors/auth-selector';
import { LoadingState } from './types';
import { Twitter } from '@material-ui/icons';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuth = useSelector(selectIsAuth);
  const isLoaded = useSelector(selectLoadedUserAuth);
  const isReady = isLoaded !== LoadingState.NEVER && isLoaded !== LoadingState.LOADING;

  useEffect(() => {
    dispatch(actions.fetchUserMeAC());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth && isReady) {
      history.push('/signin');
    } else if (history.location.pathname === '/') {
      history.push('/home');
    }
  }, [isAuth, isReady]);

  if (!isReady) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}>
        <Twitter style={{ width: 80, height: 80 }} color="primary"></Twitter>
      </div>
    );
  }

  return (
    <div className="App">
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;

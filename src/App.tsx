import { Switch } from 'react-router';
import React, { useEffect } from 'react';
import { Route } from 'react-router';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import { authAPI } from './api/api';
import { actions } from './redux/reducers/authReducer';
import { useHistory } from 'react-router-dom';
import { selectIsAuth } from './redux/selectors/auth-selector';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuth = useSelector(selectIsAuth);

  const checkAuth = async () => {
    try {
      const { data } = await authAPI.me();
      dispatch(actions.setUserAC(data));
    } catch (error) {
      history.push('/signin');
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuth) {
      history.push('/home');
    }
  }, [isAuth]);
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

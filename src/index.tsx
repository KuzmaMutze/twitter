import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

//TODO
// 1. Попробовать сделать пункт "Главная" в меню
// 2. Сделать редюсер для "Кого читать"
// 3. Сделать получение информации о пользователе (простой объект. имитация auth)
// 4. Попытаться сделать поиск и просмотр актуальных тем из БД
// 5. Сделать linkify для твита и <br/> при переходе на наовую строчку
// 6. confermed_hash fix backend register
// 7. поправить редирект после авторизации
// 8. Фикс лоадеры на кнопке signin signup
// 9. fix signout
// 10. in profile create backBtn and count tweets from user, icons for info user
ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </Router>,
  document.getElementById('root'),
);

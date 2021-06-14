import {applyMiddleware, combineReducers, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga';
import { authReducer } from './reducers/authReducer';
import { tagsReducer } from './reducers/tagsReducer';
import { tweetReducer } from './reducers/tweetReducer';
import  { tweetsReducer } from './reducers/tweetsReducer';
import rootSaga from './sagas';

let rootReducers = combineReducers({
    tweets: tweetsReducer,
    tweet: tweetReducer,
    tags: tagsReducer,
    auth: authReducer
});

type RootReducerType = typeof rootReducers; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

// types
type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
// @ts-ignore
window.__store__ = store;


sagaMiddleware.run(rootSaga)
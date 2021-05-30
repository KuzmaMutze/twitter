import { Tweet } from './../../components/Home/Tweet';
import produce, { Draft } from 'immer'
import { LoadingState, Tweets } from '../../types'
import { InferActionTypes } from '../store'
import {call, put, takeLatest } from 'redux-saga/effects'
import { tweetsAPI } from '../../api/api'


const initialState = {
    item: null as Tweets | null,
    isLoaded: "" as LoadingState
}

type initialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>

export const tweetReducer = produce((draft: Draft<initialStateType>, action: ActionsType) => {
    
    if(action.type === "tweet/SET_TWEET"){
        draft.item = action.payload
    } else if(action.type === "tweet/SET_LOADING_STATE"){
        draft.isLoaded = action.payload
    } else if(action.type === "tweet/FETCH_TWEET"){
        draft.isLoaded = LoadingState.LOADING
        draft.item = null
    }

}, initialState)

export const actions = {
    setTweetAC: (payload: Tweets | null) => ({type: "tweet/SET_TWEET", payload} as const),
    setFetchTweetAC: (payload: string) => ({type: "tweet/FETCH_TWEET", payload} as const),
    setTweetLoadingStateAC: (payload: LoadingState) => ({type: "tweet/SET_LOADING_STATE", payload} as const),
   

} 

 
export function* fetchTweetRequest({payload: tweetId}: ReturnType<typeof actions.setFetchTweetAC>) {

    try {
        yield put(actions.setTweetLoadingStateAC(LoadingState.LOADING))
        const data: Array<Tweets> = yield call(tweetsAPI.fetchTweet, tweetId)
        yield put(actions.setTweetAC(data[0]))
        yield put(actions.setTweetLoadingStateAC(LoadingState.LOADED))
    } catch (error) {
        yield put(actions.setTweetLoadingStateAC(LoadingState.ERROR))
    }
 
}



export function* tweetSaga() {
    yield takeLatest("tweet/FETCH_TWEET", fetchTweetRequest)
    
}

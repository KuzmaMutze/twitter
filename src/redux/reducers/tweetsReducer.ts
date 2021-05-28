import produce, { Draft } from 'immer'
import { LoadingState, Tweets } from '../../types'
import { InferActionTypes } from '../store'
import {call, put, takeLatest } from 'redux-saga/effects'
import { tweetsAPI } from '../../api/api'


const initialState = {
    items: [] as Array<Tweets>,
    isLoaded: "" as LoadingState
}

type initialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>

export const tweetsReducer = produce((draft: Draft<initialStateType>, action: ActionsType) => {
    
    if(action.type === "tweets/SET_TWEETS"){
        draft.items = action.payload
    } else if(action.type === "tweets/SET_LOADING_STATE"){
        draft.isLoaded = action.payload
    } else if(action.type === "tweets/FETCH_TWEETS"){
        draft.items = []
    }

}, initialState)

export const actions = {
    setTweetsAC: (payload: Array<Tweets>) => ({type: "tweets/SET_TWEETS", payload} as const),
    setFetchTweetsAC: () => ({type: "tweets/FETCH_TWEETS"} as const),
    setTweetsLoadingStateAC: (payload: LoadingState) => ({type: "tweets/SET_LOADING_STATE", payload} as const)

} 

 
export function* fetchTweetsRequest() {
    console.log("run request");
    try {
        yield put(actions.setTweetsLoadingStateAC(LoadingState.LOADING))
        const data: Array<Tweets> = yield call(tweetsAPI.fetchTweets)
        yield put(actions.setTweetsAC(data))
        console.log(data);
        yield put(actions.setTweetsLoadingStateAC(LoadingState.LOADED))
    } catch (error) {
        yield put(actions.setTweetsLoadingStateAC(LoadingState.ERROR))
    }
    
    
    
}
export function* tweetsSaga() {
    console.log("checkAC");
    
    yield takeLatest("tweets/FETCH_TWEETS", fetchTweetsRequest)
}

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
    } else if(action.type === "tweets/ADD_TWEET"){
        draft.items.push(action.payload)
    }

}, initialState)

export const actions = {
    setTweetsAC: (payload: Array<Tweets>) => ({type: "tweets/SET_TWEETS", payload} as const),
    setFetchTweetsAC: () => ({type: "tweets/FETCH_TWEETS"} as const),
    setTweetsLoadingStateAC: (payload: LoadingState) => ({type: "tweets/SET_LOADING_STATE", payload} as const),
    fetchAddTweetAC: (payload: string) => ({type: "tweets/FETCH_ADD_TWEET", payload} as const),
    addTweetAC: (payload: Tweets) => ({type: "tweets/ADD_TWEET", payload} as const)
} 

 
export function* fetchTweetsRequest() {
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

export function* fetchAddTweet({payload}: ReturnType<typeof actions.fetchAddTweetAC>) {
    try {
        const data = {
            _id: Math.random().toString(36).substr(2),
            text: payload,
            user: {
                fullname: "Dickerson Mcleod",
                username: "kirk",
                avatarUrl: "https://source.unsplash.com/random/100x100?3"
              }
        }
        console.log(data);
        
        // yield put(actions.setTweetLoadingStateAC(LoadingState.LOADING))
        yield call(tweetsAPI.addTweet, data)
        yield put(actions.addTweetAC(data))
        // yield put(actions.setTweetLoadingStateAC(LoadingState.LOADED))
    } catch (error) {
        // yield put(actions.setTweetLoadingStateAC(LoadingState.ERROR))
    }
 
}

export function* tweetsSaga() {
    yield takeLatest("tweets/FETCH_TWEETS", fetchTweetsRequest)
    yield takeLatest("tweets/FETCH_ADD_TWEET", fetchAddTweet)
}

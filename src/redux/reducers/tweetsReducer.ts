import produce, { Draft } from 'immer'
import {  LoadingState, ResponseType, Tweets } from '../../types'
import { InferActionTypes } from '../store'
import {call, put, takeLatest } from 'redux-saga/effects'
import { tweetsAPI } from '../../api/api'


const initialState = {
    items: [] as Array<Tweets>,
    isLoaded: "" as LoadingState,
    isLoadedAddForm: "" as LoadingState,
}

type initialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>

export const tweetsReducer = produce((draft: Draft<initialStateType>, action: ActionsType) => {
    
    if(action.type === "tweets/SET_TWEETS"){
        draft.items = action.payload
    } else if(action.type === "tweets/SET_LOADING_STATE"){
        draft.isLoaded = action.payload
    } else if(action.type === "tweets/SET_LOADING_ADD_FORM_STATE"){
        draft.isLoadedAddForm = action.payload
    }else if(action.type === "tweets/FETCH_TWEETS"){
        draft.items = []
    } else if(action.type === "tweets/ADD_TWEET"){
        draft.items.unshift(action.payload)
    }

}, initialState)

export const actions = {
    setTweetsAC: (payload: Array<Tweets>) => ({type: "tweets/SET_TWEETS", payload} as const),
    setFetchTweetsAC: () => ({type: "tweets/FETCH_TWEETS"} as const),
    setTweetsLoadingStateAC: (payload: LoadingState) => ({type: "tweets/SET_LOADING_STATE", payload} as const),
    setAddFormLoadingStateAC: (payload: LoadingState) => ({type: "tweets/SET_LOADING_ADD_FORM_STATE", payload} as const),
    fetchAddTweetAC: (payload: string) => ({type: "tweets/FETCH_ADD_TWEET", payload} as const),
    addTweetAC: (payload: any) => ({type: "tweets/ADD_TWEET", payload} as const)
} 

 
export function* fetchTweetsRequest() {
    try {
        yield put(actions.setTweetsLoadingStateAC(LoadingState.LOADING))
        const data: ResponseType<Array<Tweets>> = yield call(tweetsAPI.fetchTweets)
        yield put(actions.setTweetsAC(data.data))
        yield put(actions.setTweetsLoadingStateAC(LoadingState.LOADED))
    } catch (error) {
        yield put(actions.setTweetsLoadingStateAC(LoadingState.ERROR))
    }
}

export function* fetchAddTweet({payload: text}: ReturnType<typeof actions.fetchAddTweetAC>) {
    try {

        
        yield put(actions.setAddFormLoadingStateAC(LoadingState.LOADING))
        let item: ResponseType<Tweets> = yield call(tweetsAPI.addTweet, text)
        yield put(actions.addTweetAC(item.data))
        yield put(actions.setAddFormLoadingStateAC(LoadingState.LOADED))
    } catch (error) {
        yield put(actions.setAddFormLoadingStateAC(LoadingState.ERROR))
    }
 
}

export function* tweetsSaga() {
    yield takeLatest("tweets/FETCH_TWEETS", fetchTweetsRequest)
    yield takeLatest("tweets/FETCH_ADD_TWEET", fetchAddTweet)
}

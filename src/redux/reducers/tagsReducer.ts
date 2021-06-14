import produce, { Draft } from 'immer'
import { LoadingState, TagType } from '../../types'
import { InferActionTypes } from '../store'
import {call, put, takeLatest } from 'redux-saga/effects'
import { tagsAPI } from '../../api/api'


const initialState = {
    tags: [] as Array<TagType>,
    isLoaded: "" as LoadingState,
    users: "" as any,
}

type initialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>

export const tagsReducer = produce((draft: Draft<initialStateType>, action: ActionsType) => {
    
    if(action.type === "tags/SET_TAGS"){
        draft.tags = action.payload
    } else if(action.type === "tags/SET_LOADING_STATE"){
        draft.isLoaded = action.payload
    }

}, initialState)

export const actions = {
    setFetchTagsAC: () => ({type: "tags/FETCH_TAGS"} as const),
    setTagsAC: (payload: Array<TagType>) => ({type: "tags/SET_TAGS", payload} as const),
    setTweetsLoadingStateAC: (payload: LoadingState) => ({type: "tags/SET_LOADING_STATE", payload} as const)

} 

 
export function* fetchTagsRequest() {
    console.log("run tags");
    try {
        yield put(actions.setTweetsLoadingStateAC(LoadingState.LOADING))
        const data: Array<TagType> = yield call(tagsAPI.fetchTags)
        yield put(actions.setTagsAC(data))
        yield put(actions.setTweetsLoadingStateAC(LoadingState.LOADED))
    } catch (error) {
        yield put(actions.setTweetsLoadingStateAC(LoadingState.ERROR))
    }
}
export function* tagsSaga() {
    console.log("tagsAC");
    
    yield takeLatest("tags/FETCH_TAGS", fetchTagsRequest)
}



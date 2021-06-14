import produce, { Draft } from 'immer'
import { LoadingState, ResponseType, UserType} from '../../types'
import { InferActionTypes } from '../store'
import { put, takeLatest } from 'redux-saga/effects'


const initialState = {
    user: {} as any,
    isLoaded: "" as LoadingState,
}

type initialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>

export const authReducer = produce((draft: Draft<initialStateType>, action: ActionsType) => {
    
    if(action.type === "auth/SET_USER"){
        draft.user = action.payload
    } else if(action.type === "auth/SET_LOADING_STATE"){
        draft.isLoaded = action.payload
    }

}, initialState)

export const actions = {
    setFetchUserAC: (payload: ResponseType<UserType>) => ({type: "auth/FETCH_USER", payload} as const),
    setUserAC: (payload: UserType) => ({type: "auth/SET_USER", payload} as const),
    setLoadingStateAC: (payload: LoadingState) => ({type: "auth/SET_LOADING_STATE", payload} as const)

} 
 
export function* fetchAuthUser({payload}: ReturnType<typeof actions.setFetchUserAC>) {
    try {
        yield put(actions.setLoadingStateAC(LoadingState.LOADING))
        window.localStorage.setItem('token', payload.data.token)
        yield put(actions.setUserAC(payload.data))
        yield put(actions.setLoadingStateAC(LoadingState.LOADED))
    } catch (error) {
        yield put(actions.setLoadingStateAC(LoadingState.ERROR))
    }
}

export function* authSaga() {
    yield takeLatest("auth/FETCH_USER", fetchAuthUser)
}



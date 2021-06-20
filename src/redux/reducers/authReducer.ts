import produce, { Draft } from 'immer'
import { LoadingState, ResponseType, UserType} from '../../types'
import { InferActionTypes } from '../store'
import { call, put, takeLatest } from 'redux-saga/effects'
import { authAPI } from '../../api/api'


const initialState = {
    user: null as UserType | null,
    isLoaded: "NEVER" as LoadingState,
}

type initialStateType = typeof initialState
type ActionsType = InferActionTypes<typeof actions>

export const authReducer = produce((draft: Draft<initialStateType>, action: ActionsType) => {
    
    if(action.type === "auth/SET_USER"){
        draft.user = action.payload
    } else if(action.type === "auth/SET_LOADING_STATE"){
        draft.isLoaded = action.payload
    }else if(action.type === "auth/SIGN_OUT"){
        draft.user = null
        draft.isLoaded = LoadingState.LOADED
    }

}, initialState)

export const actions = {
    fetchUserMeAC: () => ({type: "auth/FETCH_USER_ME"} as const),
    setFetchUserAC: (payload: ResponseType<UserType>) => ({type: "auth/FETCH_USER", payload} as const),
    setUserAC: (payload: UserType) => ({type: "auth/SET_USER", payload} as const),
    setLoadingStateAC: (payload: LoadingState) => ({type: "auth/SET_LOADING_STATE", payload} as const),
    signOutAC: () => ({type: "auth/SIGN_OUT"} as const),

} 
 
export function* fetchAuthUser({payload}: ReturnType<typeof actions.setFetchUserAC>) {
    try {
        yield put(actions.setLoadingStateAC(LoadingState.LOADING))
        if(payload.data.token) window.localStorage.setItem('token', payload.data.token)
        yield put(actions.setUserAC(payload.data))
        yield put(actions.setLoadingStateAC(LoadingState.LOADED))
    } catch (error) {
        yield put(actions.setLoadingStateAC(LoadingState.ERROR))
    }
}

export function* fetchUserMe() {
    try {
        yield put(actions.setLoadingStateAC(LoadingState.LOADING))
        const payload: ResponseType<UserType> = yield call(authAPI.me);
        yield put(actions.setUserAC(payload.data))
        yield put(actions.setLoadingStateAC(LoadingState.LOADED))
    } catch (error) {
        yield put(actions.setLoadingStateAC(LoadingState.ERROR))
    }
}


export function* authSaga() {
    yield takeLatest("auth/FETCH_USER_ME", fetchUserMe)
    yield takeLatest("auth/FETCH_USER", fetchAuthUser)
    
}



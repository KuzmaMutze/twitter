import { AppStateType } from "../store";


export const selectLoadedUserAuth = (state: AppStateType) => state.auth.isLoaded
export const selectIsAuth = (state: AppStateType) => !!state.auth.user
export const selectUserData = (state: AppStateType) => state.auth.user




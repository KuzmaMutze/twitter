import { LoadingState } from "../../types";
import { AppStateType } from "../store";


export const selectLoadedUserAuth = (state: AppStateType) => state.auth.isLoaded === LoadingState.LOADING
export const selectIsAuth = (state: AppStateType) => !!state.auth.user




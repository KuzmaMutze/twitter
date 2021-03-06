import { LoadingState } from "../../types";
import { AppStateType } from "../store";

export const selectTags = (state: AppStateType) => state.tags.tags; 
export const selectUsers = (state: AppStateType) => state.tags.users
export const selectLoaded = (state: AppStateType) => state.tags.isLoaded === LoadingState.LOADED




import { LoadingState } from "../../types";
import { AppStateType } from "../store";

export const selectTweets = (state: AppStateType) => state.tweets.items
export const selectIsLoading = (state: AppStateType) => state.tweets.isLoaded
export const selectIsTweetsIsLoading = (state: AppStateType) => selectIsLoading(state) === LoadingState.LOADING
export const selectIsTweetsIsLoaded = (state: AppStateType) => selectIsLoading(state) === LoadingState.LOADED

export const selectTweet = (state: AppStateType) => state.tweet.item
export const selectIsLoadingTweet = (state: AppStateType) => state.tweet.isLoaded
export const selectIsLoadedTweet = (state: AppStateType) => selectIsLoadingTweet(state) === LoadingState.LOADED

export const selectIsLoadedAddForm = (state: AppStateType) => state.tweets.isLoadedAddForm 


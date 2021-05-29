import { all } from "redux-saga/effects";
import { tagsSaga } from "./reducers/tagsReducer";
import { tweetSaga } from "./reducers/tweetReducer";
import { tweetsSaga } from "./reducers/tweetsReducer";

export default function* rootSaga() {
    yield all([tweetsSaga(), tagsSaga(), tweetSaga()])
    console.log("opa");
}

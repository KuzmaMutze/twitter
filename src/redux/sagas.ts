import { all } from "redux-saga/effects";
import { tagsSaga } from "./reducers/tagsReducer";
import { tweetsSaga } from "./reducers/tweetsReducer";

export default function* rootSaga() {
    yield all([tweetsSaga(), tagsSaga()])
    console.log("opa");
}

import { all } from "redux-saga/effects";
import { tweetsSaga } from "./reducers/tweetsReducer";

export default function* rootSaga() {
    yield all([tweetsSaga()])
    console.log("opa");
}

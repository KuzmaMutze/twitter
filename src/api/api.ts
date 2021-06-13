import axios from "axios";
import { ResponseType, TagType, Tweets } from "../types";
import { data } from "./objHealper";

// export type ResponseType<D = {}, RC = ResultCodesEnum> = {
//     data: D
//     messages: Array<string>
//     resultCode: RC
// }


export const instance = axios.create({
    baseURL: `http://localhost:8888/`,
    headers: {
        token: window.localStorage.getItem('token')
    }
})



export const tweetsAPI = {
    fetchTweets() {
        return data(instance.get<ResponseType<Tweets>>(`tweets`))
    },
    fetchTweet(id: string) {
        return data(instance.get<ResponseType<Tweets>>(`tweets/${id}`))
    },
    addTweet(payload: string) {
        return data(instance.post<ResponseType<Tweets>>(`tweets`, {text: payload}))
    }
}

export const tagsAPI = {
    fetchTags() {
        return data(instance.get<ResponseType<TagType>>(`themes`))
    }
}
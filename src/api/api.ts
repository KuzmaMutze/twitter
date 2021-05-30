import axios from "axios";
import { TagType, Tweets } from "../types";
import { data } from "./objHealper";

// export type ResponseType<D = {}, RC = ResultCodesEnum> = {
//     data: D
//     messages: Array<string>
//     resultCode: RC
// }


export const instance = axios.create({
    baseURL: `http://localhost:3001/`,
 
})

export const tweetsAPI = {
    fetchTweets() {
        return data(instance.get<Array<Tweets>>(`tweets?_sort=id&_order=desc`))
    },
    fetchTweet(id: string) {
        return data(instance.get<Tweets>(`tweets?_id=${id}`))
    },
    addTweet(payload: Tweets) {
        return data(instance.post<Tweets>(`tweets`, payload))
    }
}

export const tagsAPI = {
    fetchTags() {
        return data(instance.get<Array<TagType>>(`themes`))
    }
}
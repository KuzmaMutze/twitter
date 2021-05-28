  
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
        return data(instance.get<Array<Tweets>>(`tweets`))
    }
}

export const tagsAPI = {
    fetchTags() {
        return data(instance.get<Array<TagType>>(`themes`))
    }
}
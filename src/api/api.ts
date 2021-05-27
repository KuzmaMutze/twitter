  
import axios from "axios";
import { Tweets } from "../types";
import { data } from "./objHealper";

// export type ResponseType<D = {}, RC = ResultCodesEnum> = {
//     data: D
//     messages: Array<string>
//     resultCode: RC
// }


export const instance = axios.create({
    baseURL: `https://trycode.pw/`,
 
})

export const tweetsAPI = {
    fetchTweets() {
        return data(instance.get<Array<Tweets>>(`c/2OBQ1.json`))
    }
}
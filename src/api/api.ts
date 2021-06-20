import axios from "axios";
import { SignInFormPropsType } from "../components/SignIn/ModalSignIn";
import { SignUpFormPropsType } from "../components/SignIn/ModalSignUp";
import { ResponseType, TagType, Tweets, UserType } from "../types";
import { data } from "./objHealper";

// export type ResponseType<D = {}, RC = ResultCodesEnum> = {
//     data: D
//     messages: Array<string>
//     resultCode: RC
// }


export const instance = axios.create({
    baseURL: `http://localhost:8888/`,
})

instance.interceptors.request.use((config) => {
    config.headers['token'] = window.localStorage.getItem("token")
    return config
})

export const authAPI = {
    auth(payload: SignInFormPropsType) {
        return data(instance.post<ResponseType<UserType>>(`auth/login`, { username: payload.email, password: payload.password}))
    },
    me() {
        return data(instance.get<ResponseType<UserType>>(`users/me`))
    },
    signUp(payload: SignUpFormPropsType) {
        return data(instance.post<ResponseType<UserType>>(`auth/signup`, {email: payload.email,  username: payload.username, fullname: payload.fullname, password: payload.password,  password2: payload.password2}))
    },
    confirmHash(hash: string){
        return instance.get(`/auth/verify/hash=${hash}`)
    }
}

export const tweetsAPI = {
    fetchTweets() {
        return data(instance.get<ResponseType<Tweets>>(`tweets`))
    },
    fetchTweet(id: string) {
        return data(instance.get<ResponseType<Tweets>>(`tweets/${id}`))
    },
    fetchUserTweets(userId: any) {
        return data(instance.get<ResponseType<Tweets>>(userId ? `tweets/user/${userId}` : `tweets`))
    },
    addTweet(payload: {text: string, images: Array<string>}) {
        return data(instance.post<ResponseType<Tweets>>(`tweets`, payload))
    },
    deleteTweetCall(id: string) {
        return instance.delete<any>(`tweets/${id}`)
    },
    uploadImg(formData: any){
        return instance.post<any>(`/upload`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    }
}

export const tagsAPI = {
    fetchTags() {
        return data(instance.get<ResponseType<TagType>>(`themes`))
    }
}
// TWEERSREDUCER
export enum LoadingState {
    LOADING = 'LOADING',
    LOADED = 'LOADED',
    ERROR = 'ERROR',
    NEVER = 'NEVER'
}

export type Tweets = { 
    _id: string
    text: string
    images: Array<string>
    user: {
        fullname: string
        username: string
        avatarUrl: string
    }
    createdAt: string
}

export type ResponseType<T> = {
    status: string
    data: T
}

// theme 
export type TagType = {
    _id: number
    name: string
    count: number
}

// auth 
export type UserType = {
    confirmed: boolean
    email: string
    fullname: string
    token: string
    username: string
    __v: number
    _id: string
}
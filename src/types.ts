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
    user: {
        fullname: string
        username: string
        avatarUrl: string
    }
}

// theme 
export type tags = {
    name: string
    count: number
}
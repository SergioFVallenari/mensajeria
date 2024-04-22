export interface User{
    email?:string
    password?: string
    token?: string
}

export interface Session {
    user: User,
    token?: string
}
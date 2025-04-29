export interface UserIntfc{
    username: string,
    password: string,
    firstname?: string,
    lastname?: string
}

export interface TodoIntfc{
    userid: number,
    title: string,
    descrption: string,
    done?: boolean
}
export interface IUser {
    id: number
    email: string
    token: string
}
export interface IUserData {
    email: string,
    password: string
}

export interface IResponseUser {
    email: string
    password: string
    id: number
    createdAt: string
    updatedAt: string
}

export interface IResponseUserData {
    token: string
    user: IResponseUser
}

export interface ICategory {
    title: string
    id: number
    createdAt: string
    updatedAt: string
    transaction: []
}

export interface ICategoryModal {
    type: 'post' | 'patch',
    id?: number,
    setVisibleModal: (visible: boolean) => void
}

export interface IResponseTransactionLoader {
    categories: ICategory[]
}





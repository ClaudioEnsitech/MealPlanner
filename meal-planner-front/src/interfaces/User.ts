export interface User {
    id: number
    email: string
    name: string
    password?: string
    createdAt: Date
    updatedAt: Date
    role: 'user' | 'admin' | string
}

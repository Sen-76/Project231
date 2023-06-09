export interface IUser {
    id: string;
    avatar?: File | null;
    dateOfBirth?: string;
    email?: string;
    name: string;
    password: string;
    phone?: string;
    username: string;
    role: ERole;
    status: number;
}
export enum ERole {
    User = 0,
    Writer = 1,
    Leader = 2,
    Editor = 3,
    Admin = 4,
}
export enum EStatus {
    NotActive = 0,
    Active = 1,
    Banned = 2,
}
export interface IUserLogin {
    username: string;
    password: string;
}
export const defaultUserState = {
    id: '4cea2479-63ef-4069-bef9-65649bae0905',
    avatar: null,
    dateOfBirth: '',
    email: '',
    name: '',
    password: '',
    phone: '',
    username: '',
    role: ERole.User,
    status: 0,
};
export const defaultUserLogin = {
    username: '',
    password: '',
};

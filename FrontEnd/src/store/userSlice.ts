import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface UserLogin {
    Id: string;
    role: string;
    TokenId: string;
    Username: string;
    email: string;
    exp: number;
    iat: number;
    jti: string;
    name: string;
    nbf: number;
    sub: string;
}
export interface IUserSlice {
    UserLogin: UserLogin;
}

const initialState: IUserSlice = {
    UserLogin: {
        Id: '',
        role: '',
        TokenId: '',
        Username: '',
        email: '',
        exp: 0,
        iat: 0,
        jti: '',
        name: '',
        nbf: 0,
        sub: ''
    }
}

export const userSlice = createSlice({
    name: 'hobby',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserLogin>) => {
            state.UserLogin = action.payload
        }
    }
})

export const { login } = userSlice.actions

export const selectHobbies = (state: RootState) => state.hobby.list

export default userSlice.reducer
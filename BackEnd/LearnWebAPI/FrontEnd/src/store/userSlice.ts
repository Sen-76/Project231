import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface UserLogin {
    Id: string;
    Role: string;
    Username: string;
    Avatar: string;
    email: string;
    exp: number;
    jti: string;
    name: string;
    sub: string;
}
export interface IUserForgot {
    Email: string;
    VerifyCode: string;
    NewPass: string;
}
export interface IUserSlice {
    UserLogin: UserLogin;
    Token: string;
    UserForgot: IUserForgot;
}

const initialState: IUserSlice = {
    UserLogin: {
        Id: '',
        Role: '',
        Username: '',
        Avatar: '',
        email: '',
        exp: 0,
        jti: '',
        name: '',
        sub: '',
    },
    Token: '',
    UserForgot: {
        Email: '',
        VerifyCode: '',
        NewPass: '',
    },
};

export const userSlice = createSlice({
    name: 'hobby',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserLogin>) => {
            state.UserLogin = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.Token = action.payload;
        },
        setVerifyCode: (state, action: PayloadAction<IUserForgot>) => {
            state.UserForgot = action.payload;
        },
    },
});

export const { login, setToken, setVerifyCode } = userSlice.actions;

export const selectHobbies = (state: RootState) => state.hobby.list;

export default userSlice.reducer;

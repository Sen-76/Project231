import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface IControllerSlice {
    loading: boolean;
    alert: {
        message: string;
        variant: string;
    };
}

const initialState: IControllerSlice = {
    loading: false,
    alert: {
        message: 'Success',
        variant: '',
    },
};

export const controllerSlice = createSlice({
    name: 'hobby',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setAlert: (state, action: PayloadAction<{ message: string; variant: string }>) => {
            state.alert = action.payload;
        },
    },
});

export const { setLoading, setAlert } = controllerSlice.actions;

export const selectHobbies = (state: RootState) => state.hobby.list;

export default controllerSlice.reducer;

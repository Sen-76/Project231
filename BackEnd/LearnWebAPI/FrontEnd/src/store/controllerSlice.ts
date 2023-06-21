import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface IControllerSlice {
    loading: boolean;
}

const initialState: IControllerSlice = {
    loading: false,
};

export const controllerSlice = createSlice({
    name: 'hobby',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = controllerSlice.actions;

export const selectHobbies = (state: RootState) => state.hobby.list;

export default controllerSlice.reducer;

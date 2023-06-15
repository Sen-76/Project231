import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export interface IHobbySlice {
  list: IHobby[];
}

export interface IHobby {
  id: string;
  title: string;
}

const initialState: IHobbySlice = {
  list: []
}

export const hobbySlice = createSlice({
  name: 'hobby',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IHobby>) => {
      state.list.push(action.payload)
    },
    remove: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(hobby => hobby.id !== action.payload)
    },
  }
})

export const { add, remove } = hobbySlice.actions

export const selectHobbies = (state: RootState) => state.hobby.list

export default hobbySlice.reducer
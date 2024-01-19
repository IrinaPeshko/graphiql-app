import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IUser {
  email: string | null;
}

const initialState: IUser = {
  email: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser['email']>) {
      state.email = action.payload;
    },
    removeUser(state) {
      state.email = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

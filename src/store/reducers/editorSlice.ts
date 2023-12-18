import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IEditor {
  isDocOpen?: boolean;
  querySectionSize?: number;
  isQueryOpen?: boolean;
}

const initialState: IEditor = {
  isDocOpen: false,
  querySectionSize: 150,
  isQueryOpen: false,
};

const userSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setDocIsOpen(state, action: PayloadAction<IEditor>) {
      state.isDocOpen = action.payload.isDocOpen;
    },
    setQuerySectionSize(state, action: PayloadAction<IEditor>) {
      state.querySectionSize = action.payload.querySectionSize;
    },
    setQueryIsOpen(state, action: PayloadAction<IEditor>) {
      state.isQueryOpen = action.payload.isQueryOpen;
    }
  },
});

export const { setDocIsOpen, setQuerySectionSize, setQueryIsOpen } =
  userSlice.actions;

export default userSlice.reducer;

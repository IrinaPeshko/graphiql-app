import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IEditor {
  isDocOpen?: boolean;
  querySectionSize?: number;
  isQueryOpen?: boolean;
  isMakingRequest: boolean;
}

const initialState: IEditor = {
  isDocOpen: false,
  querySectionSize: 150,
  isQueryOpen: false,
  isMakingRequest: false,
};

const userSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setDocIsOpen(state, action: PayloadAction<IEditor['isDocOpen']>) {
      state.isDocOpen = action.payload;
    },
    setQuerySectionSize(
      state,
      action: PayloadAction<IEditor['querySectionSize']>
    ) {
      state.querySectionSize = action.payload;
    },
    setQueryIsOpen(state, action: PayloadAction<IEditor['isQueryOpen']>) {
      state.isQueryOpen = action.payload;
    },
    setIsMakingRequest(
      state,
      action: PayloadAction<IEditor['isMakingRequest']>
    ) {
      state.isMakingRequest = action.payload;
    },
  },
});

export const {
  setDocIsOpen,
  setQuerySectionSize,
  setQueryIsOpen,
  setIsMakingRequest,
} = userSlice.actions;

export default userSlice.reducer;

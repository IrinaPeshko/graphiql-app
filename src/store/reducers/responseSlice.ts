import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IResponse {
  response: string;
}

const initialState = {
  response: '',
};

const responseSlice = createSlice({
  name: 'response',
  initialState,
  reducers: {
    setResponse(state, action: PayloadAction<IResponse['response']>) {
      state.response = action.payload;
    },
  },
});

export const { setResponse } = responseSlice.actions;

export default responseSlice.reducer;

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ITab {
  requestContent: string;
  variablesContent: string;
  headersContent: string;
  responseContent: string;
  url: string;
}

interface ITabs {
  tabs: ITab[];
  activeTab: number;
}

interface EditorState {
  variablesContent: string;
  headersContent: string;
}

const initialState: ITabs & EditorState = {
  tabs: [
    {
      requestContent: '',
      variablesContent: '',
      headersContent: '',
      responseContent: '',
      url: '',
    },
  ],
  activeTab: 0,
  variablesContent: '',
  headersContent: '',
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<ITab & { url: string }>) => {
      state.tabs.push(action.payload);
    },
    deleteTab: (state, action: PayloadAction<number>) => {
      state.tabs.splice(action.payload, 1);
      if (state.activeTab >= state.tabs.length) {
        state.activeTab = state.tabs.length - 1;
      }
    },
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    updateTabContent: (state, action) => {
      state.tabs[state.activeTab] = {
        ...state.tabs[state.activeTab],
        ...action.payload,
      };
    },
  },
});

export const { addTab, deleteTab, setActiveTab, updateTabContent } =
  tabsSlice.actions;

export default tabsSlice.reducer;

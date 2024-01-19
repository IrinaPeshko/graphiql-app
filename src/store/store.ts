import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import editorReducer from './reducers/editorSlice';
import tabsReducer from './reducers/tabSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userReducer,
    editor: editorReducer,
    tabs: tabsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

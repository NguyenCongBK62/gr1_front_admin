import { configureStore } from '@reduxjs/toolkit';
import ToastReducer from './modules/AlertToast';
export default configureStore({
  reducer: {
    ToastStatus: ToastReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

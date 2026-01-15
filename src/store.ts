import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '@/features/auth/store/auth-slice';
import type { AuthState } from '@/features/auth/store/auth-slice';
import transactionFormReducer from '@/features/maker/store/transaction-form-slice';
import type { TransactionFormState } from '@/features/maker/store/transaction-form-slice';

// Define RootState type
export interface RootState {
  auth: AuthState;
  transactionForm: TransactionFormState;
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Usually we don't want to persist form state across sessions
};

const rootReducer = combineReducers({
  auth: authReducer,
  transactionForm: transactionFormReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;

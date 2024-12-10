import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { chooseReducer } from "../features/ChooseFloor/ChooseFloorSllice";
import { AuthReducer } from "../features/Auth/AuthSlice";
import { userReducer } from "../features/User/UserSlice";
import { HeadmansReducer } from "../features/Headmans/HeadmansSlice";
import { persistReducer, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    user: userReducer, 
    headmans: HeadmansReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: {
        choose: chooseReducer,
        auth: AuthReducer,
        root: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
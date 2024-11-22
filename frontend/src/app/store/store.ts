import { configureStore } from "@reduxjs/toolkit";
import { chooseReducer } from "../features/ChooseFloor/ChooseFloorSllice";
import { AuthReducer } from "../features/Auth/AuthSlice";


export const store = configureStore({
    reducer: {
        choose: chooseReducer,
        auth: AuthReducer
    },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
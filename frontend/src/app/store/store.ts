import { configureStore } from "@reduxjs/toolkit";
import { chooseReducer } from "../features/ChooseFloor/ChooseFloorSllice";
import { AuthReducer } from "../features/Auth/AuthSlice";
import { userReducer } from "../features/User/UserSlice";


export const store = configureStore({
    reducer: {
        choose: chooseReducer,
        auth: AuthReducer,
        user: userReducer
    },
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
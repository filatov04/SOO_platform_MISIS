import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";



interface AuthState{
    auth: boolean;
}

const initialState: AuthState = {
    auth: false
}


// const loadAuthState = () : boolean => {
//     const localState = localStorage.getItem('isAuthenticated');
//     return localState ? JSON.parse(localState) : false;
// };

// const saveAuthState = (state:boolean) => {
//     localStorage.setItem('isAuthenticated', JSON.stringify(state));
// };

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isAuth: (state) => {
            state.auth = true;
            // saveAuthState(true);
        },
        notAuth: (state) => {
            state.auth = false;
            // saveAuthState(false);
        }
    },
})

export const {isAuth, notAuth} = AuthSlice.actions
export const AuthorizationValue = (state: RootState) => state.auth.auth 
export const AuthReducer = AuthSlice.reducer
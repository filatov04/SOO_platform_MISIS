import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"




interface ChooseFloorState{
    floor: number
}

// const initialState: ChooseFloorState = {
//     floor: 0,
// }

const loadFloorState = () => {
    const localState = localStorage.getItem("NumberFloor");
    return localState ? JSON.parse(localState) : 0;
}

const saveFloorState = (state: number) => {
    localStorage.setItem("NumberFloor", JSON.stringify(state));
}


export const ChooseFloorSlice = createSlice({
    name: 'chooseFloor',
    initialState: {
        floor: loadFloorState(),
    },
    reducers: {
        choose: (state, action: PayloadAction<number>) => {
            state.floor = action.payload;
            saveFloorState(action.payload);
        },
    },
})

export const { choose } = ChooseFloorSlice.actions
export const selectFloor = (state: RootState) => state.choose.floor;
export const chooseReducer = ChooseFloorSlice.reducer
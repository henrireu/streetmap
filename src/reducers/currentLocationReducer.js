import { createSlice } from "@reduxjs/toolkit"

const currentLocationSlice = createSlice ({
    name: 'currentLocation',
    initialState: null,
    reducers: {
        setCurrentLocation(state, action) {
            return action.payload
        }
    }
})

export const { setCurrentLocation } = currentLocationSlice.actions
export default currentLocationSlice.reducer
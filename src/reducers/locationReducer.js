import { createSlice } from '@reduxjs/toolkit'

const locationSlice = createSlice({
    name: 'locations',
    initialState: [],
    reducers: {
        setLocations(state, action) {
            return action.payload
        }
    }
})

export const { setLocations } = locationSlice.actions
export default locationSlice.reducer
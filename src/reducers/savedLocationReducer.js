import { createSlice } from '@reduxjs/toolkit'

const savedLocationSlice = createSlice({
    name: 'savedLocations',
    initialState: [],
    reducers: {
        saveLocation(state, action) {
            const savedLocation = action.payload
            const exists = state.some(location => location.id === savedLocation.id)
            if (!exists) {
                state.push(savedLocation);
            } else {
                console.log(`ID ${savedLocation.id} already exists in the list.`);
            }
        },
        deleteLocation(state, action) {
            const deleteLocation = action.payload
            return state.filter(location => location.id !== deleteLocation.id)
        },
        // tämä on bugeja varten vaa
        deleteLastLocation(state,action) {
            return state.slice(0, -1)
        }
    }
})

export const { saveLocation, deleteLocation, deleteLastLocation } = savedLocationSlice.actions
export default savedLocationSlice.reducer
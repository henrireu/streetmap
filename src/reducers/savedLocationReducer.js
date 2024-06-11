import { createSlice } from '@reduxjs/toolkit'

const savedLocationSlice = createSlice({
    name: 'savedLocations',
    //tähän initialStateen jossain kohtaan localstorageen tallennetut kamerat
    initialState: [],
    reducers: {
        saveLocation(state, action) {
            const savedLocation = action.payload
            state.push(savedLocation)
        },
        deleteLocation(state, action) {
            const deleteLocation = action.payload
            return state.filter(location => location.id !== deleteLocation.id)
        }
    }
})

export const { saveLocation, deleteLocation } = savedLocationSlice.actions
export default savedLocationSlice.reducer
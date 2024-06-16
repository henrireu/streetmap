import { createSlice } from "@reduxjs/toolkit"

const versionControlSlice = createSlice ({
    name: 'version',
    initialState: 'computer',
    reducers: {
        setVersion(state, action) {
            return action.payload
        }
    }
})

export const { setVersion } = versionControlSlice.actions
export default versionControlSlice.reducer
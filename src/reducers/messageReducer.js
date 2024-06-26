import { createSlice } from "@reduxjs/toolkit";

/*const messageSlice = createSlice ({
    name: 'message',
    initialState: "",
    reducers: {
        setMessage(state, action) {
            return action.payload
        }
    }
})*/

const messageSlice = createSlice ({
    name: 'message',
    initialState: {text: "", color: ""},
    reducers: {
        setMessage(state, action) {
            return action.payload
        }
    }
})

export const { setMessage } = messageSlice.actions
export default messageSlice.reducer
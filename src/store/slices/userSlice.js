import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: "",
        localId: "",
        profilePicture: "",
        userType: false
    },
    reducers: {
        setUserEmail: (state, action) => {
            state.user = action.payload
        },
        setLocalId: (state, action) => {
            state.localId = action.payload
        },
        setProfilePicture: (state,action) => {
            state.profilePicture = action.payload
        },
        clearUser: (state, action) => {
            state.user = "",
            state.localId = "",
            state.profilePicture = "",
            state.userType = false
        },
        setUserType: (state, action) => {
            state.userType = action.payload;
        },
    }
})

export const { setUserEmail, setLocalId, setProfilePicture, clearUser, setUserType } = userSlice.actions

export default userSlice.reducer
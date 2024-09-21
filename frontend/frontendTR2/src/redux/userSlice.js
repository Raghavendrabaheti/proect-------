// Signup
import { createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

 export const Signup = createAsyncThunk('/user/signup', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post('http://localhost:3000/api/register', data);
        return res.data;
    }
    catch (error) {
        return rejectWithValue(error);
    }
});
const initialState = {  
    loading: false,
    error:null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(Signup.pending, (state) => 
            {
                state.loading = true;
                state.error = null;
            }).addCase(Signup.fulfilled,(state)=>{
                state.loading = false;
                state.error = null;
            }).addCase(Signup.rejected,(state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default userSlice.reducer;
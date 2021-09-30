import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLogin: false,
  username: '',
  name: '',
  itemsLiked: [],
  error: null,
};

export const checkLogin = createAsyncThunk('user/checklogin', async () => {
  try {
    const response = await axios.get('https://demo-store-backend.herokuapp.com/login', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return {isLogin:false};
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addLikeItem(state, action) {
      const { id } = action.payload;
    },
  },
  extraReducers(builder) {
    builder
    .addCase(checkLogin.fulfilled, (state, action) => {
      state.isLogin = action.payload.isLogin;
    })
  },
});

export default userSlice.reducer
export const selectAllItemId = (state) => state.itemsLiked


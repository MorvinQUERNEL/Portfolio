import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as loginApi, getProfile as getProfileApi, checkApiStatus } from '../services/auth';

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const data = await loginApi(payload);
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchProfile = createAsyncThunk('auth/profile', async (_, { rejectWithValue }) => {
  try {
    const data = await getProfileApi();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const testApiConnection = createAsyncThunk('auth/testApi', async (_, { rejectWithValue }) => {
  try {
    const data = await checkApiStatus();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    user: null,
    status: 'idle',
    error: null,
    apiStatus: null
  },
  reducers: {
    logoutAction(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(testApiConnection.fulfilled, (state, action) => {
        state.apiStatus = action.payload;
      })
      .addCase(testApiConnection.rejected, (state, action) => {
        state.apiStatus = { error: action.payload };
      });
  }
});

export const { logoutAction, clearError } = authSlice.actions;
export default authSlice.reducer;

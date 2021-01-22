import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../api/auth/';
import { setToken, removeToken } from '../../helpers/token';
import { getUser } from '../../api/users/index';
import { refresh } from '../../api/auth/index';

export const loginState = {
  user: '',
};

const fetchUserInfo = createAsyncThunk(
  'users/fetchInfo',
  async (payload, thunkAPI) => {
    const { id, access, refresh } = payload;
    const response = await getUser(id);
    return { ...response.data, access, refresh };
  },
);

const fetchUser = createAsyncThunk(
  'users/fetchByCredentials',
  async (payload, thunkAPI) => {
    const response = await login(payload).catch(res => alert(`Response ${JSON.stringify(res)}`) );
    
    return response.data;
  },
);

const refreshSession = createAsyncThunk(
  'users/refreshSession',
  async (payload, thunkAPI) => {
    const response = await refresh({
      refresh: payload,
    });
    return response.data;
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState: loginState,
  reducers: {
    refreshUser: (state, action) => {
      const { access, refresh } = state.user;
      state.user = {
        ...action.payload,
        access,
        refresh,
      };
      
    },
    removeUser: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: {
    [fetchUser.fulfilled]: (state, action) => {
      setToken(action.payload.access);
    },
    [fetchUserInfo.fulfilled]: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
    [refreshSession.fulfilled]: (state, action) => {
      removeToken();
      setToken(action.payload.access);
      state.user.access = action.payload.access;
    },
  },
});

export const fetchUserThunk = fetchUser;
export const fetchInfoThunk = fetchUserInfo;
export const refreshSessionThunk = refreshSession;
export const { refreshUser, removeUser } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;

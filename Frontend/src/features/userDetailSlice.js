import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiURL = "https://user-crud-server-nine.vercel.app";

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data", data);
      const response = await axios.post(`${apiURL}/adduser`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//read action
export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiURL}/getusers`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
//delete action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const response = await axios.delete(`${apiURL}/deleteuser/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    console.log("datacreateslice", data);
    try {
      const response = await axios.put(`${apiURL}/edituser/${data._id}`, data);
      console.log(response.data, "updateresponse");
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },

  reducers: {
    searchUser: (state, action) => {
      console.log(action.payload);
      state.searchData = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        createUser.pending,

        (state) => {
          state.loading = true;
        }
      )
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.id) {
          state.users = state.users.filter(
            (ele) => ele.id !== action.payload.id
          );
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((ele) =>
          ele._id === action.payload._id ? action.payload : ele
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default userDetail.reducer;

export const { searchUser } = userDetail.actions;

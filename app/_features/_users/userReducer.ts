import { createSlice } from "@reduxjs/toolkit";

const userList = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@gmail.com",
    role: "Admin",
    permissions: ["Read", "Write", "Update", "Delete"],
  },
  {
    id: 2,
    name: "James Gosling",
    email: "james@gmail.com",
    role: "User",
    permissions: ["Read"],
  },
  {
    id: 3,
    name: "Martin Fowler",
    email: "martin@gmail.com",
    role: "Manager",
    permissions: ["Read", "Write"],
  },
];

const userSlice = createSlice({
  name: "user",
  initialState: userList,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    editUser: (state, action) => {
      const { id, name, email } = action.payload;
      const updatedUser = state.find((u) => u.id == id);
      if (updatedUser) {
        updatedUser.name = name;
        updatedUser.email = email;
      }
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      const deletedUser = state.find((u) => u.id == id);
      if (deletedUser) {
        return state.filter((u) => u.id !== id);
      }
    },
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

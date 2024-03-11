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
  reducers: {},
});

export default userSlice.reducer
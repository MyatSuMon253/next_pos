"use client";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "./_features/_users/userReducer";
import UserListPage from "./users/page";

export default function page() {
  const store = configureStore({ reducer: { users: userReducer } });

  return (
    <Provider store={store}>
      <UserListPage />
    </Provider>
  );
}

"use client";

import { updateUser } from "@/app/_features/_users/userReducer";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditUser = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const existingUser = users.filter((u) => u.id === id);
  const { name, email } = existingUser[0];
  const [uname, setUName] = useState(name);
  const [uemail, setUEmail] = useState(email);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(updateUser({ id: id, name: uname, email: uemail }));
    router.push("/");
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            placeholder="enter name"
            value={uname}
            onChange={(e) => setUName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            placeholder="enter email"
            value={uemail}
            onChange={(e) => setUEmail(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditUser;

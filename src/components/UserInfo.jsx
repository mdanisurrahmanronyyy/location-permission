"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserInfo = ({ user }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="rounded-lg border p-10 shadow-lg">
      <div>Id : {user.id}</div>
      <div>Name : {user.name}</div>
      <div>Email : {user.email}</div>
      <button
        className="mt-2 font-medium text-blue-600 hover:underline"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
};

export default UserInfo;

import React from "react";
import { IoMdLogOut } from "react-icons/io";
import logo from "/images/logos/logo.png";
import { getUserData } from "../services/hooks";
import { Divider } from "antd";
import { successMessage } from "../services/helpers";
import { useAuthStore } from "../stores/authStore";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";
import profile from "../../public/images/dashboard/profile.webp";
const UserAccount = () => {
  const user = getUserData();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  const handleDeleteAccount = () => {
    successMessage("Account deleted");
    setTimeout(() => {
      logoutHandler();
    }, 2000);
  };
  return (
    <div className="p-4">
      <div className="flex justify-between items-center bg-white p-3 rounded-lg">
        <div className="flex gap-4 items-center">
          <img src={logo} width={50} />
          <p className="font-semibold text-2xl text-slate-600">User Account</p>
        </div>
        <button
          onClick={logoutHandler}
          className="bg-blue-400 text-white p-3 rounded-xl"
        >
          <IoMdLogOut size={30} />
        </button>
      </div>
      <div className="flex flex-col gap-4 p-10 px-4 md:px-10 lg:px-20 xl:px-32 ">
        <img
          className="bg-slate-300 rounded-full aspect-square object-contain border-2 border-blue-400"
          src={user?.profilePic || profile}
          width={100}
        />
        <div>
          <p className="text-slate-500 font-semibold">Username:</p>
          <p className="text-zinc-900 font-semibold capitalize text-lg">
            {user?.name || "William jones"}
          </p>
        </div>
        <div>
          <p className="text-slate-500 font-semibold">Email:</p>
          <p className="text-zinc-900 font-semibold  text-lg">
            {user?.email || "william@hotmail.com"}
          </p>
        </div>
        <div>
          <p className="text-slate-500 font-semibold">Phone:</p>
          <p className="text-zinc-900 font-semibold capitalize text-lg">
            {user?.phone || 98776538866}
          </p>
        </div>
        <Divider />
        <p className="text-red-600 font-semibold text-xl">Danger Zone</p>
        <div className="flex justify-between items-center flex-wrap">
          <p className="text-slate-500 font-semibold mb-2">
            Want to delete your account?
          </p>
          <button
            onClick={handleDeleteAccount}
            className=" bg-red-600 hover:bg-red-700 p-3 rounded-lg text-white"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;

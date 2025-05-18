import React from "react";
import { logout } from "../../store/authSlice.js";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";

function LogoutBtn() {
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
            })
            .catch(() => console.log("Logout failed"));
    }

    return (
        <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">
            Logout
        </button>
    )

}

export default LogoutBtn;
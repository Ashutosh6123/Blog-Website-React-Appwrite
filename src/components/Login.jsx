import React, {useState} from "react";
import {Link, useNavigate} from "react-router";
import { login as authStoreLogin } from "../store/authSlice";
import {useDispatch} from "react-redux";
import authService from "../appwrite/auth";
import { Button, Input, Logo } from "./index"
import {useForm} from "react-hook-form";


function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState(null);

    const login = async(data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getUser();
                if(userData){
                    dispatch(authStoreLogin(userData)); // store the user data in redux store
                    navigate("/"); // redirect to home page after login
                }
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            </div>

            <form onSubmit={handleSubmit(login)} className="mt-8">
                <div className="space-y-5">

                    <Input 
                        label= "email"
                        type="email"
                        placeholder = "Enter your email : "

                        // The register function is used to register the input with the form. It takes an object with the name of the input and validation rules as arguments.
                        // The register function returns an object with the onChange, onBlur, and ref properties. These properties are used to bind the input to the form state.
                        {...register("email", {
                            required: true,
                            validate: {
                                // The validate function is used to validate the input. It takes a function that returns true or false as an argument.
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                            }
                        })}
                    />

                    <Input 
                        label = "Password"
                        type = "password"
                        placeHolder = "Enter Password"

                        {...register("password", {
                            required: true,
                        })}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Sign in
                    </Button>
                </div>
            </form>

        </div>
    )
}

export default Login;
[33mcommit 649157fe7b9483523aa287395fc8afc0ebe48075[m[33m ([m[1;36mHEAD -> [m[1;32mmaster[m[33m)[m
Author: Ashutosh Shukla <ashu6d2@gmail.com>
Date:   Sun May 18 16:59:28 2025 +0530

    Added Comments

[1mdiff --git a/src/components/Login.jsx b/src/components/Login.jsx[m
[1mnew file mode 100644[m
[1mindex 0000000..5d29690[m
[1m--- /dev/null[m
[1m+++ b/src/components/Login.jsx[m
[36m@@ -0,0 +1,95 @@[m
[32m+[m[32mimport React, {useState} from "react";[m
[32m+[m[32mimport {Link, useNavigate} from "react-router";[m
[32m+[m[32mimport { login as authStoreLogin } from "../store/authSlice";[m
[32m+[m[32mimport {useDispatch} from "react-redux";[m
[32m+[m[32mimport authService from "../appwrite/auth";[m
[32m+[m[32mimport { Button, Input, Logo } from "./index"[m
[32m+[m[32mimport {useForm} from "react-hook-form";[m
[32m+[m
[32m+[m
[32m+[m[32mfunction Login(){[m
[32m+[m[32m    const navigate = useNavigate();[m
[32m+[m[32m    const dispatch = useDispatch();[m
[32m+[m[32m    const {register, handleSubmit} = useForm();[m
[32m+[m[32m    const [error, setError] = useState(null);[m
[32m+[m
[32m+[m[32m    const login = async(data) => {[m
[32m+[m[32m        setError("");[m
[32m+[m[32m        try {[m
[32m+[m[32m            const session = await authService.login(data);[m
[32m+[m[32m            if(session){[m
[32m+[m[32m                const userData = await authService.getUser();[m
[32m+[m[32m                if(userData){[m
[32m+[m[32m                    dispatch(authStoreLogin(userData)); // store the user data in redux store[m
[32m+[m[32m                    navigate("/"); // redirect to home page after login[m
[32m+[m[32m                }[m
[32m+[m[32m            }[m
[32m+[m[32m        } catch (error) {[m
[32m+[m[32m            setError(error.message);[m
[32m+[m[32m        }[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    return ([m
[32m+[m[32m        <div>[m
[32m+[m[32m            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>[m
[32m+[m[32m                <div className="mb-2 flex justify-center">[m
[32m+[m[32m                    <span className="inline-block w-full max-w-[100px]">[m
[32m+[m[32m                        <Logo width="100%" />[m
[32m+[m[32m                    </span>[m
[32m+[m[32m                </div>[m
[32m+[m[32m                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>[m
[32m+[m[32m                <p className="mt-2 text-center text-base text-black/60">[m
[32m+[m[32m                    Don&apos;t have any account?&nbsp;[m
[32m+[m[32m                    <Link[m
[32m+[m[32m                        to="/signup"[m
[32m+[m[32m                        className="font-medium text-primary transition-all duration-200 hover:underline"[m
[32m+[m[32m                    >[m
[32m+[m[32m                        Sign Up[m
[32m+[m[32m                    </Link>[m
[32m+[m[32m                </p>[m
[32m+[m[32m                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}[m
[32m+[m[32m            </div>[m
[32m+[m
[32m+[m[32m            <form onSubmit={handleSubmit(login)} className="mt-8">[m
[32m+[m[32m                <div className="space-y-5">[m
[32m+[m
[32m+[m[32m                    <Input[m[41m [m
[32m+[m[32m                        label= "email"[m
[32m+[m[32m                        type="email"[m
[32m+[m[32m                        placeholder = "Enter your email : "[m
[32m+[m
[32m+[m[32m                        // The register function is used to register the input with the form. It takes an object with the name of the input and validation rules as arguments.[m
[32m+[m[32m                        // The register function returns an object with the onChange, onBlur, and ref properties. These properties are used to bind the input to the form state.[m
[32m+[m[32m                        {...register("email", {[m
[32m+[m[32m                            required: true,[m
[32m+[m[32m                            validate: {[m
[32m+[m[32m                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||[m
[32m+[m[32m                            "Email address must be a valid address",[m
[32m+[m[32m                            }[m
[32m+[m[32m                        })}[m
[32m+[m[32m                    />[m
[32m+[m
[32m+[m[32m                    <Input[m[41m [m
[32m+[m[32m                        label = "Password"[m
[32m+[m[32m                        type = "password"[m
[32m+[m[32m                        placeHolder = "Enter Password"[m
[32m+[m
[32m+[m[32m                        {...register("password", {[m
[32m+[m[32m                            required: true,[m
[32m+[m[32m                        })}[m
[32m+[m[32m                    />[m
[32m+[m
[32m+[m[32m                    <Button[m
[32m+[m[32m                        type="submit"[m
[32m+[m[32m                        className="w-full"[m
[32m+[m[32m                    >[m
[32m+[m[32m                        Sign in[m
[32m+[m[32m                    </Button>[m
[32m+[m[32m                </div>[m
[32m+[m[32m            </form>[m
[32m+[m
[32m+[m[32m        </div>[m
[32m+[m[32m    )[m
[32m+[m[32m}[m
[32m+[m
[32m+[m[32mexport default Login;[m
\ No newline at end of file[m

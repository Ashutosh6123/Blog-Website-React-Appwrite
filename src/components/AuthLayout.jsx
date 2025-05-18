import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router";
import { useSelector } from "react-redux";

export default function Protected({children, authentication = true}){

    //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }

    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector( state => state.auth.status );

    useEffect( () => {
        if(authentication && !authStatus === authentication){
            navigate("/login");
        }
        else if(!authentication && authStatus === authentication){
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, authentication, navigate] );

    return (
        loader ? <h1>Loading....</h1> : <>{children}</>
    )

}
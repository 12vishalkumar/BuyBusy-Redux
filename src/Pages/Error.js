//------------------------------------- react hooks -------------------------------//
import { useEffect } from "react";
//------------------------------------ react routers ------------------------------//
import { useNavigate } from "react-router-dom";
//-------------------------------------------- react link tag ---------------------//
import { Link } from "react-router-dom";



//----------------------------------- rendering the error page --------------------//
export function Error(){
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 1500);
    }, [navigate])

    //------------------------------- returning the page --------------------------//
    return(
        //--------------------------- Showing the Error message on screen ---------//
        <div style = {{textAlign: "center"}} >
            <h1>Error, Something went wrong!</h1>
            <p>redirecting back to homepage...</p>
            <Link to = "/">HOME</Link>
        </div>
    )
}
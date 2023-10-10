//----------------------------------------- react hooks -----------------------//
import { useRef } from "react";
//----------------------------------------- redux tools -----------------------//
import { useDispatch } from "react-redux";
//----------------------------------------- reducer actions -------------------//
import { createSessionThunk } from "../Redux/Reducers/authReducer";
//----------------------------------------- react routers ---------------------//
import { NavLink, useNavigate } from "react-router-dom";
//------------------------------------------ css ------------------------------//
import styles from "../styles/signIn.module.css"; 



//--------------------------------------- SignIn page -------------------------//
export function SignIn(){
    //----------------------------------- actions -----------------------------//
    const dispatch = useDispatch();
    //----------------------------------- navigate variable -------------------//
    const navigate = useNavigate();
    //----------------------------------- ref variables for email -------------//
    const emailRef = useRef();
    //----------------------------------- ref variables for password ----------//
    const passwordRef = useRef();

    //----------------------------------- submit button -----------------------//
    function handleSubmit(e) {
        e.preventDefault();
        //---------------------- storing the user's data in the firebase DB ---//
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        //--------------------------------- sign in user ----------------------//
        const status = dispatch(createSessionThunk(data));
        status ? navigate("/"): navigate("/SignIn")       
    }   

    //-------------------------------- return the signin page -----------------//
    return(
        //-------------------------------- container page ---------------------//
        <div className = {styles.container} >
            <div className = {styles.inputForm} >
                {/* Sign In heading */}
                <h1>SignIn</h1>
                {/* form Page */}
                <form onSubmit = {handleSubmit} >
                    {/* user email */}
                    <input type = "email" 
                        placeholder = "Enter Your Email ID" 
                        required
                        ref = {emailRef} 
                    />
                    <br />
                    {/* user password */}
                    <input type = "password" 
                        placeholder = "Enter Your Password"
                        required
                        ref = {passwordRef} 
                    />
                    <br />
                    {/* submit button */}
                    <button>Submit</button>
                </form>
                <br /> 
                <span>OR &nbsp;</span>
                {/* signup page link */}
                <NavLink to = "/SignUp">Create New Account</NavLink>
            </div>
        </div>
    );
}
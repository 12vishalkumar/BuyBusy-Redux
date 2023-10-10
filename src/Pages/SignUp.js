//--------------------------------------- react ref hooks ---------------------//
import { useRef } from "react";
//--------------------------------------- redux tool --------------------------//
import { useDispatch } from "react-redux";
//-------------------------------------- Auth Reducer -------------------------// 
import { createUserThunk } from "../Redux/Reducers/authReducer";
//-------------------------------------- navigation router --------------------//
import { useNavigate } from "react-router-dom";
//-------------------------------------- css ----------------------------------//
import styles from "../styles/signIn.module.css";



//--------------------------------------- SignUp page -------------------------//
export function SignUp(){
    //------------------------------------ actions ----------------------------//
    const dispatch = useDispatch();
    //------------------------------------ ref variable name ------------------//
    const nameRef = useRef();
    //------------------------------------ ref variable email -----------------//
    const emailRef = useRef();
    //------------------------------------ ref variable password --------------//
    const passwordRef = useRef();
    //------------------------------------ navigation variable ----------------//
    const navigate = useNavigate();

    //------------------------------------- submit button ---------------------//
    function handleSubmit(e) { 
        e.preventDefault();
        //------------------------ storing the user's data in firebase DB -----//
        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        //--------------------------------- creating new user------------------//
        dispatch(createUserThunk(data)); 
        //------------------------------- redirecting the signIn page ---------//
        navigate("/signin");
    }
    

    //---------------------------------- returin hte signUp page --------------//
    return(
        <>
            {/* container */} 
            <div className = {styles.container} >
                <div className = {styles.inputForm} >
                    {/* SignUP heading */}
                    <h1>SignUp</h1>
                    {/* fetching the user's data */}
                    <form onSubmit = {handleSubmit} >
                        <input type = "text" 
                            placeholder = "Enter Your Name" 
                            required
                            ref = {nameRef} 
                        />
                        <input type = "email" 
                            placeholder = "Enter Your Email"
                            required 
                            ref = {emailRef} 
                        />
                        <input type = "password" 
                            placeholder = "Enter Your Password"
                            required
                            ref = {passwordRef} 
                        />
                        {/* submit button */}
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
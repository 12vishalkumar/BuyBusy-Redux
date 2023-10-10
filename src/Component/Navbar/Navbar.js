//--------------------------------------------- redux tools ----------------------------//
import { useDispatch, useSelector } from "react-redux";
//---------------------------------------------- css -----------------------------------//
import styles from "../../styles/navbar.module.css";
//---------------------------------------------- importing form react router -----------//
import { Outlet, NavLink } from "react-router-dom";
//---------------------------------------------- actions -------------------------------//
import { authSelector, removeSessionThunk } from "../../Redux/Reducers/authReducer";



//-------------------------------------------- Navbar Component -------------------------//
export default function Navbar() {
    //----------------------------------------- calling the actions ---------------------//
    const dispatch = useDispatch();
    //----------------------------------------- user's login status ---------------------//
    const { isLoggedIn } = useSelector(authSelector);


    //------------------------------------------ return the page ------------------------//
    return(
        <>
            {/* main container */}
            <div className = {styles.navbarContainer} > 
                {/* heading */}
                <div className = {styles.appName} >
                    <NavLink to = "/">
                        {/* app logo */}
                        <i class="fa-solid fa-store"></i>
                        <span>BuyBusy</span>
                    </NavLink>
                </div>
                {/* all the navigation links */}
                <div className = {styles.navLinks} >
                    {/* homepage link */}
                    <NavLink to = "/">
                        {/* home logo */}
                        <i class="fa-solid fa-house"></i>
                        <span>Home</span>
                    </NavLink>
                    {/* myorder link */}
                    {isLoggedIn && <NavLink to = "/myorder">
                            {/* my order logo */}
                            <i class="fa-solid fa-bag-shopping"></i>
                            <span>My Order</span>
                    </NavLink> }
                    {/* cart link */}
                    {isLoggedIn && <NavLink to = "/cart">
                        <span>
                            {/* cart icon */}
                            <i class="fa-sharp fa-solid fa-cart-shopping"></i>
                           Cart
                        </span>
                    </NavLink> }
                    {/* signIN and signOut */}
                    <NavLink to = {!isLoggedIn ? "/SignIn" : "/"}>
                        {/* <span> */}
                            {!isLoggedIn ?
                                <>
                                    {/* sign in icon */}
                                    <i class="fa-solid fa-right-to-bracket"></i>
                                    <span className = {styles.signInBtn}>SignIn</span>
                                </>
                                :
                                <>
                                    {/* sign out icon */}
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    {/* sign out user  */}
                                    <span onClick = {() => dispatch(removeSessionThunk())}>SignOut</span>
                                </>
                            }
                        {/* </span> */}
                    </NavLink>
                </div>
            </div>
            {/* rendering the child components (pages) */}
            <Outlet />
        </>
    )
}
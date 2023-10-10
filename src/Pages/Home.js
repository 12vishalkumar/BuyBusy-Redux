//------------------------------------ react hooks ------------------------------//
import { useState, useEffect } from "react";
//------------------------------------ redux tools ------------------------------//
import { useDispatch, useSelector } from "react-redux";
//------------------------------------ Auth and Product Reducers actions --------//
import { authSelector, getInitialUserList, setLoggedIn, setUserLoggedIn } from "../Redux/Reducers/authReducer";
import { getInitialCartOrdersThunk } from "../Redux/Reducers/productReducer";
//------------------------------------ required components ----------------------//
import FilterBar from "../Component/Home/FilterBar";
import MainContent from "../Component/Home/MainContent";
//------------------------------------ css --------------------------------------//
import styles from "../styles/home.module.css";
//------------------------------------ showing the loading spinner --------------//
import Loader from "../Component/Loader/Loader";



//------------------------------------ rendering the homepage -------------------//
export function Home(){
    //-------------------------------- calling the actions ----------------------//
    const dispatch = useDispatch();
    //-------------------------------- Auth Reducer ddata -----------------------//
    const { userLoggedIn} = useSelector(authSelector);
    //-------------------------------- default loading status -------------------//
    const [isLoading, setLoading] = useState(true);
    //-------------------------------- show/hide the filter bar -----------------//
    const [applyFilter, setApplyFilter] = useState(false);
    //-------------------------------- filter item with the category ------------//
    const [price, setPrice] = useState(5000);
    const [category, setCategory] = useState("none");
    //--------------------------------- searched items --------------------------//
    const [search, setSearch] = useState("");

    //-------------------------------- get the initial data of cart -------------//
    useEffect(() => {
        dispatch(getInitialCartOrdersThunk());
    }, [userLoggedIn, dispatch]);

    //------------------------------- showing/hiding again after 3 second -------//
    useEffect(() => {
        //--------------------------- show/hide the load spinner ----------------//
        setTimeout(() => {
            setLoading(false);
        }, 1500);
        //--------------------------- getting user's token from local Storage ---//
        const token = window.localStorage.getItem("token");
        if(token){
            //---------------------- if user is logged in -----------------------//
            const index = window.localStorage.getItem("index");
            const user = JSON.parse(index);
            //---------------------- set token and loggedIn user ----------------//
            dispatch(setLoggedIn(token));
            dispatch(setUserLoggedIn(user));
        }
    }, [dispatch]);

    //----------------------------- fetching the list of all the user's --------//
    useEffect(() => { 
        dispatch(getInitialUserList());
    }, [dispatch]);


    //----------------------------- returning the component page ---------------//
    return(
        <>
            {/* checking the show/hide loading spinner */}
            {isLoading ? <Loader /> :
                <>
                    {/* header page */}
                    <div className = {styles.header} >
                        {/* search bar */}
                        <input type = "text" 
                            placeholder = "Search here any items..." 
                            value = {search}
                            onChange = {(e) => setSearch(e.target.value)} 
                        />
                        {/* applying the filter button */}
                        <button onClick = {() => setApplyFilter(!applyFilter)} >
                            { applyFilter ? "Cancel" : "Apply Filter" }
                        </button>
                    </div> 
                    {/* rendering all the products  */}
                    <div className = {styles.mainContainer} >
                        {applyFilter && 
                            < FilterBar 
                                price = {price} 
                                setPrice = {setPrice} 
                                setCategory = {setCategory} 
                            />
                        }
                        {/* Showing the  all the products */}
                        <MainContent 
                            search = {search} 
                            price = {price} 
                            category = {category} 
                            applyFilter = {applyFilter} 
                        />
                    </div>
               </>
            }
        </>
    );
}
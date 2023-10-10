//-------------------------------------------- react hooks ------------------------------// 
import { useEffect, useState } from "react";
//-------------------------------------------- redux tool -------------------------------//
import { useSelector } from "react-redux";
//-------------------------------------------- Product Reducer --------------------------//
import { productSelector } from "../Redux/Reducers/productReducer";
//-------------------------------------------- react link tag ---------------------------//
import { Link } from "react-router-dom";
//-------------------------------------------- required component -----------------------//
import OrderDetail from "../Component/MyOrder/OrderDetail";
import Loader from "../Component/Loader/Loader";
//--------------------------------------------- css -------------------------------------//
import styles from "../styles/myorder.module.css";



//-------------------------------------------- rendering the order page -----------------//
export function MyOrder() {
    //----------------------------------- fetched the all order's from Product Reducer --//
    const { myorders } = useSelector(productSelector);
    //--------------------------------------- Show/Hide loading spinner page ------------//
    const [isLoading, setLoading] = useState(true);

    //------------------------------------ hiding the spinner after 3 second -------------//
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);            
    }, []);

    
    //----------------------------------------- returning the order page -------------------//
    return(
        <>
            {isLoading ? <Loader /> :
                //---------------------------- container page ------------------------------//
                <div className = {styles.mainContainer} >
                    <h1 className = {styles.orderHeading} >My Orders</h1>
                    {/* show message if order is present in the list */}
                    {myorders.length === 0 ?
                        <>  
                            {/* No ordering message */}
                            <h1>In Your card haven't placed any order yet!</h1>
                            {/* redirect to home page */}
                            <Link to = "/">Start Shopping 🥰</Link>
                        </> :
                        //---------------------- if orders contains than render it ----------//
                        <div className = {styles.orderListContainer} >
                            {myorders.map((order, i) => <OrderDetail key = {i} order = {order} />)}
                        </div>
                    }
                </div>
            }
        </>
    );
}
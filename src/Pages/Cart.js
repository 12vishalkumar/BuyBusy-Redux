//---------------------------------- react hooks -----------------------------//
import { useEffect, useState } from "react";
//---------------------------------- react router ----------------------------//
import { useNavigate } from "react-router-dom";
//--------------------------------- redux tools ------------------------------//  
import { useDispatch, useSelector } from "react-redux";
//--------------------------------- actions from Auth and Product Reducers ---//
import { authSelector } from "../Redux/Reducers/authReducer";
import { clearCartThunk, productSelector, purchaseAllThunk } from "../Redux/Reducers/productReducer";
//---------------------------------- cartItems -------------------------------//
import CartItem from "../Component/Cart/CartItem";
//---------------------------------- page loader -----------------------------//
import Loader from "../Component/Loader/Loader";
//---------------------------------- css files -------------------------------//
import firstStyles from "../styles/home.module.css";
import secondStyles from "../styles/cart.module.css";
//--------------------------------- toast notification -----------------------//
import { toast } from "react-toastify";



//---------------------------------- rendering the cart page -----------------//
export function Cart(){
    //------------------------------ calling the actions ---------------------//
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(true);
    //------------------------------ user from Auth Reducer ------------------//
    const { userLoggedIn } = useSelector(authSelector);
    //----------------------------- Product Reducer --------------------------//
    const {cart, total, itemInCart} = useSelector(productSelector);
    //------------------------------ navigate to page ------------------------//
    const navigate = useNavigate();
    // hiding----------------------- loading spinner after given time --------//
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);            
    }, []);

    //----------------------------- purchase button handler -----------------//
    function handlePurchase(){
        //------------------------- if cart is empty ------------------------// 
        if(itemInCart === 0){
            toast.error("Your card is empty!.");    
            return;
        }
        //------------------------- purchase function -----------------------//
        dispatch(purchaseAllThunk());
        toast.success("Your order has been placed successfully!")
        //------------------------ render the myorder page ------------------//
        navigate("/myorder");
    }
    //---------------------------- returning the page -----------------------//
    return(
        <>
            {/* condition to show/hide the loading spinner */}
            {isLoading ? <Loader /> :
                //---------------- container --------------------------------//
                <div className = {secondStyles.mainContainer} >
                    <div className = {secondStyles.header} >
                        {/* welcome message */}
                        <div className = {secondStyles.userInfo} >
                            <h1>Hey {userLoggedIn.name} <small>This is you card</small></h1>
                        </div>
                        {/* cart detail */}
                        <div className = {secondStyles.cartDetail} >
                            <div>
                                {/* cart items */}
                                Item: {itemInCart} <br/>
                                {/* button for empty cart */}
                                <button className = {secondStyles.removeAll}
                                    onClick = {() => dispatch(clearCartThunk())} >
                                    Remove All
                                </button>
                            </div>
                            <div>
                                {/* total amount to add the card*/}
                                Total Amount: ₹{total}<br/>
                                {/* button to purchase products */}
                                <button className = {secondStyles.purchaseAll}
                                    onClick = {handlePurchase} >
                                    Purchase All
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* rendering all the products whic are presend in user card*/}
                    <div className = {firstStyles.itemContainer} >
                        {
                            cart.length === 0 ? <h1>Your Card is Empty!</h1> : 
                            cart.map((product, i) => <CartItem key = {i} product = {product} />)
                        }
                    </div>
                </div>
            }
        </>
    );
}
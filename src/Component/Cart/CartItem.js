//--------------------------------------- reducer actions ---------------------------//
import { useDispatch } from "react-redux";
//--------------------------------------- thunk actions -----------------------------//
import {removeFromCartThunk, increaseQuantThunk, decreaseQuantThunk} from "../../Redux/Reducers/productReducer";
//--------------------------------------- css ---------------------------------------//
import oldStyles from "../../styles/home.module.css"
import styles from "../../styles/cart.module.css";



//-------------------------------------- rendering the single cart -------------------//
export default function CartItem(props){
    //---------------------------------- calling the actions -------------------------//
    const dispatch = useDispatch();
    //----------------------------------- product data props --------------------------//
    const { name, image, price, category, quantity } = props.product;


    //----------------------------------- returning the page --------------------------//
    return(
        <>
            {/* card container */}
            <div className = {oldStyles.cardContainer} >
                {/* images container */}
                <div className = {styles.imageContainer} >
                    {/* product images */}
                    <img src = {image} alt = {category} />
                </div>
                {/* description of the products */}
                <div className = {styles.itemInfo}>
                    {/* product name */}
                    <div className = {styles.namePrice}>{name}</div>
                    {/* product quantity */}
                    <div className = {styles.priceQuant}>
                        {/* price of the product */}
                        <div className = {styles.price}>
                            ₹{price}   
                        </div>
                        {/* quantity of the product */}
                        <div className = {styles.quantity}>
                            {/* decrease the quantity */}
                            <span className = {styles.minus}>
                                <i class="fa-solid fa-circle-minus"
                                    //--------------- decrease the quantity product ------//  
                                    onClick = {() => dispatch(decreaseQuantThunk(props.product))} >
                                </i> 
                            </span>
                            {/* quantity */}
                             &nbsp; {quantity} &nbsp;
                            {/* increase the quantity of product */}
                            <span className={styles.plus}>
                                <i class="fa-solid fa-circle-plus"
                                    //---------- increase the quantity of product -------//
                                    onClick={() => dispatch(increaseQuantThunk(props.product))}>
                                </i>    
                            </span>
                        </div>
                    </div>
                    {/* remove from cart button */}
                    <div className = {styles.btnContainer}>
                        <button className = {styles.removeBtn}
                            // remove product from the cart
                            onClick = {() => dispatch(removeFromCartThunk(props.product))} >
                            Remove From Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
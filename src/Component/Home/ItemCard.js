//----------------------------------- calling the reducer actions -------------------------//
import { useDispatch } from "react-redux";
//----------------------------------- thunk action ----------------------------------------//
import { addToCartThunk } from "../../Redux/Reducers/productReducer";
//----------------------------------- css -------------------------------------------------//
import styles from "../../styles/home.module.css";



//------------------------------------ rendering the single product item ------------------//
export default function ItemCard(props){
    //-------------------------------- calling the actions --------------------------------//
    const dispatch = useDispatch();
    //--------------------------------- getting all the props -----------------------------//
    const { name, image, price, category } = props.item;


    //---------------------------------- return the page -----------------------------------//
    return(
        <>  
            {/* main container */}
            <div className = {styles.cardContainer} >
                {/* images */}
                <div className = {styles.imageContainer} >
                    <img src = {image} alt = {category} />
                </div>
                {/* description of the product */}
                <div className = {styles.itemInfo} >
                    <div className = {styles.namePrice} >
                        {/* name of product */}
                        <div className = {styles.name}>{name}</div>
                        {/* price of the product */}
                        <div className = {styles.price}>₹{price}</div>
                    </div>
                    {/* adding the cart button */}
                    <div className = {styles.btnContainer} >
                        <button className = {styles.addBtn}
                            //------------------- add product to the cart -------------------//
                            onClick = {() => dispatch(addToCartThunk(props.item))} >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
//----------------------------- creating slice and AsycnThunk -----------------------//
import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
//----------------------------- firebase database -----------------------------------//
import {db} from "../../firebaseInit";
import { updateDoc, doc, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";
//------------------------------ toast notificatioins ------------------------------//
import { toast } from "react-toastify";



//---------------------------- return the date -------------------------------------//
function getDate(){ 
    //------------------------ getting the current date ----------------------------//
    const date = new Date();
    //------------------------ day  ------------------------------------------------//
    let day = date.getDate();
    //------------------------ month -----------------------------------------------//
    let month = date.getMonth() + 1;
    //------------------------ year ------------------------------------------------//
    let year = date.getFullYear();
    //------------------------ date yy/mm/dd format --------------------------------//
    return(`${year}-${month}-${day}`);
}


//-------------------------------- async thunk function to order ---------------------//
export const getInitialCartOrdersThunk = createAsyncThunk(
    "product/getCartOrders",
    (args, thunkAPI) => {
        //------------------------- getting user's data ------------------------------//
        const { authReducer, productReducer } = thunkAPI.getState();
        const { isLoggedIn, userLoggedIn } = authReducer;
        //------------------------- checking user logged In or not --------------------//
        if(isLoggedIn){
            //---------------------- getting real-time update of data -----------------//
            onSnapshot(doc(db, "buybusy-redux", userLoggedIn.id), (doc) => {
                //------------------- adding all the data in cart ----------------------//
                const data = doc.data();
                thunkAPI.dispatch(setCart(data.cart));
                thunkAPI.dispatch(setMyOrders(data.orders));
            });
            //------------------------- returning the cart items ------------------------//
            return productReducer.cart;
        }
    }
)

 
//------------------------------------- async thunk to update cart ----------------------//
const updateCartInDatabase = createAsyncThunk(
    "product/updateCartInDatabase",
    async(args, thunkAPI) => {
        //------------------------------ user's data ------------------------------------//
        const {authReducer, productReducer} = thunkAPI.getState();
        const { userLoggedIn } = authReducer;
        //------------------------------ update the cart --------------------------------//
        const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: productReducer.cart
        });
    }
)


//------------------------------------- increasing the product quantity in cart --------//
export const increaseQuantThunk = createAsyncThunk(
    "product/increaseProductQuantity",
    async (product, thunkAPI) => {
        //------------------------------- user's data ----------------------------------//
        const {productReducer} = thunkAPI.getState();
        //-------------------------------- finding product in the cart -----------------//
        const index = productReducer.cart.findIndex((item) => item.name === product.name);
        //-------------------------------- increase the quantity in the cart -----------//
        thunkAPI.dispatch(increaseProductQuantity(index));      
        //-------------------------------- increase the total amount in the cart -------//
        thunkAPI.dispatch(increaseTotalAmount(product.price));
        //--------------------------------- update the cart ----------------------------//
        thunkAPI.dispatch(updateCartInDatabase());
    }
)


//---------------------------------------- decrease the quantity in the cart ------------//
export const decreaseQuantThunk = createAsyncThunk(
    "product/decreaseProductQuantity",
    async(product, thunkAPI) => {
        //-------------------------------- user's data ----------------------------------//
        const { productReducer } = thunkAPI.getState();
        //------------------------------- finding the product int the card --------------//
        const index = productReducer.cart.findIndex((item) => item.name === product.name);
        // if quantity of product is 1 then remove it from the cart
        if(productReducer.cart[index].quantity === 1){
            thunkAPI.dispatch(removeFromCartThunk(product));
            return;
        }
        //------------------------------- decrease the quantity in the cart ------------//
        thunkAPI.dispatch(decreaseProductQuantity(index));
        //------------------------------- reduce the total amount in the cart ----------//
        thunkAPI.dispatch(reduceTotalAmount(productReducer.cart[index].price));
        //-------------------------------- update the cart -----------------------------//
        thunkAPI.dispatch(updateCartInDatabase());
    }
)


//----------------------- async thunk function to adding a new product in the cart ------//
export const addToCartThunk = createAsyncThunk(
    "product/addToCart",
    async (product, thunkAPI) => {
        //-------------------------------- user's data -----------------------------------//
        const { authReducer, productReducer } = thunkAPI.getState();
        const { isLoggedIn, userLoggedIn } = authReducer;
        //------------------------------ checking user is logged in or not ----------------//
        if(!isLoggedIn){
            toast.error("Please! Login First!");
            return;
        }
        //----------------------------- checkingproduct already in cart or not ------------//
        const index = productReducer.cart.findIndex((item) => item.name === product.name);
        if(index !== -1){
            //------------------- If product already in cart then increase quantity -------//
            thunkAPI.dispatch(increaseQuantThunk(productReducer.cart[index]));
            toast.success("Product Quantity Increased successfully!");
            return;
        }
        //------------------------------- add the product in the cart --------------------//
        const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: arrayUnion({ quantity: 1, ...product })
        });
        //---------------------- increase the total amount and product quantity ----------//
        thunkAPI.dispatch(increaseTotalAmount(product.price));
        thunkAPI.dispatch(increaseTotalItem());
        toast.success("Items added successfully in your card!");
    }
);


//--------------------------------- remove the product in the cart -----------------------//
export const removeFromCartThunk = createAsyncThunk(
    "product/removeFromCart",
    async(product,thunkAPI) => {
        //-------------------------- user's data -----------------------------------------//
        const { authReducer } = thunkAPI.getState();
        const {userLoggedIn} = authReducer;
        //------------------------ remove the product in the cart -----------------------//
        const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: arrayRemove(product)
        });
        //------------------------ returning products ----------------------------------//
        return product;
    }
);


//----------------- async thunkfunction to remove all the products in the cart ---------//
export const clearCartThunk = createAsyncThunk(
    "product/emptyCart",
    async (args, thunkAPI) => {
        //----------------------------- user's data -------------------------------------//
        const { authReducer, productReducer } = thunkAPI.getState();
        const { userLoggedIn } = authReducer;
        if(productReducer.itemInCart === 0){
            toast.error("Your cart is emply!");    
            return;
        }
        //----------------------------- empty cart -------------------------------------//
        const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
        await updateDoc(userRef, {
            cart: []
        });
        toast.success("Cart is empty now!");
    }
);


//-------------------------------- async thunk function to purchase the product ---------//
export const purchaseAllThunk = createAsyncThunk(
    "product/purchaseAllItems",
    async (args, thunkAPI) => {
        //------------------------- user's data -----------------------------------------//
        const { authReducer, productReducer } = thunkAPI.getState();
        const { userLoggedIn } = authReducer;
        //------------------------- current data ----------------------------------------//
        const currentDate = getDate();
        //-------------------------- adding order ---------------------------------------//
        const userRef = doc(db, "buybusy-redux", userLoggedIn.id);
        await updateDoc(userRef, {
            orders: arrayUnion({
                date: currentDate,
                list: productReducer.cart,
                amount: productReducer.total
            })
        });
        //---------------------- removng the all products in the cart -------------------//
        thunkAPI.dispatch(clearCartThunk());
    }
);


//-------------------------------------- slice function ---------------------------------//
const productSlice = createSlice({
    name: "product",
    initialState: {
        cart: [],
        itemInCart: 0,
        myorders: [],
        total: 0
    },
    reducers: {
        //---------------------------- initializing the myorder -------------------------//
        setMyOrders: (state ,action) => {
            state.myorders = action.payload;
            return;
        },
        //--------------------------- increasing the quantity in the cart --------------//
        increaseProductQuantity: (state, action) => {
            const index = action.payload;
            state.cart.at(index).quantity++;
            return; 
        },
        //--------------------------- decreasing the quantity in the cart --------------//
        decreaseProductQuantity: (state, action) => {
            const index = action.payload;
            state.cart.at(index).quantity--;
            return;
        },
        //-------------------------- initializing  the cart ----------------------------//
        setCart: (state, action) => {
            state.cart = action.payload;
            return;
        },
        //------------------------ increasing the total number of items in cart --------//
        increaseTotalItem: (state, action) => {
            state.itemInCart++;
            return;
        },
        //------------------------- increase the total amount in the cart --------------//
        increaseTotalAmount: (state, action) => {
            state.total += action.payload;
            return;
        },
        //------------------------- decreasing the total amount in the cart -----------//
        reduceTotalAmount: (state,action) => {
            state.total -= action.payload;
            return;
        }
    },
    //--------------------------------- extra reducer ----------------------------------//
    extraReducers: (builder) => {
        //------------------------------ update the state ------------------------------//
        builder.addCase(getInitialCartOrdersThunk.fulfilled, (state, action) => {
            const cart = action.payload;
            if(cart){    
                let sum = 0, len = 0;
                cart.map((item) => {
                    Number(sum += item.price * item.quantity);
                    Number(len += item.quantity);
                    return sum;
                });
                state.total = sum;
                state.itemInCart = len;
            }
        })
        //--------------- updating state after increasing product quantity --------------//
        .addCase(increaseQuantThunk.fulfilled, (state, action) => {
            state.itemInCart++;
        })
        //-------------- updating state after decreasing product quantity in cart -------//
        .addCase(decreaseQuantThunk.fulfilled, (state, action) => {
            if(state.itemInCart > 1){
                state.itemInCart--;
            }
        })
        //----------------- updating state after removing product in the cart ------------//
        .addCase(removeFromCartThunk.fulfilled, (state, action) => {
            const product = action.payload;
            //----------------- reducing the item count and total amount ------------------//
            state.total -= product.quantity * product.price;
            state.itemInCart -= product.quantity;
            toast.success("Items removed successfuly from the cart!");
        })
        //-------------------- updating state after removing all products -----------------//
        .addCase(clearCartThunk.fulfilled, (state, action) => {
            state.itemInCart = 0;
            state.total = 0;
            state.cart = [];
        })
    }
});


//-------------------------------- exporting the reducer slice ----------------------------//
export const productReducer = productSlice.reducer;

//------------------------------- exporting the all actions of reducers -------------------//
export const { 
    setMyOrders, 
    increaseProductQuantity, 
    decreaseProductQuantity, 
    setCart, 
    increaseTotalItem,
    increaseTotalAmount, 
    reduceTotalAmount 
} = productSlice.actions;

//-------------------------------- exporting the state -----------------------------------//
export const productSelector = (state) => state.productReducer;
//------------------------------ creating Slice and Async Thunk function ----------------------//
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//------------------------------ firebase database -------------------------------------------//
import { db } from "../../firebaseInit";
import { collection, addDoc, onSnapshot } from "firebase/firestore";  
//----------------------------- toast notification ------------------------------------------//
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



//----------------------------- initial State to store data --------------------------------//
const initialState = { userList: [], isLoggedIn: false, userLoggedIn: null };


//---------- getting list of all the users in the firebase DB using async thunk ------------//
export const getInitialUserList = createAsyncThunk(
    "auth/userList",
    (args, thunkAPI) => {
        //-------------------- fetrching data from firebase --------------------------------//
        const allUsers = onSnapshot(collection(db, "buybusy-redux"), (snapshot) => {
            const users = snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            thunkAPI.dispatch(setUserList(users));
        });
        console.log("All users", allUsers);
    }
);


//------------------------------- creating new user by using async thunk ------------------//
export const createUserThunk = createAsyncThunk(
    "auth/createUser",
    async (data, thunkAPI) => {
        const {authReducer} = thunkAPI.getState();
        const {userList} = authReducer;
        //--------------------- checking whether user's already exist or not --------------//
        const index = userList.findIndex((user) => user.email === data.email);
        //--------------------- if email/user address already exits inside database -------//
        if(index !== -1){
            toast.error("This email already exits. Please! try other email's");
            return;
        }
        //--------------------- if email/user not found create new user -------------------//
        await addDoc(collection(db, "buybusy-redux"), {
            name: data.name,
            email: data.email,
            password: data.password,
            cart: [],
            orders: [],
        }); 
        toast.success("New user created successfully!🥰, Please! LogIn");
    }
)


//------------------------------ signIn user by using async thunk -----------------------//
export const createSessionThunk = createAsyncThunk(
    "auth/createSession",
    async (data, thunkAPI) => {
        const {authReducer} = thunkAPI.getState();
        const {userList} = authReducer;
        //---------------------- finding user inside exiting list ------------------------//
        const index = userList.findIndex((user) => user.email === data.email);
        //--------------------- checking the condition -----------------------------------//
        if(index === -1){
            toast.error("User/Email not found Please! try again.");
            return false;
        }
        //--------------------- checking condition email with password -------------------//
        if(userList[index].password === data.password){
            toast.success("Sign In Successfully!🥰");
            thunkAPI.dispatch(setLoggedIn(true));
            thunkAPI.dispatch(setUserLoggedIn(userList[index]));
            //---------------- generating user's login token and store user's data  ------//
            window.localStorage.setItem("token", true);
            window.localStorage.setItem("index", JSON.stringify(userList[index]));
            return true;
        }
        else{
            //----------------- if Email/password doesn't match --------------------------//
            toast.error("Invalid Email/Password, Please! try again");
            return false;
        }
    }
);


//---------------------------- SignOut by using async function ---------------------------//
export const removeSessionThunk = createAsyncThunk(
    "auth/removeSession", 
    () => {
        //------------------ remove the user's data and token from local storage ---------//
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("index");
    }
)


//---------------------------- creating sclice function -----------------------------------//
const authSlice = createSlice({
    name: 'authentication',
    initialState,
    //------------------------ reducer ----------------------------------------------------//
    reducers: {
        setUserList: (state, action) => {
            state.userList = action.payload;
        },
        //--------------------- user isLoggedIn or not --------------------------------------//
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        //-------------------- loggedIn user ------------------------------------------------//
        setUserLoggedIn: (state, action) => {
            state.userLoggedIn = action.payload;
        }
    },
    //----------------------- extra reducer -------------------------------------------------//
    extraReducers: (builder) => {
        builder
            .addCase(removeSessionThunk.fulfilled, (state, action) => {
            //--------------- remove the user's token and data from initialState ------------//
                state.isLoggedIn = false;
                state.userLoggedIn = null;
                toast.success("You are sign out successfully! ✔");
            }
        )
    }
});


//---------------------------- exporting the reducer --------------------------------------//
export const authReducer = authSlice.reducer;

//---------------------------- exporting the reducer  -------------------------------------//
export const {setLoggedIn, setUserLoggedIn, setUserList} = authSlice.actions;

//---------------------------- exporting the user state to fetching data ------------------//
export const authSelector = (state) => state.authReducer;
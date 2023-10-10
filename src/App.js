//--------------------------------- Importing the required components --------------------//
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import { Home } from "./Pages/Home";
import {MyOrder} from "./Pages/MyOrder";
import {Cart} from "./Pages/Cart";
import {SignIn} from "./Pages/SignIn";
import { SignUp } from "./Pages/SignUp";
import { Error } from "./Pages/Error";



//---------------------------------- main app function ----------------------------------//
function App() {
  //-------------------------------- all link of routes ---------------------------------//
  const router = createBrowserRouter([
    {
      path: "/", 
      element: <Navbar />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home />},
        { path: "/myorder", element: <MyOrder />},
        { path: "/cart", element: <Cart />},
        { path: "/signin", element: <SignIn />},
        { path: "/signup", element: <SignUp />},
      ]
    }
  ]);


  return (
    <>
      <RouterProvider router = {router} />
    </>
  );
}

//-------------------------------------- exporting the default app ---------------------//
export default App;
//----------------------------------------- css ---------------------------//
import styles from "../../styles/home.module.css";
//---------------------------------------- import component ---------------//
import ItemCard from "./ItemCard";
//----------------------------------------- product data ------------------//
import { data } from "../../Assets/data";



//---------------------------------- showing the all the products ---------//
export default function MainContent(props) {
    //------------------------------ getting the all props ----------------//
    const { search, price, category, applyFilter } = props; 
    
    //----------------------------- return the page -----------------------//
    return(
        //------------------------ main container -------------------------//
        <div className = {styles.itemContainer}>
                {/* filtering the data on the basis of search bar */}
                {data.filter((item) => {
                        return search.toLocaleLowerCase() === "" ? item : item.name.toLocaleLowerCase().includes(search)})
                        //--------- filtering the items on the basis of price range  ----//
                        .filter((item) => {
                                return !applyFilter
                                ? item
                                : item.price <= price})
                        //---------- filter the items on the basis of category ----------//
                        .filter((item) => {
                                return !applyFilter || category === "none"
                                ? item
                                : item.category === category})
                        //---------- map to each item of the array -----------------------//
                        .map((item) => <ItemCard 
                                key = {item.id} 
                                item = {item} />
                        )
                }
        </div>
    )
}
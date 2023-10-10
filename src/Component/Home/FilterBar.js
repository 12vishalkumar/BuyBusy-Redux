//-------------------------------------------- css ------------------------------//
import styles from "../../styles/home.module.css";



//-------------------------------------------- rendering the filter bar ---------//
export default function FilterBar(props) {
    const { price, setPrice, setCategory } = props;


    //---------------------------------------- return the page ------------------//
    return(
        //------------------------------------ main container -------------------//
        <div className = {styles.filterBar} >
            {/* main heading */}
            <h1>FilterBar</h1>
            {/* price rangers  */}
            <div className = {styles.priceRange} >
                {/* price */}
                <span> Price </span>
                {`<= ${price}`}<br />
                {/* slider input  */}
                <input type = "range" 
                    min = "100" 
                    max = "50000" 
                    value = {price} 
                    onChange = {(e) => setPrice(e.target.value)} 
                />
            </div>
            {/* sort the items by category */}
            <div className = {styles.categoryBox} >
                {/* category */}
                <span>Category: </span>
                {/* radio buttons */}
                <div>
                    {/* men's category */}
                    <input type = "radio" 
                        id = "men" 
                        value = "men" 
                        name = "category" 
                        onClick = {() => setCategory("men")} />
                    <label for = "men">Men</label>
                    {/* women's category */}
                    <input type = "radio" 
                        id = "women" 
                        value = "women" 
                        name = "category"
                        onClick = {() => setCategory("women")} />
                    <label for="women">Women</label>
                    {/* electronic category */}
                    <input type = "radio" 
                        id = "electric" 
                        value = "electric" 
                        name = "category"
                        onClick = {() => setCategory("electric")} />
                    <label for="electric">Electronic</label>
                    {/* jewellery category */}
                    <input type = "radio" 
                        id = "jewellery" 
                        value = "jewellery" 
                        name = "category"
                        onClick = {() => setCategory("jewellery")} />
                    <label for="jewellery">Jewellery</label>
                    {/* All category */}
                    <input type = "radio" 
                        id = "none" 
                        value = "none" 
                        name = "category"
                        onClick = {() => setCategory("none")} />
                    <label for = "jewellery">All</label>
                </div>
            </div>
        </div>
    )
}
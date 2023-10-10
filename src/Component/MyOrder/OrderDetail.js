//-------------------------------------- css -------------------------------//
import styles from "../../styles/myorder.module.css";



//------------------------------------- render the each items details ------//
export default function OrderDetail(props){
    //--------------------------------- order details as athe props --------//
    const { date, list, amount } = props.order;


    //--------------------------------- return the page --------------------//
    return(
        //----------------------------- order container -------------------//
        <div>
            {/* ordring date */}
            <h1 className = {styles.orderHeading} >You Ordered On : {date}</h1>
            {/* table for containing order details */}
            <table>
                {/* first row as the heading of the table */}
                <tr>
                    <th>S.no</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
                {/* rendering all the product's within the order */}
                {list.map((product, i) => 
                    <tr>
                        <td>{i + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>X{product.quantity}</td>
                        <td>₹{product.quantity * product.price}</td>
                    </tr>)
                }
                {/* last row for total amount*/}
                <tr className = {styles.totalAmount}>
                    <td colSpan = {4}>Total Amount</td>
                    {/* total amount */}
                    <td>₹{amount}</td>
                </tr>
            </table>
        </div>
    )
}
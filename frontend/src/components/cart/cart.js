import React ,{Component}from 'react';
import './cart.css';
class Cart extends React.Component{
    constructor(props){
        super(props);
    }

    

    render(){
        const itemsInCart = this.props.items;

        return (
            <div className="cart">
            <div> <h2>CART</h2></div>
             <ul>
                {itemsInCart.map(item=>{
                    return (
                        <li key={item._id}>{item.name} {item.price} {item.quantity}</li>
                    );
                })}
            </ul>
            </div>
        );
    }



}

export default Cart;
import React ,  { Component } from 'react';
import './menu.css';

class Menu extends Component {

    state ={
        products: []

    }


    componentWillMount(){
        this.fetchProducts();
    }

    fetchProducts(){
        const  requestBody  = {
            query:`
                query{
                    products{
                        _id
                        name
                        description
                        price
                        type
                        isVeg
                    }
                }
            `
        }

    fetch('http://localhost:8000/graphql',{
            method:'POST',
            body: JSON.stringify(requestBody),
            headers:{
                'Content-Type' : 'application/json'
            }
        }).then(res =>{
            if(res.status !== 200 && res.status !==201){
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(products =>{
            
            const obtainedProducts = products.data.products;
            this.setState({products:obtainedProducts});

            
        })
               
        .catch(err => {
            console.log(err);
        })
    }

    handleAddProduct = (product) => {
        

         this.props.onAdd(product);
    }


    render(){
        const listProducts = this.state.products.map(product => {
            return( <tr key={product._id}>
                        <td className="table_prod_name_desc"><span>{product.name}</span><p>{product.description}</p></td>
                         
                        <td className="table_prod_price">$ {product.price}</td>
                        <td className="table_prod_addtocart"><button onClick={() => this.handleAddProduct(product)}>Add</button></td>
                    </tr>)
                    
            })


        return  <table className="product_table">
                    <tbody>
                    {listProducts}
                    </tbody>
                </table>
                 
    }
};


export default Menu;
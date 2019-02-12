import React, { Component } from 'react';
import { BrowserRouter ,Route, Redirect, Switch} from 'react-router-dom';
import AuthPage from './pages/auth';
import Menu from './pages/menu';
import Orders from './pages/orders';
import MainNav from './components/Navigation/MainNav';
import Cart from './components/cart/cart';
import AuthContext from './components/context/auth-context';

//import { AuthPage , Menu , Orders} from './pages/index';
import './App.css';

class App extends Component {

  state ={
    userId:null,
    token:null,
    cartItems:[]
  }

  logIn = (userId,token,tokenExpiration) =>{
      this.setState({userId:userId,token:token});
  };

  logOut = () => {
    this.setState({userId:null,token:null});
  };

  addToCart = (item) => {
    
    let productExists =false;

    let updatedCart = this.state.cartItems.map((cartItem)=>{
      if(cartItem._id === item._id){
        productExists=true;
        cartItem.quantity++;
        return cartItem;
      }
      else{
        return cartItem;
      }

    })
     

    
    if(!productExists){
      updatedCart.push({_id:item._id,name:item.name,description:item.description,price:item.price,isVeg:item.isVeg,quantity:1})
       
     }
     
     this.setState({cartItems:updatedCart});
    // let itemQuantity = existingCartItems.find(item => item._id === existingCartItems._id);
    // console.log(itemQuantity);



    // existingCartItems.push(item);
    // console.log(existingCartItems);
    // this.setState({cartItems:existingCartItems});
  };


  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{
          token:this.state.token,
          userId: this.state.userId,
          logIn:this.logIn,
          logOut: this.logOut

        }}>
       <React.Fragment>
        <MainNav />
        <Cart items={this.state.cartItems} />
          <main className="main-content">
            <Switch>
              <Redirect from='/' to='/menu' exact />
              <Route path='/orders' component={Orders} />
              <Route 
                  path='/menu' 
                  render={(props) => <Menu {...props} onAdd = {this.addToCart}   />} 
                   />
            </Switch>
          </main>
        </React.Fragment>
        </AuthContext.Provider>
      </BrowserRouter>
    
    );
  }
}

export default App;

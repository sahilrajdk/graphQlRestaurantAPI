import React ,  { Component } from 'react';
import './auth.css';
import AuthContext from '../components/context/auth-context';


class AuthPage extends Component {
    constructor(props){
        super(props);

        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
     
    }

    state ={
        isLoggedin : true
    }

    static contextType = AuthContext;
    

    switchModeHandler = () => {
          this.setState(prevState =>{
            return { isLoggedin: !prevState.isLoggedin };
        })
    }

    handleForm = (event) => {
        event.preventDefault();
        if(this.context.userId !== null){
            this.context.logOut();
            return;
        }


        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if(email.trim().length === 0 || password.trim().length === 0){
            return;
        }

        let  requestBody  = {
            query:`
                query{
                    login(email: "${email}",  password: "${password}"){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `
        }

          
        if( !this.state.isLoggedin ){
            requestBody = {
                query: `
                mutation {
                    createCustomer(custInput: {email: "${email}", password: "${password}"}){
                        _id
                        email
                    }
                }
                `
           }
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
        .then(resData =>{
            if (resData.data.login.token){
                this.context.logIn(resData.data.login.token,resData.data.login.userId,resData.data.login.tokenExpiration);
                
            }
        })
               
        .catch(err => {
            console.log(err);
        })
    }



    render(){
        const userId = this.context.userId;


        return (
            <form className="login_form"   onSubmit={this.handleForm}>
            { userId === null &&
                <React.Fragment>
                  <input type="email" id="email"  ref={this.emailEl}  />
                  <input type="password" id="password"  ref={this.passwordEl}/>
                  </React.Fragment>
            }

             
            
             <button type="submit">{this.context.userId  ? 'Log Out': 'Log In'}</button>
          </form>
         );
    }
};


export default AuthPage;
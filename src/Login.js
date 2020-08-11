import React from 'react'
import validator from 'validator'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class Login extends React.Component{

    constructor(){
        super()
        this.state = {
            email:'',
            errMsg: ''
        }
    }

    handleChange=(e)=> {
      const email = e.target.value  
      this.setState({email})
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(validator.isEmail(this.state.email)){
            axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            const user = response.data.find(ele => ele.email === this.state.email)
           if(user){
               const userId=user.id
               localStorage.setItem('login', 'true')
               localStorage.setItem('id', userId)
               this.props.history.push('/dashboard')
           }
             else{
                 const errMsg = 'Email does not exists'
                 this.setState({errMsg})
             }
           
            })
        }
        else{
            const errMsg = 'invalid email format'
            this.setState({errMsg})
        }
            
    }  
  render(){
      
        return (
            <div>
                    
                    <h1>LOGIN</h1>
                    <form onSubmit={this.handleSubmit}>
                    <input 
                    type='text'
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder='enter your email'/>
                    <br />
                     <input 
                     type="submit" />
                    </form>
                    <p>{this.state.errMsg}</p>
                    
                </div>
            
        )
    }
}
export default withRouter (Login)
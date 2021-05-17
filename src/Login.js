import React from "react"
import axios from "axios"
import {Redirect} from 'react-router-dom'

class Login extends React.Component 
{
    constructor() 
    {
        super()
        this.state=
        {
            email: "",
            users:[]
        }
    }

    handleChange=(e)=> 
    {
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit=(e)=> 
    {
        e.preventDefault()
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => 
        {
            const users=response.data.find(ele => ele.email == this.state.email)
            if(users) 
            {
                localStorage.setItem("storedId", users.id)
                this.setState({ users })
            } 
            else 
            {
                alert("Email is not registered")
                this.setState({email: ''})
            } 
        })
    }
    render()
    {
        console.log(this.state)
        return (
            <div>
                {
                    localStorage.length != 0 ? (<Redirect to={`/userProfile/${localStorage.getItem("storedId")}`} />) : 
                    (
                        <div>
                            <h2>Login</h2>
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="enter email and press enter"
                                />
                            </form>
                        </div>
                    ) 
                }
            </div>
        )
    }
}

export default Login
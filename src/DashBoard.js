import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'


class UserShow extends React.Component {
    constructor (){
        super()
        this.state = {
            user:{},
            posts:[]
            
        }
    }
    componentDidMount(){
        
        const userId = parseInt(localStorage.getItem('Id'))
        axios.get(`http://jsonplaceholder.typicode.com/users/${userId}`)
          .then((response) => {
              const user = response.data
              this.setState({user})

          })
        
        axios.get(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`)
          .then((response) => {
              
              const posts = response.data
              this.setState({posts})
          }) 
    }

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push('/')
    } 
    
            
    render(){
        const status = localStorage.getItem('login')
         return(
           
           <div>
            {status && <button onClick = {this.handleLogout}> Logout </button>}
    <div>
                <h2>NAME: {this.state.user.name}</h2>
                <h2>email: {this.state.user.email}</h2>
                <h2>phone: {this.state.user.phone}</h2>
    </div>
           
                <h3>POSTS</h3>
                    <ul>
                     {
                        this.state.posts.map((users) => {
                           return <li key={users.id}> { users.title} {users.body}</li>})
                     }
                    </ul>
               
                </div>
                
        )
    }
}
export default UserShow
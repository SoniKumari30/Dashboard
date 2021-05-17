import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class UserProfile extends React.Component{
    constructor()
    {
        super()
        this.state=
        {
            user:[],
            posts:[],
            status:false
        }
    }
    componentDidMount()
    {
        if(localStorage.length != 0) 
        {
            const userId = localStorage.getItem("storedId")
            axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
            .then((response)=>
            {
                const user = response.data
                this.setState({ user })
            })
            .catch((err)=>
            {
                console.log(err)
            })
            axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
            .then((response)=>
            {
                const posts = response.data
                this.setState({ posts })
            })
            .catch((err)=>
            {
                console.log(err)
            })
        } 
          
        else 
        {
            alert('you are not logged in')
            this.setState({ status: true })
        }
        
    }
    
    handleOut=()=>
    {
        localStorage.clear()
        this.setState({status:true})
    }

    render()
    {
        return (
            <div>
                {this.state.status && <Redirect to='/'/> }
                <button onClick={this.handleOut}>Log out</button>
                <h2>Name:-{this.state.user.name}</h2>
                <h2>Email:-{this.state.user.email}</h2>
                <h2>Phone:-{this.state.user.phone}</h2>
                <h2>Website:-{this.state.user.website}</h2><hr />
                <h1>Posts made</h1>
                <ul>
                    {
                        this.state.posts.map((post, i) => {
                            return (
                                <li key={i}>
                                    <h2>{post.title}</h2>
                                    <p>{post.body}</p><hr/>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default UserProfile
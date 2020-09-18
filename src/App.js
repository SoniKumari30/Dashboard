import React from 'react'
import { BrowserRouter, Route,  } from 'react-router-dom'
import LoginForm from './Login'
import UserShow from './DashBoard'

function App () {
    return (
        <BrowserRouter>
        
        <div>
            <Route path="/" component={LoginForm} exact={true} />
            <Route path="/UserShow" component={UserShow} exact={true} />
            
            
            
        </div>
        </BrowserRouter>
       
    )
}

export default App
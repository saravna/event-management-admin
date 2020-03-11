import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Signin from './components/Signin/Signin'
import Event from './components/Event/Event'
import Mentor from './components/Mentor/Mentor'

function AppRouter() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path='/' component={Signin}/>
                    <Route path='/admin/event' component={Event}/>
                    <Route path='/admin/mentor' component={Mentor}/>
                </Switch>
            </Router>
        </div>
    )
}

export default AppRouter

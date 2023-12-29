import React from 'react'

import Dashboard from './dashboard'
import Userlist from './userlist'
import AddUser from '../components/adduser'
import Preview from './preview'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
const PrivateRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/dashboard" component={Dashboard}></Route>
                <Route exact path='/userlist' component={Userlist} />
                <Route exact path='/adduser' component={AddUser} />
                <Route path='/edituser/:id' component={AddUser} />
                <Route path='/userlist/:id' component={Preview} />
                <Route path="*" render={() => <Redirect to="/dashboard" />} />
            </Switch>
        </Router>
    )
}

export default PrivateRoutes
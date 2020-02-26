import React from 'react'
import {  Route, Switch} from 'react-router-dom'
import HomePage from '../../pages/home'
import UserPage from '../../pages/user'
import Header from '../header'
import ButtonItem from '../button'

import './app.scss'


const App = () =>{
    

    return(
        <main role="main" className="main">
                <Header />
            <section className="container">
                <Switch>
                    <Route 
                    path='/'
                    component={HomePage}
                    exact
                    />
                    <Route path="/user/:id" component={UserPage}
                    exact/>
                    

                </Switch>
            </section>

        </main>

    )
}

export default App


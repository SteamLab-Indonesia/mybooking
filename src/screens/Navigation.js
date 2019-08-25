import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import SignUp from './SignUp';
import ReactPaper from './QueueList';
import Login from './Login';
import SplashScreen from './SplashScreen';
import Dashboard from './Dashboard';
import QueueList from './QueueList';

export default class Navigation extends Component{
    render() {
        console.log('Render Navigation');
        return (
                <Switch>
                    <Route exact path="/" component={SplashScreen} />
                    <Route path='/queuelist' component={QueueList}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/signup' component={SignUp}/>
                    <Route path='/dashboard' component={Dashboard} />
                </Switch>
        );
    }
}   
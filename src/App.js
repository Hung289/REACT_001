import React, { useEffect } from 'react';
import "./styles/style.scss"
// import { Route, Switch, Redirect, HashRouter, useLocation, Router } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    HashRouter
} from "react-router-dom";
// import Header from "./components/Header.jsx"
import Auth from "./components/Auth.js"
import Home from "./components/Home.js"
import http from "./api/http"
// import { Router } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { history } from "./utils/history";
import { LoginRequestSuccess, CheckLoginRequest } from './redux/action/auth';
function App(props) {
    const dispatch = useDispatch()
    const { isLogger } = useSelector(state => state.auth)

    const token = localStorage.getItem("access_token")
    const checkLogin = async () => {
        dispatch(CheckLoginRequest())
    }
    useEffect(() => {
        if (token) {
            checkLogin()
        }
    }, [])
    return (
        <div className="App">
            <HashRouter history={history} >
                <Switch>
                    <Route exact path="/" render={() => {
                        return isLogger ? <Redirect to="/home"></Redirect> : <Auth></Auth>
                    }}></Route>
                    <Route path="/home" render={() => {
                        return isLogger ? <Home></Home> : <Redirect to="/"></Redirect>
                    }}></Route>
                </Switch>
            </HashRouter>
        </div>
    );
}

export default App;
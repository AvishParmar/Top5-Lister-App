import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    REGISTER_USER: "REGISTER_USER",
    LOGOUT_USER: "LOGOUT_USER",
    ACCOUNT_ERROR: "ACCOUNT_ERROR"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: false
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: false,
                    errorMessage: ""
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false,
                    errorMessage: ""
                })
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false,
                    errorMessage: ""
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: false,
                    errorMessage: ""
                })
            }
            case AuthActionType.ACCOUNT_ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: true,
                    errorMessage: payload
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function (userData, store) {
        try{
            const response = await api.getLoggedIn(userData);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GET_LOGGED_IN,
                    payload: {
                        loggedIn: response.data.loggedIn,
                        user: response.data.user,
                        error: false 
                    }   
                });
            }
        }
        catch(err){
            authReducer({
                type: AuthActionType.ACCOUNT_ERROR,
                payload: err.response.data.errorMessage
            })
        }
        
    }

    auth.registerUser = async function(userData, store) {
        try{
            const response = await api.registerUser(userData);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }
        catch(err){
            console.log(err.response.data.errorMessage);
            authReducer({
                type: AuthActionType.ACCOUNT_ERROR,
                payload: err.response.data.errorMessage
            })
        }
    }

    auth.loginUser = async function(userData, store) {
        try{
            const response = await api.loginUser(userData);
            console.log(response.status);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
                store.loadIdNamePairs();
            }
        }catch(err){
            authReducer({
                type: AuthActionType.ACCOUNT_ERROR,
                payload: err.response.data.errorMessage
            })
        }
    }

    auth.logoutUser = async function(userData, store){
        const response = await api.logoutUser(userData);
        console.log(response.status);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        }
    }
    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };
import './App.css';
import * as React from "react";
import {Navigate} from "react-router";
import {createContext, Dispatch, SetStateAction, useState} from "react";

function checkToken() : string {
    const savedToken = localStorage.getItem('token');
    if(!savedToken){
        return '';
    }
    return savedToken;
}

export const TokenContext = createContext<[string, Dispatch<SetStateAction<string>>]>
([checkToken(), () => {}]);

function App() {
    const [token, setToken] = useState(checkToken())

    if(!token){
        return(
            <TokenContext.Provider value={[token, setToken]}>
                <Navigate to={'login'} replace={true}/>
            </TokenContext.Provider>
        );
    }else{
        return(
            <Navigate to={'home'} replace={true}/>
        );
    }
}

export default App;

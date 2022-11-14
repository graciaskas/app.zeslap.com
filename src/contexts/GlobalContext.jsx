import React from "react";
import { useState } from "react";

const BASE_URI = 'http://'+window.location.hostname+':8081/v1';


export const GlobalContext = React.createContext();

export default function GlobalProvider({ children }) {
    const [ loading, setIsLoading ] = useState(false);
    
    //Custom setState function to manage loading state variable
    const setLoading = (value) => setTimeout(setIsLoading(value), 500);
        
    //Context shared values
    const values = {
        BASE_URI,
        loading,
        setLoading
    };

    return (
        <GlobalContext.Provider value={values}>
            { children }
        </GlobalContext.Provider>
    )
}
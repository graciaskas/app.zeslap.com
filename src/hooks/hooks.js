import React,{ useState} from "react"

export const useParameters = (currentLocation) => {
    let parameters = new URLSearchParams(currentLocation.search);
    return useState(parameters);
}
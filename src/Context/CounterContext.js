import { createContext, useState } from "react";

export let counterContext = createContext();

export function CounterConetextProvider(props){
    let [counter , setCounter] = useState(0)
    let [userName , setUserName] = useState('')
    return <counterContext.Provider value={{userName , counter}}>
        {props.children}
    </counterContext.Provider>
}
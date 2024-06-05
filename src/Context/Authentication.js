import axios from "axios";
import { createContext } from "react";

export const authenticationContext = createContext()
export function AuthenticationContextProvider(props) {
    let headers = { token: localStorage.getItem("userToken") };
    
     function changeUserPassword(body){
        return  axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword` ,
         
            body
            
            
        ,{
            headers
        }).then(response => response).catch(err => err)
    }

    return <authenticationContext.Provider value={{changeUserPassword}}>
        {props.children}
    </authenticationContext.Provider>
}
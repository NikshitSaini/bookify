import { useContext } from "react";
import { usercontext } from "../contexts/UserContext";

export function UseUser(){
    const context= useContext(usercontext);

    if(context===undefined){
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
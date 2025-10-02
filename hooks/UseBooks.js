import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export function UseBooks(){
    const context= useContext(BooksContext);

    if(context===undefined){
        throw new Error("useUser must be used within a Books Provider");
    }
    return context;
}
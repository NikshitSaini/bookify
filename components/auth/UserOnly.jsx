import { useEffect } from "react";
import { UseUser } from "../../hooks/UseUser";
import { useRouter } from "expo-router";
import ThemedLoader from "../ThemedLoader";

const UserOnly=({children})=>{
    
    const{AuthChecked,user}=UseUser();
    const router=useRouter();

    useEffect(()=>{
        if(AuthChecked && !user){
            router.replace('/login');
        }
    },[user,AuthChecked])

    if(!AuthChecked || !user){
        return (
            <ThemedLoader/>
        )
    }
    return children; 
}
export default UserOnly;
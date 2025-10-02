import { createContext,useEffect,useState } from "react";
import { account } from "../lib/appwrite";
import { ID } from "appwrite";
export const usercontext = createContext();

export function UserProvider({children}){
    const[user,setuser] = useState(null);
    const[AuthChecked,setAuthChecked]=useState(false);

    async function login(email,password){
        try{
            await account.createEmailPasswordSession({email,password,})

            const res= await account.get();
            setuser(res);
            setAuthChecked(true); // Ensure auth is marked as checked after login
        }
        catch(err){
            throw Error(err.message);
        }
    }
    async function register(email,password){
        try{
            const res= await account.create({userId: ID.unique(),email,password});
            await login(email,password);
        }
        catch(err){
            throw Error(err.message);
        }
    }

    async function logout(){ 
        await account.deleteSession({ sessionId: "current" });
        setuser(null);
    }

    async function getInitialUserValue(){
        try{
            const res = await account.get();
            if (res) {
                setuser(res);
            } else {
                setuser(null);
            }
        }
        catch(err){
            console.error('Auth check error:', err.message);
            setuser(null);
        }finally{
            setAuthChecked(true);
        }
    }

    useEffect(()=>{
        // Ensure we catch any errors during initial auth check
        getInitialUserValue().catch(err => {
            console.error('Initial auth check failed:', err);
            setuser(null);
            setAuthChecked(true);
        });
    },[])
    return(
        <usercontext.Provider value={{user,login,register,logout,AuthChecked}}>
            {children}
        </usercontext.Provider>
    )
}
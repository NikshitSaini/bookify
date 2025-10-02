import { createContext, useEffect, useState } from "react";
import { databases,client } from "../lib/appwrite";
import { ID, Role,Permission, Query } from "appwrite";
import { UseUser } from "../hooks/UseUser";
export const BooksContext = createContext(); 

const DATABASE_ID = "68c96f8e0005787ef683";
const COLLECTION_ID = "books";

export function BooksProvider ({ children }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const[AuthChecked,setAuthChecked]=useState(false);

    const{user}=UseUser();
    async function fetchBooks() {
        setLoading(true);
        try {
                if (!user?.$id) {
                    // wait a bit until user is available
                    console.warn("User not ready, retrying fetchBooks in 200ms");
                    setTimeout(fetchBooks, 200); // re-try automatically
                    return;
                }
                const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [
                    Query.equal("userId", user.$id)
                ]
            );
            setBooks(response.documents);
        } catch (error) {
            console.error("Error fetching books:", error.message);
        } finally {
            setLoading(false);
        }
    }
    const fetchPublicBooks = async () => {
        setLoading(true);
        try{
            const res = await databases.listDocuments(
                DATABASE_ID, 
                COLLECTION_ID,
                [Query.equal("visibility", true)]
            );
            return res.documents;
        }catch(error){
            console.error("Error fetching public books:", error.message);
            return null;
        }finally{
            setLoading(false);
        }
    };
    async function fetchBooksById(id) {
        setLoading(true);
        try {
            const response=await databases.getDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            );
            return response;

        } catch (error) {
            console.error("Error fetching book by ID:", error.message);
            return null;
        } finally {
            setLoading(false);
        }
    }
    async function createBook(data) {
    setLoading(true);
    try {
        const permissions = [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id))
        ];
        
        // Ensure visibility is a boolean and properly pass it from data
        const visibility = Boolean(data.visibility);
        
        // Add public read permission if the book is public
        if (visibility === true) {
            permissions.push(Permission.read(Role.any()));
        }

        const newbook = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
            title: data.title,
            author: data.author,
            description: data.description,
            visibility: visibility,
            userId: user.$id,
        },
        permissions
        );
        
        // Don't manually update books state, let the subscription handle it
        return newbook;
    } catch (error) {
        console.error("Error adding book:", error.message);
        throw error;
    } finally {
        setLoading(false);
    }
    }


    async function deleteBook(id) {
        setLoading(true);
        try {
            await databases.deleteDocument(
                DATABASE_ID,
                COLLECTION_ID,
                id
            )
        } catch (error) {
            console.error("Error deleting book:", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        let unsubscribe;
        const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;
        if (user) {
            setAuthChecked(true);
            // Fetch initial books
            fetchBooks();
            
            // Set up realtime subscription
            unsubscribe = client.subscribe(channel, (response) => {
                const { events, payload } = response;
                
                if (events.some((e) => e.includes("create"))) {
                    // Only add the book if it belongs to the current user
                    if (payload.userId === user.$id) {
                        setBooks((prevBooks) => {
                            // Remove any existing book with the same ID first
                            const filteredBooks = prevBooks.filter(book => book.$id !== payload.$id);
                            return [...filteredBooks, payload];
                        });
                    }
                } else if (events.some((e) => e.includes("delete"))) {
                    setBooks((prevBooks) => prevBooks.filter((book) => book.$id !== payload.$id));
                }
            });
        } else {
            setAuthChecked(false);
            setBooks([]);
        }
        
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [user]);
     
    return (
        <BooksContext.Provider value={{ books, fetchBooks,fetchBooksById,fetchPublicBooks,createBook,deleteBook}}>
            {children}
        </BooksContext.Provider>
    );
}
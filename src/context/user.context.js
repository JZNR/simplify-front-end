import { createContext, useEffect, useState } from 'react'
import { verify } from '../api';

const UserContext = createContext();

function UserProviderWrapper({ children }) {
    
    const [ loggedUser, setLoggedUser ] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function authenticateUser() {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
            try {
                const response = await verify(storedToken);
                setLoggedUser(response.data);
                setIsLoading(false);
            } catch (error) {
                setLoggedUser(null)
                setIsLoading(false);
            }
        } else {
            setLoggedUser(null);
            setIsLoading(false);
        };
    };

    function logout() {
        localStorage.removeItem("authToken");
        authenticateUser();
    }
    
    useEffect(() => {
        authenticateUser();
    }, []);
    
    return(
        <UserContext.Provider value={{
            loggedUser,
            setLoggedUser,
            authenticateUser,
            logout,
            isLoading,
            setIsLoading
        }}>
            {children}
        </UserContext.Provider>
    )
};

export { UserProviderWrapper, UserContext};
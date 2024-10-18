import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({children}) => {
    const { isLoggedIn } = useAuth()
    const alertShown = localStorage.getItem('alertShown');

    if(!isLoggedIn){
        if(!alertShown){
            alert('You\'re still logged out')
            localStorage.setItem('alertShown', 'true');
        }
        useEffect(() => {
            if(alertShown){
                localStorage.removeItem('alertShown');
            }
        }, [isLoggedIn]);
        return <Navigate to='/' />
    }

    return children;
}

export default ProtectedRoute;
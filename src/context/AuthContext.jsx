import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                user: action.payload.user
            }
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: null,
                token: null,
                user: null
            }
        default:
            return state;
    }
}

export const AuthProvider = (({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        isLoggedIn: !!localStorage.getItem('token'),
        token: localStorage.getItem('token'),
        user: null
    })

    const login = async(username, password) => {
        try{
            const response = await axiosInstance.post('/auth/login', {username, password})
            const {data} = response.data;

            if(data) {
                localStorage.setItem('token', data.token);
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        token: data.token,
                        user: data.role
                    }
                })
            } else{
                throw new Error('Login failed: No token received')
            }
        } catch(e) {
            console.log('Invalid username or password')
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        dispatch({type: 'LOGOUT'})
    }

    const value = {
        ...authState,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
})
import  { useState } from 'react';
import useAuthContext from './useAuthContext';
import axios from "axios";

function useLogin(props) {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const {dispatch} = useAuthContext();
    const baseUrl = process.env.REACT_APP_BACKEND_URL;


    const login = async (email,password) => {
        setIsLoading(true);
        setError(null);

        const response = await axios.post(`${baseUrl}/api/user/login`, { email, password},{
            headers: { 'Content-Type': 'application/json'},
        });

        const json = await response.data;

        if(response.statusText !== 'Created'){
            setIsLoading(false);
            setError(json.error);
        }

        if (response.statusText === 'Created') {
            setIsLoading(false);
            setError(null)

            // Save auth user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //Update auth context
            dispatch({ type: 'LOGIN', payload: json})

        }

    }

    return { login, isLoading, error}

}

export default useLogin;
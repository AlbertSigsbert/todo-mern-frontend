import  { useState } from 'react';
import axios from "axios";
import useAuthContext from './useAuthContext';

function useSignUp(props) {
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const {dispatch} = useAuthContext();
    const baseUrl = process.env.REACT_APP_BACKEND_URL;

    const signup = async (email,password) => {
        setIsLoading(true);
        setError(null);

        const response = await axios.post(`${baseUrl}/api/user/signup`,{ email, password},{
            headers: { 'Content-Type': 'application/json'},
        });

        const json = await response.json();

        if(response.statusText !== 'Created'){
            setIsLoading(false);
            setError(json.error);
        }

        if (response.statusText === 'Created') {
            // Save auth user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            //Update auth context
            dispatch({ type: 'LOGIN', payload: json});

            setIsLoading(false);
            setError(null)

        }

    }

    return { signup, isLoading, error}

}

export default useSignUp;
import  { useState } from 'react';
import useAuthContext from './useAuthContext';

function useSignUp(props) {
    
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const {dispatch} = useAuthContext();

    const signup = async (email,password) => {
     
        setIsLoading(true);
        setError(null);


        const response = await fetch('/api/user/signup',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password})
        });

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.error);
        }

        if (response.ok) {
           

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
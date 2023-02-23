import useAuthContext from "./useAuthContext";
import useTodoContext from "./useTodoContext";

function useLogout(props) {
  const { dispatch } = useAuthContext();
  const { dispatch:todoDispatch } = useTodoContext();

  const logout = () => {
    //Remove user from LS
    localStorage.removeItem('user');

    // Update Auth Context
    dispatch({ type: 'LOGOUT'});

    // Update Todo Context
     todoDispatch({ type: 'SET_TODOS', payload: null});

  }
  
  return { logout };

}

export default useLogout;
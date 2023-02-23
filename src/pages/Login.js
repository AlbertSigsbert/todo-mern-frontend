import React,{ useState }  from "react";
import useLogin from "../hooks/useLogin";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login,isLoading,error} = useLogin();
  
    const handleSubmit = async (e) => {
       e.preventDefault();
  
      await login(email,password);
    }
    return (
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={isLoading}>Login</button>
        {error && <div className="error">{error}</div> }
      </form>
    );
  }
  
  export default Login;
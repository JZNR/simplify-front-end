import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login } from '../api';
import { toast } from 'react-toastify';
import { useState, useContext } from 'react';
import { UserContext } from '../context/user.context';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setLoggedUser } = useContext(UserContext)
    const { authenticateUser} = useContext(UserContext);

    function handlePasswordChange(event){
        setPassword(event.target.value);
    };

    function handleEmailChange(event){
        setEmail(event.target.value);
    };

    async function handleSubmitForm(event) {
        event.preventDefault();
        try {
            const response  = await login({email, password});
            localStorage.setItem("authToken", response.data);

            await login({email, password});
            
            // setting the logged user in the context
            // setLoggedUser({ email, password });
            authenticateUser();
            toast.success("User logged in");
            navigate("/");

        } catch (error) {
            toast.error("Whatever occured here", error);
        }
    };

    return (
        <>
            <h3>Login</h3>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={email} onChange={handleEmailChange}/>

                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={handlePasswordChange}/>
                
                <button type='submit'>Login</button>
            </form>
            <p>Don't have an account?</p>
            <Link to={'/signup'}>Sign Up</Link>
        </>
  )
}

export default Login;
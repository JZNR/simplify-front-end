import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { signup } from '../api';
import { toast } from 'react-toastify';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handlePasswordChange(event){
        setPassword(event.target.value);
    };

    function handleEmailChange(event){
        setEmail(event.target.value);
    };

    async function handleSubmitForm(event) {
        event.preventDefault();
        try {
            await signup({email, password})
            toast.success("User Created");
            navigate("/");
        } catch (error) {
            toast.error("Whatever occured here", error);
        }
    };

    return (
        <>
            <h3>Signup</h3>
            <form onSubmit={handleSubmitForm}>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={email} onChange={handleEmailChange}/>

                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={password} onChange={handlePasswordChange}/>
                
                <button type='submit'>Signup</button>
            </form>
            <p>Already have an account?</p>
            <Link to={'/login'}>Login</Link>
        </>
  )
}

export default Signup
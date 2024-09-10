import { useState } from "react";
import {useLogin} from "../hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <>
            <h2>Login</h2>
            <form className="Login" onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button type="submit">Log In</button>
                {error && <div className="error">{error}</div>}
            </form>
        </>
    );
};

export default Login

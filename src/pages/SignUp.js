import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error } = useSignup()
    const [focus, setFocus] = useState({
        email: false,
        password: false,
    });

    const handleFocus = (field) => {
        setFocus({ ...focus, [field]: true });
    };

    const handleBlur = (field, e) => {
        if (!e.target.value) {
            setFocus({ ...focus, [field]: false });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password);
    }

    return (
        <>
            <div className="container">
                <form className="login" onSubmit={handleSubmit}>
                    <h1>SignUp</h1>
                    <div
                        className={`input-wrapper ${
                            focus.email ? "focused" : ""
                        }`}
                    >
                        <label htmlFor="email" className="label">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onFocus={() => handleFocus("email")}
                            onBlur={(e) => handleBlur("email", e)}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div
                        className={`input-wrapper ${
                            focus.password ? "focused" : ""
                        }`}
                    >
                        <label htmlFor="password" className="label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onFocus={() => handleFocus("password")}
                            onBlur={(e) => handleBlur("password", e)}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className="error">{error}</div>}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    );
}

export default SignUp
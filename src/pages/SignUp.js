import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await signup(email, password)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h2>Sign Up</h2>
            <form className="SignUp" onSubmit={handleSubmit}>
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
                <button type="submit">Sign Up</button>
                {error && <div className="error">{error}</div>}
            </form>
        </>
    );
}

export default SignUp
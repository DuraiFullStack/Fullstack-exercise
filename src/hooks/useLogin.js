import { useState } from "react";
import { setUser } from "./accessUser";
import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
    const [error, setError] = useState(null);
    const {user, dispatch} = useAuthContext()

    const login = async (email, password) => {
        const response = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setUser(json)
            dispatch({type: 'LOGIN', payload: json})
        }
    };
    return { user, login, error };
};
//
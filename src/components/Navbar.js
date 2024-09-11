import {Link, Navigate, Outlet} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { user } = useAuthContext()
    const { dispatch } = useAuthContext();
    const removeUser = () => {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
    }
    //
    return (
        <>
            {user && <Navigate to="/tasks" />}
            {!user && <Navigate to="/login" />}
            <div className="navbar">
                <h1>totoList</h1>
                {user && (
                    <div>
                        <Link to="/tasks">{user.email}</Link>
                        <button onClick={removeUser}>Log out</button>
                    </div>
                )}
                {!user && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </div>
                )}
            </div>
            <Outlet />
        </>
    );
}

export default Navbar
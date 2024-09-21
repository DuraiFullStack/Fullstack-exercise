import { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodo.js";
import { useAuthContext } from "../hooks/useAuthContext.js";

const Home = () => {
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [data, setData] = useState([]);
    const [appear, setAppear] = useState(false);
    const [error, setError] = useState(null);
    const { user, dispatch } = useAuthContext();
    const backendURL = "https://todolist-api-9hcz.onrender.com";

    const getValue = async () => {
        const response = await fetch(backendURL + "/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
                title: title,
                description: desc,
            }),
        });
        const json = await response.json();
        if(response.ok) {
            fetchData(); 
            setTitle(null);
            setDesc(null);
            setAppear(false);
            setError(null);
        }
        if (!response.ok) {
            setError(json.error)
        }
    };

    const fetchData = async () => {
        const response = await fetch(backendURL + "/tasks", {
            headers: {
                authorization: `Bearer ${user.token}`,
            },
        });

        if (!response.ok) {
            if(response.status == 401){
                localStorage.removeItem('user')
                dispatch({type: "LOGOUT"})
            }
        }

        const jsonData = await response.json();
        setData(jsonData);
    };
    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    return (
        <>
            <div className="todoArea">
                {data.map((item, index) => {
                    return (
                        <>
                            <CreateTodo
                                key={item._id}
                                id={index}
                                todo={item}
                                fetch={fetchData}
                            />
                        </>
                    );
                })}
                {!appear && (
                    <input
                        className=" addBtn"
                        type="button"
                        value="Add task"
                        onClick={() => {
                            setAppear(true);
                        }}
                    />
                )}
            </div>
            {appear && (
                <div className="inputCard">
                    <div className="box">
                        <input
                            className="input"
                            type="text"
                            placeholder="enter title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            className="input"
                            type="text"
                            placeholder="enter description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        {error && <div className="error-task">{error}</div>}
                        <input
                            className="defaultBtn btn"
                            type="button"
                            onClick={getValue}
                            value="create"
                        />
                        <input
                            className="defaultBtn btn-close"
                            type="button"
                            onClick={() => { setAppear(false); setError(null)}}
                            value="X"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;

import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateTodo = (props) => {
    const [tit, setTit] = useState("");
    const [des, setDes] = useState("");
    const [appear, setAppear] = useState(false);
    const { user } = useAuthContext();
    //
    async function deleteValue(ide) {
        try {
            await fetch("http://localhost:3000/tasks/" + ide, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${user.token}`,
                },
            });
        } catch (err) {
            console.log(err);
        }
        props.fetch();
    }

    async function updateValue(ide, tit, des) {
        try {
            await fetch("http://localhost:3000/tasks/" + ide, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    title: tit,
                    description: des,
                }),
            });
            props.fetch();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="todo" id={props.todo._id}>
                <div className="face1">
                    <h1>{props.todo.title}</h1>
                    <p>{props.todo.description}</p>
                </div>
                <div className="face2">
                    <input
                        className="defaultBtn "
                        type="button"
                        value="delete"
                        onClick={() => {
                            deleteValue(props.todo._id);
                            console.log(props.key);
                        }}
                    />
                    <input
                        className="defaultBtn "
                        type="button"
                        value="edit"
                        onClick={() => {
                            setAppear(true);
                            setTit(props.todo.title);
                            setDes(props.todo.description)
                        }}
                    />
                </div>
                {appear && (
                    <div className="inputCard">
                        <div className="box">
                            <input
                                className="input"
                                type="text"
                                value={tit}
                                onChange={(e) => setTit(e.target.value)}
                            />
                            <input
                                className="input"
                                type="text"
                                value={des}
                                onChange={(e) => setDes(e.target.value)}
                            />
                            <input
                                className="defaultBtn btn"
                                type="button"
                                value="conform"
                                onClick={() => {
                                    updateValue(props.todo._id, tit, des);
                                    setAppear(false);
                                }}
                            />
                            <input
                                className="defaultBtn btn-close"
                                type="button"
                                onClick={() => setAppear(false)}
                                value="X"
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CreateTodo;

import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const CreateTodo = (props) => {
    const [tit, setTit] = useState("");
    const [des, setDes] = useState("");
    const [appear, setAppear] = useState(false);
    const {user} = useAuthContext()

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
                </div>
                <div className="face2">
                    <p>{props.todo.description}</p>
                    <input
                        type="button"
                        value="delete"
                        onClick={() => {
                            deleteValue(props.todo._id);
                            console.log(props.key);
                        }}
                    />
                    {!appear && (
                        <input
                            type="button"
                            value="edit"
                            onClick={() => setAppear(true)}
                        />
                    )}
                </div>
                {appear && (
                    <>
                        <div className="inputCard">
                            <input
                                type="text"
                                placeholder="enter title"
                                onChange={(e) => setTit(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="enter description"
                                onChange={(e) => setDes(e.target.value)}
                            />
                            <input
                                type="button"
                                value="conform"
                                onClick={() => {
                                    updateValue(props.todo._id, tit, des);
                                    setAppear(false);
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CreateTodo;

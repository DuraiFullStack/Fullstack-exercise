import { useState } from "react";

const CreateTodo = (props) => {
  const [tit, setTit] = useState("");
  const [des, setDes] = useState("");
  const [appear, setAppear] = useState(false);
  return (
    <>
      <div id={props.todo._id}>
        <h1>{props.todo.title}</h1>
        <h2>{props.todo.description}</h2>
        <input
          type="button"
          value="delete"
          onClick={() => props.delete(props.todo._id)}
        />
        {!appear && (
          <input type="button" value="edit" onClick={() => setAppear(true)} />
        )}
        {appear && (
          <>
            <input
              type="text"
              placeholder="enter title"
              onChange={(e) => setTit(e.target.value)}
            />
            <input
              type="text"
              placeholder="enter title"
              onChange={(e) => setDes(e.target.value)}
            />
            <input
              type="button"
              value="conform"
              onClick={() => {
                props.update(props.todo._id, tit, des);
                setAppear(false);
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default CreateTodo;
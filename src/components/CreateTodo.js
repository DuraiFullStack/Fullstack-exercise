const CreateTodo = (props) => {
  return (
    <>
      <div key={props.todo.id} id={props.todo.id}>
        <h1>{props.todo.title}</h1>
        <h2>{props.todo.description}</h2>
        <input
          type="button"
          value="delete"
          onClick={() => props.delete(props.todo.id)}
        />
      </div>
    </>
  );
};

export default CreateTodo;
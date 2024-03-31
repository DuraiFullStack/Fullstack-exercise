import { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo.js";

const Body = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [data, setData] = useState([]);
  const [click, setClick] = useState(true);

  async function deleteValue(ide) {
    try {
      const response = await fetch("http://localhost:3000/tasks/" + ide, {
        method: "DELETE",
      });
      setData(data.filter((a)=>a.id != ide));
    } catch (err) {
      console.log(err);
    }
  }

  const getValue = async () => {
    console.log(click);
    setClick((preClick) => !preClick);
    setData([...data, { title: title, description: desc }]);
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: desc,
        }),
      });
    } catch (err) {
      console.log(err);
    }
    setTitle("");
    setDesc("");
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="enter title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter description"
        onChange={(e) => setDesc(e.target.value)}
      />
      <input type="button" onClick={getValue} value="create" />
      {data.map((item, index)=>{
        return <CreateTodo key={index} todo={data[index]} delete={deleteValue} />
      })}
    </>
  );
};

export default Body;

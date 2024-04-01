import { useEffect, useState } from "react";
import CreateTodo from "./CreateTodo.js";

const Body = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [data, setData] = useState([]);
  const [click, setClick] = useState(true);

  async function deleteValue(ide) {
    try {
      await fetch("http://localhost:3000/tasks/" + ide, {
        method: "DELETE",
      });
    } catch (err) {
      console.log(err);
    }
    const newarr = data.filter((a) => a.id != ide);
    newarr.map((items, index)=>{
      items.id = index;
    })
    setData(newarr);
  }

  const update = (id, tit, des) => {
    const upData = data;
    upData[id].title=tit;
    upData[id].description = des;
    setData(upData);
    updateValue(id);
  };

  async function updateValue(ide) {
    try {
      await fetch("http://localhost:3000/tasks/" + ide, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data[ide]),
      });
    } catch (err) {
      console.log(err);
    }
  }

  const getValue = async () => {
    console.log(click);
    setClick((preClick) => !preClick);
    setData([...data, { id: data.length, title: title, description: desc }]);
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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input type="button" onClick={getValue} value="create" />
      {data.map((item,index) => {
        return (
          <>
            <CreateTodo key={index} id={index} todo={item} delete={deleteValue} update={update}/>
          </>
        );
      })}
    </>
  );
};

export default Body;

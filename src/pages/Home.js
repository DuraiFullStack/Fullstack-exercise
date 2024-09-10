import { useEffect, useState } from "react";
import CreateTodo from "../components/CreateTodo.js";
import { useAuthContext } from "../hooks/useAuthContext.js";

const Home = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [data, setData] = useState([]);
  const [appear, setAppear] = useState(false)
  const { user } = useAuthContext()

  const getValue = async () => {
    try {
      await fetch("http://localhost:3000/tasks", {
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
      fetchData();
    } catch (err) {
        console.log(err);
    }
    setTitle("");
    setDesc("");
    setAppear(false)
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks", {
          headers: {
              authorization: `Bearer ${user.token}`,
          },
      });
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.log(err);
    }
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
                        <CreateTodo key={item._id} id={index} todo={item} fetch={fetchData} />
                    </>
                );
            })}
        </div>
        {appear && (
            <div className="inputCard">
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
            </div>
        )}
        {!appear && (
            <input
                type="button"
                value="Add task"
                onClick={() => {
                    setAppear(true);
                }}
            />
        )}
      </>
  );
};

export default Home;

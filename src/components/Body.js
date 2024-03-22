import { useEffect, useState } from "react";

const Body = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  async function getValue() {
    try{
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
      const data = await response.json();
      console.log(data);
    }catch(err){
      console.log(err);
    }
  }

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
      <input type="button" onClick={getValue} />
    </>
  );
};

export default Body;

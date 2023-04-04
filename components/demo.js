import { React, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import DemoItem from "./demoItem";

function Demo() {
  const [newdemo, setnewdemo] = useState("");
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({});
    const requestParams = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: inputData }),
    };

    async function fetchData() {
        const res = await fetch("../api/apiGetData");
        const newData = await res.json();
        setData(newData);
    }

    useEffect(() => {
        fetchData();
    }, [newdemo]);

  const handleinput = (e) => {
    setnewdemo(e.target.value);
  setInputData({
    ...inputData,
    newdemo: e.target.value,
  });
  };
  const HandleSubmit = (e) => {
    addTodoItem();
    setnewdemo("");
  };

  async function addTodoItem() {
    await fetch("../api/apiCreateData", requestParams)
      .then(() => fetchData())
      .catch((e) => console.log(e));
  }

  return (
    <div className={styles.maincont}>
      <h1>Demo Todo</h1>
      <div className={styles.newdemo}>
        <h3></h3>
        <div className={styles.semi}>
          <input
            type="text"
            value={newdemo}
            onChange={(e) => handleinput(e)}
          ></input>
          <button onClick={() => HandleSubmit()}>
            Add Todo
          </button>
        </div>
      </div>
      <div>
       {
        data &&
            data.map((demo) => (
            <DemoItem key={demo.ref["@ref"].id} dataDemo={demo} updateTodo={fetchData} />
            ))
        }
      </div>
    </div>
  );
}
export default Demo;
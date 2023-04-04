import { React, useState } from "react";
import styles from "../styles/Home.module.css";

function DemoItem(props) {
    const [isChecked, setIsChecked] = useState(false);
    const [done, isDone] = useState(true);
    const [aDelete, isDeleted] = useState("");
    const [inputData, setInputData] = useState({});
    let d = "";
  
    const handlecheck = async () => {
        isDone(!props.dataDemo.data.done);
        let c = !props.dataDemo.data.done;
        isDeleted(props.dataDemo.ref["@ref"].id);
        d = props.dataDemo.ref["@ref"].id;
        let g = {
          ...inputData,
          done: c,
        };
        await fetch("../api/apiUpdateData", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
      
          body: JSON.stringify({ data: g, id: d }),
        })
          .then(() => props.updateTodo())
          .catch((e) => console.log(e));
      };
      
      const handleDelete = () => {
        d = props.dataDemo.ref["@ref"].id;
        isDeleted(props.dataDemo.ref["@ref"].id);
        deleteItem();
      };
      
      async function deleteItem() {
        await fetch("../api/apiDeleteData", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
      
          body: JSON.stringify({ id: d }),
        })
          .then(() => props.updateTodo())
          .catch((e) => console.log("e: ", e));
      }

  return (
    <div>
    <span className={styles.eachtodo}>
      <p className={styles.text}>{props.dataDemo.data.name}</p>
      <div>
        <input
          type="checkbox"
          className={styles.toggle}
          defaultChecked={props.dataDemo.data.done}
          onChange={handlecheck}
          onClick={() => setIsChecked(!isChecked)}
        />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </span>
  </div>
  );
}
export default DemoItem;
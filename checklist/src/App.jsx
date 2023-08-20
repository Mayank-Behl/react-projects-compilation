import { useState } from "react";
import "./App.css";

function App() {
  const [isCitizen, setIsCitizen] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const changeRecorder = (e) => {
    if (e.target.type === "checkbox") {
      if (e.target.name === "isCitizen") {
        setIsCitizen(e.target.checked);
      } else if (e.target.name === "isOver") {
        setIsOver(e.target.checked);
      }
    }
    else{
      
    }
  };

  return (
    <form>
      <h1>Are you a Citizen : {isCitizen ? "Yes" : "No"}</h1>
      <h1>Are you a over 21 : {isOver ? "Yes" : "No"}</h1>
      <label>
        Are you a Citizen ?
        <input
          type="checkbox"
          checked={isCitizen}
          name="isCitizen"
          onChange={changeRecorder}
        />
      </label>
      <br />
      <label>
        Are you a over 21 ?
        <input
          type="checkbox"
          checked={isOver}
          name="isOver"
          onChange={changeRecorder}
        />
      </label>
    </form>
  );
}

export default App;

import { useState } from "react";
import Counter from "./counter";
import CounterButtons from "./CounterButtons";
// import "./assets/App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    //One parent div
    //-> Child div that will have the count
    //-> Child div2  that will have the button which would increment of decrement the count of the above div

    <div className="counter-container">
      <Counter />
      <CounterButtons />
    </div>
  );
}

export default App;

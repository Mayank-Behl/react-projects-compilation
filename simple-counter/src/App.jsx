import { useState } from "react";
import Counter from "./counter";
import CounterButtons from "./CounterButtons";
import "./assets/App.css";

function App() {
  const [count, setCount] = useState(0);
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  function decrementCount(setShowRefreshButton) {
    if (count - 1 <= -50) {
      setShowRefreshButton(true);
    }
    setCount(count - 1);
  }

  function incrementCount(setShowRefreshButton) {
    if (count + 1 >= 50) {
      setShowRefreshButton(true);
    }
    setCount(count + 1);
  }

  function handleRefresh() {
    setShowRefreshButton(false);
    setCount(0);
  }

  return (
    //One parent div
    //-> Child div that will have the count
    //-> Child div2  that will have the button which would increment of decrement the count of the above div

    <div className="app">
      <Counter count={count} showRefreshButton={showRefreshButton} />
      <CounterButtons
        decrementCount={decrementCount}
        incrementCount={incrementCount}
        showRefreshButton={showRefreshButton}
        handleRefresh={handleRefresh}
      />
    </div>
  );
}

export default App;

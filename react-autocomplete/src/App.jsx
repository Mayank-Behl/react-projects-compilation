import "./App.css";
import Autocomplete from "./Autocomplete";

// App-> Autocomplete component->Show suggestions based on the user input

function App() {
  return (
    <div className="autocomplete">
      <h1>Auto complete component</h1>
      <Autocomplete />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./App.css";

const getUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  console.log(data);
  return data;
};

function App() {
  const [userData, setUserData] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const debounceFetch = setTimeout(async () => {
      const users = await getUsers();
      const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(userInput) ||
          user.email.toLowerCase().includes(userInput)
      );
      setUserData(filteredUsers);
    }, 300);

    return () => clearTimeout(debounceFetch); // Clear the timeout on cleanup
  }, [userInput]);

  const filterSearch = (e) => {
    let val = e.target.value.trim().toLowerCase();
    console.log(val);
    setUserInput(val);
  };

  return (
    <div className="contianer">
      <div className="search-container">
        <label htmlFor="user-search">Search Users</label>
        <input
          type="text"
          name="user-search"
          id="user-search"
          onKeyUp={(e) => filterSearch(e)}
        />
      </div>
      <div className="result-container">
        {/* Render user card with map that will have h3 and p */}
        {userData.map((user) => (
          <div className="user-card" key={user.id}>
            <h3 className="user-name">{user.name}</h3>
            <p className="user-email">{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

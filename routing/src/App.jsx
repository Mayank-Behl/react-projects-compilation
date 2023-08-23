import { Link, NavLink, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

import { NotFound } from "./pages/NotFound";
import "./App.css";
import { BookLayout } from "./BookLayout";
import { BookRoutes } from "./BookRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/books" element={<h1>Extra Content</h1>} />
      </Routes>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/books">Books</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/*" element={<BookRoutes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

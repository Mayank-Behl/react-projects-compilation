import React from "react";
import "./App.css";
import Accordion from "./Accordion";
import { accordionData } from "./utils/content";

function App() {
  return (
    <div>
      <h1>React Accordion Demo</h1>
      <div className="accordion">
        {accordionData.map(({ title, content }) => (
          <Accordion title={title} content={content} />
        ))}
      </div>
    </div>
  );
}

export default App;

// Refrence : https://www.freecodecamp.org/news/build-accordion-menu-in-react-without-external-libraries/
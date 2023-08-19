import { useState } from "react";

export default function Accordion({ title, content }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        {/* By default the val is false */}
        <div>{title}</div>
        <div>{isActive ? "-" : "+"}</div>
        {/* If true then show - otherwise show + */}
      </div>
      {/* If clicked, making the component active then only render the content */}
      {isActive && <div className="accordion-content">{content}</div>}
    </div>
  );
}

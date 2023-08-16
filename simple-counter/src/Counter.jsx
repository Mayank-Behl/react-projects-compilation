import React from "react";
import "./assets/App.css";

export default function Counter({ count }) {
  let limitMessage = null;

  if (count < -5) {
    limitMessage = "Negative Limit Exceeded";
  } else if (count > 5) {
    limitMessage = "Positive Limit Exceeded";
  }

  return (
    <h1 className={count > 0 ? "positive" : count < 0 ? "negative" : null}>
      {limitMessage !== null ? (
        <span className="limit-exceeded">{limitMessage}</span>
      ) : (
        count
      )}
    </h1>
  );
}

import React, { useState } from "react";
import "./assets/App.css";

export default function CounterButtons({
  incrementCount,
  decrementCount,
  handleRefresh,
  showRefreshButton,
}) {
  return (
    <div className="counter-buttons">
      <button onClick={decrementCount}>-</button>
      <button onClick={incrementCount}>+</button>
      {showRefreshButton && (
        <button onClick={handleRefresh} className="refresh-button">
          Refresh
        </button>
      )}
    </div>
  );
}
/**
 * Need a refresh button above the -/+ button
 * Refresh button should get enabled when the negative/positive limit is reached
 * Upon clicking refresh button the counter's count should revert back to 0 and the button should disappear
 */

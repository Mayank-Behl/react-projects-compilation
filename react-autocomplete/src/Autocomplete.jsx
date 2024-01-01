import React, { useEffect, useState } from "react";
import "./App.css";
/*
    1. Create a state to record users input 
    2. When there is a change in the input box -> Call showSuggestions function and pass the value (userInput)
    3. Show suggestions fn -> filters the suggestions and sets the flag to show the suggestions div
*/

export default function Autocomplete() {
  //states
  //to track user input
  const [userInput, setUserInput] = useState("");
  //contain filtered suggestions
  const [filteredResults, setFilteredResults] = useState([]);
  //maintain the state for suggested index for arrow keys
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  const upis = [
    "okhdfcbank",
    "okaxis",
    "okicici",
    "oksbi",
    "ybl",
    "paytm",
    "kotak",
  ];

  //functions

  // Handle change in the input field
  function handleChange(event) {
    //sets the userInput value
    const value = event.target.value;
    setUserInput(value);

    // Define the pattern to match: {username}@
    const match = value.match(/^(.*?)@(.*?)$/);

    // Check if the entered value matches the pattern
    /**
     * Match[0] is the complete string
     * match[1] is the first expression in the regex(.*?)
     * match[2] is the second expression in the regex(.+)
     * $ denotes the end
     */
    const shouldShowSuggestions =
      match && match[1].trim() !== "" && match[2].trim() !== "";

    // If conditions are met, filter the suggestions; otherwise, show an empty array, filters on the basis of match[2]
    const filtered = shouldShowSuggestions
      ? upis.filter((upi) => upi.toLowerCase().includes(match[2].toLowerCase()))
      : [];

    setFilteredResults(filtered);
    setSelectedSuggestionIndex(0);
  }

  // Handle click on suggestion item LI
  function handleSuggestionClick(suggestion) {
    // Append the selected suggestion after the '@' symbol
    setUserInput((prevInput) => {
      // Use a regular expression to capture the part before the '@' symbol
      const match = prevInput.match(/^(.*?)@/);
      // Extract the captured part or set an empty string if no match
      const prefix = match ? match[1] : "";
      // Concatenate the prefix, '@', and the selected suggestion
      return `${prefix}@${suggestion}`;
    });
    // Clear suggestions after selecting one
    setFilteredResults([]);
  }

  // Handle click on input field to accept recommendation
  function handleInputClick() {
    if (filteredResults.length > 0) {
      setUserInput((prevInput) => {
        const match = prevInput.match(/^(.*?)@/);
        const prefix = match ? match[1] : "";
        return `${prefix}@${filteredResults[0]}`;
      });

      setFilteredResults([]);
    }
  }

  //Handle Key presses
  useEffect(() => {
    // Auto-fill the input field with the first suggestion when right key is pressed
    const handleKeyPress = (event) => {
      if (event.key === "ArrowRight" && filteredResults.length > 0) {
        setUserInput((prevInput) => {
          const match = prevInput.match(/^(.*?)@/);
          const prefix = match ? match[1] : "";
          return `${prefix}@${filteredResults[0]}`;
        });
      } else if (event.key === "ArrowDown" && filteredResults.length > 0) {
        // Move down in the suggestions list
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex < filteredResults.length - 1 ? prevIndex + 1 : 0
        );
      } else if (event.key === "ArrowUp" && filteredResults.length > 0) {
        // Move up in the suggestions list
        setSelectedSuggestionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredResults.length - 1
        );
      } else if (event.key === "Enter" && filteredResults.length > 0) {
        // Select the suggestion and set in the input
        setUserInput((prevInput) => {
          const match = prevInput.match(/^(.*?)@/);
          const prefix = match ? match[1] : "";
          return `${prefix}@${filteredResults[selectedSuggestionIndex]}`;
        });
        setFilteredResults([]);
        setSelectedSuggestionIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    // The useEffect returns a cleanup function to remove the event listener when the component unmounts, preventing memory leaks.
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [filteredResults, selectedSuggestionIndex]);

  // Handle click outside the autocomplete container
  const handleOutsideClick = (event) => {
    const autocompleteContainer = document.querySelector(
      ".autocomplete-container"
    );

    if (
      autocompleteContainer &&
      !autocompleteContainer.contains(event.target)
    ) {
      // Clicked outside the autocomplete container, close suggestions
      setFilteredResults([]);
    }
  };

  // Add a click event listener when the component mounts
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="autocomplete-container">
      <div className="user-input-section">
        {/* value: value from the state userInput -> populated in the input field -> onChange is the ine who is getting this value to the state*/}
        <input
          className="upi-input"
          type="text"
          onChange={handleChange}
          value={userInput}
          onClick={handleInputClick}
        />
      </div>

      {
        <div className="suggestions-section">
          <ul className="filtered-suggestion">
            {filteredResults.map((suggestion, index) => (
              <li
                key={index}
                className={`suggested-item ${
                  index === selectedSuggestionIndex ? "selected" : ""
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
}

/**
 * 1. Click on the LI elements to autocomplete [DONE]
 * 2. should show type ahead, which upon click(in the input field) or pressing right arrow should complete it, (should be the very first recommendation)
 * 3. press down arrow to traverse the items & enter to select them
 * 4. Include debouncing
 *
 */

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
//OtpComponent will have 6 input fields

const OtpComponent = ({ onOtpfilled }) => {
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [isTimerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    // Set a timer for 1 minute (60,000 milliseconds)
    const timer = setTimeout(() => {
      setTimerExpired(true);
    }, 60000);
    console.log(isTimerExpired);
    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Run this effect only once on component mount

  useEffect(() => {
    //For all elements returns true or false if string is not empty or empty respectively
    const allFilled = otpDigits.every((digit) => digit !== "");
    // Check if the timer has expired
    if (allFilled && !isTimerExpired) {
      onOtpfilled(true); // Allow submission
    } else {
      onOtpfilled(false); // Disable submission
    }
  }, [otpDigits, onOtpfilled, isTimerExpired]);

  const handleInputChange = (e, index) => {
    // Check if the timer has expired
    if (isTimerExpired) {
      e.preventDefault();
      return;
    }

    // Prevent the default behavior for non-numeric keys
    if (isNaN(e.target.value)) {
      e.preventDefault();
      return;
    }

    const input = e.target.value;

    //User input typeof is string -> Convert to number use parseInt
    const numericInput = parseInt(input, 10);

    // Validate input to allow only numbers
    if (Number.isInteger(numericInput)) {
      // Create a copy of the current state array
      const newOtpDigits = [...otpDigits];

      // Update the digit at the specified index
      newOtpDigits[index] = numericInput;

      // Update the state with the new array
      setOtpDigits(newOtpDigits);
    }
    if (index <= 5 && input !== "") {
      const nextInput = document.getElementById(`otpInput-${index + 1}`);
      if (nextInput) nextInput.focus();
    } else {
      index = index;
    }
  };

  const handleKeys = (e, index) => {
    if ((e.key === "Backspace" || e.key === "Delete") && index >= 0) {
      //Create a copy of current state array
      const newOtpDigits = [...otpDigits];
      //On backspace set the index element to ""
      newOtpDigits[index] = "";
      //Update the state
      setOtpDigits(newOtpDigits);

      //Move the focus to previous input block
      const prevInput = document.getElementById(`otpInput-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const nextIndex = (index + 1) % 6;
      const nextInput = document.getElementById(`otpInput-${nextIndex}`);
      if (nextInput) nextInput.focus();
    }
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();

      // Calculate the previous index in a circular manner for Shift+Tab key
      const prevIndex = (index - 1 + 6) % 6;
      const prevInput = document.getElementById(`otpInput-${prevIndex}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
    if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % 6;
      // let nextIndex;
      // if (index + 1 < 6) {
      //   nextIndex = index + 1;
      // } else {
      //   nextIndex = 0;
      // }
      const nextInput = document.getElementById(`otpInput-${nextIndex}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
    if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + 6) % 6;
      // let nextIndex;
      // if (index - 1 >= 0) {
      //   nextIndex = index - 1;
      // } else {
      //   nextIndex = 5;
      // }
      const prevInput = document.getElementById(`otpInput-${prevIndex}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    // Check if the timer has expired
    if (isTimerExpired) {
      e.preventDefault();
      return;
    }
    //prevents default paste behaviour
    e.preventDefault();

    // Get the pasted text
    const pastedText = e.clipboardData.getData("text");

    if (pastedText.length === 6) {
      // for each character in the array resulting from the split, parseInt is applied to convert it into an integer.
      // After the map operation, newOtpDigits is an array of integers representing the parsed digits
      const pastedOtpDigits = pastedText
        .split("")
        .map((digit) => parseInt(digit, 10));
      setOtpDigits(pastedOtpDigits);
      const moveFocus = document.getElementById(`otpInput-${5}`);
      moveFocus.focus();
    }
  };

  return (
    <div className="otp-component">
      <div className="otp-input-container">
        {otpDigits.map((otp, index) => (
          <input
            type="text"
            id={`otpInput-${index}`}
            key={index}
            value={otp}
            maxLength={1}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeys(e, index)}
            onPaste={(e) => handlePaste(e, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default OtpComponent;

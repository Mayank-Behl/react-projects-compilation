import { useState } from "react";
import "./App.css";
import OtpComponent from "./OtpComponent";

function App() {
  const [isSubmitActive, setIsSubmitActive] = useState(false);
  function handleOtpFilled(allAcitve) {
    setIsSubmitActive(allAcitve);
  }
  return (
    <div className="wrapper">
      <div className="heading">
        <h2>OTP Verification</h2>
        <p>Please enter the code we have sent you.</p>
      </div>
      <form>
        <div id="otp-container">
          <OtpComponent onOtpfilled={handleOtpFilled} />
        </div>
        <input
          type="submit"
          value="Submit"
          className="main-submit"
          disabled={!isSubmitActive}
        />
      </form>
    </div>
  );
}

export default App;

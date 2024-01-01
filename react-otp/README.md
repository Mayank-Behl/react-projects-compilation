-> Specifications:

- [DONE] Input field should take exactly 6 numbers.
- [DONE] Only numbers should be allowed as valid input.
- [DONE] Component should support Backspace, Delete, Shift + Tab, Left Arrow Key, and Right Arrow Key for navigation and operations.
- [DONE] Component should support paste functionality if the input is correct (6 numbers).
- [DONE] Submit button should only be activate when entered OTP length is equal to 6.
- [DONE] Whenever an input is active then it should be highlighted.

-> Bonus:

[DONE] Once you are done with the above mentioned requirements then you can extend the question to add a timer that starts on load with an expiry of 1 minutes.
After expiry, all submissions should fail.

-> Steps:

1. [DONE] Create 6 Input fields (could be 1 component render 6 times)
2. [DONE] Take user input into these 6 fields where each input field can take 1 number
3. [DONE] Implement backspace & delete functionality and upon deletion the focus should move to previous elements
4. [DONE] Implement tab/next functionality meaning upon filling up 1 input field the user should be moved to the next field
5. [DONE] Implement submit button not available functionality until all the input fields are filled

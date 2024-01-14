const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const resultContainer = document.querySelector(".result-container");
const inputValue = document.querySelector("#user-search");

let originalData;

// Debounced function for handling user input
const handleUserInput = debounce((e) => {
  let userInput = e.target.value.trim().toLowerCase();
  console.log(userInput);

  // Filter data based on the input value
  const filteredData = originalData.filter(
    (user) =>
      user.name.toLowerCase().includes(userInput) ||
      user.email.toLowerCase().includes(userInput)
  );

  // Update the displayed cards with the filtered data
  updateDisplayedCards(filteredData);
}, 300);

inputValue.addEventListener("keyup", handleUserInput);

const getUsersData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  originalData = await response.json();
  console.log(originalData);

  // Initial display with all user cards
  updateDisplayedCards(originalData);
};
const updateDisplayedCards = (data) => {
  // Clear the existing cards
  resultContainer.innerHTML = "";
  const userCards = data.map((user) => {
    // create elements
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    const userName = document.createElement("h3");
    userName.classList.add("user-card-name");

    const userEmail = document.createElement("p");
    userEmail.classList.add("user-card-email");

    // set data
    userName.textContent = user.name;
    userEmail.textContent = user.email;

    // add to tree
    userCard.appendChild(userName);
    userCard.appendChild(userEmail);

    console.log(userCard);
    return userCard;
  });

  // append all user cards to the result container
  console.log(...userCards);
  resultContainer.append(...userCards);
};

getUsersData();

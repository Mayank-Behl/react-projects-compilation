const stars = document.querySelectorAll(".star-rating i");
const resetButton = document.querySelector(".reset-rating");

stars.forEach((star) => {
  star.addEventListener("click", () => {
    //gets the index that is stored in the data-index
    const index = parseInt(star.getAttribute("data-index"));
    //resets any previous active classes
    resetStars();
    //highlights the stars selected
    highlightStars(index);
  });
});

function resetStars() {
  stars.forEach((star) => {
    star.classList.remove("active");
  });
}

function highlightStars(index) {
  for (let i = 0; i < index; i++) {
    stars[i].classList.add("active");
  }
}

resetButton.addEventListener("click", () => resetStars());

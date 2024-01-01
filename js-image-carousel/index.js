// script.js
document.addEventListener("DOMContentLoaded", function () {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const carouselImage = document.getElementById("carouselImage");

  const images = [
    "./images/1.jpg",
    "./images/2.jpg",
    "./images/3.jpg",
    "./images/4.jpg",
  ];

  let currentImageIndex = 0;

  function showImage() {
    carouselImage.src = images[currentImageIndex];
  }

  function nextImage() {
    currentImageIndex = currentImageIndex + 1;
    if (currentImageIndex >= images.length) {
      currentImageIndex = 0;
    }
    showImage();
  }

  function prevImage() {
    currentImageIndex = currentImageIndex - 1;
    if (currentImageIndex < 0) {
      currentImageIndex = images.length - 1;
    }
    showImage();
  }

  // Event listeners for the buttons
  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);

  // Initial display
  showImage();
});

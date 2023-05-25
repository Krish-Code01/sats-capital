const switchButton = document.getElementById("switchButton");
const cardContainer1 = document.getElementById("cardContainer1");
const cardContainer2 = document.getElementById("cardContainer2");

switchButton.addEventListener("click", () => {
  cardContainer1.classList.toggle("active");
  cardContainer2.classList.toggle("active");
});

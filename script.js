const switchButton = document.getElementById("switchButton");
const cardContainer1 = document.getElementById("cardContainer1");
const cardContainer2 = document.getElementById("cardContainer2");
let previousScrollAmount = 0; // Track the previous scroll amount
window.addEventListener("scroll", () => {
  const scrollAmount = window.scrollY;
  const scrollThreshold = 5; // Adjust this value to control the sensitivity of the scroll

  if (scrollAmount < scrollThreshold) {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }
});
const parallaxImage = document.querySelector(".parallax-image");

parallaxImage.addEventListener("mousemove", event => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  const image = parallaxImage.querySelector("img");

  const imageWidth = image.offsetWidth;
  const imageHeight = image.offsetHeight;

  const offsetX = (mouseX / window.innerWidth - 0.5) * 10;
  const offsetY = (mouseY / window.innerHeight - 0.5) * 10;

  image.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

parallaxImage.addEventListener("mouseleave", () => {
  const image = parallaxImage.querySelector("img");
  image.style.transform = "translate(0, 0)";
});

switchButton.addEventListener("click", () => {
  cardContainer1.classList.toggle("active");
  cardContainer2.classList.toggle("active");
});

let progress = 50;
let startX = 0;
let active = 0;
let isDown = false;

const speedWheel = 0.02;
const speedDrag = -0.1;

const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );

const $items = document.querySelectorAll(".carousel-item");
const $cursors = document.querySelectorAll(".cursor");

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty("--zIndex", zIndex);
  item.style.setProperty("--active", (index - active) / $items.length);
};

const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor((progress / 100) * ($items.length - 1));

  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();
$items.forEach((item, i) => {
  item.addEventListener("click", () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
  });
});

const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel;
  progress = progress + wheelProgress;
  animate();
};

const handleMouseMove = e => {
  if (e.type === "mousemove") {
    $cursors.forEach($cursor => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animate();
};

const handleMouseDown = e => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = () => {
  isDown = false;
};

document.addEventListener("mousewheel", handleWheel);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("touchstart", handleMouseDown);
document.addEventListener("touchmove", handleMouseMove);
document.addEventListener("touchend", handleMouseUp);

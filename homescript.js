// Hero Slider (Background Images)
let slides = document.querySelectorAll(".slide");
let index = 0;

function changeSlide() {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}
setInterval(changeSlide, 5000);

// Back to top button
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Mobile Menu Toggle (Keeps open until user closes)
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".navbar ul");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

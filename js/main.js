
const header = document.querySelector("header");

window.addEventListener("scroll", function(){
    header.classList.toggle("scrolled", window.scrollY > 50);
});

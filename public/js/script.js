
var icon = document.getElementById("iconbar");
var links = document.getElementById("links_side");

icon.addEventListener("click", () => {
  if (links.style.display == "none") {
    links.style.display = "block";
} else links.style.display = "none";
});

var sidenav = document.getElementById("sidenav");
var open = document.getElementById("open").addEventListener("click", () => {
  sidenav.classList.toggle("active");
});

var close = document.getElementById("close").addEventListener("click", () => {
  sidenav.classList.remove("active");
});
var p = window.innerWidth;

function trans() {
    if (p < 800) {
        links.style.display = "none";
    } else {
    links.style.display = "none";
  }
  if(sidenav.classList.contains('active')){
    sidenav.classList.remove('active')
  }
}

trans();

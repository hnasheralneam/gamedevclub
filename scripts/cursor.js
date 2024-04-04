// Create cursor
const cursor = document.createElement("img");
cursor.src = "assets/star.svg";
cursor.classList.add("cursor");
document.body.appendChild(cursor);

// Move cursor
let x;
let y;

document.addEventListener("mousemove", (event) => {
   x = event.clientX;
   y = event.clientY;
   updateCursor(x, y);
   duplicateCursor();
});

function updateCursor(x, y) {
   cursor.style.left = x - 17.5 + "px";
   cursor.style.top = y - 17.5 + "px";
}

// Hide cursor on page exit
document.body.addEventListener("mouseleave", () => {
   cursor.style.display = "none";
});

document.body.addEventListener("mouseenter", () => {
   cursor.style.display = "block";
});

// Cursor trail effect
let duplicateCounter = 0;
let duplicateTimeout = 1;
function duplicateCursor() {
   if (duplicateCounter < duplicateTimeout) {
      duplicateCounter++;
      return;
   }
   duplicateCounter = 0;
   const duplicate = cursor.cloneNode(true);
   duplicate.style.left = x - 17.5 + "px";
   duplicate.style.top = y - 17.5 + "px";
   duplicate.classList.add("cursor-trail");
   setTimeout(() => {
      duplicate.remove();
   }, 500);
   document.body.appendChild(duplicate);
}

// Change amount of cursor stars
const slider = document.getElementById("star-slider");
const starCount = document.getElementById("star-count");

slider.addEventListener("input", () => {
   // Opposite direction for user clarity
   duplicateTimeout = 6 - parseInt(slider.value);
});

// Potential improvement - make fade time a css var and let user change it


// Cursor over links effect
const links = document.querySelectorAll("a");
links.forEach(link => {
   link.addEventListener("mouseenter", () => {
      cursor.classList.add("onlink");
   });
   link.addEventListener("mouseleave", () => {
      cursor.classList.remove("onlink");
   });
});

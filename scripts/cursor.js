// TODO: PLS MAKE IT WORK ON OTHER PAGES....

let cursorSize = 16;

// Create cursor
const cursor = document.createElement("img");
cursor.src = "assets/cursors/normal.svg";
cursor.classList.add("cursor");
cursor.style.width = cursorSize + "px";
cursor.style.height = cursorSize + "px";
document.body.appendChild(cursor);

// Move cursor
let oldx;
let oldy;
let x;
let y;

document.addEventListener("mousemove", (event) => {
   // update first so they have the value of the previous check
   oldx = x
   oldy = y

   x = event.clientX;
   y = event.clientY;
   // use distance formula to determine how far the mouse moved
   cursorDistanceTraveled = Math.sqrt(Math.pow(x - oldx, 2) + Math.pow(y - oldy, 2));
   distanceCounter += cursorDistanceTraveled;
   updateCursor(x, y);
   duplicateCursor();
});

function updateCursor(x, y) {
   /* QUICK OVERVIEW //

   To achive the motion smearing effect, the element is placed between the cursor's previous point and current point
   and the width is changed to make the element fit right between those two points. (you would think you should use
      cursorSize for this but the circle is actually only 6 px large in the svg CHANGE THIS MAYBE LOL)
   Of course, if it's just the width being changed it'll suck, so the element is rotated to face in the direction of
   cursor movement. that's all.

   // END TRANSMISSION */

   cursor.style.scale = 1 + cursorDistanceTraveled / 6 + " " + 1;
   cursor.style.rotate = Math.atan((y - oldy)/(x - oldx)) + "rad";

   //using inverse tangent to find rotation
   console.log(Math.atan((y - oldy)/(x - oldx)))

   cursor.style.left = (x + oldx) / 2 - (cursorSize / 2) + "px";
   cursor.style.top = (y + oldy) / 2 - (cursorSize / 2) + "px";
}

// Hide cursor on page exit
document.body.addEventListener("mouseleave", () => {
   cursor.style.display = "none";
});

document.body.addEventListener("mouseenter", () => {
   cursor.style.display = "block";
});

// Cursor trail effect
let distanceCounter = 0;
let cursorDistanceTraveled = 0;
const distanceThreshold = 50;

// TODO: future cursor trail physics maybe (think abt how that would work)
//let starTrailElements = [];
function duplicateCursor() {
   if (distanceCounter < distanceThreshold) return
   distanceCounter = 0;

   const duplicate = cursor.cloneNode(true);
   duplicate.src = "assets/star.svg"
   duplicate.style.rotate = 0 + "rad";
   duplicate.style.scale = 1;
   duplicate.style.left = x - 17.5 + (Math.random() - 0.5) * 50 + "px";
   duplicate.style.top = y - 17.5 + (Math.random() - 0.5) * 50 + "px";
   duplicate.style.width = 16 + (Math.random() - 0.5) * 12 + "px";
   duplicate.style.height = 16 +(Math.random() - 0.5) * 12 + "px";
   duplicate.classList.add("cursor-trail");
   //starTrailElements[starTrailElements.length] = duplicate
   setTimeout(() => {
      duplicate.remove();
   }, 1000);
   document.body.appendChild(duplicate);
}

// Change amount of cursor stars
const slider = document.getElementById("star-slider");
const starCount = document.getElementById("star-count");

slider.addEventListener("input", () => {
   // Opposite direction for user clarity
   //duplicateTimeout = 6 - parseInt(slider.value);
});

// Potential improvement - make fade time a css var and let user change it


// Cursor over links effect
const links = document.querySelectorAll("a");
links.forEach(link => {
   link.addEventListener("mouseenter", () => {
      cursor.classList.add("onlink");
      cursor.src = "assets/cursors/link.svg";
   });
   link.addEventListener("mouseleave", () => {
      cursor.classList.remove("onlink");
      cursor.src = "assets/cursors/normal.svg";
   });
});

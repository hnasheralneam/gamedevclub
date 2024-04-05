// TODO: PLS MAKE IT WORK ON OTHER PAGES....

let cursorScale = 1;
const preferedSize = 10;
let cursorSize = [10, 10];

// Create cursor
const cursor = document.createElement("span");
cursor.classList.add("cursor");
cursor.style.width = cursorSize[0] + "px";
cursor.style.height = cursorSize[1] + "px";
document.body.appendChild(cursor);

// Move cursor
let oldx;
let oldy;
let x;
let y;

let mouseMoveTimer;
document.addEventListener("mousemove", (event) => {
   x = event.clientX;
   y = event.clientY;
   // use distance formula to determine how far the mouse moved
   cursorDistanceTraveled = Math.sqrt(Math.pow(x - oldx, 2) + Math.pow(y - oldy, 2));
   distanceCounter += cursorDistanceTraveled;
   updateCursor(x, y);
   duplicateCursor();
   //reset mouse when its not moving
   clearTimeout(mouseMoveTimer);
   mouseMoveTimer = setTimeout(() => {
      cursorDistanceTraveled = 0
      updateCursor(x, y);
   }, 100);

   // now grab the old x and y so they are ready for the next frame
   oldx = x
   oldy = y
});

function updateCursor(x, y) {
   /* QUICK OVERVIEW //

   To achive the motion smearing effect, the element is placed between the cursor's previous point and current point
   and the width is changed to make the element fit right between those two points.
   Of course, if it's just the size being changed it'll suck, so the element is rotated to face in the direction of
   cursor movement. that's all.

   // END TRANSMISSION */

   cursorSize[0] = preferedSize + (cursorDistanceTraveled / cursorScale);
   //cursorSize[1] = preferedSize - (cursorSize[0] / preferedSize) / 4; for vertical squash, idk if i like it
   //using inverse tangent to find rotation
   cursor.style.rotate = Math.atan((y - oldy)/(x - oldx)) + "rad";

   cursor.style.scale = cursorScale;
   cursor.style.width = cursorSize[0] + "px";
   cursor.style.height = cursorSize[1] + "px"; 
   cursor.style.left = (x + oldx) / 2 - (cursorSize[0] / 2) + "px";
   cursor.style.top = (y + oldy) / 2 - (cursorSize[1] / 2) + "px";
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
let distanceThreshold = 50;

// TODO: future cursor trail physics maybe (think abt how that would work)
function duplicateCursor() {
   if (distanceCounter < distanceThreshold) return
   distanceCounter = 0;

   const duplicate = document.createElement("img");
   //set defaults
   duplicate.style.display = "block";
   duplicate.style.position = "fixed";
   duplicate.src = "assets/star.svg"
   duplicate.style.rotate = 0 + "rad";
   duplicate.style.scale = 1;
   //randomize position and scale depending on velocity
   duplicate.style.left = x - (cursorSize[0] / 2) + (Math.random() - 0.5) * (25 + cursorDistanceTraveled) + "px";
   duplicate.style.top = y - (cursorSize[1] / 2) + (Math.random() - 0.5) * (25 + cursorDistanceTraveled) + "px";
   duplicate.style.width = 16 + (Math.random() - 0.5) * 12 + "px";
   duplicate.style.height = 16 +(Math.random() - 0.5) * 12 + "px";
   duplicate.classList.add("cursor-trail");
   setTimeout(() => {
      duplicate.remove();
   }, 1000);
   document.body.appendChild(duplicate);
}

// Change amount of cursor stars
const slider = document.getElementById("star-slider");
const starCount = document.getElementById("star-count");

slider.addEventListener("input", () => {
   distanceThreshold = 70 - parseInt(slider.value) * 10;
});

// Potential improvement - make fade time a css var and let user change it

// Cursor over links effect
const links = document.querySelectorAll("a");
links.forEach(link => {
   link.addEventListener("mouseenter", () => {
      cursor.classList.add("onlink");
      cursorScale = 2;
   });
   link.addEventListener("mouseleave", () => {
      cursor.classList.remove("onlink");
      cursorScale = 1;
   });
});

const music = document.getElementById("birthdayMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const letterToggle = document.getElementById("letterToggle");
const letterMessage = document.getElementById("letterMessage");
const wishButton = document.getElementById("wishButton");
const wishText = document.getElementById("wishText");
const finalMessage = document.getElementById("finalMessage");
let wished = false;

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.next)?.scrollIntoView({
      behavior: "smooth", block: "start"
    });
  });
});

musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicLabel.textContent = "Pause music";
      musicToggle.setAttribute("aria-label", "Pause birthday music");
      musicToggle.setAttribute("aria-pressed", "true");
    } catch {
      musicLabel.textContent = "Music unavailable";
      musicToggle.setAttribute("aria-label", "Music could not be played");
    }
  } else {
    music.pause();
    musicLabel.textContent = "Play music";
    musicToggle.setAttribute("aria-label", "Play birthday music");
    musicToggle.setAttribute("aria-pressed", "false");
  }
});

letterToggle.addEventListener("click", () => {
  const isOpen = letterToggle.getAttribute("aria-expanded") === "true";
  letterToggle.setAttribute("aria-expanded", String(!isOpen));
  letterMessage.hidden = isOpen;
  letterToggle.querySelector(".letter-hint").textContent = isOpen
    ? "Tap to open your letter" : "Your letter is open ♡";
});

function celebrate() {
  const colors = ["#d77f98", "#f2b8ca", "#e9c58e", "#fffdfb", "#b984a0"];
  const amount = matchMedia("(max-width: 600px)").matches ? 55 : 90;
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[i % colors.length];
    piece.style.borderRadius = Math.random() > .5 ? "50%" : "2px";
    piece.style.setProperty("--duration", (2.2 + Math.random() * 2.2) + "s");
    piece.style.setProperty("--drift", (Math.random() * 180 - 90) + "px");
    piece.style.animationDelay = Math.random() * .8 + "s";
    document.body.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove());
  }
}

wishButton.addEventListener("click", () => {
  if (wished) return;
  wished = true;
  wishText.textContent = "Wish sent to the universe! Make it a beautiful year. ✨";
  wishButton.hidden = true;
  finalMessage.hidden = false;
  celebrate();
});

document.getElementById("replayButton").addEventListener("click", () => {
  wished = false;
  wishButton.hidden = false;
  finalMessage.hidden = true;
  wishText.textContent = "Close your eyes, make a wish, and tap below. ✨";
  celebrate();
  document.getElementById("surprise").scrollIntoView({
    behavior: "smooth", block: "start"
  });
});

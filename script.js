// Floating hearts
(function () {
  const box = document.getElementById("hearts");
  const emojis = ["💗", "💖", "💕", "💘", "🩷", "❤️"];
  for (let i = 0; i < 28; i++) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = emojis[i % emojis.length];
    h.style.left = Math.random() * 100 + "%";
    h.style.fontSize = 16 + Math.random() * 30 + "px";
    h.style.animationDuration = 9 + Math.random() * 12 + "s";
    h.style.animationDelay = -Math.random() * 20 + "s";
    box.appendChild(h);
  }
})();

// Envelope -> letter
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  envelope.setAttribute("aria-expanded", "true");
  setTimeout(() => {
    letter.hidden = false;
    letter.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 600);
});

// Send answers to Sebit (share sheet, or copy as a fallback)
const val = (id) => document.getElementById(id).value.trim() || "(skipped)";
document.getElementById("send").addEventListener("click", async () => {
  const msg =
    "💌 Angela's answers\n\n" +
    "Favourite colour: " + val("q-color") + "\n" +
    "Favourite snack: " + val("q-snack") + "\n" +
    "Favourite thing to do: " + val("q-thing") + "\n" +
    "What I like about you: " + val("q-like") + "\n\n" +
    "Something I've always wanted but was scared to say:\n" + val("q-wish");
  const status = document.getElementById("status");
  try {
    if (navigator.share) {
      await navigator.share({ text: msg });
      status.textContent = "Sent with love 💗";
    } else {
      await navigator.clipboard.writeText(msg);
      status.textContent = "Copied! Paste it to Sebit 💗";
    }
  } catch (e) {
    status.textContent = "No worries, you can tell Sebit in person 💗";
  }
});

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

// Send answers to Sebit by email (via Formspree)
// Paste your Formspree form link between the quotes, e.g. "https://formspree.io/f/abcdwxyz"
const FORM_URL = "https://formspree.io/f/meagkwok";

const val = (id) => document.getElementById(id).value.trim() || "(skipped)";
const sendBtn = document.getElementById("send");
const status = document.getElementById("status");

sendBtn.addEventListener("click", async () => {
  const answers = {
    "Favourite colour": val("q-color"),
    "Favourite snack": val("q-snack"),
    "Favourite thing to do": val("q-thing"),
    "What she likes about Sebit": val("q-like"),
    "Something she has always wanted but was scared to say": val("q-wish"),
  };

  if (FORM_URL.includes("PASTE_YOUR")) {
    status.textContent = "Email isn't set up yet. Add your Formspree link in script.js.";
    return;
  }

  sendBtn.disabled = true;
  status.textContent = "Sending…";
  try {
    const res = await fetch(FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ _subject: "💌 Angela answered your surprise!", ...answers }),
    });
    if (!res.ok) throw new Error("bad response");
    status.textContent = "Sent to Sebit with love 💗";
  } catch (e) {
    sendBtn.disabled = false;
    status.textContent = "Oops, that didn't send. Please try again 💗";
  }
});
// PERSONALIZE THESE VALUES BEFORE PUBLISHING.
const portfolioConfig = {
  email: "shriyajedhe984@gmail.com",
  github: "https://github.com/shriya984",
  linkedin: "https://www.linkedin.com/in/shriya-jedhe-914146301/"
};

const emailButton = document.getElementById("emailButton");
const emailText = document.getElementById("emailText");
const copyEmailButton = document.getElementById("copyEmail");
emailButton.href = `mailto:${portfolioConfig.email}`;
emailText.textContent = portfolioConfig.email;
document.getElementById("githubLink").href = portfolioConfig.github;
document.getElementById("linkedinLink").href = portfolioConfig.linkedin;

// Mobile navigation.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Animated words in the hero.
const changingWord = document.getElementById("changingWord");
const words = ["useful things.", "AI prototypes.", "creative solutions.", "better experiences."];
let wordIndex = 0;
if (changingWord && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  changingWord.style.transition = "opacity .22s ease";
  window.setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    changingWord.style.opacity = "0";
    window.setTimeout(() => {
      changingWord.textContent = words[wordIndex];
      changingWord.style.opacity = "1";
    }, 220);
  }, 2600);
}

// Reveal sections on scroll.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add("visible"));

// Filter projects by category.
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach(button => button.addEventListener("click", () => {
  const filter = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle("active", item === button));
  projectCards.forEach(card => {
    const categories = card.dataset.category.split(" ");
    card.classList.toggle("is-hidden", !(filter === "all" || categories.includes(filter)));
  });
}));

// Copy contact email.
const toast = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}
copyEmailButton.addEventListener("click", async () => {
  if (portfolioConfig.email.includes("YOUR_EMAIL")) {
    showToast("First add your real email in script.js.");
    return;
  }
  try {
    await navigator.clipboard.writeText(portfolioConfig.email);
    showToast("Email copied to clipboard.");
  } catch {
    showToast(`Email: ${portfolioConfig.email}`);
  }
});
document.getElementById("year").textContent = new Date().getFullYear();

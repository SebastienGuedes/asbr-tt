// Simple interaction JS
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  const msg = document.getElementById("message");

  btn.addEventListener("click", () => {
    msg.textContent = "Bravo 🎉 Tu as cliqué sur le bouton !";
    msg.style.color = "#2575fc";
    msg.style.fontWeight = "bold";
  });
});

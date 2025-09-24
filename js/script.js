// Charger le menu depuis partials/menu.html

console.log("script.js chargé !");

document.addEventListener("DOMContentLoaded", () => {
  const menuPlaceholder = document.getElementById("menu-placeholder");
  if(menuPlaceholder){
    fetch("partials/menu.html")
      .then(response => response.text())
      .then(data => {
        menuPlaceholder.innerHTML = data;
      })
      .catch(err => console.error("Erreur chargement menu :", err));
  }

  // Exemple d'interaction bouton sur toutes les pages
  const btn = document.getElementById("btn");
  const msg = document.getElementById("message");
  if(btn && msg){
    btn.addEventListener("click", () => {
      msg.textContent = "Bravo 🎉 Vous avez cliqué sur le bouton !";
      msg.style.color = "#2575fc";
      msg.style.fontWeight = "bold";
    });
  }
});

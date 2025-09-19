document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach(el => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then(resp => resp.text())
      .then(html => {
        el.innerHTML = html;
      })
      .catch(err => console.error("Erreur chargement include:", err));
  });
});

function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  elements.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error('Fichier introuvable: ' + file);
        return response.text();
      })
      .then(data => el.innerHTML = data)
      .catch(err => console.error(err));
  });
}

// Exécuter au chargement de la page
document.addEventListener('DOMContentLoaded', includeHTML);

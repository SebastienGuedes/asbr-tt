// Récupère les événements depuis Google Apps Script
const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"; // 👉 remplace par ton URL Web App

fetch(scriptURL)
  .then(response => response.json())
  .then(eventsData => {
    const container = document.getElementById("events-container");
    const loader = document.getElementById("loading-message");

    loader.style.display = "none"; // cacher le message "chargement"

    // Grouper les événements par date
    const grouped = {};
    eventsData.forEach(ev => {
      if (!grouped[ev.dateKey]) grouped[ev.dateKey] = [];
      grouped[ev.dateKey].push(ev);
    });

    // Ne garder que la date la plus proche
    const dates = Object.keys(grouped).sort();
    const nextDate = dates[0];
    const nextEvents = grouped[nextDate];

    const formattedDate = new Date(nextDate).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "long"
    });

    container.innerHTML = `
      <h2 class="day-title">📅 ${formattedDate}</h2>
      <div class="grid">
        ${nextEvents.map(ev => {
          const start = new Date(ev.start);
          const time = start.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
          return `
            <div class="card">
              <div class="event-time">🕒 ${time}</div>
              <h3>${ev.title}</h3>
              ${ev.location ? `<div class="event-location">📍 ${ev.location}</div>` : ""}
            </div>`;
        }).join("")}
      </div>`;
  })
  .catch(err => {
    document.getElementById("loading-message").textContent = "❌ Impossible de charger les événements.";
    console.error(err);
  });

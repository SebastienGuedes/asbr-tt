document.addEventListener("DOMContentLoaded", () => {
  const calendarId = "ieg204ssnqlgllq34rr0scpo4s@group.calendar.google.com"; // ← Remplace par ton vrai ID
  const apiKey = "AIzaSyAKLNxi9CjZ5XVAHm98InSQ9UGYsET3SNU";          // ← Colle ta clé API ici
  const maxResults = 10; // nombre max d'événements à afficher
  const list = document.getElementById("calendar-events");

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}&maxResults=${maxResults}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        list.innerHTML = "<li>Aucun événement à venir</li>";
        return;
      }

      data.items.forEach(ev => {
        const li = document.createElement("li");

        // Date de début (dateTime ou date simple)
        let start;
        if (ev.start.dateTime) {
          start = new Date(ev.start.dateTime);
        } else if (ev.start.date) {
          start = new Date(ev.start.date);
        }

        const dateOptions = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        const dateStr = start ? start.toLocaleDateString("fr-FR", dateOptions) : "Date inconnue";

        li.textContent = `${dateStr} – ${ev.summary || "Sans titre"}`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Erreur API Google Calendar :", err);
      list.innerHTML = "<li>Impossible de charger les événements.</li>";
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const calendarId = "ieg204ssnqlgllq34rr0scpo4s@group.calendar.google.com"; // ← Mets ton ID de calendrier
  const apiKey = "AIzaSyAKLNxi9CjZ5XVAHm98InSQ9UGYsET3SNU";          // ← Mets ta clé API
  const maxResults = 10;                // Nombre max d'événements
  const cacheKey = "calendarEvents";
  const cacheTTL = 60 * 60 * 1000;      // 1h en ms
  const list = document.getElementById("calendar-events");

  // Fonction d'affichage
  function renderEvents(events) {
    list.innerHTML = "";
    if (!events || events.length === 0) {
      list.innerHTML = "<li>Aucun événement à venir</li>";
      return;
    }

    events.forEach(ev => {
      let start;
      if (ev.start.dateTime) {
        start = new Date(ev.start.dateTime);
      } else if (ev.start.date) {
        start = new Date(ev.start.date);
      }

      const dateStr = start.toLocaleDateString("fr-FR", {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const li = document.createElement("li");
      li.textContent = `${dateStr} – ${ev.summary || "Sans titre"}`;
      list.appendChild(li);
    });
  }

  // Vérifier le cache
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < cacheTTL) {
      console.log("✅ Données chargées depuis le cache");
      renderEvents(data.items);
      return;
    }
  }

  // Sinon → appel API
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}&maxResults=${maxResults}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("📡 Données chargées depuis l'API Google Calendar");
      localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
      renderEvents(data.items);
    })
    .catch(err => {
      console.error("❌ Erreur API Google Calendar :", err);
      list.innerHTML = "<li>Impossible de charger les événements.</li>";
    });
});

















  
  // Fonction d'affichage des événements
  function renderEvents(events) {
    list.innerHTML = "";
    if (!events || events.length === 0) {
      list.innerHTML = "<li>Aucun événement à venir</li>";
      return;
    }

    events.forEach(ev => {
      let start;
      if (ev.start.dateTime) {
        start = new Date(ev.start.dateTime);
      } else if (ev.start.date) {
        start = new Date(ev.start.date);
      }

      const dateStr = start.toLocaleDateString("fr-FR", {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const li = document.createElement("li");
      li.textContent = `${dateStr} – ${ev.summary || "Sans titre"}`;
      list.appendChild(li);
    });
  }

  // Vérifier s'il y a des données en cache
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < cacheTTL) {
      console.log("✅ Données chargées depuis le cache");
      renderEvents(data.items);
      return;
    }
  }

  // Sinon → appel API Google Calendar
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}&maxResults=${maxResults}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("📡 Données chargées depuis l'API Google Calendar");
      // Mise en cache
      localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
      renderEvents(data.items);
    })
    .catch(err => {
      console.error("❌ Erreur API Google Calendar :", err);
      list.innerHTML = "<li>Impossible de charger les événements.</li>";
    });
});



  
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

document.addEventListener("DOMContentLoaded", () => {
  const calendarIds = [
    "ieg204ssnqlgllq34rr0scpo4s@group.calendar.google.com",
    "eakbe6t7amfckfev0e88apaacs@group.calendar.google.com",
    "6ulpqshak5qg2shk2g6qios4qk@group.calendar.google.com",
    "t7nbjgnsrmg8lt40ls6egpetrc@group.calendar.google.com",
    "95sr9qt1v2l6i95r7d8i74t54g@group.calendar.google.com"
  ];

  const apiKey = "AIzaSyAKLNxi9CjZ5XVAHm98InSQ9UGYsET3SNU";
  let maxResults = 1; // nombre initial d'événements par calendrier
  const cacheKey = "calendarEventsMulti";
  const cacheTTL = 60 * 60 * 1000; // 1h

  const list = document.getElementById("calendar-events");
  const voirPlusBtn = document.getElementById("voir-plus-btn");

  function renderEventsWithDateBreaks(events) {
    list.innerHTML = "";
    if (!events || events.length === 0) {
      list.innerHTML = "<li>Aucun événement à venir</li>";
      return;
    }

    let currentDate = "";
    events.forEach(ev => {
      const start = new Date(ev.start.dateTime || ev.start.date);
      const dateStr = start.toLocaleDateString("fr-FR", { weekday:'short', day:'numeric', month:'short', year:'numeric' });

      if (dateStr !== currentDate) {
        const dateHeader = document.createElement("li");
        dateHeader.textContent = dateStr;
        dateHeader.classList.add("date-header");
        list.appendChild(dateHeader);
        currentDate = dateStr;
      }

      const li = document.createElement("li");

      const vignette = document.createElement("div");
      vignette.classList.add("event-vignette");
      li.appendChild(vignette);

      const timeStr = start.toLocaleTimeString("fr-FR", { hour:'2-digit', minute:'2-digit' });
      const text = document.createTextNode(` ${timeStr} – ${ev.summary || "Sans titre"}`);
      li.appendChild(text);

      list.appendChild(li);
    });
  }





  

  // Vérifier cache
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    if (Date.now() - timestamp < cacheTTL) {
      console.log("✅ Données depuis cache");
      renderEventsWithDateBreaks(data);
      return;
    }
  }

  // Fonction pour récupérer les événements depuis l'API
  async function fetchAllEvents() {
    let allEvents = [];
    try {
      const fetches = calendarIds.map(id => {
        const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?key=${apiKey}&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}&maxResults=${maxResults}`;
        return fetch(url).then(res => res.json());
      });

      const results = await Promise.all(fetches);
      results.forEach(data => { if (data.items) allEvents = allEvents.concat(data.items); });

      allEvents.sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date));

      localStorage.setItem(cacheKey, JSON.stringify({
        timestamp: Date.now(),
        data: allEvents
      }));

      renderEventsWithDateBreaks(allEvents);
    } catch (err) {
      console.error("❌ Erreur récupération calendriers :", err);
      list.innerHTML = "<li>Impossible de charger les événements.</li>";
    }
  }

  // Initial fetch
  fetchAllEvents();

  // Bouton "Voir plus" : simple alert
  voirPlusBtn.addEventListener("click", () => {
    alert("Vous avez cliqué !");
  });
});

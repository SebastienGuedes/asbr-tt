document.addEventListener("DOMContentLoaded", () => {
  const calendarList = document.getElementById("calendar-events");
  const icsUrl = 'https://calendar.google.com/calendar/ical/TON_CALENDAR_ID/public/basic.ics';

  fetch(icsUrl)
    .then(res => res.text())
    .then(data => {
      const jcalData = ICAL.parse(data);
      const comp = new ICAL.Component(jcalData);
      const events = comp.getAllSubcomponents('vevent');

      events.forEach(ev => {
        const e = new ICAL.Event(ev);
        const li = document.createElement('li');
        const start = e.startDate.toJSDate();
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        li.textContent = `${start.toLocaleDateString('fr-FR', options)} - ${e.summary}`;
        calendarList.appendChild(li);
      });
    })
    .catch(err => {
      console.error("Erreur récupération calendrier :", err);
      calendarList.textContent = "Impossible de charger les événements pour le moment.";
    });
});

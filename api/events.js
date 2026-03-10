export default async function handler(req, res) {
  const calendarId = process.env.CALENDAR_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!calendarId || !apiKey) {
    return res.status(500).json({ error: "Missing environment variables" });
  }

  const now = new Date().toISOString();
  const params = new URLSearchParams({
    key: apiKey,
    timeMin: now,
    orderBy: "startTime",
    singleEvents: "true",
    maxResults: "20",
  });

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`;

  const response = await fetch(url);
  const data = await response.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(response.status).json(data);
}

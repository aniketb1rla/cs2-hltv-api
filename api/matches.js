const { HLTV } = require('hltv');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const matches = await HLTV.getMatches();
    
    // Structure for Highlights: Focus on Top-Tier matches (filter by stars if desired)
    const matchHighlights = matches.slice(0, 15).map(match => ({
      match_id: match.id,
      team1: match.team1 ? match.team1.name : "TBD",
      team2: match.team2 ? match.team2.name : "TBD",
      event: match.event ? match.event.name : "Unknown Event",
      format: match.format, // e.g., "bo3"
      stars: match.stars, // 1-5 star rating from HLTV
      time: new Date(match.date).toLocaleString('en-US', {
        hour: 'numeric', minute: '2-digit', hour12: true
      })
    }));

    res.status(200).json({ success: true, type: 'match_highlights', data: matchHighlights });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch HLTV matches' });
  }
}
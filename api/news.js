const { HLTV } = require('hltv');

export default async function handler(req, res) {
  // Add CORS headers so your future frontend can fetch this data
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const news = await HLTV.getNews();
    
    // Structure for Highlights: Keep it minimal and crisp
    const newsHighlights = news.slice(0, 10).map(item => ({
      title: item.title,
      summary: item.description || "Click to read more.",
      link: `https://www.hltv.org${item.link}`,
      date: new Date(item.date).toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric', year: 'numeric' 
      })
    }));

    res.status(200).json({ success: true, type: 'news_highlights', data: newsHighlights });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch HLTV news' });
  }
}
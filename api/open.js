export default async function handler(req, res) {
  const id = (req.query && req.query.id) ? String(req.query.id) : 'unknown';
  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfZ0rhfvrFg9zVsCsBh1DPsQkW_WQnNaAvZj46R2yOZL7SeuA/formResponse?entry.99020530=' + encodeURIComponent(id);
  try { await fetch(formUrl); } catch (e) {}
  const gif = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
  res.setHeader('Content-Type', 'image/gif');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.status(200).send(gif);
}

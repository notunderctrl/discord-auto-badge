export default function handler(req, res) {
  if (!(req.method === 'POST')) return res.redirect('/');
}

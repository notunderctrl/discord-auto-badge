import { Client } from 'discord.js';
import dbConnect from '../../utils/dbConnect';

export default function handler(req, res) {
  if (!(req.method === 'POST')) return res.redirect('/');

  const { webhookUrl, role } = req.body;

  if (!webhookUrl)
    return res
      .status(400)
      .json({ error: true, message: 'Webhook URL is required' });

  console.log(token);
}

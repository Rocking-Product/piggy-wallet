import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User.mjs';
import dbSequelize from '../../../config/database.mjs';

type Data = {
  message: string;
  user?: object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    const { email } = req.query;

    try {
      await dbSequelize.authenticate();
      await dbSequelize.sync();

      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      const user = await User.findOne({ where: { email } });

      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(404).json({ user: null });
      }
    } catch (error) {
      console.error('Error al buscar el usuario:', error);
      return res.status(500).json({ message: 'Error en la búsqueda de usuario' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User.mjs';
import dbSequelize from '../../../config/database.mjs';

type Data = {
  message: string;
  user?: object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req;
  
    try {
      await dbSequelize.authenticate();
      await dbSequelize.sync();
  
      switch (method) {
        case 'POST': {
          const { privyAddress, walletAddress } = req.body;
  
          if (!privyAddress || !walletAddress) {
            return res.status(400).json({ message: 'La dirección de Privy y la wallet son requeridas' });
          }
  
          let user = await User.findOne({ where: { privyAddress } });
  
          if (!user) {
            user = await User.create({ privyAddress, walletAddress });
            return res.status(201).json({ message: 'Usuario creado correctamente', user });
          } else {
            return res.status(200).json({ message: 'Usuario actualizado correctamente con wallet', user });
          }
        }
        default:
          res.setHeader('Allow', ['POST']);
          return res.status(405).end(`Method ${method} Not Allowed`);
      }
    } catch (error) {
      console.error('Error al conectar o sincronizar la base de datos:', error);
      return res.status(500).json({ message: 'Error al conectar o sincronizar la base de datos' });
    }
  }
  

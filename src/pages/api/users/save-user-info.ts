import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User.mjs';
import UserWallet from '@/models/UserWallet.mjs';
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
        const { privyAddress, email, walletAddress } = req.body;

        let user = await User.findOne({ where: { address: privyAddress } });

        if (user) {
          return res.status(200).json({ message: 'El usuario ya existe', user });
        }

        user = await User.create({
            address: privyAddress,
            email: email ? email : null,
        });

        // Guardar las wallets
        if (privyAddress) {
          await UserWallet.create({
            userId: user.get('id'),
            walletAddress: privyAddress,
            isPrivy: true,
          });
        }

        if (walletAddress) {
          await UserWallet.create({
            userId: user.get('id'),
            walletAddress: walletAddress,
            isPrivy: false,
          });
        }

        return res.status(201).json({ message: 'Usuario y wallets guardados correctamente', user });
      }

      default:
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
}

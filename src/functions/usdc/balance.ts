import { Contract, ethers } from "ethers";
import { Dispatch } from "react";

export const getUsdcBalance = async (
  contract: Contract,
  wallet: string,
  dispatch: Dispatch<any>,
  currbalance: any
) => {
  console.log('wallet:', wallet);

  // Validar que la dirección es válida
  if (!ethers.isAddress(wallet)) {
    console.error('Dirección Ethereum inválida:', wallet);
    return;
  }

  try {
    const balance = await contract.balanceOf(wallet);
    console.log('Balance obtenido:', balance.toString());
    dispatch(Number(currbalance) + Number(balance));
  } catch (error) {
    console.error('Error al obtener el balance:', error);
  }
};

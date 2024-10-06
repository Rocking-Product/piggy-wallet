import { BalmyProvider } from "../../providers/balmy.provider";

export const getPositions = async (balmy: BalmyProvider, wallet: string, chainId: number) => {
  return await balmy.positionProvider.getWalletPositions(wallet, chainId);
};

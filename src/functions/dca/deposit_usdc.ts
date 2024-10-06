import { DCASwapInterval } from "@balmy/sdk";
import { USDC, WBTC } from "../../constants/tokens";
import { BalmyProvider } from "../../providers/balmy.provider";

export const usdcToWBTC = async (
  balmy: BalmyProvider,
  chainId: number,
  account: string,
  swapInterval: DCASwapInterval,
  swapsAmount: string,
  amountToDeposit: string,
) => {
  const response = await balmy.positionProvider.depositSafe({
    account,
    chainId,
    from: USDC(chainId),
    to: WBTC(chainId),
    swapInterval,
    swapsAmount,
    amount: amountToDeposit,
  });
  console.log(response);

  return response;
};

import { BalmyProvider } from "@/providers/balmy.provider";
import { PositionSummary } from "@balmy/sdk";

export const terminatePosition = async (
    balmy: BalmyProvider,
  position: PositionSummary,

) => {
    return await balmy.positionProvider.terminate(position)
};

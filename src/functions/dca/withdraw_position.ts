import { PositionSummary } from "@balmy/sdk";
import { BalmyProvider } from "../../providers/balmy.provider";



export const withdrawPosition = async(balmy: BalmyProvider, position: PositionSummary)=>{
    return await balmy.positionProvider.withdraw(position)
}

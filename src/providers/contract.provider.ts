import { HUB_ADDRESSES } from "@/constants/addresses";
import ERC20ABI from "@/constants/ecr20abi";
import { Address, encodeFunctionData, getContract } from "viem";

export class ContractProvider {
  private readonly publicClient: any;
  private readonly walletClient: any;
  constructor(publicClient: any, walletClient: any) {
    this.publicClient = publicClient;
    this.walletClient = walletClient;
  }
  public getHUBCompanionAdress(chainId: number): string {
    return HUB_ADDRESSES[chainId].toLowerCase();
  }

  getERC20TokenInstance(
    tokenAddress: Address,
    publicClient: any,
    walletClient: any,
  ) {
    return getContract({
      abi: ERC20ABI,
      address: tokenAddress,
      client: {
        public: publicClient,
        wallet: walletClient,
      },
    });
  }

  public buildApproveToken(
    amountToApprove: bigint,
    tokenAddress: Address,
    dcaContractAddress: Address,
  ) {
    const ecr20 = this.getERC20TokenInstance(
      tokenAddress,
      this.publicClient,
      this.walletClient,
    );
    const txData = encodeFunctionData({
      ...ecr20,
      functionName: "approve",
      args: [dcaContractAddress, amountToApprove],
    });
    return {
      to: tokenAddress,
      value: BigInt(0),
      data: txData,
    };
  }
}

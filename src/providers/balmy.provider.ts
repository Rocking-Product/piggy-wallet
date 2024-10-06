import { buildSDK, ISDK } from "@balmy/sdk";
import { PositionProvider, SafeClient } from "./position.provider";
import { ContractProvider } from "./contract.provider";

export class BalmyProvider {
  private readonly sdk: ISDK;

  public readonly positionProvider: PositionProvider;

  public readonly contractProvider: ContractProvider;

  constructor(safe: SafeClient, publicClient: any) {
    this.sdk = buildSDK();
    this.contractProvider = new ContractProvider(publicClient, safe);
    this.positionProvider = new PositionProvider(
      this.sdk.dcaService,
      this.contractProvider,
      safe,
    );
  }
}

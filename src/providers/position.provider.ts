import { getWrappedProtocolToken, Token } from "@/constants/tokens";
import {
  BuiltTransaction,
  Chains,
  DCAPermission,
  DCASwapInterval,
  IDCAService,
  PositionSummary,
} from "@balmy/sdk";
import { parseUnits } from "viem/utils";
import { ContractProvider } from "./contract.provider";
import { SmartAccountClient } from "permissionless";
import { EntryPoint } from "permissionless/types";
import { SmartAccount } from "permissionless/accounts";
import { Address, Chain, Transport } from "viem";

export interface IBuildPositionParams {
  chainId: number;
  account: string;
  from: Token;
  to: Token;
  swapInterval: DCASwapInterval;
  swapsAmount: string;
  amount: string;
}

export type SafeClient = SmartAccountClient<
  EntryPoint,
  Transport,
  Chain,
  SmartAccount<EntryPoint, string, Transport, Chain>
>;

export class PositionProvider {
  private readonly dcaService: IDCAService;

  private readonly contractProvider: ContractProvider;

  private readonly safeClient: SafeClient;

  constructor(
    dcaService: IDCAService,
    contractProvider: ContractProvider,
    safe: SafeClient,
  ) {
    this.dcaService = dcaService;
    this.contractProvider = contractProvider;
    this.safeClient = safe;
  }

  async buildCreatePositionTx({
    chainId,
    account,
    from,
    to,
    swapInterval,
    swapsAmount,
    amount,
  }: IBuildPositionParams): Promise<BuiltTransaction> {
    const params = this.buildCreatePositionParams({
      chainId,
      account,
      from,
      to,
      swapInterval,
      swapsAmount,
      amount,
    });

    return await this.dcaService.buildCreatePositionTx(params);
  }

  private buildCreatePositionParams({
    chainId,
    account,
    from,
    to,
    swapInterval,
    swapsAmount,
    amount,
  }: IBuildPositionParams) {
    const amountOfSwaps = BigInt(swapsAmount);
    const totalAmount = parseUnits(amount, from.decimals);
    const deposit = {
      token: from.address.toLowerCase(),
      amount: totalAmount,
    };
    const companionAddress =
      this.contractProvider.getHUBCompanionAdress(chainId);
    const permissions = [
      {
        operator: companionAddress.toLowerCase(),
        permissions: [
          DCAPermission.REDUCE,
          DCAPermission.INCREASE,
          DCAPermission.WITHDRAW,
          DCAPermission.TERMINATE,
        ],
      },
    ];
    const wrappedProtocolToken = getWrappedProtocolToken(chainId);
    // @ts-ignore
    const fromToUse = wrappedProtocolToken.address.toLowerCase();
    // @ts-ignore
    const toToUse = wrappedProtocolToken.address.toLowerCase();
    return {
      chainId,
      from: {
        address: from.address.toLowerCase(),
        variantId: fromToUse,
      },
      to: {
        address: to.address.toLowerCase(),
        variantId: toToUse,
      },
      permissions,
      swapInterval: Number(swapInterval),
      amountOfSwaps: Number(amountOfSwaps),
      owner: account.toLowerCase(),
      deposit,
      totalAmount,
    };
  }

  async depositSafe(params: IBuildPositionParams) {
    const { totalAmount } = this.buildCreatePositionParams(params);
    console.log("sending approve token");
    const approveTx = this.contractProvider.buildApproveToken(
      totalAmount,
      params.from.address,
      params.to.address,
    );
    console.log(approveTx);
    console.log("deposit on balmy");
    const depositTx = await this.buildCreatePositionTx(params);
    console.log("result");
    console.log(depositTx);

    console.log("deposit safe");
    return await this.sendTransactionsToSafe([approveTx, depositTx]);
  }

  async getWalletPositions(wallet: string, chainId: number) {
    console.log("Getting positions for wallet: ", wallet);
    const positions = await this.dcaService.getPositionsByAccount({
      accounts: [wallet.toLowerCase()],
      chains: [chainId],
    });
    console.log("positions: ", positions);

    return positions;
  }

  async terminate(position: PositionSummary) {
    console.log("Terminate position: ", position);
    const hubAddress = this.contractProvider.getHUBCompanionAdress(
      position.chainId,
    );
    const tx = await this.dcaService.buildTerminatePositionTx({
      chainId: position.chainId,
      positionId: position.id,
      dcaHub: hubAddress,
      recipient: position.owner,
      withdraw: {
        unswappedConvertTo: position.from.address,
        swappedConvertTo: position.to.address,
      },
    });
    console.log("tx: ", tx);

    console.log("sending to safe");
    const result = await this.sendTransactionToSafe(
      position.owner as Address,
      tx.value,
      tx.data as Address,
    );
    console.log("safe result terminate: ", result);

    return result;
  }

  async withdraw(position: PositionSummary) {
    console.log("Withdraw position: ", position);
    const hubAddress = this.contractProvider.getHUBCompanionAdress(
      position.chainId,
    );
    const tx = await this.dcaService.buildWithdrawPositionTx({
      chainId: position.chainId,
      positionId: position.id,
      withdraw: {
        convertTo: position.to.address,
      },
      dcaHub: hubAddress,
      recipient: position.owner,
    });

    console.log("tx: ", tx);

    const result = await this.sendTransactionToSafe(
      position.owner as Address,
      tx.value,
      tx.data as Address,
    );
    console.log("safe result withdraw: ", result);

    return result;
  }

  private async sendTransactionsToSafe(txs: BuiltTransaction[]) {
    const txsMapped = txs.map((tx) => ({
      to: tx.to as Address,
      value: tx.value!,
      data: tx.data as Address,
    }));

    return await this.safeClient.sendTransactions({ transactions: txsMapped });
  }

  private async sendTransactionToSafe(
    to: Address,
    value: bigint | undefined,
    data: Address,
  ) {
    return await this.safeClient.sendTransaction({
      to,
      value,
      data,
    });
  }
}

import { Address } from "viem";
import { base,baseSepolia } from "viem/chains";

export const HUB_ADDRESSES: Record<number, Address> = {
  [base.id]: "0x4200000000000000000000000000000000000010", // L2StandardBridge para Base
  [baseSepolia.id]: "0x4200000000000000000000000000000000000010", // L2StandardBridge para Base Sepolia
};

export const WETH_ADDRESSES: Record<number, Address> = {
  [base.id]: "0x4200000000000000000000000000000000000006", // Dirección de WETH en Base
  [baseSepolia.id]: "0x4200000000000000000000000000000000000006", // Dirección de WETH en Base Sepolia
};

export const USDC_ADDRESSES: Record<number, Address> = {
  [base.id]: "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // Dirección de USDC en Base Mainnet
  [baseSepolia.id]: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // Dirección de USDC en Base Sepolia
};

export const WBTC_ADDRESSES: Record<number, Address> = {
  [base.id]: "0x68aaea61afe28baf1d847d9e21b0bfeba4cd3cdb", // Dirección de WBTC en Base Mainnet
  [baseSepolia.id]: "0x68aaea61afe28baf1d847d9e21b0bfeba4cd3cdb", // Dirección de WBTC en Base Sepolia (si es relevante)
};
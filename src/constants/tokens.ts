import { Address } from "viem";
import { USDC_ADDRESSES, WBTC_ADDRESSES,WETH_ADDRESSES } from "./addresses";
import { base } from "viem/chains";

export enum TokenType {
  BASE = "BASE",
  NATIVE = "NATIVE",
  WRAPPED_PROTOCOL_TOKEN = "WRAPPED_PROTOCOL_TOKEN",
  YIELD_BEARING_SHARE = "YIELD_BEARING_SHARE",
  ERC20_TOKEN = "ERC20_TOKEN",
  ERC721_TOKEN = "ERC721_TOKEN",
}

export type Token = {
  decimals: number;
  chainId: number;
  address: Address;
  name: string;
  symbol: string;
  logoURI?: string;
  type: TokenType;
  underlyingTokens: Token[];
  price?: number;
  chainAddresses: {
    chainId: number;
    address: Address;
  }[];
};

// Definir el token WETH con la dirección en Base y otras redes

export const WETH = (chainId: number): Token => ({
  chainId,
  decimals: 18,
  address: WETH_ADDRESSES[chainId] || WETH_ADDRESSES[base.id],
  name: "Wrapped Ether",
  symbol: "WETH",
  type: TokenType.BASE,
  underlyingTokens: [],
  logoURI:
    "https://tokens.1inch.io/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619.png",
  chainAddresses: [],
});

// Definir USDC como antes
export const USDC = (chainId: number): Token => ({
  chainId,
  decimals: 6,
  address: USDC_ADDRESSES[chainId] || USDC_ADDRESSES[base.id],
  name: "USDC",
  symbol: "USDC",
  type: TokenType.BASE,
  underlyingTokens: [],
  logoURI:
    "https://tokens.1inch.io/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png",
  chainAddresses: [],
});

// Definir WBTC como antes
export const WBTC = (chainId: number): Token => ({
  chainId,
  decimals: 8,
  address: WBTC_ADDRESSES[chainId] || WBTC_ADDRESSES[base.id],
  name: "Wrapped BTC",
  symbol: "WBTC",
  type: TokenType.BASE,
  underlyingTokens: [],
  logoURI:
    "https://tokens.1inch.io/0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6.png",
  chainAddresses: [],
});

// Actualizar WRAPPED_PROTOCOL_TOKEN para usar WETH en lugar de WMATIC
export const WRAPPED_PROTOCOL_TOKEN: Record<number, (chainId: number) => Token> = {
  [base.id]: WETH,
};

export const getWrappedProtocolToken = (chainId: number) => {
  return WRAPPED_PROTOCOL_TOKEN[chainId] ? WRAPPED_PROTOCOL_TOKEN[chainId](chainId) : null;
};

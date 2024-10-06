import { Address } from "viem";
import { arbitrumSepolia, polygon, polygonAmoy } from "viem/chains";

export const HUB_ADDRESSES: Record<number, Address> = {
  [polygon.id]: "0x059d306A25c4cE8D7437D25743a8B94520536BD5",
  [polygonAmoy.id]: "0xA5AdC5484f9997fBF7D405b9AA62A7d88883C345",
};

export const USDC_ADDRESSES: Record<number, Address> = {
  [polygon.id]: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
  [polygonAmoy.id]: "0x6C615481E96806edBd9987B6E522A4Ea85d13659",
  [arbitrumSepolia.id]: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
};

export const WBTC_ADDRESSES: Record<number, Address> = {
  [polygon.id]: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
  [polygonAmoy.id]: "0x6C615481E96806edBd9987B6E522A4Ea85d13659",
};

export const WMATIC_ADDRESSES: Record<number, Address> = {
  [polygon.id]: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  [polygonAmoy.id]: "0x6C615481E96806edBd9987B6E522A4Ea85d13659",
};

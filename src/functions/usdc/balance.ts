import { Contract } from "ethers";
import { Dispatch } from "react";
import { Address } from "viem";

export const getUsdcBalance = async (contract: Contract, wallet: Address, dispatch: Dispatch<any>, currbalance: any) => {
  const balance =await contract.balanceOf(wallet);
  console.log('acaaa',balance)
  console.log('acaaa',Number(balance))
  console.log('acaaa',Number(currbalance))
  dispatch(Number(currbalance)+Number(balance))

};

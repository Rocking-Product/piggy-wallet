import { createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';

// Crear el cliente público para la red Base Sepolia
const client = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});

// ABI del contrato ERC-20 (incluye balanceOf)
const ERC20_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }]
  }
];

// Función para obtener el balance de USDC en una Smart Account
export const getUsdcBalance = async (contractProxy: any, smartAccountAddress: `0x${string}`) => {
  try {
    // Extraer la dirección real desde el objeto proxy
    const contractAddress = contractProxy.target;

    // Verificar que la dirección sea válida y tenga el formato adecuado
    if (typeof contractAddress !== "string" || !/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
      throw new Error(`Invalid contract address: ${contractAddress}`);
    }

    // Verificar los valores de las direcciones
    console.log('Contract Address:', contractAddress);
    console.log('Smart Account Address:', smartAccountAddress);

    // Asumimos que USDC tiene 6 decimales
    const decimals = 6;
    
    // Obtener el balance de la Smart Account en USDC
    const balance = await client.readContract({
      // @ts-ignore
      address: contractAddress,
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [smartAccountAddress]
    });

    // Convertir el balance a un formato legible
    const formattedBalance = Number(balance) / 10 ** decimals;

    console.log(`Balance formateado de USDC: ${formattedBalance}`);
    return formattedBalance;
  } catch (error) {
    console.error('Error al obtener el balance de USDC:', error);
  }
};

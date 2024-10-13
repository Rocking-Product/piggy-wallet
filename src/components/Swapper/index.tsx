import React, { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Atoms/Select";
import Button from '../Button';
import { ethers } from 'ethers';
import usdcAbi from '@/abis/USDC';
import tokenMessengerAbi from '@/abis/cctp/TokenMessenger';
import messageTransmitterAbi from '@/abis/cctp/MessageTransmitter';
import { useSmartAccount } from '@/app/hooks/SmartAccountContext';
import { getUsdcBalance } from "@/functions/usdc/balance"

interface ISwapper {
    setValues: React.Dispatch<React.SetStateAction<{
        network: string;
        amount: number;
    }>>;
    values: {
        network: string;
        amount: number;
    };
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChainInfo {
    token_messenger?: string;
    message_transmitter?: string;
    usdc: string;
    domain?: number;
    chainId: string;
}

const chainsFrom: Record<string, ChainInfo> = {
    ETH_SEPOLIA: {
        token_messenger: '0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5',
        usdc: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
        chainId: '11155111', // Sepolia Testnet Chain ID
    },
    OP_SEPOLIA: {
        token_messenger: '0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5',
        usdc: '0x5fd84259d66Cd46123540766Be93DFE6D43130D7',
        chainId: '420', // Optimism Goerli Chain ID
    },
    ARB_SEPOLIA: {
        token_messenger: '0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5',
        usdc: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d',
        chainId: '421611', // Arbitrum Rinkeby Chain ID
    },
    POLYGON_AMOY: {
        token_messenger: '0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5',
        usdc: '0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582',
        chainId: '1442', // Polygon zkEVM Testnet Chain ID
    },
    BASE_SEPOLIA: {
        token_messenger: '0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5',
        usdc: '0x36cBD53842c5426634e7929541eC2318f3dCF7e',
        chainId: '84532', // Base Sepolia Chain ID actualizado
    },
    AVAX_FUJI: {
        token_messenger: '0xeb08f243e5d3fcff26a9e38ae5520a669f4019d0',
        usdc: '0x5425890298aed601595a70ab815c96711a31bc65',
        chainId: '43113', // Avalanche Fuji Testnet Chain ID
    }
};

const chainsTo: Record<string, ChainInfo> = {
    BASE_SEPOLIA: {
        message_transmitter: '0x7865fAfC2db2093669d92c0F33AeEF291086BEFD',
        usdc: '0x36cBD53842c5426634e7929541eC2318f3dCF7e',
        domain: 6,
        chainId: '84532', // Base Sepolia Chain ID actualizado
    },
    // Si deseas agregar más cadenas de destino, puedes hacerlo aquí
};

const Swapper: React.FC<ISwapper> = ({ setValues, setOpen, values }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { smartAccountAddress } = useSmartAccount();

    // Cadena de origen seleccionada por el usuario
    const selectedOrigin = values.network;
    // Cadena de destino fija (Base Sepolia)
    const selectedDestination = 'BASE_SEPOLIA';
    // Monto a transferir (con 6 decimales para USDC)
    const selectedAmount = ethers.parseUnits(values.amount.toString(), 6);
    // Dirección de la wallet de Privy del cliente
    const mintRecipient = smartAccountAddress;

    const onChangeHandlerNetwork = (value: string) => {
        setValues({
            ...values,
            network: value,
        });
    };

    const onChangeHandlerAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            amount: Number(event.target.value),
        });
    };

    const onSwap = () => {
        setLoading(true);
        bridge();
    };

    const bridge = async () => {
        try {
            console.log("Iniciando transferencia cross-chain...");

            // Obtener las configuraciones de las cadenas de origen y destino
            const origin = chainsFrom[selectedOrigin];
            const destination = chainsTo[selectedDestination];

            // Convertir Chain IDs a formato hexadecimal
            const originChainIdHex = '0x' + parseInt(origin.chainId).toString(16);
            const destinationChainIdHex = '0x' + parseInt(destination.chainId).toString(16);

            // **Paso 1: Cambiar a la red de origen**
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: originChainIdHex }],
                });
            } catch (switchError: any) {
                console.error('Error al cambiar a la cadena de origen:', switchError);
                setLoading(false);
                return;
            }

            // **Paso 2: Inicializar provider y signer en la red de origen**
            const originProvider = new ethers.BrowserProvider(window.ethereum);
            const originSigner = await originProvider.getSigner();

            // **Paso 3: Inicializar contratos en la cadena de origen**
            const usdcContract = new ethers.Contract(origin.usdc, usdcAbi, originSigner);
            const tokenMessengerContract = new ethers.Contract(origin.token_messenger!, tokenMessengerAbi, originSigner);

            // **Paso 4: Preparar datos para la transferencia**
            // Dirección de destino en formato bytes32
            const destinationAddressInBytes32 = ethers.zeroPadValue(mintRecipient!, 32);
            // Monto a transferir
            const amount = BigInt(selectedAmount);

            // **Paso 5: Aprobar el contrato Token Messenger para gastar USDC**
            console.log("Aprobando USDC para el contrato Token Messenger en la cadena de origen...");
            const approveTx = await usdcContract.approve(origin.token_messenger, amount);
            await approveTx.wait();

            // **Paso 6: Quemar USDC en la cadena de origen**
            console.log("Quemando USDC en la cadena de origen...");
            const burnTx = await tokenMessengerContract.depositForBurn(
                amount,
                destination.domain!,
                destinationAddressInBytes32,
                origin.usdc
            );
            const burnTxReceipt = await burnTx.wait();

            // **Paso 7: Obtener los bytes del mensaje de los logs de eventos**
            const eventTopic = ethers.id('MessageSent(bytes)');
            const log = burnTxReceipt.logs.find((l: any) => l.topics[0] === eventTopic);

            if (!log) {
                console.log("¡No se encontró el evento MessageSent!");
                setLoading(false);
                return;
            }

            const messageBytes = ethers.AbiCoder.defaultAbiCoder().decode(['bytes'], log.data);
            const messageBytesHash = ethers.keccak256(messageBytes[0]);

            // **Paso 8: Obtener la atestación de Circle**
            console.log("Obteniendo la firma de atestación...");
            let attestationResponse = { status: 'pending', attestation: {} };
            while (attestationResponse.status !== 'complete') {
                console.log("Verificando si la atestación está lista...");
                const response = await fetch(`https://iris-api-sandbox.circle.com/attestations/${messageBytesHash}`);
                attestationResponse = await response.json();
                await new Promise((r) => setTimeout(r, 5000));
            }

            const attestationSignature = attestationResponse.attestation;
            console.log(`Firma de atestación obtenida: ${attestationSignature}`);

            // **Paso 9: Cambiar a la red de destino (Base Sepolia)**
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: destinationChainIdHex }],
                });
            } catch (switchError: any) {
                console.error('Error al cambiar a la cadena de destino:', switchError);
                console.log('Código de error:', switchError.code);

                // Si el error es que la cadena no está agregada, agregarla
                if (switchError.code === 4902) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [
                                {
                                    chainId: destinationChainIdHex,
                                    chainName: 'Base Sepolia',
                                    rpcUrls: ['https://sepolia.base.org'],
                                    nativeCurrency: {
                                        name: 'Ethereum',
                                        symbol: 'ETH',
                                        decimals: 18,
                                    },
                                    blockExplorerUrls: ['https://base-sepolia.blockscout.com'],
                                },
                            ],
                        });

                        // Después de agregar la cadena, intentar cambiar nuevamente
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: destinationChainIdHex }],
                        });
                    } catch (addError: any) {
                        console.error('Error al agregar o cambiar a la cadena de destino:', addError);
                        setLoading(false);
                        return;
                    }
                } else {
                    console.error('Error no manejado al cambiar de cadena:', switchError.code);
                    setLoading(false);
                    return;
                }
            }

            // **Paso 10: Inicializar provider y signer en la red de destino**
            const destinationProvider = new ethers.BrowserProvider(window.ethereum);
            const destinationSigner = await destinationProvider.getSigner();

            // **Paso 11: Recibir los fondos en la cadena de destino**
            console.log("Recibiendo fondos en la cadena de destino...");

            const messageTransmitterContractDestination = new ethers.Contract(
                destination.message_transmitter!,
                messageTransmitterAbi,
                destinationSigner
            );

            const receiveTx = await messageTransmitterContractDestination.receiveMessage(
                messageBytes[0],
                attestationSignature
            );
            const receiveTxReceipt = await receiveTx.wait();
            console.log("¡Fondos recibidos en la cadena de destino!");
            console.log(`Detalles de la transacción: https://base-sepolia.blockscout.com/tx/${receiveTxReceipt.transactionHash}`);

            // **Paso 12: Obtener el balance de la billetera de destino (wallet de Privy del cliente)**
            if(smartAccountAddress){
                const balance =getUsdcBalance(usdcContract, smartAccountAddress);   
                console.log(`Balance de la cuenta de destino: ${balance} USDC`);
            }

            setLoading(false);
            setOpen(false);
        } catch (error) {
            console.error('Error durante la transferencia cross-chain:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Función para obtener el balance de USDC en la cuenta de destino
        const fetchBalance = async () => {
            if (!mintRecipient) return;

            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const network = await provider.getNetwork();
                const chainId = network.chainId.toString();

                const currentChain = Object.values(chainsFrom).find(chain => chain.chainId === chainId) ||
                    Object.values(chainsTo).find(chain => chain.chainId === chainId);

                if (!currentChain) {
                    console.error('Red no reconocida');
                    return;
                }

                const usdcContract = new ethers.Contract(currentChain.usdc, usdcAbi, signer);
                const balance = await usdcContract.balanceOf(mintRecipient);
                console.log(`Balance en la cadena ${chainId}: ${ethers.formatUnits(balance, 6)} USDC`);
            } catch (error) {
                console.error("Error al obtener el balance:", error);
            }
        };

        fetchBalance();
    }, [mintRecipient]);

    return (
        <>
            <div className='flex flex-col gap-y-4'>
                <Select onValueChange={onChangeHandlerNetwork} value={values.network}>
                    <SelectTrigger>
                        <SelectValue>{values.network}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ETH_SEPOLIA">ETH_SEPOLIA</SelectItem>
                        <SelectItem value="OP_SEPOLIA">OP_SEPOLIA</SelectItem>
                        <SelectItem value="ARB_SEPOLIA">ARB_SEPOLIA</SelectItem>
                        <SelectItem value="POLYGON_AMOY">POLYGON_AMOY</SelectItem>
                        <SelectItem value="BASE_SEPOLIA">BASE_SEPOLIA</SelectItem>
                        <SelectItem value="AVAX_FUJI">AVAX_FUJI</SelectItem>
                    </SelectContent>
                </Select>
                <input
                    type="number"
                    value={values.amount}
                    onChange={onChangeHandlerAmount}
                    placeholder="Ingresa el monto"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                />
            </div>
            {!loading ? (
                <div className='mt-4'>
                    <Button onClick={onSwap}>
                        Depositar
                    </Button>
                </div>
            ) : (
                <div className='mt-4'>
                    Cargando, esto puede demorar unos minutos...
                </div>
            )}
        </>
    );
};

export default Swapper;

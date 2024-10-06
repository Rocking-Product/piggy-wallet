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
import usdcAbi from '@/abis/USDC'
import tokenMessengerAbi from '@/abis/cctp/TokenMessenger';
import messageTransmitterAbi from '@/abis/cctp/MessageTransmitter';
import { useWallets } from '@privy-io/react-auth';
import { useSmartAccount } from '@/app/hooks/SmartAccountContext';
import { USDC_ADDRESSES } from '@/constants/addresses';
import { arbitrumSepolia, polygon } from 'viem/chains';
import { getUsdcBalance } from '@/functions/usdc/balance';


interface ISwapper {
    setValues: React.Dispatch<React.SetStateAction<{
        network: string;
        amount: number;
    }>>;
    values: {
        network: string;
        amount: number;
    };
    setOpen : React.Dispatch<React.SetStateAction<boolean>>;
} 

const chainsFrom = {
  ETH_SEPOLIA: {
    token_messenger: '0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5',
    usdc: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'
  },
  OP_SEPOLIA: {
    token_messenger: '0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5',
    usdc: '0x5fd84259d66Cd46123540766Be93DFE6D43130D7'
  },
  ARB_SEPOLIA: {
    token_messenger: '0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5',
    usdc: '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d'
  },
  POLYGON_AMOY: {
    token_messenger: '0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5',
    usdc: '0x41e94eb019c0762f9bfcf9fb1e58725bfb0e7582'
  },
  BASE_SEPOLIA: {
    token_messenger: '0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5',
    usdc: '0x036CbD53842c5426634e7929541eC2318f3dCF7e'
  },
  AVAX_FUJI: {
    token_messenger: '0xeb08f243e5d3fcff26a9e38ae5520a669f4019d0',
    usdc: '0x5425890298aed601595a70ab815c96711a31bc65'
  }
}

const chainsTo = {
  ETH_SEPOLIA: {
    message_transmitter: '0x7865fAfC2db2093669d92c0F33AeEF291086BEFD',
    domain: 0
  },
  OP_SEPOLIA: {
    message_transmitter: '0x7865fAfC2db2093669d92c0F33AeEF291086BEFD',
    domain: 2
  },
  ARB_SEPOLIA: {
    message_transmitter: '0xaCF1ceeF35caAc005e15888dDb8A3515C41B4872',
    domain: 3
  },
  POLYGON_AMOY: {
    message_transmitter: '0x7865fAfC2db2093669d92c0F33AeEF291086BEFD',
    domain: 7
  },
  BASE_SEPOLIA: {
    message_transmitter: '0x7865fAfC2db2093669d92c0F33AeEF291086BEFD',
    domain: 6
  },
  AVAX_FUJI: {
    message_transmitter: '0xa9fb1b3009dcb79e2fe346c16a604b8fa8ae0a79',
    domain: 1
  }
}

const Swapper: React.FC<ISwapper> = ({setValues, setOpen, values}) => {
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { smartAccountAddress, eoa, smartAccountClient, publicClient } = useSmartAccount();   
    type ChainKey = keyof typeof chainsFrom; // Esto genera un tipo que es una unión de las claves de chainsFrom
    const selectedOrigin: ChainKey = values.network as ChainKey //'ETH_SEPOLIA'
    const selectedDestination = 'ARB_SEPOLIA'
    const selectedAmount =  ethers.parseUnits(values.amount.toString(), 6)
    const mintRecipient = smartAccountAddress; // does not have to be an EOA
    console.log( selectedOrigin,
      selectedDestination,
      selectedAmount,
      mintRecipient)
    const onChangeHandlerNetwork = (value: string) => {
        setValues({
            ...values,
            network: value,
        });
    };
    useEffect(() => {
      connectWallet()
    }, [])
    const onChangeHandlerAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            amount: Number(event.target.value),
        });
    };

    const onSwap = () => { 
        setLoading(true)
        bridge()
    }

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                // Solicitar al usuario que conecte su cuenta a MetaMask
                const browserProvider = new ethers.BrowserProvider(window.ethereum);
                await browserProvider.send("eth_requestAccounts", []);

                // Obtener el signer
                const signer = await browserProvider.getSigner();
                const address = await signer.getAddress();

                // Actualizar el estado con el provider, signer y dirección de la cuenta
                setProvider(browserProvider);
                setSigner(signer);
                setAccount(address);

                console.log("Connected with address:", address);
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            console.error("MetaMask is not installed");
        }
    };

    const bridge = async () => {
        if (!signer) {
            console.log("No signer available");
            // connectWallet()
            return
          }

        console.log("Starting cross-chain transfer...")


      
        const origin = chainsFrom[selectedOrigin]
        const destination = chainsTo[selectedDestination]

        // initialize contracts using address and ABI
        const usdcContract = new ethers.Contract(origin.usdc, usdcAbi, signer);
        const tokenMessengerContract = new ethers.Contract(origin.token_messenger, tokenMessengerAbi, signer)
        const messageTransmitterContract = new ethers.Contract(destination.message_transmitter, messageTransmitterAbi, signer);
        // Arbitrum Sepolia destination address
        const destinationAddressInBytes32 = ethers.zeroPadValue(mintRecipient!, 32);

        // Amount that will be transferred
        const amount = BigInt(selectedAmount);

        // STEP 1: Approve messenger contract to withdraw from our active eth address
        console.log("Approving USDC contract on source chain...")
        const approveTx = await usdcContract.approve(origin.token_messenger, amount);
        await approveTx.wait();

        // STEP 2: Burn USDC
        console.log("Burning USDC on source chain...")
        const burnTx = await tokenMessengerContract.depositForBurn(amount, destination.domain, destinationAddressInBytes32, origin.usdc);
        const burnTxReceipt = await burnTx.wait();

        // STEP 3: Retrieve message bytes from logs
        const eventTopic = ethers.id('MessageSent(bytes)')
        const log = burnTxReceipt.logs.find((l: { topics: string[]; }) => l.topics[0] === eventTopic);

        let messageBytes, messageBytesHash;
        if (!log) {
            console.log("No MessageSent found!");
            return;
        } else {
            messageBytes = ethers.AbiCoder.defaultAbiCoder().decode(
                ['bytes'], log.data
            );
            messageBytesHash = ethers.keccak256(messageBytes[0]);
        }

        // STEP 4: Fetch attestation signature
        console.log("Fetching attestation signature...");
        let attestationResponse = { status: 'pending', attestation: {}};
        while (attestationResponse.status != 'complete') {
            console.log("Checking for attestation...");
            const response = await fetch(`https://iris-api-sandbox.circle.com/attestations/${messageBytesHash}`);
            attestationResponse = await response.json();
            // check again every 5 seconds
            await new Promise(r => setTimeout(r, 5000));
        }

        const attestationSignature = attestationResponse.attestation;
        console.log(`Attestation Signature: ${attestationSignature}`)

        // STEP 5: Using the message bytes and signature receive the funds on destination chain and address
        console.log("Receiving funds on destination chain...")
        const receiveTx = await messageTransmitterContract.receiveMessage(messageBytes[0], attestationSignature);
        console.log(receiveTx)
        const receiveTxReceipt = await receiveTx.wait();
        console.log("Funds received on destination chain!");
        console.log(`See tx details: https://sepolia.arbiscan.io/tx/${receiveTxReceipt.transactionHash}`);
        setLoading(false)
        setOpen(false)

    }

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
                        {/* <SelectItem value="ARB_SEPOLIA">ARB_SEPOLIA</SelectItem> */}
                        <SelectItem value="POLYGON_AMOY">POLYGON_AMOY</SelectItem>
                        <SelectItem value="BASE_SEPOLIA">BASE_SEPOLIA</SelectItem>
                        <SelectItem value="AVAX_FUJI">AVAX_FUJI</SelectItem>
                    </SelectContent>
                </Select>
                <input
                    type="number"
                    value={values.amount}
                    onChange={onChangeHandlerAmount}
                    placeholder="Enter amount"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                />
            </div>
            {!loading ? <div className='mt-4'>
                <Button onClick = {onSwap}>
                    Deposit
                </Button>
            </div> : <div className='mt-4'>
                Loading...
            </div>}
        </>
    );
};

export default Swapper;
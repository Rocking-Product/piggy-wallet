# Piggy Investment

**Piggy Investment** is a decentralized application (dApp) designed to facilitate secure and automated cryptocurrency investments, specifically tailored for families, parents, and children. With a transparent and friendly interface, Piggy Investment allows users to easily manage their crypto investments through Dollar-Cost Averaging (DCA) strategies.

## Features

- **Login with Privy**: Securely log in using Privy and link your account with Safe to manage your assets.
- **Automatic DCA Strategies**: Automatically invest USDC into WBTC or WETH through DCA strategies.
- **Manage Positions**: Create, view, terminate, and withdraw your investment positions.
- **Integration with Balmy SDK**: DCA is implemented using the Balmy SDK to ensure secure and automated investing.
- **Autoinvest**: Generate yield in uniswap with USDC founds. Implemented with rhinestone module
    - Module deployed in polygon amoy 0xDA990f56d1550f2624d37A216c1Ba4737A125b12
- **Autoswap**: Automatic swap any ERC20 deposit into USDC.
    - Module deployed in polygon amoy 0x259b166752c676D1e6A817dD405812B6bB3Be5F1
- **Deposit multichain**: Deposit USDC from multiples chains with CCTP (Circle).
- **On/Off Ramp**: Deposit and withdraw with FIAT using Manteca. (not integrated)

## How It Works

### Login and Smart Account Integration

Piggy Investment leverages Privy for secure user authentication and Safe for managing smart accounts. Upon logging in, users' accounts are linked to a Safe Smart Account, which serves as a secure and flexible way to manage their crypto assets. The smart account setup involves creating a wallet client that interacts with the Ethereum blockchain via Ethers.js, allowing for seamless integration with various DeFi protocols.

### Automated DCA Strategies

Piggy Investment automates the process of investing USDC into WBTC or WETH through a Dollar-Cost Averaging (DCA) strategy. This is achieved using the Balmy SDK, which provides the necessary tools to create, manage, and execute these DCA strategies. 

Users can initiate DCA transactions that periodically swap USDC for WBTC or WETH at predefined intervals. This strategy reduces the impact of market volatility by spreading out the purchase of assets over time. The smart contract interactions are handled securely through the Safe Smart Account, ensuring that users retain full control over their assets.

### Managing Investment Positions

Users can create new investment positions by defining the amount of USDC to invest, the target asset (WBTC or WETH), and the frequency of the swaps. Once a position is created, users can monitor their positions in real-time, view their current balances, and track the progress of their investments.

Piggy Investment also provides the functionality to terminate and withdraw positions. Terminating a position stops the DCA process, and users can choose to withdraw any remaining funds back to their Safe Smart Account. These actions are securely executed through the Balmy SDK, ensuring that all transactions are transparent and verifiable on the blockchain.

## Implementation Details

### Smart Account and Wallet Management

Piggy Investment uses the Safe SDK to manage user accounts. When a user logs in via Privy, a Safe Smart Account is created or accessed, enabling users to manage their assets securely. The Safe account setup includes integrating Pimlico’s Paymaster and Bundler services, which optimize the gas fee management and transaction bundling for efficient execution on the Ethereum network.

### DCA Execution with Balmy SDK

The DCA strategy is implemented using the Balmy SDK, which interfaces with smart contracts specifically designed to handle recurring swaps of USDC to WBTC or WETH. The Balmy SDK allows Piggy Investment to automate these transactions according to the user-defined schedule, ensuring consistent investment behavior even during market fluctuations.

The smart contract handling for the DCA strategies includes secure approval processes and interaction with ERC20 tokens. The approval of USDC tokens for swapping is executed via smart contracts, and the resulting assets (WBTC or WETH) are securely stored in the user's Safe Smart Account.

(All logic related to Balmy is in a proof of concept. We generate the transaction but the pimplico paymaster RPC throws an error that we couldnt fix)

### Terminating and Withdrawing Positions

Terminating a DCA position involves invoking the appropriate smart contract functions via the Balmy SDK. Once a position is terminated, any remaining funds that were allocated for future swaps can be withdrawn by the user. The funds are transferred back to the Safe Smart Account, allowing users to maintain full control over their assets.

This feature is particularly useful for users who wish to stop their investment strategy due to market changes or personal preferences. The entire process is handled within the Piggy Investment interface, providing a seamless and user-friendly experience.

### Cross-Chain Transfer Protocol (CCTP) Implementation

In Piggy Investment, we have integrated Circle’s Cross-Chain Transfer Protocol (CCTP) to facilitate seamless USDC transfers across multiple blockchain networks. By leveraging CCTP, users can securely deposit USDC from supported chains into their Safe Smart Account on Polygon. This is achieved by burning USDC on the source chain and minting the equivalent amount on the destination chain, ensuring that the user’s assets are always securely managed and available across networks.

The implementation involves interacting with Circle’s Token Messenger and Message Transmitter contracts. When a user initiates a cross-chain deposit, USDC is first approved and then burned on the originating chain. The corresponding transfer message is transmitted via the Message Transmitter contract to the destination chain, where the USDC is subsequently minted. This approach not only enhances interoperability but also provides a seamless user experience for managing multi-chain assets.

(CCTP with polygon amoy as destination does not work for us. The implementation is configured to transfers from multiple chains to arbitrum sepolia for proof of concept)

**Available networks:**
- ETH_SEPOLIA
- OP_SEPOLIA
- ARB_SEPOLIA
- POLYGON_AMOY
- BASE_SEPOLIA
- AVAX_FUJI

### Rhinestone Module Implementation: Autoswap and Autoinvest

In Piggy Investment, we use Rhinestone to implement two essential modules: Autoswap and Autoinvest. The Autoswap module automatically converts any ERC20 token deposited into the user’s Safe Smart Account into USDC. This ensures that all assets are consistently held in a stablecoin, providing a secure and predictable value. The module operates seamlessly on the Polygon Amoy network, converting tokens as soon as they are deposited. 
- Module deployed in polygon amoy 0xDA990f56d1550f2624d37A216c1Ba4737A125b12

The Autoinvest module leverages Uniswap to automatically generate yield on the USDC held in the Safe Smart Account. This module allows users to passively grow their investments, with all transactions securely managed within their account.
- Module deployed in polygon amoy 0x259b166752c676D1e6A817dD405812B6bB3Be5F1

## Technologies Used

### UI

- **React.js**: Used to build a responsive and user-friendly interface.

### Blockchain Integration

- **Ethers.js**: A library for interacting with Ethereum smart contracts.
- **Safe SDK**: Utilized to manage secure smart accounts.
- **Privy SDK**: Implemented for secure user authentication and data management.
- **Balmy SDK**: Used to execute Dollar-Cost Averaging (DCA) strategies on the blockchain.
- **Rhinestone Module Kit**: Used to generate modules for Safe Smart Account.
- **Rhinestone Module**: Used to build and deploy.

### Smart Contracts

- **Balmy Protocol Contracts**: Smart contracts used to execute DCA strategies from USDC to WBTC or WETH.
- **Safe Contracts**: Smart contracts used to manage and secure user assets.

## Why Piggy Investment?

**Piggy Investment** is designed to be the ideal solution for families looking to start investing in cryptocurrencies in a secure and automated way. With a focus on transparency and ease of use, it is the perfect tool for parents and children looking to grow their investment portfolio with confidence.

## Figma Prototypes
- **Pitch Deck:**
https://www.figma.com/deck/rd1ENLZndjH58T6RYFYLzX/%F0%9F%90%BD-Piggy-Wallet---Aleph[…]bJBB4T4-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1
- **Video Pitch:**
https://www.loom.com/share/e6e6f90994444561a33c14d3d57b819d?sid=6edd61ca-ba4c-431c-8805-842207d59aef
- **Onboarding Flow:**
https://www.figma.com/design/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Aleph-Hackathon-Work?node-id=2042-3416&t=Zen2sTHl6WfF7N5Q-11
- **Home:**
https://www.figma.com/design/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Aleph-Hackathon-Work?node-id=2066-21027&t=Zen2sTHl6WfF7N5Q-11
- **Saving Accounts Setup:**
https://www.figma.com/design/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Aleph-Hackathon-Work?node-id=2066-3822&t=Zen2sTHl6WfF7N5Q-11
- **Add Crypto Investment:**
https://www.figma.com/design/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Aleph-Hackathon-Work?node-id=2066-18074&t=Zen2sTHl6WfF7N5Q-11
- **Add Stock Investment:**
https://www.figma.com/design/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Aleph-Hackathon-Work?node-id=2066-18075&t=Zen2sTHl6WfF7N5Q-11
- **Deposit FIAT:**
https://www.figma.com/design/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Aleph-Hackathon-Work?node-id=2077-23542&t=Zen2sTHl6WfF7N5Q-11
- **Deposit Crypto:**
https://www.figma.com/design/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Aleph-Hackathon-Work?node-id=2081-28298&t=Zen2sTHl6WfF7N5Q-11
- **Send to Children:**
https://www.figma.com/design/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Aleph-Hackathon-Work?node-id=2077-24048&t=Zen2sTHl6WfF7N5Q-11
- **Send to Bank Account:**
https://www.figma.com/design/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Aleph-Hackathon-Work?node-id=2086-37408&t=Zen2sTHl6WfF7N5Q-11
- **Send Crypto:**
https://www.figma.com/design/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Aleph-Hackathon-Work?node-id=2086-40169&t=Zen2sTHl6WfF7N5Q-11
- **KYC:**
https://www.figma.com/design/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Aleph-Hackathon-Work?node-id=2106-21658&t=Zen2sTHl6WfF7N5Q-11
- **Figma Prototype:**
https://www.figma.com/proto/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Alep[…]fixed&starting-point-node-id=2110%3A24211&show-proto-sidebar=1
- **FigJam Userflows:**
https://www.figma.com/board/KA73iPStGmHhbwjJUdvegA/%F0%9F%90%BD-Piggy-Wallet---Aleph-Figjam?node-id=18-851&t=xrjAEdiw9GhDbLWX-11
- **Information Architecture:**
https://www.figma.com/board/KA73iPStGmHhbwjJUdvegA/%F0%9F%90%BD-Piggy-Wallet---Aleph-Figjam?node-id=26-1993&t=xrjAEdiw9GhDbLWX-11
- **Onboarding Flow Prototype:**
https://www.figma.com/proto/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Alep[…]fixed&starting-point-node-id=2109%3A21998&show-proto-sidebar=1
- **Savings Flow Prototype:**
https://www.figma.com/proto/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Alep[…]=fixed&starting-point-node-id=2117%3A8476&show-proto-sidebar=1
- **Investment Flow Prototype:**
https://www.figma.com/proto/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Alep[…]fixed&starting-point-node-id=2117%3A10115&show-proto-sidebar=1
- **Deposit Flow Prototype:**
https://www.figma.com/proto/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Alep[…]fixed&starting-point-node-id=2117%3A16454&show-proto-sidebar=1
- **Send Flow Prototype:**
https://www.figma.com/proto/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Alep[…]fixed&starting-point-node-id=2117%3A23534&show-proto-sidebar=1
- **KYC Flow Prototype:**
https://www.figma.com/proto/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Alep[…]fixed&starting-point-node-id=2117%3A29545&show-proto-sidebar=1
- **Design System:**
https://www.figma.com/design/8SfdgYNgL6PbLanA23POFE/%F0%9F%90%BD-Piggy-Wallet---Aleph-Hackathon-Work?node-id=1-2
## Getting Started

### Prerequisites

- Node.js (>=20) and npm installed (or pnpm)
- Git

### Quickstart

To get started, follow the steps bellow:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Run the `npm run dev` command to start the development server:

```bash
npm run dev
```

3. Visit `http://localhost:3000` to view your app.

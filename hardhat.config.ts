// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import '@openzeppelin/hardhat-upgrades'
import 'hardhat-deploy'
import 'hardhat-deploy-ethers'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'

import './type-extensions'

import './tasks/sendOFT.ts'

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

const config: HardhatUserConfig = {
    paths: {
        cache: 'cache/hardhat',
    },
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        'optimism-testnet': {
            eid: EndpointId.OPTSEP_V2_TESTNET,
            url: process.env.RPC_URL_OP_SEPOLIA || 'https://optimism-sepolia.gateway.tenderly.co',
            accounts,
            oftAdapter: {
                tokenAddress: '0x0', // Set the token address for the OFT adapter
            },
        },
        'avalanche-testnet': {
            eid: EndpointId.AVALANCHE_V2_TESTNET,
            url: process.env.RPC_URL_FUJI || 'https://rpc.ankr.com/avalanche_fuji',
            accounts,
            oftAdapter: {
                tokenAddress: '0x0', // Set the token address for the OFT adapter
            },
        },
        'arbitrum-testnet': {
            eid: EndpointId.ARBSEP_V2_TESTNET,
            url: process.env.RPC_URL_ARB_SEPOLIA || 'https://arbitrum-sepolia.gateway.tenderly.co',
            accounts,
            oftAdapter: {
                tokenAddress: '0xCfdA75Bf59986337525abD6a3335cF4890692A57', // Set the token address for the OFT adapter
            },
        },
        'base-testnet': {
            eid: EndpointId.BASESEP_V2_TESTNET,
            url: process.env.RPC_URL_BASE_SEPOLIA || 'https://base-sepolia.drpc.org',
            accounts,
            oftAdapter: {
                tokenAddress: '0x40BD670A58238e6E230c430BBb5cE6ec0d40df48', // Set the token address for the OFT adapter
            }
        },
        'ethereum-mainnet': {
            eid: EndpointId.ETHEREUM_V2_MAINNET,
            url: process.env.RPC_URL_ETH_MAINNET || 'https://eth-mainnet.public.blastapi.io',
            accounts,
            oftAdapter: {
                tokenAddress: '0x58D97B57BB95320F9a05dC918Aef65434969c2B2', // Set the token address for the OFT adapter
            },
        },
        'arbitrum-mainnet': {
            eid: EndpointId.ARBITRUM_V2_MAINNET,
            url: process.env.RPC_URL_ARB_MAINNET || 'https://arbitrum.public.blockpi.network/v1/rpc/public',
            accounts,
            oftAdapter: {
                tokenAddress: '0x40bd670a58238e6e230c430bbb5ce6ec0d40df48', // Set the token address for the OFT adapter
            },
        },
        hardhat: {
            // Need this for testing because TestHelperOz5.sol is exceeding the compiled contract size limit
            allowUnlimitedContractSize: true,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    }
}

export default config

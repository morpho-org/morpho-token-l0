# Morpho Token LayerZero Bridge

This repository contains the contracts that bridge MORPHO between Ethereum and Arbitrum using LayerZero V2.

| Network  | Contract                   | Address                                                                                                                 | Role                                                                      |
| -------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Ethereum | `MorphoOFTAdapter`         | [`0x50d3d6fD7518682155E3C1B65FDD50e1b35649D9`](https://etherscan.io/address/0x50d3d6fD7518682155E3C1B65FDD50e1b35649D9) | Locks MORPHO sent to Arbitrum and releases MORPHO received from Arbitrum. |
| Arbitrum | `MorphoTokenArbitrum`      | [`0x40BD670A58238e6E230c430BBb5cE6ec0d40df48`](https://arbiscan.io/address/0x40BD670A58238e6E230c430BBb5cE6ec0d40df48)  | Upgradeable MORPHO ERC-20 (proxy address).                                |
| Arbitrum | `MorphoMintBurnOFTAdapter` | [`0xFc3329363cd51adBBaa52E389bEE389981ccaAE0`](https://arbiscan.io/address/0xFc3329363cd51adBBaa52E389bEE389981ccaAE0)  | Burns MORPHO sent to Ethereum and mints MORPHO received from Ethereum.    |

Licensed under [MIT](LICENSE).

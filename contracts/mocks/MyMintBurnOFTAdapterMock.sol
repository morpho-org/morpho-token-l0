// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { MorphoMintBurnOFTAdapter } from "../MorphoMintBurnOFTAdapter.sol";

import { IMintableBurnable } from "@layerzerolabs/oft-evm/contracts/interfaces/IMintableBurnable.sol";

// @dev WARNING: This is for testing purposes only
contract MorphoMintBurnOFTAdapterMock is MorphoMintBurnOFTAdapter {
    constructor(
        address _token,
        IMintableBurnable _minterBurner,
        address _lzEndpoint,
        address _delegate,
        RateLimitConfig[] memory _rateLimitConfigs
    ) MorphoMintBurnOFTAdapter(_token, _minterBurner, _lzEndpoint, _delegate, _rateLimitConfigs) {}
}

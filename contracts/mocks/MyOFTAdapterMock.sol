// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import { MorphoOFTAdapter } from "../MorphoOFTAdapter.sol";

// @dev WARNING: This is for testing purposes only
contract MorphoOFTAdapterMock is MorphoOFTAdapter {
    constructor(address _token, address _lzEndpoint, address _delegate, RateLimitConfig[] memory _rateLimitConfigs) MorphoOFTAdapter(_token, _lzEndpoint, _delegate, _rateLimitConfigs) {}
}

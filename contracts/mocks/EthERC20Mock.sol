// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import { ERC20Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { UUPSUpgradeable } from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import { ERC1967Utils } from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Utils.sol";

// @dev WARNING: This is for testing purposes only
contract EthERC20Mock is ERC20Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    constructor() {
        _disableInitializers();
    }

    function initialize(string memory _name, string memory _symbol, address _owner) external initializer {
        __ERC20_init(_name, _symbol);
        __Ownable_init(_owner);
        __UUPSUpgradeable_init();

        _mint(_owner, 1_000e18);
    }

    /// @notice Mints tokens.
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /// @notice Burns sender's tokens.
    function burn(uint256 amount) external {
        _burn(_msgSender(), amount);
    }

    /// @notice Returns the contract's current implementation address.
    function getImplementation() external view returns (address) {
        return ERC1967Utils.getImplementation();
    }

    /// @inheritdoc UUPSUpgradeable
    function _authorizeUpgrade(address) internal override onlyOwner {}
}

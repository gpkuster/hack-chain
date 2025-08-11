// License
// SPDX-License-Identifier: UNLICENSED

// Solidity version compiler
pragma solidity 0.8.24;

// Libraries
import {Script} from "forge-std/Script.sol";
import {HackCertificate} from "../src/HackCertificate.sol";

// Contract
contract deployCertificate is Script{

    function run() external returns(HackCertificate){
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY_TESNET");
        vm.startBroadcast(deployerPrivateKey);
      //  string memory tokenUri = "ipfs://bafkreibgte6dcf6jqq5ssw7prqzv7m5eiie3bwyd3glynfvb47f6cahx6u" ;
        HackCertificate createCertificate = new HackCertificate();
        vm.stopBroadcast();
        return createCertificate;
    }

}
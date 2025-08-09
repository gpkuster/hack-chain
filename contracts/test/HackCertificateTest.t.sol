// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/HackCertificate.sol";

/// @title HackCertificateTest
/// @notice Unit tests for the HackCertificate smart contract.
/// @dev Uses Foundry's forge-std Test utilities for setup, assertions, and cheatcodes.
contract HackCertificateTest is Test {
    HackCertificate hackCertificate;

    /// @notice The contract owner (admin).
    address public admin = vm.addr(1);

    /// @notice A generic address not assigned any special role.
    address public randomUser = vm.addr(2);

    /// @notice An address authorized to issue certificates.
    address public authorizedIssuer = vm.addr(3);

    /// @notice An address without certificate issuing permissions.
    address public unauthorizedIssuer = vm.addr(4);

    /// @notice Address of the student receiving certificates.
    address public randomStudent = vm.addr(5);

    /// @notice Deploys the HackCertificate contract and authorizes an issuer before each test.
    function setUp() public {
        vm.startPrank(admin);
        hackCertificate = new HackCertificate();
        hackCertificate.authorizeIssuer(authorizedIssuer);
        vm.stopPrank();
        assertEq(hackCertificate.owner(), admin);
    }

    // --- Owner functions (authorize/revoke issuers) ---

    /// @notice Verifies that only the contract owner can authorize a new issuer.
    function testShouldOnlyAllowOwnerToAuthorizeIssuer() public {
        vm.startPrank(admin);
        hackCertificate.authorizeIssuer(unauthorizedIssuer);
        vm.stopPrank();
        assertEq(hackCertificate.authorizedIssuers(unauthorizedIssuer), true);
    }

    /// @notice Ensures that a non-owner cannot authorize a new issuer.
    function testShouldNotAllowToAuthorizeIfNotAdmin() public {
        vm.startPrank(randomUser);
        vm.expectRevert();
        hackCertificate.authorizeIssuer(unauthorizedIssuer);
        vm.stopPrank();
    }

    /// @notice Verifies that only the owner can revoke an issuer's authorization.
    function testShouldOnlyAllowOwnerToRevokeIssuer() public {
        vm.startPrank(admin);
        hackCertificate.revokeIssuer(authorizedIssuer);
        vm.stopPrank();
        assertEq(hackCertificate.authorizedIssuers(authorizedIssuer), false);
    }

    /// @notice Ensures that revocation fails if not performed by the owner.
    function testOnlyAdminCanRevokeIssuers() public {
        vm.expectRevert();
        hackCertificate.revokeIssuer(authorizedIssuer);
    }

    // --- Issue Certificate ---

    /// @notice Confirms that an authorized issuer can successfully mint multiple certificates.
    function testShouldAllowToIssueCertificate() public {
        vm.startPrank(authorizedIssuer);
        uint256 tokenId1 = hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Pentesting", "tokenUri");
        uint256 tokenId2 = hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Quality Assurance", "tokenUri");
        vm.stopPrank();
        assertEq(1, tokenId1);
        assertEq(2, tokenId2);
    }

    /// @notice Ensures that an unauthorized address cannot issue a certificate.
    function testShouldNotAllowToIssueCertificateIfNotAuthorized() public {
        vm.startPrank(unauthorizedIssuer);
        vm.expectRevert("Not authorized issuer");
        hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Pentesting", "tokenUri");
        vm.stopPrank();
    }

    /// @notice Ensures that once an issuer is revoked, they can no longer mint certificates.
    function testRevokedIssuerCannotMintAnymore() public {
        vm.startPrank(admin);
        hackCertificate.revokeIssuer(authorizedIssuer);
        vm.stopPrank();

        vm.startPrank(authorizedIssuer);
        vm.expectRevert("Not authorized issuer");
        hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Pentesting", "tokenUri");
        vm.stopPrank();
    }

    // --- Verify Certificate ---

    /// @notice Confirms that verifyCertificate returns the correct stored certificate data.
    function testShouldVerifyCertificate() public {
        vm.startPrank(authorizedIssuer);
        uint256 tokenId1 = hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Pentesting", "tokenUri");
        vm.stopPrank();
        assertEq(1, tokenId1);

        HackCertificate.Certificate memory c = hackCertificate.verifyCertificate(tokenId1);
        assertEq(c.courseName, "Pentesting");
        assertEq(c.issuedAt, block.timestamp);
        assertEq(c.issuer, authorizedIssuer);
        assertEq(c.studentName, "Ramdonlito");
    }

    /// @notice Ensures verification fails for a non-existent certificate.
    function testShouldRevertIfCertificateDoesNotExist() public {
        vm.expectRevert();
        hackCertificate.verifyCertificate(0);
    }

    // --- Revoke Certificate ---

    /// @notice Confirms that the issuer can revoke a certificate they issued.
    function testShouldRevokeCertificate() public {
        vm.startPrank(authorizedIssuer);
        uint256 tokenId1 = hackCertificate.issueCertificate(randomStudent, "Juan", "Solidity", "tokenUri");
        vm.stopPrank();
        assertEq(tokenId1, 1);

        vm.startPrank(authorizedIssuer);
        hackCertificate.revokeCertificate(tokenId1);
        vm.stopPrank();
    }

    /// @notice Ensures that revocation fails if called by neither the owner nor the issuer.
    function testRevokeCertificateUnauthorizedFails() public {
        vm.startPrank(authorizedIssuer);
        uint256 tokenId = hackCertificate.issueCertificate(randomStudent, "Juan", "Solidity", "tokenUri");
        vm.stopPrank();

        vm.startPrank(randomUser); // neither owner nor issuer
        vm.expectRevert("Not authorized to revoke");
        hackCertificate.revokeCertificate(tokenId);
        vm.stopPrank();
    }

    /// @notice Ensures that revoking a non-existent certificate fails.
    function testRevokeNonExistentCertificateFails() public {
        vm.startPrank(admin);
        vm.expectRevert();
        hackCertificate.revokeCertificate(999);
        vm.stopPrank();
    }

    /// @notice Checks that tokenURI returns the correct value for an existing token.
    function testTokenURIShouldReturnCorrectValue() public {
        vm.startPrank(authorizedIssuer);
        uint256 tokenId = hackCertificate.issueCertificate(randomStudent, "Alice", "Blockchain", "ipfs://exampleCID");
        vm.stopPrank();

        string memory uri = hackCertificate.tokenURI(tokenId);
        assertEq(uri, "ipfs://exampleCID");
    }

    /// @notice Ensures tokenURI reverts when queried for a non-existent token.
    function testTokenURIRevertsIfNonExistentToken() public {
        vm.expectRevert();
        hackCertificate.tokenURI(999);
    }
}

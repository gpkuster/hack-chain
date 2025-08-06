// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/HackCertificate.sol";

contract HackCertificateTest is Test {
    HackCertificate hackCertificate;
    address public admin = vm.addr(1);
    address public randomUser = vm.addr(2);
    address public authorizedIssuer = vm.addr(3);
    address public unauthorizedIssuer = vm.addr(4);
    address public randomStudent = vm.addr(5);

    function setUp() public {
        vm.startPrank(admin);
        hackCertificate = new HackCertificate();
        hackCertificate.authorizeIssuer(authorizedIssuer);
        vm.stopPrank();
        assertEq(hackCertificate.owner(), admin);
    }

    // --- Owner functions (authorize/revoke issuers) ---
    
    function testShouldOnlyAllowOwnerToAuthorizeIssuer() public {
        vm.startPrank(admin);
        hackCertificate.authorizeIssuer(unauthorizedIssuer);
        vm.stopPrank();
        assertEq(hackCertificate.authorizedIssuers(unauthorizedIssuer), true);
    }

    function testShouldNotAllowToAuthorizeIfNotAdmin() public {
        vm.startPrank(randomUser);
        vm.expectRevert();
        hackCertificate.authorizeIssuer(unauthorizedIssuer);
        vm.stopPrank();
    }

    function testShouldOnlyAllowOwnerToRevokeIssuer() public {
        vm.startPrank(admin);
        hackCertificate.revokeIssuer(authorizedIssuer);
        vm.stopPrank();
        assertEq(hackCertificate.authorizedIssuers(authorizedIssuer), false);
    }

    function testOnlyAdminCanRevokeIssuers() public {
        vm.expectRevert();
        hackCertificate.revokeIssuer(authorizedIssuer);
    }

    // --- Issue Certificate ---

    function testShouldAllowToIssueCertificate() public {
        vm.startPrank(authorizedIssuer);
        uint256 tokenId1 = hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Pentesting", "tokenUri");
        uint256 tokenId2 = hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Quality Assurance", "tokenUri");
        vm.stopPrank();
        assertEq(1, tokenId1);
        assertEq(2, tokenId2);
    }

    function testShouldNotAllowToIssueCertificateIfNotAuthorized() public {
        vm.startPrank(unauthorizedIssuer);
        vm.expectRevert("Not authorized issuer");
        hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Pentesting", "tokenUri");
        vm.stopPrank();
    }

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

    function testShouldRevertIfCertificateDoesNotExist() public {
        vm.expectRevert();
        hackCertificate.verifyCertificate(0);
    }

    // --- Revoke Certificate ---

    function testShouldRevokeCertificate() public {
        vm.startPrank(authorizedIssuer);
        uint256 tokenId1 = hackCertificate.issueCertificate(randomStudent, "Juan", "Solidity", "tokenUri");
        vm.stopPrank();
        assertEq(tokenId1, 1);

        vm.startPrank(authorizedIssuer);
        hackCertificate.revokeCertificate(tokenId1);
        vm.stopPrank();
    }

    function testRevokeCertificateUnauthorizedFails() public {
        vm.startPrank(authorizedIssuer);
        uint256 tokenId = hackCertificate.issueCertificate(randomStudent, "Juan", "Solidity", "tokenUri");
        vm.stopPrank();

        vm.startPrank(randomUser); // ni owner ni issuer
        vm.expectRevert("Not authorized to revoke");
        hackCertificate.revokeCertificate(tokenId);
        vm.stopPrank();
    }

    function testRevokeNonExistentCertificateFails() public {
        vm.startPrank(admin);
        vm.expectRevert();
        hackCertificate.revokeCertificate(999);
        vm.stopPrank();
    }

    function testTokenURIShouldReturnCorrectValue() public {
        vm.startPrank(authorizedIssuer);
        uint256 tokenId = hackCertificate.issueCertificate(randomStudent, "Alice", "Blockchain", "ipfs://exampleCID");
        vm.stopPrank();

        string memory uri = hackCertificate.tokenURI(tokenId);
        assertEq(uri, "ipfs://exampleCID");
    }

    function testTokenURIRevertsIfNonExistentToken() public {
        vm.expectRevert();
        hackCertificate.tokenURI(999);
    }    
}

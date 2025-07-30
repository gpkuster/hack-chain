// License
// SPDX-License-Identifier: MIT

// Compiler Solidity version
pragma solidity ^0.8.24;

// Libreries
import "forge-std/Test.sol";
import "../src/HackCertificate.sol";

// Contract
contract HackCertificateTest is Test {
    
    // Variables
    HackCertificate hackCertificate;
    address public admin = vm.addr(1);
    address public randomUser = vm.addr(2);
    address public authorizedIssuer = vm.addr(3);
    address public unauthorizedIssuer = vm.addr(4);
    address public randomStudent = vm.addr(5);

    // Functions
    function setUp() public {
        vm.startPrank(admin);
        hackCertificate = new HackCertificate();
        hackCertificate.authorizeIssuer(authorizedIssuer);
        vm.stopPrank();
        assertEq(hackCertificate.owner(), admin);
    }

    /**
     * Used to prevent a non-administrator from giving another user permission to issue certificates.
     */

    function testShouldNotAllowToAuthorizeIfNotAdmin() public {
        vm.startPrank(randomUser);
        vm.expectRevert();
        hackCertificate.authorizeIssuer(unauthorizedIssuer);
        vm.stopPrank();
    }

    /**
     * Used to verify that an authorized educator can correctly issue a certificate.
     */

    function testShouldAllowToIssueCertificate() public {
        vm.startPrank(authorizedIssuer);
        uint256 tokenId1 = hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Pentesting");
        uint256 tokenId2 = hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Quality Assurance");
        vm.stopPrank();
        assertEq(1, tokenId1);
        assertEq(2, tokenId2);
    }
    
    /**
     * Used to prevent an unauthorized educator from issuing a certificate
     */

    function testShouldNotAllowToIssueCertificate() public {
        vm.startPrank(unauthorizedIssuer);
        vm.expectRevert("Not authorized issuer");
        hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Pentesting");
        vm.stopPrank();
    }

    /**
     * Used to verify that the issued certificate is correctly stored in the blockchain
     */

    function testShouldVerifyCertificate() public {
        vm.startPrank(authorizedIssuer);
        uint256 tokenId1 = hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Pentesting");
        vm.stopPrank();
        assertEq(1, tokenId1);
        HackCertificate.Certificate memory c = hackCertificate.verifyCertificate(tokenId1);

        assertEq(c.courseName, "Pentesting");
        assertEq(c.issuedAt, block.timestamp);
        assertEq(c.issuer, authorizedIssuer);
        assertEq(c.studentName, "Ramdonlito");
    }

    /**
     * Used to verify that the contract reverts in case the certificate does not exist
     */

    function testShouldRevertIfCertificateDoesNotExist() public {
        vm.expectRevert("Certificate does not exist");
        hackCertificate.verifyCertificate(0);
    }

    /**
     * Used to prevent a revoked educator from issuing a certificate
     */

    function testRevokedIssuerCannotMintAnymore() public {
        vm.startPrank(admin);
        hackCertificate.revokeIssuer(authorizedIssuer);
        vm.startPrank(authorizedIssuer);
        vm.expectRevert("Not authorized issuer");
        hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Pentesting");
        vm.stopPrank();
    }

    /**
     * Used to verify that only the admin can revoke an educator
     */

    function testOnlyAdminCanRevokedIssuers() public {
        vm.expectRevert();
        hackCertificate.revokeIssuer(authorizedIssuer);
    }

    /**
     * Used to verify that the certificate is revoked correctly
     */

    function testShouldRevokeCertificate() public {
   
    vm.startPrank(authorizedIssuer);
    uint256 tokenId1 = hackCertificate.issueCertificate(randomStudent, "Juan", "Solidity");
    vm.stopPrank();
    assertEq(tokenId1, 1);

    
    vm.startPrank(authorizedIssuer);
    hackCertificate.revokeCertificate(tokenId1);
    vm.stopPrank();

    
    vm.expectRevert("Certificate does not exist");
    hackCertificate.verifyCertificate(tokenId1);
}

}
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

    function testShouldNotAllowToAuthorizeIfNotAdmin() public {
        vm.startPrank(randomUser);
        vm.expectRevert();
        hackCertificate.authorizeIssuer(unauthorizedIssuer);
        vm.stopPrank();
    }

    function testShouldAllowToIssueCertificate() public {
        vm.startPrank(authorizedIssuer);
        uint256 tokenId1 = hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Pentesting");
        uint256 tokenId2 = hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Quality Assurance");
        vm.stopPrank();
        assertEq(1, tokenId1);
        assertEq(2, tokenId2);
    }

    function testShouldNotAllowToIssueCertificate() public {
        vm.startPrank(unauthorizedIssuer);
        vm.expectRevert("Not authorized issuer");
        hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Pentesting");
        vm.stopPrank();
    }

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

    function testShouldRevertIfCertificateDoesNotExist() public {
        vm.expectRevert("Certificate does not exist");
        hackCertificate.verifyCertificate(0);
    }

    function testRevokedIssuerCannotMintAnymore() public {
        vm.startPrank(admin);
        hackCertificate.revokeIssuer(authorizedIssuer);
        vm.startPrank(authorizedIssuer);
        vm.expectRevert("Not authorized issuer");
        hackCertificate.issueCertificate(randomStudent, "Ramdonlito", "Pentesting");
        vm.stopPrank();
    }

    function testOnlyAdminCanRevokedIssuers() public {
        vm.expectRevert();
        hackCertificate.revokeIssuer(authorizedIssuer);
    }

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
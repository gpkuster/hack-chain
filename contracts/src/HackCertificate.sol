// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract HackCertificate is ERC721, Ownable {
    // --- State variables ---
    uint256 public currentTokenId;

    struct Certificate {
        string studentName;
        string courseName;
        uint256 issuedAt;
        address issuer;
    }

    mapping(uint256 => Certificate) public certificates;
    mapping(address => bool) public authorizedIssuers;

    // --- Events ---
    event CertificateIssued(uint256 tokenId, address indexed issuer, address indexed student);

    // --- Constructor ---
    constructor() ERC721("Hack Certificate", "HACKCERT") Ownable(msg.sender) {}

    // --- Modifiers ---
    modifier onlyAuthorizedIssuer() {
        require(authorizedIssuers[msg.sender], "Not authorized issuer");
        _;
    }

    // --- Admin functions ---
    function authorizeIssuer(address issuer) external onlyOwner {
        authorizedIssuers[issuer] = true;
    }

    function revokeIssuer(address issuer) external onlyOwner {
        authorizedIssuers[issuer] = false;
    }

    // --- Issuer functions ---
    function issueCertificate(
        address to,
        string memory studentName,
        string memory courseName
    ) external onlyAuthorizedIssuer returns (uint256) {
        uint256 newId = ++currentTokenId;
        _mint(to, newId);

        certificates[newId] = Certificate({
            studentName: studentName,
            courseName: courseName,
            issuedAt: block.timestamp,
            issuer: msg.sender
        });

        emit CertificateIssued(newId, msg.sender, to);
        return newId;
    }

    // --- Public view functions ---
    function verifyCertificate(uint256 tokenId) external view returns (Certificate memory) {
        _requireOwned(tokenId);
        return certificates[tokenId];
    }

    // --- Revocation ---
    function revokeCertificate(uint256 tokenId) external {
        require(
            owner() == msg.sender || certificates[tokenId].issuer == msg.sender,
            "Not authorized to revoke"
        );
        _requireOwned(tokenId);

        delete certificates[tokenId];
        _burn(tokenId);
    }
}

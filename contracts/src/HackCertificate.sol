// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "../lib/openzeppelin-contracts/contracts/utils/Strings.sol";

contract HackCertificate is ERC721, Ownable {
    using Strings for uint256;

    // --- State variables ---
    uint256 public currentTokenId;

    struct Certificate {
        string studentName;
        string courseName;
        uint256 issuedAt;
        address issuer;
    }

    mapping(uint256 => Certificate) public certificates;
    mapping(uint256 => string) private _tokenURIs;
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
        string memory courseName,
        string memory tokenUri
    ) external onlyAuthorizedIssuer returns (uint256) {
        uint256 newId = ++currentTokenId;
        _mint(to, newId);

        certificates[newId] = Certificate({
            studentName: studentName,
            courseName: courseName,
            issuedAt: block.timestamp,
            issuer: msg.sender
        });

        _setTokenURI(newId, tokenUri);

        emit CertificateIssued(newId, msg.sender, to);
        return newId;
    }

    // --- Public view functions ---
    function verifyCertificate(uint256 tokenId) external view returns (Certificate memory) {
        _requireOwned(tokenId);
        return certificates[tokenId];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        string memory uri = _tokenURIs[tokenId];
        return uri;
    }

    // --- Internal ---
    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        _requireOwned(tokenId);
        _tokenURIs[tokenId] = uri;
    }

    // --- Revocation ---
    function revokeCertificate(uint256 tokenId) external {
        require(
            owner() == msg.sender || certificates[tokenId].issuer == msg.sender,
            "Not authorized to revoke"
        );
        _requireOwned(tokenId);

        delete certificates[tokenId];
        delete _tokenURIs[tokenId];
        _burn(tokenId);
    }
}

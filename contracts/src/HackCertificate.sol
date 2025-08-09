// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "../lib/openzeppelin-contracts/contracts/utils/Strings.sol";

/// @title Hack Certificate NFT
/// @notice This contract issues verifiable hackathon certificates as ERC721 tokens.
/// @dev Only authorized issuers can mint certificates. Certificates can be revoked by the issuer or owner.
contract HackCertificate is ERC721, Ownable {
    using Strings for uint256;

    // --- State variables ---

    /// @notice Counter for the latest minted token ID.
    uint256 public currentTokenId;

    /// @notice Struct storing certificate details.
    /// @param studentName Name of the student receiving the certificate.
    /// @param courseName Name of the course or event.
    /// @param issuedAt Timestamp when the certificate was issued.
    /// @param issuer Address of the authorized issuer.
    struct Certificate {
        string studentName;
        string courseName;
        uint256 issuedAt;
        address issuer;
    }

    /// @notice Mapping from token ID to certificate details.
    mapping(uint256 => Certificate) public certificates;

    /// @dev Mapping from token ID to metadata URI.
    mapping(uint256 => string) private _tokenURIs;

    /// @notice Mapping to track addresses authorized to issue certificates.
    mapping(address => bool) public authorizedIssuers;

    // --- Events ---

    /// @notice Emitted when a certificate is issued.
    /// @param tokenId The ID of the issued certificate token.
    /// @param issuer The address that issued the certificate.
    /// @param student The address that received the certificate.
    event CertificateIssued(uint256 tokenId, address indexed issuer, address indexed student);

    // --- Constructor ---

    /// @notice Deploy the HackCertificate contract.
    constructor() ERC721("Hack Certificate", "HACKCERT") Ownable(msg.sender) {}

    // --- Modifiers ---

    /// @notice Restricts access to only authorized issuers.
    modifier onlyAuthorizedIssuer() {
        require(authorizedIssuers[msg.sender], "Not authorized issuer");
        _;
    }

    // --- Admin functions ---

    /// @notice Authorizes an address to issue certificates.
    /// @param issuer Address to authorize.
    function authorizeIssuer(address issuer) external onlyOwner {
        authorizedIssuers[issuer] = true;
    }

    /// @notice Revokes authorization for an issuer.
    /// @param issuer Address to revoke.
    function revokeIssuer(address issuer) external onlyOwner {
        authorizedIssuers[issuer] = false;
    }

    // --- Issuer functions ---

    /// @notice Issues a new certificate NFT.
    /// @dev Only callable by an authorized issuer.
    /// @param to Address of the student receiving the certificate.
    /// @param studentName Name of the student.
    /// @param courseName Name of the course or event.
    /// @param tokenUri Metadata URI for the certificate.
    /// @return newId The newly minted certificate token ID.
    function issueCertificate(
        address to,
        string memory studentName,
        string memory courseName,
        string memory tokenUri
    ) external onlyAuthorizedIssuer returns (uint256 newId) {
        newId = ++currentTokenId;
        _mint(to, newId);

        certificates[newId] = Certificate({
            studentName: studentName,
            courseName: courseName,
            issuedAt: block.timestamp,
            issuer: msg.sender
        });

        _setTokenURI(newId, tokenUri);

        emit CertificateIssued(newId, msg.sender, to);
    }

    // --- Public view functions ---

    /// @notice Verifies a certificate by token ID.
    /// @param tokenId The ID of the certificate token.
    /// @return The certificate struct containing its details.
    function verifyCertificate(uint256 tokenId) external view returns (Certificate memory) {
        _requireOwned(tokenId);
        return certificates[tokenId];
    }

    /// @notice Returns the metadata URI for a given token ID.
    /// @param tokenId The ID of the certificate token.
    /// @return uri The metadata URI of the token.
    function tokenURI(uint256 tokenId) public view override returns (string memory uri) {
        _requireOwned(tokenId);
        uri = _tokenURIs[tokenId];
    }

    // --- Internal ---

    /// @dev Sets the metadata URI for a given token ID.
    /// @param tokenId The ID of the certificate token.
    /// @param uri The metadata URI to associate with the token.
    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        _requireOwned(tokenId);
        _tokenURIs[tokenId] = uri;
    }

    // --- Revocation ---

    /// @notice Revokes a certificate, deleting its data and burning the token.
    /// @dev Only the contract owner or the certificate issuer can revoke it.
    /// @param tokenId The ID of the certificate to revoke.
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

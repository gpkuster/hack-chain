// License
// SPDX-License-Identifier: MIT

// Compiler Solidity version
pragma solidity ^0.8.24;

// Libraries
import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

// Contract
contract HackCertificate is ERC721, Ownable {
    
    // Variables
    uint256 public currentTokenId;

    struct Certificate {
        string studentName;
        string courseName;
        uint256 issuedAt;
        address issuer;
    }

    mapping(uint256 => Certificate) public certificates;
    mapping(address => bool) public authorizedIssuers;

    // Events
    event CertificateIssued(uint256 tokenId, address indexed issuer, address indexed student);

    // Constructor
    constructor() ERC721("Hack Certificate", "HACKCERT") Ownable(msg.sender) {}

    // Modifiers
    modifier onlyAuthorizedIssuer() {
        require(authorizedIssuers[msg.sender], "Not authorized issuer");
        _;
    }

    // Functions

    /**
     * Used to authorize an educator to issue certificates
     * @param issuer The public address of the educator
     */

    function authorizeIssuer(address issuer) external onlyOwner {
        authorizedIssuers[issuer] = true;
    }

    /**
     * Used to remove permission to issue certificates to an educator
     * @param issuer The public address of the educator
     */

    function revokeIssuer(address issuer) external onlyOwner {
        authorizedIssuers[issuer] = false;
    }

    /**
     * Used to issue the certificate
     * @param to Student public address
     * @param studentName Student name
     * @param courseName Name of the accredited course
     */

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

    /**
     * Used to verify that a certificate exists correctly on the blockchain
     * @param tokenId Identifier of the certificate issued to the student
     */

    function verifyCertificate(uint256 tokenId) external view returns (Certificate memory) {
        require(_exists(tokenId), "Certificate does not exist");
        return certificates[tokenId];
    }

    /**
     * Used to verify that the certificate belongs to a student
     * @param tokenId Identifier of the certificate issued to the student
     */

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    /**
     * Used to burn a certificate that has not been issued correctly or there is some other problem with it
     * @param tokenId Identifier of the certificate issued to the student
     */

    function revokeCertificate(uint256 tokenId) external {
        require(owner() == msg.sender || certificates[tokenId].issuer == msg.sender,
        "Not authorized to revoke");
        
        require(_exists(tokenId), "Certificate does not exist");

        delete certificates[tokenId];

        _burn(tokenId);

    }

    /**
     * Used to prevent the student from transferring their certificate to another user
     * @param from Ignored parameter
     * @param to Ignored parameter
     * @param tokenId Ignored parameter
     */

    function transferFrom(address from, address to, uint256 tokenId) public virtual pure override {
        revert("This NFT cannot be transferred.");
    }

    /**
     * Used to prevent the student from transferring their certificate to another user
     * @param from Ignored parameter
     * @param to Ignored parameter
     * @param tokenId Ignored parameter
     * @param data Ignored parameter
     */

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public virtual pure override {
        revert("This NFT cannot be transferred.");
    }
}

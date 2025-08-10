# 🛡️ Hack Chain – Blockchain-Powered NFT Certifications for Cybersecurity Education

**Hack Chain** is a blockchain-based platform for issuing, validating, and tracing NFT certifications in ethical hacking and cybersecurity education. It leverages the transparency and immutability of blockchain to provide verifiable digital credentials.

This repository contains the smart contract implementation using **Solidity** and a complete test suite written with **Foundry**.

## 🧱 Contract Features

- ✅ Issue unique NFT certificates (ERC721)
- 🔐 Authorization system for approved issuers
- 📜 Public certificate verification
- 🧾 Certificate traceability via blockchain
- 🚫 Access control to prevent unauthorized issuers

## 📁 Project Structure
```
hack-chain/
├── src/
│ └── HackCertificate.sol # Main smart contract (ERC721)
├── test/
│ └── HackCertificate.t.sol # Foundry test suite
├── script/
│ └── Deploy.s.sol # (Not yet ready) Deployment script
├── foundry.toml # Foundry configuration
```

## 🛠️ Requirements

- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- [Node.js](https://nodejs.org/) (optional, for frontend integration)

## 🚀 Getting Started

### 1. Install Foundry

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```
### 2. Clone the repo
```
git clone https://github.com/your-username/hack-chain.git
cd hack-chain
```

### 3. Run tests
```
forge test -vv
```
# 🤝 Contributing to Hack Chain

Welcome, and thanks for your interest in contributing to **Hack Chain** — a platform for certifying cybersecurity skills using blockchain and NFTs!

Whether you're fixing bugs, improving the UI, writing docs, or just reporting issues — your input is highly valued. We’re a small team learning and building together.

---

## 🧠 Before You Start

- Make sure you’ve read the [README.md](./README.md)
- Join our community:  
  🔗 [Discord](https://discord.gg/hDWrxKSN)  
  🔗 [Telegram](https://t.me/hackchaincommunity)

---

## 📌 How We Work

### 🔀 Branches
- `main`: production-ready code
- `develop`: where all new features go first

### 📂 Folder Breakdown

| Folder        | Description |
|---------------|-------------|
| **`/frontend`**   | Frontend interface built with React + Vite. Handles wallet connection, user UI, and interaction with smart contracts via `ethers.js` or `wagmi`. |
| **`/backend`**    | Node.js backend (Express). Verifies wallet signatures, handles login, interacts with the blockchain, stores metadata, and integrates IPFS. |
| **`/contracts`**  | Smart contracts written in Solidity. Deployed with Foundry. Includes scripts for deployment and testing. |
| **`/shared`**     | Optional folder for shared utilities (e.g., constants, helpers) used across the project. |
| **`/docs`**       | Project documentation, architecture diagrams, API specs, and technical planning. |

---

### 🌿 Create a Branch

Always branch off from `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/<your-feature-name>
```
Prefix your branch with:

- feature/ for new features
- fix/ for bug fixes
- chore/ for non-code tasks like docs or config
---

###  🚀 Pull Requests
Push your branch to GitHub:

```bash
git push origin feature/<your-feature-name>
```
Open a Pull Request into develop.

Provide a clear description of what you’ve done and why.

Tag someone for review — don’t be shy, we’re here to help!

---

## 💬 Need Help?

We’re building this together — and questions are encouraged!

If you ever get stuck or just want to chat:

- 💬 **[Join our Discord](https://discord.gg/hDWrxKSN)** – Collaborate, ask questions, and hang out.
- 📱 **[Chat on Telegram](https://t.me/hackchaincommunity)** – Stay connected and get updates.


## 👤 Team

**Ricardo Muchacho**  
_Project Lead & GitHub Maintainer_

**Add your name here**  
_Add description here_

Feel free to reach out directly for support, guidance, or feedback.

Thanks again for being part of **Hack Chain** 💜

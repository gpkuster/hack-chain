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

## 🌍 External Contributors – Fork & PR

If you’re not a collaborator yet, you can still contribute via fork:

1. **Fork the repository**  
   Click the **Fork** button on the GitHub repo.

2. **Clone your fork locally**
   ```bash
   git clone https://github.com/your-username/hack-chain.git
   ```

3. **Create a feature branch from `develop`**
   ```bash
   git checkout -b feature/my-contribution
   ```

4. **Make your changes, commit, and push**
   ```bash
   git push origin feature/my-contribution
   ```

5. **Open a Pull Request**  
   Open a PR into the main repo’s `develop` branch.


> ✅ **We welcome contributions from the community!**  
> Just make sure your PR is clear and focused.

---

## 🤝 Want to Become a Collaborator?

We’re always looking for reliable contributors to join the team!

If you’ve made consistent, helpful contributions or want to take a more active role:

- 📬 Message **Ricardo Muchacho** or reach out on [Discord](https://discord.gg/hDWrxKSN) to request collaborator access.
- Let us know what you’d like to help with!

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

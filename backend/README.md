# HackChain Backend
This project uses **PostgreSQL** as the database and **Node.js + Sequelize** for the backend. You can run the **app locally** while the database runs in **Docker**.

##  Requirements
- Docker and Docker Compose installed
- Node.js ≥ 20
- npm ≥ 9

## How it Works
### User Registration
When a new user registers on HackChain, the backend automatically creates a **new Ethereum wallet** for them. This process involves:

1. **Generating a wallet and private key**  
   - A new Ethereum address and corresponding private key are created using the backend.
   - The private key is securely stored or used only for testing purposes.

2. **Funding the wallet**  
   - The app uses the `SENDER_PRIVATE_KEY` (configured in `.env`) to send a small amount of ETH to the newly generated wallet.
   - This ensures the user wallet has enough ETH to interact with the blockchain for testing purposes (e.g., on Sepolia testnet).

3. **User registration flow**  
   - When a user signs up via the API, the backend generates their wallet.
   - The wallet address is then returned in the registration response alongside the user data.
   - Example response:
   ```json
   {
       "message": "User registered",
       "user": {
           "email": "test@mail.com",
           "walletAddress": "0xE27297141858118466e67c83405d37DeeDB9Dd94"
       }
   }
    ```
    This approach allows each user to have their own blockchain wallet without needing to manually create one or manage private keys, while keeping the process safe for testnet usage.

4. **User types**
There are three types of users that can be registered through this backend
  - **Student:** Can get certificates.
  - **Issuer:** An academic institution that issues certificates to the students.
  - **Recruiter:** Can see students' certificates.

### Pinata connection
When posting a certificate through this app's API, it will connect to your pinata account and store the tokenURI there. Follow the instructions below for connecting with pinata by filling the `.env` file.

## Configure and run the app

### 1. Start the database in Docker
Run the following command inside the `/backend` folder:
```bash
docker-compose up -d db
```
This will start only the database in Docker, exposed at `localhost:5432`.

### 2. Configure Environment Variables
Create an `.env` file in the backend root with the following content:
```ini
DB_HOST=localhost
DB_PORT=5432 # or whatever you want
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=hackchain
SENDER_PRIVATE_KEY=<wallet_with_funds_private_key>
RPC_URL=https://sepolia.infura.io/v3/<your_infura_project_id>
PINATA_JWT=...
GATEWAY_URL=...
```
#### ⚠️ PLEASE NOTE
When a user creates an account at this platform, this app will create a wallet and **fund it by using the `SENDER_PRIVATE_KEY`**. Do this for testing purpouses using fake ETH (e.g, Sepolia).

### 3. Adjust the amount of ETH
Look for this line in the `generateAndFundWallet.js` script and decide how much ETH you want to send to the wallets being generated each time a user registers:
```javascript
const amountToSend = "0.0000001"; // Adjust amount if needed
```

### 4. Run the server
Start the server with:
```bash
node index.js
```

## 🩺 Testing
### Add a new user to the database
```bash
POST http//:localhost:3002/api/users
```
#### Request body
```json
{
    "email": "test@mail.com",
    "password": "password"
}
```
#### Response example (201 Created)
```json
{
    "message": "User registered",
    "user": {
        "email": "test@mail.com",
        "walletAddress": "0xE27297141858118466e67c83405d37DeeDB9Dd94"
    }
}
```
### Add a duplicate email
#### Request body
Use a repeated email
```json
{
    "email": "test@mail.com",
    "password": "password"
}
```
#### Response example (409 Conflict)
```json
{
    "error": "User already registered"
}
```
### Post a certificate
```bash
POST http://localhost:3002/api/certificates
```
#### Request body
```json
{
  "name": "Example Perez",
  "course": "Blockchain 101",
  "professor": "Dr. Satoshi",
  "date": "2025-07-26",
  "imageCID": "bafybeia1234567890ksdjad"
}
```
#### Response example
```json
{
    "cid": "bafkreibsxymm6uxmqxlb5tyz23nhmo3i4degdgyjidadk6vqgbog4omojm",
    "pinata": {
        "id": "0198807e-f2ff-7796-a9ad-6a3a242eb83c",
        "name": "data.json",
        "size": 379,
        "mime_type": "application/json",
        "cid": "bafkreibsxymm6uxmqxlb5tyz23nhmo3i4degdgyjidadk6vqgbog4omojm",
        "network": "public",
        "number_of_files": 1,
        "streamable": false,
        "created_at": "2025-08-06T17:47:40.416Z",
        "updated_at": "2025-08-06T17:47:40.416Z"
    }
}
````

Verify that something similar to this has been generated in your Pinata account:
```json
{
  "name": "Certificate for Example Perez",
  "description": "Blockchain 101 impartido por Dr. Satoshi",
  "image": "ipfs://bafybeibmeqeia5ta52vxbapor5mkens2uwau2xsy6oetrf6prlcfssm5le",
  "attributes": [
    {
      "trait_type": "Student",
      "value": "Example Perez"
    },
    {
      "trait_type": "Course",
      "value": "Blockchain 101"
    },
    {
      "trait_type": "Professor",
      "value": "Dr. Satoshi"
    },
    {
      "trait_type": "Date",
      "value": "2025-07-26"
    }
  ]
}
```
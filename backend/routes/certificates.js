const express = require("express");
const { PinataSDK } = require("pinata");
const { ethers } = require("ethers");
const HackCertificateAbi = require("../abi/HackCertificate.json"); // Asegúrate de tener esto

const router = express.Router();

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL,
});

const defaultCertificateCID = "bafybeibmeqeia5ta52vxbapor5mkens2uwau2xsy6oetrf6prlcfssm5le";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const RPC_URL = process.env.RPC_URL;

// Ejemplo: cargar clave privada por centro educativo (en producción, usa vault/encriptado)
const CENTRO_WALLET_PK = process.env.CENTRO_PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(RPC_URL);
const centroWallet = new ethers.Wallet(CENTRO_WALLET_PK, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, HackCertificateAbi, centroWallet);

// POST /api/certificates/mint
router.post("/mint", async (req, res) => {
  try {
    const { studentWallet, name, course, professor, date, imageCID } = req.body;
    if (!studentWallet || !name || !course || !professor || !date || !imageCID) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1. Subir metadata a IPFS
    const metadata = {
      name: `Certificate for ${name}`,
      description: `${course} impartido por ${professor}`,
      image: `ipfs://${imageCID || defaultCertificateCID}`,
      attributes: [
        { trait_type: "Student", value: name },
        { trait_type: "Course", value: course },
        { trait_type: "Professor", value: professor },
        { trait_type: "Date", value: date },
      ],
    };

    const pinResult = await pinata.upload.public.json(metadata, {
      pinataMetadata: { name: `Certificate for ${name}` },
    });

    const tokenURI = `ipfs://${pinResult.cid}`;

    // 2. Llamar al contrato para emitir certificado
    const tx = await contract.issueCertificate(studentWallet, name, course);
    const receipt = await tx.wait();

    // 3. Obtener tokenId del evento
    const event = receipt.logs
      .map((log) => contract.interface.parseLog(log))
      .find((e) => e.name === "CertificateIssued");

    const tokenId = event?.args?.tokenId;

    res.json({
      success: true,
      txHash: tx.hash,
      tokenId,
      metadataCID: pinResult.cid,
      tokenURI,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Minting failed", details: err.message });
  }
});

module.exports = router;

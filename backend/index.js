const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PinataSDK } = require("pinata");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL,
});

const defaultCertificateCID = "bafybeibmeqeia5ta52vxbapor5mkens2uwau2xsy6oetrf6prlcfssm5le";

// POST /api/certificates: Upload certificate metadata to Pinata
app.post("/api/certificates", async (req, res) => {
  try {
    const { name, course, professor, date, imageCID } = req.body;

    if (!name || !course || !professor || !date || !imageCID) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const metadata = {
      name: `Certificate for ${name}`,
      description: `${course} impartido por ${professor}`,
      image: `ipfs://${defaultCertificateCID}`,
      attributes: [
        { trait_type: "Student", value: name },
        { trait_type: "Course", value: course },
        { trait_type: "Professor", value: professor },
        { trait_type: "Date", value: date },
      ],
    };
    const result = await pinata.upload.public.json(metadata, {
        pinataMetadata: { name: `Certificate for ${name}` },
      });
      res.json({ cid: result.cid, pinata: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload metadata" });
  }
});

// GET /api/certificates/:cid: Fetch certificate metadata from Pinata
app.get("/api/certificates/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    if (!cid) return res.status(400).json({ error: "CID is required" });
    const file = await pinata.gateways.public.get(cid);
    res.json(file.data);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Metadata not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
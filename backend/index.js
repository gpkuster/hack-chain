const { PinataSDK } = require("pinata")
const fs = require("fs")
const { Blob } = require("buffer")
require("dotenv").config()

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL
})

async function upload(){
  try {
    const blob = new Blob([fs.readFileSync("./hello-world.txt")]);
    const file = new File([blob], "hello-world.txt", { type: "text/plain"})
    const upload = await pinata.upload.public.file(file);
    console.log(upload)
  } catch (error) {
    console.log(error)
  }
}

upload()


async function main() {
    try {
      const file = await pinata.gateways.public.get("bafkreidznign2eh4fyvcul2d3llin4zdkjppsoeus75ntxifohp344tjnu")
      console.log(file.data)
    } catch (error) {
      console.log(error);
    }
  }
  
  main()
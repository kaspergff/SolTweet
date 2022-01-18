const fs = require('fs')
// import fs from fs 
const anchor = require("@project-serum/anchor")

const account = anchor.web3.Keypair.generate()

fs.writeFileSync('./keypair.json', JSON.stringify(account))
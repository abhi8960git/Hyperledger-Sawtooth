const { randomBytes } = require('crypto')
const secp256k1 = require('secp256k1')
const {Secp256k1PrivateKey} = require('sawtooth-sdk-js/signing/secp256k1')
const {CryptoFactory, createContext} = require('sawtooth-sdk-js/signing')
// or require('secp256k1/elliptic')
//   if you want to use pure js implementation in node

// generate message to sign
// message should have 32-byte length, if you have some other length you can hash message
// for example `msg = sha256(rawMessage)`
const createPrivateKey=()=>{
    const msg = randomBytes(32)

// generate privKey
let privKey
do {
  privKey = randomBytes(32)
} while (!secp256k1.privateKeyVerify(privKey))

// get the public key in a compressed format
const pubKey = secp256k1.publicKeyCreate(privKey)

// sign the message
const sigObj = secp256k1.ecdsaSign(msg, privKey)

// verify the signature
console.log(secp256k1.ecdsaVerify(sigObj.signature, msg, pubKey))

// => true

return privKey.toString('hex');
}

const privateKeyhexString = createPrivateKey();
const privateKey = new Secp256k1PrivateKey(privateKeyhexString);



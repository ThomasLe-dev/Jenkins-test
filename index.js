// ElGamal encryption and decryption in JavaScript

// Import the crypto library
const crypto = require("crypto");

// Define the ElGamal parameters
const p = 1000000007;
const g = 2;

// Generate the public and private keys
const publicKey = crypto.generateRandomInt(p - 1);
const privateKey = crypto.generateRandomInt(p - 1);

// Encrypt a message
function encrypt(message) {
  // Convert the message to a number
  const m = crypto.toBigInt(message);

  // Generate a random exponent
  const k = crypto.generateRandomInt(p - 1);

  // Calculate the ciphertext
  const c1 = pow(g, k, p);
  const c2 = (m * pow(publicKey, k, p)) % p;

  return [c1, c2];
}

// Decrypt a message
function decrypt(ciphertext) {
  // Calculate the plaintext
  const m = (ciphertext[1] * pow(privateKey, ciphertext[0], p)) % p;

  return m;
}

// Create a function to handle the encryption and decryption
function encryptAndDecrypt() {
  // Get the message from the input field
  const message = document.getElementById("message").value;

  // Encrypt the message
  const ciphertext = encrypt(message);

  // Display the encrypted message
  document.getElementById("encryptedMessage").value = ciphertext.join(" ");

  // Decrypt the message
  const decryptedMessage = decrypt(ciphertext);

  // Display the decrypted message
  document.getElementById("decryptedMessage").value = decryptedMessage;
}

// Add an event listener to the encrypt button
document.getElementById("encrypt").addEventListener("click", encryptAndDecrypt);
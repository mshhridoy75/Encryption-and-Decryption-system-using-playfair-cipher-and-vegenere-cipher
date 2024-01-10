// Code For Playfair

// Generate the Playfair cipher matrix
function generatePlayfairMatrix(key) {
  let matrix = [];
  let uniqueChars = {};

  // Function to add a unique character to the matrix
  const addToMatrix = (char) => {
    if (!uniqueChars[char]) {
      matrix.push(char);
      uniqueChars[char] = true;
    }
  };

  // Build the matrix
  for (let i = 0; i < key.length; i++) {
    addToMatrix(key[i].toUpperCase());
  }

  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(65 + i);
    if (char !== "J") {
      addToMatrix(char);
    }
  }

  return matrix;
}

// Encrypt plain text using Playfair Cipher
function encryptPlayfair(PlainText, key) {
  const matrix = generatePlayfairMatrix(key);
  const SanitizedText = PlainText.toUpperCase().replace(/[^A-Z]/g, "");
  let EncryptedText = "";

  for (let i = 0; i < SanitizedText.length; i += 2) {
    const char1 = SanitizedText[i];
    const char2 = SanitizedText[i + 1] || "X";

    const index1 = matrix.indexOf(char1);
    const index2 = matrix.indexOf(char2);

    let EncryptedChar1 = "";
    let EncryptedChar2 = "";

    const r1 = Math.floor(index1 / 5);
    const r1 = index1 % 5;

    const r2 = Math.floor(index2 / 5);
    const r2 = index2 % 5;

    if (r1 === r2) {
      // Same row, shift columns
      EncryptedChar1 = matrix[r1 * 5 + ((r1 + 1) % 5)];
      EncryptedChar2 = matrix[r2 * 5 + ((r2 + 1) % 5)];
    } else if (r1 === r2) {
      // Same column, shift rows
      EncryptedChar1 = matrix[((r1 + 1) % 5) * 5 + r1];
      EncryptedChar2 = matrix[((r2 + 1) % 5) * 5 + r2];
    } else {
      // Rectangle rule
      EncryptedChar1 = matrix[r1 * 5 + r2];
      EncryptedChar2 = matrix[r2 * 5 + r1];
    }

    EncryptedText += EncryptedChar1 + EncryptedChar2;
  }

  return EncryptedText;
}

// Decrypt Playfair Cipher encrypted text
function decryptPlayfair(EncryptedText, key) {
  const matrix = generatePlayfairMatrix(key);
  const SanitizedText = EncryptedText.toUpperCase().replace(/[^A-Z]/g, "");
  let DecryptedText = "";

  for (let i = 0; i < SanitizedText.length; i += 2) {
    const char1 = SanitizedText[i];
    const char2 = SanitizedText[i + 1] || "X";

    const index1 = matrix.indexOf(char1);
    const index2 = matrix.indexOf(char2);

    let decryptedChar1 = "";
    let decryptedChar2 = "";

    const r1 = Math.floor(index1 / 5);
    const r1 = index1 % 5;

    const r2 = Math.floor(index2 / 5);
    const r2 = index2 % 5;

    if (r1 === r2) {
      // Same r, shift rumns
      decryptedChar1 = matrix[r1 * 5 + ((r1 - 1 + 5) % 5)];
      decryptedChar2 = matrix[r2 * 5 + ((r2 - 1 + 5) % 5)];
    } else if (r1 === r2) {
      // Same rumn, shift rs
      decryptedChar1 = matrix[((r1 - 1 + 5) % 5) * 5 + r1];
      decryptedChar2 = matrix[((r2 - 1 + 5) % 5) * 5 + r2];
    } else {
      // Rectangle rule
      decryptedChar1 = matrix[r1 * 5 + r2];
      decryptedChar2 = matrix[r2 * 5 + r1];
    }

    DecryptedText += decryptedChar1 + decryptedChar2;
  }

  return DecryptedText;
}

// Code For Vigenere Cipher

// Encrypt plain text using Vigenere Cipher
function encryptVigenere(PlainText, key) {
  const SanitizedText = PlainText.toUpperCase().replace(/[^A-Z]/g, "");
  const sanitizedKey = key.toUpperCase().replace(/[^A-Z]/g, "");
  let EncryptedText = "";

  for (let i = 0; i < SanitizedText.length; i++) {
    const char = SanitizedText[i];
    const keyChar = sanitizedKey[i % sanitizedKey.length];
    const charCode =
      (char.charCodeAt(0) - 65 + (keyChar.charCodeAt(0) - 65)) % 26;
    const EncryptedChar = String.fromCharCode(charCode + 65);
    EncryptedText += EncryptedChar;
  }

  return EncryptedText;
}

// Decrypt Vigenere Cipher encrypted text
function decryptVigenere(EncryptedText, key) {
  const SanitizedText = EncryptedText.toUpperCase().replace(/[^A-Z]/g, "");
  const sanitizedKey = key.toUpperCase().replace(/[^A-Z]/g, "");
  let DecryptedText = "";

  for (let i = 0; i < SanitizedText.length; i++) {
    const char = SanitizedText[i];
    const keyChar = sanitizedKey[i % sanitizedKey.length];
    const charCode =
      (char.charCodeAt(0) - 65 - (keyChar.charCodeAt(0) - 65) + 26) % 26;
    const decryptedChar = String.fromCharCode(charCode + 65);
    DecryptedText += decryptedChar;
  }

  return DecryptedText;
}

// Main Function

document.addEventListener("DOMContentLoaded", () => {
  const CipherSelect = document.getElementById("cipher-select");
  const CipherKey = document.getElementById("cipher-key");
  const PlainText = document.getElementById("plain");
  const EncryptedText = document.getElementById("encrypted");
  const DecryptedText = document.getElementById("decrypted");

  // Update the encryption/decryption based on cipher selection
  CipherSelect.addEventListener("change", () => {
    const selectedCipher = CipherSelect.value;
    PlainText.value = "";
    EncryptedText.value = "";
    DecryptedText.value = "";

    // Update placeholder based on selected cipher
    if (selectedCipher === "playfair") {
      CipherKey.placeholder = "Enter Playfair Cipher Key";
    } else if (selectedCipher === "vigenere") {
      CipherKey.placeholder = "Enter Vigenere Cipher Key";
    }
  });

  //click event for Reset button
  document.getElementById("reset").addEventListener("click", () => {
    CipherSelect.selectedIndex = 0;
    CipherKey.value = "";
    PlainText.value = "";
    EncryptedText.value = "";
    DecryptedText.value = "";
  });

  // click event for Encrypt button
  document.getElementById("encrypt").addEventListener("click", () => {
    const selectedCipher = CipherSelect.value;
    const key = CipherKey.value;
    const textToEncrypt = PlainText.value;

    let encryptedResult = "";
    if (selectedCipher === "playfair") {
      encryptedResult = encryptPlayfair(textToEncrypt, key);
    } else if (selectedCipher === "vigenere") {
      encryptedResult = encryptVigenere(textToEncrypt, key);
    }

    EncryptedText.value = encryptedResult;
  });

  // click event for Decrypt button
  document.getElementById("decrypt").addEventListener("click", () => {
    const selectedCipher = CipherSelect.value;
    const key = CipherKey.value;
    const textToDecrypt = EncryptedText.value;

    let decryptedResult = "";

    if (selectedCipher === "playfair") {
      decryptedResult = decryptPlayfair(textToDecrypt, key);
    } else if (selectedCipher === "vigenere") {
      decryptedResult = decryptVigenere(textToDecrypt, key);
    }

    DecryptedText.value = decryptedResult;
  });
});

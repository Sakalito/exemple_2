//Cryptage
var aes256 = require("aes256");
//la clé secrète utilisée pour chiffrer et déchiffrer les messages
var secret_key = "uI2ooxtwHeI6q69PS98fx9SWVGbpQohO";
//retourne le texte crypté
export const to_Encrypt = (text) => {
  var encrypted = aes256.encrypt(secret_key, text);
  return encrypted;
};
//welcome est pas decrypté
export const to_Decrypt = (cipher, username) => {
  if (cipher.startsWith("Welcome")) {
    return cipher;
  }

  if (cipher.startsWith(username)) {
    return cipher;
  }
//message décrypé est retourné
  var decrypted = aes256.decrypt(secret_key, cipher);
  return decrypted;
};

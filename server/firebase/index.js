var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ecommercelogin-19fbf-default-rtdb.firebaseio.com/' // Replace with your database URL
});


module.exports = admin


const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const bucket = "gs://comuthor-dev.appspot.com";

module.exports = {admin, db, bucket};

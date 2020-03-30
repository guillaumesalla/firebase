const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// CORS Express middleware to enable CORS Requests.
const cors = require("cors")({
    origin: true
});

exports.addTroc = functions.region("europe-west1").https.onRequest(async (req, res) => {
    // Grab the parameters.
    const troc = req.body
    // Push the new troc into Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('Troc').add({ serviceDemande: troc.serviceDemande, servicePropose: troc.servicePropose, photo: troc.photo });
    // Send back a message that we've succesfully
    res.json({ status: `Troc with ID: ${writeResult.id} added.` });
});

exports.delTroc = functions.region("europe-west1").https.onRequest(async (req, res) => {
    // Grab the parameters.
    const troc = req.body
    // Delete the troc in Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('Troc').doc(troc.id).delete();
    // Send back a message that we've succesfully
    res.json({ status: `Troc with ID: ${writeResult.id} delete.` });
});

exports.delUser = functions.region("europe-west1").https.onRequest(async (req, res) => {
    // Grab the parameters.
    const troc = req.body
    // Delete the troc in Cloud Firestore using the Firebase Admin SDK.
    const writeResult = await admin.firestore().collection('User').doc(troc.id).delete();
    // Send back a message that we've succesfully
    res.json({ status: `User with ID: ${writeResult.id} delete.` });
});


exports.getTrocs = functions.region("europe-west1").https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        const writeResult = await admin.firestore().collection('Troc').get();
        const result = []
        writeResult.forEach(item => result.push(item.data()))
        res.json(result);
    })
});

exports.getUsers = functions.region("europe-west1").https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        const writeResult = await admin.firestore().collection('Users').get();
        const result = []
        writeResult.forEach(item => result.push(item.data()))
        res.json(result);
    })
});

